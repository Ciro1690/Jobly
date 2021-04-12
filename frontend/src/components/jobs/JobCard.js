import React from 'react';
import {
    Card,
    CardBody,
    CardTitle
} from "reactstrap";
import '../../styles/Card.css'

const JobCard = ({ job }) => {
    return (
        <section className="lg-4">
            <Card className="Jobly-Card">
                <CardBody>
                    <CardTitle>{job.title}</CardTitle>
                    <CardTitle>{job.companyHandle}</CardTitle>
                    <p>Salary: {job.salary}</p>
                    <p>Equity: {job.equity}</p>
                </CardBody>
            </Card>
        </section>
    )
}

export default JobCard