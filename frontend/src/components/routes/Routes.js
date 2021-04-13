import React, {useEffect, useState} from 'react';
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
import UserContext from './UserContext';
import jwt from 'jsonwebtoken';

const Routes = () => {

    const [token, setToken] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)
    const [userInfo, setUserInfo] = useState(null)

    const SignUp = async formData => {
        try {
            const token = await JoblyApi.Signup(formData)
            setCurrentUser(formData.username)
            setToken(token)
            localStorage.setItem('token', token);
            return {success: true}
        } catch (err) {
            return {success: false, errors: err}
        }
    }

    const LogIn = async formData => {
        try {
            const token = await JoblyApi.Login(formData)
            setCurrentUser(formData.username)
            setToken(token)
            localStorage.setItem('token', token);
            return {success: true}
        } catch (err) {
            return {success: false, errors: err}
        }
    }

    const editUser = async (currentUser, formData) => {
        try {
            const user = await JoblyApi.editUser(currentUser, formData)
            console.log(user)
            return {success: true, user}
        } catch (err) {
            return {success: false, errors: err}
        }
    }

    const LogOut = () => {
        setCurrentUser(null)
        setToken(null)
    }

    useEffect(function getUserInfo() {
        async function getCurrentUser() {
            if (token) {
                try {
                    let { username } = jwt.decode(token);
                    JoblyApi.token = token;
                    const userInfo = await JoblyApi.getCurrentUser(username);
                    setUserInfo(userInfo)
                }
                catch (err) {
                    console.log(err)
                    setCurrentUser(null)
                }
            }
        } getCurrentUser()
    }, [token])
    

     return (
        <BrowserRouter>
             <UserContext.Provider value={{currentUser, token, userInfo}}>
                 <NavBar LogOut={LogOut}/>
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
                         <Login LogIn={LogIn}/>
                    </Route>
                    <Route exact path="/signup">
                        <Signup SignUp={SignUp}/>
                    </Route>
                    <Route exact path="/profile">
                        <Profile editUser={editUser}/>
                    </Route>
                    <Route>
                        <p>Hmmm. I can't seem to find what you want.</p>
                    </Route>
                </Switch>
            </UserContext.Provider>
        </BrowserRouter>
    )
}

export default Routes