import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ScoreCircle from "./ScoreCircle";
import { usePuterStore } from "../lib/puter";

const ResumeCard = ({ resume }) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(resume.imagePath);
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      setResumeUrl(url);
    }
    loadResume();
  }, [resume.imagePath]);

  const { companyName, jobTitle } = resume;

  return (
    <div className="mb-3 p-3">
      <Link
        to={`/resume/${resume.id}`}
        className="resume-card animate-in fade-in duration-1000"
      >
        <div className="resume-card-header">
          <div className="flex justify-between items-start flex-col gap-2">
            {companyName && <h2 className="text-black font-bold">{companyName}</h2>}
            {jobTitle && <h3 className="text-gray-500 text-sm">JOB: {jobTitle}</h3>}
            {!companyName && !jobTitle && <h2 className="text-black font-bold text-sm">Resume</h2>}
          </div>
          <div className="flex-shrink-0 flex">
            <ScoreCircle score={resume.feedback?.overallScore || 0} />
          </div>
        </div>
        {resumeUrl && (
          <div className="gradient-border animate-in fade-in duration-1000 p-2">
            <img
              src={resumeUrl}
              alt="resume"
              className="w-full h-[350px] max-sm:h-[200px] object-cover rounded-md"
            />
          </div>
        )}
      </Link>
    </div>
  );
};

export default ResumeCard;