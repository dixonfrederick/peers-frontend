import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Form, Input, Label, Button, Error} from "../registerForm/RegisterStyledComponents";
import { A, Text } from "./LoginFormStyle";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const LoginForm = () => {
    const {dispatch} = React.useContext(AuthContext);
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        pass: ''
    }

    const onSubmit = async (values, actions) => {
        try {
            let host = "https://peers-backend-dev.up.railway.app";
            let response = await axios.post(
                `${host}/api/auth/token/`,
                {
                    email: values.email,
                    password: values.pass
                }
            );
            actions.setSubmitting(false);
            console.log("Success");
            actions.setStatus("success");

            dispatch({
                type: "LOGIN",
                payload: {
                    token: response.data["access"],
                }
            })
            navigate("/");

        } catch (err) {
            console.log("Error: ", err);
            actions.setStatus(err.code);
            actions.setSubmitting(false);
        }
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid').min(11, "invalid email").required('Required'),
        pass: Yup.string().required('Required').min(5, 'Password minimal 5 karakter')
    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });
    return (
        <div>
            <Form onSubmit={formik.handleSubmit}>
                <h1>Login Form</h1>
                <Label htmlFor="email"></Label>
                <Input type="email" id="email" name="email" placeholder="Email Address" data-testid="email" onChange={formik.handleChange} value={formik.values.email}/><br/>
                {formik.touched.email && (<Error className="error">{formik.errors.email}</Error>)}

                <Label htmlFor="pass"></Label>
                <Input type="password" id="pass" name="pass" placeholder="Password" data-testid="pass" onChange={formik.handleChange} value={formik.values.pass}/><br/>
                {formik.touched.pass && (<Error className="error">{formik.errors.pass}</Error>)}

                <Button type="submit" disabled={formik.isSubmitting || formik.status==='success'}>
                    {formik.isSubmitting ? (
                        "Loading..."
                    ) : (
                        "Login"
                    )}
                </Button><br/>

                <A className="nav-link" to="/register">Need an account?</A><br/>

                <Text>
                    {formik.status === undefined || formik.status === 'success' ? (
                        ""
                    ) : (
                        errorHandler(formik.status)
                    )}
                </Text>
            </Form>
        </div>
    )
}

function errorHandler(status) {
    if (status === "ERR_BAD_REQUEST") {
        return "Incorrect email/password!";
    } else if (status === "ERR_NETWORK") {
        return "Network error! Try again later";
    } else {
        return "Unknown error!";
    }
}

export default LoginForm