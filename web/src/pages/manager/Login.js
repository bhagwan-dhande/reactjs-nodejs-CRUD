import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Row, Col, Form, FormGroup, Input, Label, Card, CardBody,
    CardTitle, Button
} from "reactstrap";
import { serverRequest } from '../../Server';
import Toast from "../../components/ToastContainer";
import * as GeneralFunctions from "../../utils/GeneralFunctions";

function Login(props) {

    useEffect(() => {
        let isAuth = GeneralFunctions.getAuthorizationHeader();
        if (isAuth) {
            props.history.push('/home')
        }
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Must be a valid Email').required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                let response = await serverRequest({
                    url: "/manager/login",
                    method: "POST",
                    data: values
                });
                console.log(response)
                GeneralFunctions.setAuthorizationHeader(response.token);
                props.history.push('/home');

            } catch (e) {
                Toast({ toastType: 'error', message: e.message || e });
            }
        }
    })

    useEffect(() => {
        let isAuth = GeneralFunctions.getAuthorizationHeader();
        if (isAuth & isAuth !== 'undefined') {
            props.history.push('/')
        }
    }, [])

    return (
        <Row className="justify-content-center align-items-center" style={{ height: '80vh', minWidth: '40vw' }}>
            <Col xs="6" sm="8" md="6" lg="4">
                <Card className="form">
                    <CardBody>
                        <CardTitle tag="h4" className="text-center">Login</CardTitle>
                        <Form
                            name="addAccountForm"
                            noValidate
                            className="flex flex-col justify-center w-full"
                            onSubmit={formik.handleSubmit}
                        >
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    className="mb-16"
                                    label="email"
                                    type="text"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                />

                                <p className="text-danger">{formik.touched.email && formik.errors.email}</p>
                            </FormGroup>

                            <FormGroup>
                                <Label for="accountName">Password</Label>
                                <Input
                                    className="mb-16"
                                    label="password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                />

                                <p className="text-danger">{formik.touched.password && formik.errors.password}</p>
                            </FormGroup>
                            <Row className="align-items-center">
                                <Col xs="6">

                                    <Link to='/register'
                                        className="active"
                                        type="reset"
                                    >Register</Link>

                                </Col>
                                <Col xs="6">
                                    <div className="text-right">
                                        <Button
                                            color="primary"
                                            outline
                                            type="submit"
                                            className="px-3 my-2"
                                            disabled={!(formik.isValid && formik.dirty)}
                                        >Login</Button>

                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default Login;