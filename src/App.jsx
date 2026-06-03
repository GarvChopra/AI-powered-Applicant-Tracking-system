import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import { resumes } from "./constants";
import ResumeCard from './Components/ResumeCard';
import Auth from './routes/Auth';
import { usePuterStore } from './lib/puter';
import Upload from "./routes/Upload";

const Home = () => {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated]);

  return (
    <div className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
      <Navbar />

      <section className="main-section">
        <div className="page-heading">
          <h1>Track Your Applications & Resume Ratings</h1>
          <h2>Review Your Applications and check AI powered insights</h2>
        </div>
      </section>

      {resumes.length > 0 && (
        <div className="resume-list grid grid-cols-3 gap-6 px-10 pb-10 ml-10 mt-0">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </div>
  );
};

const App = () => {
  const { init } = usePuterStore();
    useEffect(() => {
      init();
    }, [init]);

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
  
  );
};

export default App;