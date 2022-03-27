import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";
import { Row, Col, Button, Container, Card, Table } from "reactstrap";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { serverRequest } from "../Server";
import EmployeeEdit from "./employee/EmployeeEdit";
import Toast from "../components/ToastContainer";
import Pagination from "../components/Pagination";
import * as GeneralFunctions from "../utils/GeneralFunctions";
import ConfirmationModal from "../components/ConfirmationModal";

const Home = (props) => {
    const [page, setPage] = useState(1);
    const [pageLimit, setLimit] = useState(10);
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState({});
    const [showEmpForm, setShowEmpForm] = useState(false);
    const [showComfirmationModel, setComfirmationModel] = useState(false);

    useEffect(() => {
        let isAuth = GeneralFunctions.getAuthorizationHeader();
        if (!isAuth) {
            return props.history.push("/login");
        }
        getEmployees();
    }, [page, employee]);

    const handleEmpToggle = () => {
        setShowEmpForm((prev) => !prev);
    };

    const handleDeleteToggle = () => {
        setComfirmationModel((prev) => !prev);
    };

    const handleChangePage = (activePage) => {
        setPage(activePage);
        getEmployees();
    };

    const getEmployees = async () => {
        try {
            let response = await serverRequest({
                url: `employee/list?page=${page}&&pageLimit=${pageLimit}`,
                method: "GET",
            });

            setEmployees(response.employees);
            setTotalEmployees(response.totalEmployees);
        } catch (error) {
            Toast({ toastType: "error", message: error.message || error });
        }
    };

    const removeEmployees = async () => {
        try {
            let response = await serverRequest({
                url: `employee/delete/${employee._id}`,
                method: "DELETE",
            });
            setEmployee({});
            Toast({ toastType: "success", message: response.message });
        } catch (error) {
            Toast({ toastType: "error", message: error.message || error });
        }
    };

    const Logout = () => {
        props.history.push('/login');
        GeneralFunctions.clearFullLocalStorage();
    }

    return showEmpForm ? (
        <EmployeeEdit
            employee={employee}
            open={showEmpForm}
            toggle={handleEmpToggle}
            getList={getEmployees}
        />
    ) : (
        <Container>
            <Card className="mt-3 border-0">
                <Row>
                    <Col>
                        <div className="d-flex justify-content-between">
                            <Button
                                onClick={() => {
                                    setEmployee({});
                                    setShowEmpForm(true);
                                }}
                                color="primary"
                                className=" m-3"
                            >
                                Add Employee
                            </Button>
                            <Button color="danger" outline className="float-right m-3" 
                            onClick={()=>Logout()}
                            >
                                Logout
                            </Button>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Table responsive bordered hover>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>City</th>
                                    <th>Mobile</th>
                                    <th>Dath of Birth</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees && employees.length > 0 ? (
                                    employees.map((employee, index) => (
                                        <tr key={index}>
                                            <td>{employee.firstName}</td>
                                            <td>{employee.lastName}</td>
                                            <td>{employee.city}</td>
                                            <td>{employee.mobile}</td>
                                            <td>
                                                {moment(new Date(employee.dob)).format("DD-MM-YYYY") ||
                                                    ""}
                                            </td>
                                            <td>{employee.address}</td>
                                            <td>
                                                <div className="d-flex">
                                                    <Button
                                                        color="info"
                                                        outline
                                                        className="mx-3"
                                                        onClick={() => {
                                                            setEmployee(employee);
                                                            handleEmpToggle();
                                                        }}
                                                    >
                                                        <FaUserEdit size={20} />
                                                    </Button>
                                                    <Button
                                                        color="danger"
                                                        outline
                                                        onClick={() => {
                                                            setEmployee(employee);
                                                            handleDeleteToggle();
                                                        }}
                                                    >
                                                        <MdDeleteForever size={20} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">
                                            No employees found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                    <Pagination
                        page={page}
                        pageLimit={pageLimit}
                        totalPages={totalEmployees}
                        handleChangePage={() => handleChangePage}
                    />
                </Row>
            </Card>
            {showComfirmationModel && (
                <ConfirmationModal
                    isOpen={showComfirmationModel}
                    toggle={handleDeleteToggle}
                    remove={removeEmployees}
                />
            )}
        </Container>
    );
};

export default Home;
