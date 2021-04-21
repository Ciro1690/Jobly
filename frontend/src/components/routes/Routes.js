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
import ProtectedRoute from './ProtectedRoute';
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
            return {success: true, user}
        } catch (err) {
            return {success: false, errors: err}
        }
    }

    const LogOut = () => {
        setCurrentUser(null)
        setToken(null)
        localStorage.removeItem('token');
    }

    const applyToJob = async (currentUser, jobId) => {
        try {
            const job = await JoblyApi.apply(currentUser, jobId)
            return { success: true, job }
        } catch (err) {
            return { success: false, errors: err }
        }    }

    useEffect(function getUserInfo() {
        async function getCurrentUser() {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    let { username } = jwt.decode(token);
                    JoblyApi.token = token;
                    const userInfo = await JoblyApi.getCurrentUser(username);
                    setCurrentUser(username)
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
             <UserContext.Provider value={{currentUser, token, userInfo, applyToJob}}>
                 <NavBar LogOut={LogOut}/>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                     <ProtectedRoute exact path="/companies">
                            <CompanyList />
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/companies/:name">
                        <CompanyDetail />
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/jobs">
                        <JobList />
                    </ProtectedRoute>
                    <Route exact path="/login">
                         <Login LogIn={LogIn}/>
                    </Route>
                    <Route exact path="/signup">
                        <Signup SignUp={SignUp}/>
                    </Route>
                    <ProtectedRoute exact path="/profile">
                        <Profile editUser={editUser} setUserInfo={setUserInfo}/>
                    </ProtectedRoute>
                    <Route>
                        <p>Hmmm. I can't seem to find what you want.</p>
                    </Route>
                </Switch>
            </UserContext.Provider>
        </BrowserRouter>
    )
}

export default Routes