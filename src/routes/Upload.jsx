import React, { useState } from 'react'
import Navbar from '../Components/Navbar'; 
import FileUploader from '../Components/FileUploader';

const Upload = () => { 
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("Analyzing your resume...");
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="bg-[url('/images/bg-main.svg')] bg-cover  h-screen flex flex-col">
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
            <h2>Drop your Resume for an Ats score and improvement tips</h2>
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
                <FileUploader />
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