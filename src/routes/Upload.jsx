import React, { useState } from 'react'
import Navbar from '../Components/Navbar'; 
import FileUploader from '../Components/FileUploader';
import { usePuterStore } from '../lib/puter';        
import { useNavigate } from 'react-router-dom';
import { convertPdfToImage } from '../lib/pdf2img';   
import { prepareInstructions } from '../Constants';     
import { generateUUID } from '../lib/utils'; 

const Upload = () => { 
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("Analyzing your resume...");
  const [file, setFile] = useState(null);

  const handleFileSelect = (file) => {
    setFile(file);
  }

  const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }) => {
    setIsProcessing(true);
    setStatusText("Uploading file...");
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusText("Failed to upload resume.");

    setStatusText("Processing image...");
    let imageFile;
    if (file.type === 'application/pdf') {
      const result = await convertPdfToImage(file);
      if (!result.file) return setStatusText("Error: " + result.error);
      imageFile = result.file;
    } else {
      imageFile = file;
    }

    setStatusText("Uploading image...");
    const uploadedImage = await fs.upload([imageFile]);
    if (!uploadedImage) return setStatusText("Failed to upload image.");

    setStatusText("Saving data...");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
    }
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Analyzing...");
    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription })
    )
    if (!feedback) return setStatusText("Failed to get feedback.");

    const feedbackText = typeof feedback.message.content === 'string'
      ? feedback.message.content
      : feedback.message.content[0].text;

    try {
      data.feedback = JSON.parse(feedbackText);
    } catch (err) {
      console.error("Failed to parse feedback:", feedbackText);
      return setStatusText("Failed to parse AI feedback. Please try again.");
    }

    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Feedback received! Redirecting...");
    console.log(data);
    navigate(`/resume/${uuid}`);
  }

  const handleSubmit = (e) => {
    e.preventDefault();                               
    const form = e.currentTarget;
    const formData = new FormData(form);
    const companyName = formData.get('company-name');
    const jobTitle = formData.get('job-title');
    const jobDescription = formData.get('job-description');
    if (!file) return alert("Please upload your resume");
    handleAnalyze({ companyName, jobTitle, jobDescription, file }); 
  }

  return (
    <div className="bg-[url('/images/bg-main.svg')] bg-cover h-screen flex flex-col">
      <Navbar />
      <section className="main-section flex-1 overflow-auto">
        <div className="page-heading">
          <h1>Smart Feedback for your Dream Job</h1>
          <h2>Get AI-Powered Insights on Your Resume</h2>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" className="w-full" alt="Processing..." />
            </>
          ) : (
            <h2>Drop your Resume for an ATS score and improvement tips</h2>
          )}

          {!isProcessing && (
            <form id="upload-form" className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input type="text" id="company-name" name="company-name" required />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input type="text" id="job-title" name="job-title" required />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea id="job-description" name="job-description" required />
              </div>
              <div className="form-div">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>
              <button className="primary-button" type="submit">Analyze Resume</button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}

export default Upload