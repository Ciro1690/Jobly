import React, {useContext, useState, useEffect} from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    Button
} from "reactstrap";
import '../../styles/Card.css'
import JoblyApi from '../api/api';
import UserContext from '../routes/UserContext'

const JobCard = ({ job }) => {
    const { applyToJob } = useContext(UserContext);
    const { currentUser } = useContext(UserContext);
    const { userInfo } = useContext(UserContext);
    const [applied, setApplied] = useState(false);

    const getJobs = async e => {
        const user = await JoblyApi.getCurrentUser(currentUser);
        return user.applications
    }

    const handleClick = async e => {
        const applications = await getJobs()
        const newJobId = await applyToJob(currentUser, job.id)
        if (!applications.includes(newJobId.job)) {
            setApplied(true)
            alert(`Applied to ${job.title}`)
        }
    }

    useEffect(() => {
        if (userInfo.applications.includes(job.id)) {
            setApplied(true)
        }
    }, [setApplied, job.id, userInfo.applications])

    return (
        <section className="lg-4">
            <Card className="Jobly-Card">
                <CardBody>
                    <CardTitle>{job.title}</CardTitle>
                    <CardTitle>{job.companyHandle}</CardTitle>
                    <p>Salary: {job.salary}</p>
                    <p>Equity: {job.equity}</p>
                        {applied ? 
                        <Button className="btn btn-success">Applied</Button>
                        :  
                        <Button className="btn btn-info" onClick={handleClick}>Apply</Button>
                        }   
                    </CardBody>
            </Card>
        </section>
    )
}

export default JobCard