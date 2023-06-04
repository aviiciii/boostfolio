import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const Home = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [numPages, setNumPages] = useState(1);
    const [resumeText, setResumeText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handleTextExtraction = async () => {
        try {
            if (!selectedFile) {
                return;
            }

            setLoading(true);

            const fileReader = new FileReader();
            fileReader.onloadend = async () => {
                const typedArray = new Uint8Array(fileReader.result);
                try {
                    const pdf = await pdfjs.getDocument(typedArray).promise;
                    const page = await pdf.getPage(1);
                    const textContent = await page.getTextContent();
                    const extractedText = textContent.items.map((item) => item.str).join(' ');

                    setResumeText(extractedText);
                } catch (error) {
                    console.error('Error occurred while extracting resume details:', error);
                } finally {
                    setLoading(false);
                }
            };

            fileReader.readAsArrayBuffer(selectedFile);
        } catch (error) {
            console.error('Error occurred while extracting resume details:', error);
        }
    };

    useEffect(() => {
        handleTextExtraction();
    }, [selectedFile]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (resumeText) {
            try {
                setLoading(true);
                const response = await fetch('http://127.0.0.1:8000/api/resume', {
                    method: 'POST',
                    body: resumeText,
                });

                if (response.ok) {
                    console.log('Resume details submitted successfully.');
                    // Reset form fields if needed
                } else {
                    console.error('Error occurred while submitting resume details.');
                }
            } catch (error) {
                console.error('Error occurred while submitting resume details:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="home">
            <div className="container">
                <h1>Let's get improving</h1>
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
                        <input type="text" id="completionDate" placeholder='dd/mm/yyyy' />

                        <button type="submit">Add Project</button>
                    </form>
                </div>

                <div className="form3-container">
                    <form className="form3" onSubmit={handleSubmit}>
                        <label htmlFor="cvFile">Upload CV (PDF):</label>
                        <input type="file" id="cvFile" onChange={handleFileChange} />

                        <button type="submit" disabled={!selectedFile || loading}>
                            Upload
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Home;
