import React from "react";
import { Link } from 'react-router-dom';
import { Row, Col, FormGroup, Label, Input, Button, Card } from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { serverRequest } from "../../Server";
import Toast from '../../components/ToastContainer';

const Registration = (props) => {
    return (
        <Formik
            enableReinitialize
            validateOnMount
            initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                address: "",
                company: "",
                dob: "",
            }}
            validationSchema={Yup.object({
                firstName: Yup.string().required("*Required"),
                lastName: Yup.string().required("*Required"),
                email: Yup.string().email('Must be a valid Email').required('Required'),
                password: Yup.string().required("*Required"),
                address: Yup.string().required("*Required"),
                company: Yup.string().required("*Required"),
                dob: Yup.date().required("*Required"),
            })}
            onSubmit={async (values, { resetForm }) => {
                try {
                    const response = await serverRequest({
                        url: "/manager/register",
                        method: "POST",
                        data: values,
                    });
                    resetForm();
                    Toast({ toastType: "success", message: response.message });
                    props.history.push('/login');
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
                <Row className=" m-5 justify-content-center align-items-center">
                    <Col xs="6" >
                        <h2>Register Manager</h2>
                        <Card className="p-3">
                            <Form>
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
                                    <Label for="email">
                                        <b>Email</b>
                                    </Label>
                                    <Input
                                        label="email"
                                        type="text"
                                        name="email"
                                        id="email"
                                        placeholder="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                    />
                                    <p className="text-danger">{touched.email && errors.email}</p>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">
                                        <b>password</b>
                                    </Label>
                                    <Input
                                        label="password"
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                    />
                                    <p className="text-danger">
                                        {touched.password && errors.password}
                                    </p>
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
                                        value={values.dob}
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
                                <FormGroup>
                                    <Label for="company">
                                        <b>Company</b>
                                    </Label>
                                    <Input
                                        label="company"
                                        type="text"
                                        name="company"
                                        id="company"
                                        placeholder="company"
                                        value={values.company}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                    />
                                    <p className="text-danger">{touched.company && errors.company}</p>
                                </FormGroup>
                                <div>
                                    <Link to="/login" className="activeLink" type="reset">
                                        Login
                                    </Link>

                                    <Button
                                        onClick={handleSubmit}
                                        color="primary"
                                        type="submit"
                                        disabled={!isValid}
                                    >
                                        Register
                                    </Button>
                                </div>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            )}
        </Formik>
    );
};

export default Registration;
