import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { usePuterStore } from '../lib/puter';
import Summary from '../Components/Summary';
import ATS from '../Components/ATS';
import Details from '../Components/Details';

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [feedback, setFeedback] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
        console.log("1. id:", id);
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;
      const data = JSON.parse(resume);
      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;
      const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
      const url = URL.createObjectURL(pdfBlob);
      setResumeUrl(url);
      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imgUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imgUrl);
      setFeedback(data.feedback);
      console.log({ url, imgUrl, feedback: data.feedback });
    };

    loadResume();
  }, [id]);

  return (
    <main >
      <nav className="resume-nav  bg-[url('/images/bg-small.svg')] bg-cover flex items-center justify-between p-4'">
        <Link to="/" className="back-button">
          <img src="/icons/back.svg" alt="back" className='w-2.5 h-2.5' />
          <span className='text-sm text-gray-500 font-semibold'>Back to Home</span>
        </Link>
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        {/* LEFT: Resume image */}
        <section className="feedback-section bg-cover flex h-[100vh] sticky top-0 items-center justify-center">
          {imageUrl && resumeUrl ? (
            <div className='animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] w-fit'>
              <a href={resumeUrl} target="_blank" rel="noreferrer">
                <img src={imageUrl} className='w-full h-full object-contain rounded-2xl' alt="resume" />
              </a>
            </div>
          ) : (
            <p className="text-gray-500">Loading resume...</p>
          )}
        </section>

        {/* RIGHT: Feedback */}
        <section className="feedback-section">
          <h2 className='text-4xl font-bold text-black'>Resume Review</h2>
          {feedback ? (
            <div className='flex flex-col gap-8 animate-in fade-in duration-1000'>
              <Summary feedback={feedback} />
              <ATS score={feedback?.ATS?.score || 0} suggestions={feedback?.ATS?.tips || []} />
             
              <Details feedback={feedback} />
            </div>
          ) : (
            <img src="/images/resume-scan-2.gif" className="w-full" alt="Loading..." />
          )}
        </section>
      </div>
    </main>
  )
}

export default Resume