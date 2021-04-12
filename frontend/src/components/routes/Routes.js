import React, {useState} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CompanyDetail from "../companies/CompanyDetail";
import CompanyList from "../companies/CompanyList";
import NavBar from "../nav/NavBar";
import Home from "../home/Home";
import JobList from "../jobs/JobList";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import Profile from "../auth/Profile";
import JoblyApi from '../api/api';
import CurrentUserContext from '../auth/CurrentUserContext';

const Routes = () => {

    const [token, setToken] = useState([])
    const [currentUser, setCurrentUser] = useState('testuser')

    const SignUp = async formData => {
        const token = await JoblyApi.Signup(formData)
        setToken(token)
    }

    const Login = async formData => {
        const token = await JoblyApi.Login(formData)
        setToken(token)
    }

    const Logout = async() => {
        await JoblyApi.Logout()
        setCurrentUser("")
    }

     return (
        <BrowserRouter>
            <CurrentUserContext.Provider currentUser={currentUser}>
                <NavBar />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/companies">
                        <CompanyList />
                    </Route>
                    <Route exact path="/companies/:name">
                        <CompanyDetail />
                    </Route>
                    <Route exact path="/jobs">
                        <JobList />
                    </Route>
                    <Route exact path="/login">
                         <Login Login={Login}/>
                    </Route>
                    <Route exact path="/signup">
                        <Signup Signup={SignUp}/>
                    </Route>
                    <Route exact path="/profile">
                        <Profile />
                    </Route>
                    <Route exact path="/logout">
                        <Profile Logout={Logout}/>
                    </Route>
                    <Route>
                        <p>Hmmm. I can't seem to find what you want.</p>
                    </Route>
                </Switch>
            </CurrentUserContext.Provider>
        </BrowserRouter>
    )
}

export default Routes