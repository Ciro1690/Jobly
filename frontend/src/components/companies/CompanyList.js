import React, {useState, useEffect} from 'react';
import CompanyCard from './CompanyCard';
import JoblyApi from '../api/api'

const CompanyList = () => {
    const initial = {
        query: ""
    }
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState(initial)
  
    useEffect(() => {
        async function getCompanies() {
            let companies = await JoblyApi.getCompanies();
            setCompanies(companies);
            setIsLoading(false);
        }
        getCompanies();
    }, []);

    if (isLoading) {
        return <p>Loading &hellip;</p>
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const query = formData.query
        const companies = await JoblyApi.getCompanies(query)
        setCompanies(companies)
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
            {companies.map(company => (
                <CompanyCard company = {company}>{company.name}</CompanyCard>
            ))}
        </div>
    )
}

export default CompanyList