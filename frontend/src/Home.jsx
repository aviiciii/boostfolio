import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const Home = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [numPages, setNumPages] = useState(1);
    const [resumeText, setResumeText] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [form1Data, setForm1Data] = useState({
        companyName: '',
        jobPosition: '',
        jobDescription: '',
        jobRequirements: ''
    });
    const [form2Data, setForm2Data] = useState({
        projectName: '',
        projectLink: '',
        projectDescription: '',
        projectImageURL: '',
        completionDate: ''
    });

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevious = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleForm1Change = (event) => {
        const { id, value } = event.target;
        setForm1Data((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleForm2Change = (event) => {
        const { id, value } = event.target;
        setForm2Data((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };


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
    const renderForm1 = () => (
        <div className="form1-container">
            <h3>What jobs are you interested in today?</h3>
            <form className="form1">
                <label htmlFor="companyName">Company Name:</label>
                <input type="text" id="companyName" value={form1Data.companyName} onChange={handleForm1Change} />

                <label htmlFor="jobPosition">Job Position:</label>
                <input type="text" id="jobPosition" value={form1Data.jobPosition} onChange={handleForm1Change} />

                <label htmlFor="jobDescription">Job Description:</label>
                <textarea
                    id="jobDescription"
                    value={form1Data.jobDescription}
                    onChange={handleForm1Change}
                    placeholder="Let us know what this job involves"
                ></textarea>

                <label htmlFor="jobRequirements">Job Requirements:</label>
                <textarea
                    id="jobRequirements"
                    value={form1Data.jobRequirements}
                    onChange={handleForm1Change}
                    placeholder="Let us know about the job requirements"
                ></textarea>

                <button type="button" onClick={handleNext}>
                    Next
                </button>
            </form>
        </div>
    );

    const renderForm2 = () => (
        <div className="form2-container">
            <h3>What projects are you considering?</h3>

            <form className="form2">
                <label htmlFor="projectName">Project Name:</label>
                <input type="text" id="projectName" value={form2Data.projectName} onChange={handleForm2Change} placeholder="Project name" />

                <label htmlFor="projectLink">Project Link:</label>
                <input type="text" id="projectLink" value={form2Data.projectLink} onChange={handleForm2Change} placeholder="Link to your project" />

                <label htmlFor="projectDescription">Project Description:</label>
                <textarea
                    id="projectDescription"
                    value={form2Data.projectDescription}
                    onChange={handleForm2Change}
                    placeholder="Let us know what this project is about"
                ></textarea>
                <label htmlFor="projectImageURL">Project Image URL:</label>
                <input type="text" id="projectImageURL" value={form2Data.projectImageURL} onChange={handleForm2Change} placeholder="Link your image" />

                <label htmlFor="completionDate">Date of Completion:</label>
                <input type="text" id="completionDate" value={form2Data.completionDate} onChange={handleForm2Change} placeholder="dd/mm/yyyy" />
                <div className='buttons'>
                <button type="button" onClick={handlePrevious}>
                    Previous
                </button>
                <button type="button" onClick={handleNext}>
                    Next
                </button>
                </div>

                
            </form>
        </div>
    );

    const renderForm3 = () => (
        <div className="form3-container">
            <form className="form3" onSubmit={handleSubmit}>
                <label htmlFor="cvFile">Upload CV (PDF):</label>
                <input type="file" id="cvFile" onChange={handleFileChange} />

                <button type="submit" disabled={!selectedFile || loading}>
                    Upload
                </button>

                <button type="button" onClick={handlePrevious}>
                    Previous
                </button>
            </form>
        </div>
    );

    return (
        <div className="home">
            <div className="container">
                <h1>Let's get improving</h1>

                {currentPage === 1 && renderForm1()}
                {currentPage === 2 && renderForm2()}
                {currentPage === 3 && renderForm3()}
            </div>
        </div>
    );
};

export default Home;
