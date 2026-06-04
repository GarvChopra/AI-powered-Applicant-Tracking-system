import React, { useState } from 'react'
import Navbar from '../Components/Navbar'; 
import FileUploader from '../Components/FileUploader';
import { usePuterStore } from '../lib/puter';        
import { useNavigate } from 'react-router-dom';
import { convertPdfToImage } from '../lib/pdf2img';   
import { prepareInstructions } from '../constants';      
import { genrateUUID } from '../lib/utils';

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
    setStatusText("Analyzing your resume...");
    const uploadedFile = await fs.upload([file]);

    if (!uploadedFile) return setStatusText("Failed to upload resume. Please try again.");

    setStatusText("Generating insights...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file) return setStatusText("Error: " + imageFile.error);

    setStatusText("uploading image...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText("Failed to upload resume image. Please try again.");

    setStatusText("Saving data...");

    const uuid=genrateUUID();
    const data= {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      
    }
    await kv.set(uuid, JSON.stringify(data));
    setStatusText("Analysis complete!");
    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({jobTitle, jobDescription})
    )
    if(!feedback) return setStatusText("Failed to get feedback. Please try again.");

    const feedbackText = typeof feedback.message.content === 'string'
    ? feedback.message.content
    : feedback.message.content[0].text; 

  data.feedback = JSON.parse(feedbackText);
  await kv.set(`${uuid}-feedback`, JSON.stringify(data));
  setStatusText("Feedback received! Redirecting...");
  console.log(data);
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