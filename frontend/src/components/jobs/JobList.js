import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import JoblyApi from '../api/api'

const JobList = () => {
    const initial = {
        query: ""
    }
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState(initial)

    useEffect(() => {
        async function getJobs() {
            let jobs = await JoblyApi.getJobs();
            console.log(jobs)
            setJobs(jobs);
            setIsLoading(false);
        }
        getJobs();
    }, []);

    if (isLoading) {
        return <p>Loading &hellip;</p>
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const query = formData.query
        const jobs = await JoblyApi.getJobs(query)
        setJobs(jobs)
        setFormData(initial)
    }

    const handleChange = e => {
        const { name, value } = e.target
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    return (
        <div className="col-md-8 offset-md-2">
            <form className="mb-4" onSubmit={handleSubmit}>
                <input
                    name="query"
                    type="text"
                    placeholder="Enter Search Term"
                    onChange={handleChange}
                    value={formData.query}
                />
                <button>
                    Submit
                </button>
            </form>
            {jobs.map(job => (
                <JobCard key={job.id} job={job}>{job.title}</JobCard>
            ))}
        </div>
    )
}

export default JobList