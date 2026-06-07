import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import Navbar from './Components/Navbar'
import ResumeCard from './Components/ResumeCard';
import Auth from './routes/Auth';
import { usePuterStore } from './lib/puter';
import Upload from "./routes/Upload";
import Resume from './routes/resume';
import WipeApp from './routes/wipe';

const Home = () => {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    const fetchResumes = async () => {
      setLoadingResumes(true);
      const data = await kv.list('resume:*', true);
      const parsedResumes = data?.map((resume) => JSON.parse(resume.value));
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };
    fetchResumes();
  }, []);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated]);

  return (
    <div className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
      <Navbar />

      <section className="main-section">
        <div className="page-heading">
          <h1>Track Your Applications & Resume Ratings</h1>
          {!loadingResumes && resumes?.length === 0 ? (
            <h2>No resumes found. Upload a resume to get started.</h2>
          ) : (
            <h2>Review Your Applications and check AI powered insights</h2>
          )}
        </div>
      </section>

      {loadingResumes && (
        <div className="flex justify-center">
          <img src="/images/resume-scan-2.gif" className="w-[200px]" alt="Loading..." />
        </div>
      )}

      {!loadingResumes && resumes.length > 0 && (
        <div className="resume-list grid grid-cols-3 gap-6 px-10 pb-10 mt-0">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}

      {!loadingResumes && resumes.length === 0 && (
        <div className="flex flex-col justify-center items-center mt-10 gap-4">
          <Link to="/upload" className='primary-button w-fit text-xl font-semibold'>Upload resume</Link>
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
      <Route path="/resume/:id" element={<Resume />} />
      <Route path="/wipe" element={<WipeApp />} />
    </Routes>
  );
};

export default App;