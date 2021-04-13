import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import JobCard from '../jobs/JobCard'
import '../../styles/Card.css'
import JoblyApi from '../api/api'

const CompanyDetail = () => {
    const {name} = useParams()
    const [company, setCompany] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getCompany(name) {
            let company = await JoblyApi.getCompany(name);
            setCompany(company);
            setIsLoading(false);
        }
        getCompany(name);
    }, [name]);

    if (isLoading) {
        return <p>Loading &hellip;</p>
    }

    return (
        <div>
            <h2>{company.name}</h2>
            <h4>{company.description}</h4>
            <div className="col-md-8 offset-md-2">
                {company.jobs.map(job =>
                    <JobCard key={job.id} job={job}>{job.title}</JobCard>)}
            </div>
        </div>
    )
}

export default CompanyDetail