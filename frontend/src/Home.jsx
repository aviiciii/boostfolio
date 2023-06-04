import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
        // completionDate: new Date(2003, 4, 2)
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

    // const handleDateChange = (date) => {
    //     setForm2Data((prevState) => ({
    //         ...prevState,
    //         completionDate: date
    //     }));
    // };
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

    const submitforms = async (event) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/input/job', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form1Data)
            });

            if (response.ok) {
                console.log('Form data submitted successfully.');
                // Reset form fields if needed
            } else {
                console.error('Error occurred while submitting form data.');
            }
        } catch (error) {
            console.error('Error occurred while submitting form data:', error);
        }
        
    }
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
        submitforms();

    };
    const renderForm1 = () => (
        <div className="form1-container">
            <h3>What jobs are you interested in today?</h3>
            <form className="form1" action="http://127.0.0.1:8000/input/job" method="POST"
            >
                <label htmlFor="companyName">Company Name:</label>
                <input type="text" name="job_company" id="companyName" value={form1Data.companyName} onChange={handleForm1Change} />

                <label htmlFor="jobPosition">Job Position:</label>
                <input type="text" name="job_position" id="jobPosition" value={form1Data.jobPosition} onChange={handleForm1Change} />

                <label htmlFor="jobDescription">Job Description:</label>
                <textarea
                    name="job_description"
                    id="jobDescription"
                    value={form1Data.jobDescription}
                    onChange={handleForm1Change}
                    placeholder="Let us know what this job involves"
                ></textarea>

                <label htmlFor="jobRequirements">Job Requirements:</label>
                <textarea
                    id="jobRequirements"
                    value={form1Data.jobRequirements}
                    name="job_requirements"
                    onChange={handleForm1Change}
                    placeholder="Let us know about the job requirements"
                ></textarea>

                <button type="submit" onClick={handleNext}>
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
                <input type="text" name="project_name" id="projectName" value={form2Data.projectName} onChange={handleForm2Change} placeholder="Project name" />

                <label htmlFor="projectLink">Project Link:</label>
                <input type="text" id="projectLink" name='project_link' value={form2Data.projectLink} onChange={handleForm2Change} placeholder="Link to your project" />

                <label htmlFor="projectDescription">Project Description:</label>
                <textarea
                    id="projectDescription" name="project_description"
                    value={form2Data.projectDescription}
                    onChange={handleForm2Change}
                    placeholder="Let us know what this project is about"
                ></textarea>
                <label htmlFor="projectImageURL">Project Image URL:</label>
                <input type="text" id="projectImageURL" name='project_image' value={form2Data.projectImageURL} onChange={handleForm2Change} placeholder="Link your image" />

                {/* <label htmlFor="completionDate">Date of Completion:</label> */}
                {/* <DatePicker
                    id="completionDate"
                    name="project_date"
                    selected={form2Data.completionDate}
                    // onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="YYYY-MM-DD"
                /> */}
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

                {/* <button type="submit" disabled={!selectedFile || loading}>
                    Upload
                </button> */}
                <div className='buttons'>
                    <button type="button" onClick={handlePrevious}>
                        Previous
                    </button>
                    <button type="submit" disabled={!selectedFile || loading} onClick={handleSubmit}>
                        Submit
                    </button>
                </div>

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
