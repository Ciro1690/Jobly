import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../routes/UserContext'
import {
    Card,
    CardBody,
    Form,
    FormGroup,
    Button
} from 'reactstrap';

const Profile = ({editUser}) => {
    const { userInfo } = useContext(UserContext);
    const INITIAL_STATE = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email
    };
    const [formData, setFormData] = useState(INITIAL_STATE)
    const [errors, setErrors] = useState([]);
    let history = useHistory();

    const handleChange = e => {
        const { name, value } = e.target
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const newUserInfo = {
            "firstName": formData.firstName,
            "lastName": formData.lastName,
            "email": formData.email
        }
        const result = await editUser(userInfo.username, newUserInfo)
        if (result.success) {
            const NEW_STATE = {
                firstName: result.user.firstName,
                lastName: result.user.lastName,
                email: result.user.email
            };
            console.log(NEW_STATE)
            setFormData(NEW_STATE)
            history.push("/");
        } else {
            setErrors(result.errors);
        }
    }

    return (
        <div className="col-md-8 offset-md-2">
            <Card>
                <CardBody>
                    <h4>Username: {userInfo.username}</h4>
                    <Form onSubmit={handleSubmit}>
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
                                type="text"
                                name="email"
                                onChange={handleChange}
                                value={formData.email}
                            />
                        </FormGroup>
                        {errors.length ? <p>{errors}</p> : null}
                        <Button>Save Changes</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default Profile