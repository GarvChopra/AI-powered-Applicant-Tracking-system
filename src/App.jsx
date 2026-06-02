import React from 'react'
import Navbar from './Components/Navbar'
import { resumes } from "./constants";
import ResumeCard from './Components/ResumeCard';

const App = () => {
  return (
    <>
      <div className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
        <Navbar />

        <section className="main-section">
          <div className="page-heading">
            <h1>Track Your Applications & Resume Ratings</h1>
            <h2>Review Your Applications and check AI powered insights</h2>
          </div>
        </section>

        {resumes.length > 0 && (
          <div className="resume-list">
            {resumes.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      
        
      </div>
      )}
        
         
      </div>

     
    </>
  );
};

export default App;