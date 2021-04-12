import React from 'react';
import {
    CardBody,
    CardTitle,
    CardText,
    Card
} from "reactstrap";
import { Link } from 'react-router-dom';
import '../../styles/Card.css'

const CompanyCard = ({company}) => {
    return (
        <section className="lg-4">
            <Link to={`/companies/${company.handle}`}>
                <Card className="Jobly-Card">
                    <CardBody>
                        <CardTitle>{company.name}</CardTitle>
                        <CardText>{company.description}</CardText>
                    </CardBody>
                </Card>
            </Link>
        </section>
    )
}

export default CompanyCard