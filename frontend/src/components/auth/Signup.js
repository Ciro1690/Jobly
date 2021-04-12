import React, {useState} from 'react';
import {
    Form,
    FormGroup,
    Button
} from 'reactstrap'; 


const Signup = ({SignUp}) => {
    const INITIAL_DATA = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    }
    const [formData, setFormData] = useState(INITIAL_DATA)

    const handleSubmit = async e => {
        e.preventDefault()
        const signUpJSON = {
            "username": formData.username,
            "password":formData.password,
            "firstName": formData.firstName,
            "lastName": formData.lastName,
            "email": formData.email
        }
        SignUp(signUpJSON)
        setFormData(INITIAL_DATA)
    }

    const handleChange = e => {
        const { name, value } = e.target
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    return (
        <>
        <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
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
                    <FormGroup>
                        <label id="firstName">First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            onChange={handleChange}
                            value={formData.firstName}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label id="lastName">Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            onChange={handleChange}
                            value={formData.lastName}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label id="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                        />
                    </FormGroup>
                    <Button>Submit</Button>
            </Form>
        </>
    )
}

export default Signup