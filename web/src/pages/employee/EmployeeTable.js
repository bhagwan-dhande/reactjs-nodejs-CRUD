import React from "react";
import { Row, Col, Table } from "reactstrap";
const EmployeeTable = ({ employees }) => {
  return (
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
                  <td>{employee.dob}</td>
                  <td>{employee.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default EmployeeTable;
