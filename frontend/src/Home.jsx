import React from 'react';

const Home = () => {
    return (
        <div className="home">
            <div className="container">
                <h1>Lets get improving</h1>
                <h3>What jobs are you interested in today?</h3>
                <div className="form1-container">
                    <form className="form1">
                        <label htmlFor="companyName">Company Name:</label>
                        <input type="text" id="companyName" />

                        <label htmlFor="jobPosition">Job Position:</label>
                        <input type="text" id="jobPosition" />

                        <label htmlFor="jobDescription">Job Description:</label>
                        <textarea id="jobDescription" placeholder='Let us know what this job involves' />

                        <label htmlFor="jobRequirements">Job Requirements:</label>
                        <textarea id="jobRequirements" placeholder='Let us know about the job requirements' />

                        <button type="submit">Add Job</button>
                    </form>
                </div>

                <div className="form2-container">
                    <h3>What projects are you considering?</h3>

                    <form className="form2">
                        <label htmlFor="projectName">Project Name:</label>
                        <input type="text" id="projectName" placeholder='Project name' />

                        <label htmlFor="projectLink">Project Link:</label>
                        <input type="text" id="projectLink" placeholder='Link to your project ' />

                        <label htmlFor="projectDescription">Project Description:</label>
                        <textarea id="projectDescription" placeholder='Let us know what this project is about' />

                        <label htmlFor="projectImageURL">Project Image URL:</label>
                        <input type="text" id="projectImageURL" placeholder='Link your image' />

                        <label htmlFor="completionDate">Date of Completion:</label>
                        <input type="text" id="completionDate" placeholder='dd/mm/yyyy'/>

                        <button type="submit">Add Project</button>
                    </form>
                </div>

                <div className="form3-container">
                    <form className="form3">
                        <label htmlFor="cvFile">Upload CV (PDF):</label>
                        <input type="file" id="cvFile" />

                        <button type="submit">Upload</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Home;
