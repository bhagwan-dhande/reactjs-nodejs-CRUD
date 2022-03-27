import React from "react";
import moment from 'moment';
import { Formik } from "formik";
import * as Yup from "yup";
import {
    Input,
    Label,
    Modal,
    ModalHeader,
    Form,
    FormGroup,
    ModalBody,
    ModalFooter,
    Button,
} from "reactstrap";
import { serverRequest } from "../../Server";
import Toast from '../../components/ToastContainer';

function EmployeeEdit({ open, toggle, getList, employee }) {
    return (
        <Formik
            enableReinitialize
            validateOnMount
            initialValues={{
                firstName: (employee && employee.firstName) || "",
                lastName: (employee && employee.lastName) || "",
                city: (employee && employee.city) || "",
                address: (employee && employee.address) || "",
                mobile: (employee && employee.mobile) || "",
                dob: (employee && employee.dob) || "",
            }}
            validationSchema={Yup.object({
                firstName: Yup.string().required("*Required"),
                lastName: Yup.string().required("*Required"),
                city: Yup.string().required("*Required"),
                address: Yup.string().required("*Required"),
                mobile: Yup.number().required("*Required"),
                dob: Yup.date().required("*Required"),
            })}
            onSubmit={async (values, { resetForm }) => {
                try {
                    let url = `/employee/${Object.keys(employee).length > 0 ? 'update/' + employee._id : 'create'} `;
                    let method = Object.keys(employee).length > 0 ? "PUT" : "POST";
                    const response = await serverRequest({
                        url,
                        method,
                        data: values,
                    });
                    resetForm();
                    toggle();
                    Toast({ toastType: "success", message: response.message });
                    getList();
                } catch (error) {
                    Toast({ toastType: "error", message: error.message || error });

                }
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                resetForm,
                isSubmitting,
                isValid,
                dirty,
            }) => (
                <Modal size='lg' isOpen={open} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        <h1>{Object.keys(employee).length > 0 ? "Update Employee" : "Add Employee"}</h1>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="firstName">
                                <b>First Name</b>
                            </Label>
                            <Input
                                label="firstName"
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            <p className="text-danger">
                                {touched.firstName && errors.firstName}
                            </p>
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName">
                                <b>Last Name</b>
                            </Label>
                            <Input
                                label="lastName"
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            <p className="text-danger">
                                {touched.lastName && errors.lastName}
                            </p>
                        </FormGroup>
                        <FormGroup>
                            <Label for="city">
                                <b>City</b>
                            </Label>
                            <Input
                                label="city"
                                type="text"
                                name="city"
                                id="city"
                                placeholder="city"
                                value={values.city}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            <p className="text-danger">{touched.city && errors.city}</p>
                        </FormGroup>
                        <FormGroup>
                            <Label for="mobile">
                                <b>Mobile</b>
                            </Label>
                            <Input
                                label="mobile"
                                type="text"
                                name="mobile"
                                id="mobile"
                                placeholder="mobile"
                                value={values.mobile}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            <p className="text-danger">{touched.mobile && errors.mobile}</p>
                        </FormGroup>
                        <FormGroup>
                            <Label for="dob">
                                <b>Dath of birth</b>
                            </Label>
                            <Input
                                label="dob"
                                type="date"
                                name="dob"
                                id="dob"
                                placeholder="dob"
                                value={moment(
                                    new Date(values.dob)
                                ).format("yyyy-MM-DD") || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            <p className="text-danger">{touched.dob && errors.dob}</p>
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">
                                <b>Address</b>
                            </Label>
                            <Input
                                label="address"
                                type="textarea"
                                name="address"
                                id="address"
                                placeholder="address"
                                value={values.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            <p className="text-danger">{touched.address && errors.address}</p>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <div>
                            <Button
                                className="mx-5"
                                onClick={() => {
                                    resetForm();
                                    toggle();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                color="primary"
                                type="submit"
                                disabled={!isValid}
                            >
                                {Object.keys(employee).length > 0 ? "Update" : "Create"}
                            </Button>
                        </div>
                    </ModalFooter>
                </Modal>
            )}
        </Formik>
    );
}

export default EmployeeEdit;
