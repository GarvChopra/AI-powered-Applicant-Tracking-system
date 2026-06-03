import React from "react";
import { Link } from "react-router-dom";
import ScoreCircle from "./ScoreCircle";

const ResumeCard = ({ resume }) => {
  return (
    <div className="mb-3 p-3 ">
      <Link
        to={`/resume/${resume.id}`}
        className="resume-card animate-in fade-in duration-1000"
      >
        <div className="resume-card-header  ">
          <div className="flex justify-between items-start flex-col gap-2 ">
            <h2 className="text-black font-bold break-after">
              {resume.companyName}
            </h2>
            <h3 className="text-gray-500 text-4xl">JOB: {resume.jobTitle}</h3>
          </div>
          <div className="flex-shrink-0 flex  ">
            <ScoreCircle score={resume.feedback.overallScore} />
          </div>
        </div>
        <div className="gradient-border animate-in fade-in duration-1000 p-2">
          <div className="resume-card-body">
            <img
              src={resume.imagePath}
              alt="resume"
              className="w-full h-[350px] max-sm:h-[200px] object-cover rounded-md"
             
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ResumeCard;
