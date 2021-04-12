import React, { useState } from 'react';
import {
    Form,
    FormGroup
} from 'reactstrap';

const Login = () => {
    const INITIAL_DATA = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    }
    const [formData, setFormData] = useState(INITIAL_DATA)

    const handleChange = e => {
        const { name, value } = e.target
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    return (
        <>
            <h1>Login</h1>
            <Form>
                <FormGroup>
                    <label id="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={formData.username}
                    />
                </FormGroup>
                <FormGroup>
                    <label id="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                    />
                </FormGroup>
                </Form>
        </>
    )
}

export default Login