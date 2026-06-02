import React from "react";
import { Link } from "react-router-dom";
import ScoreCircle from "./ScoreCircle";


const ResumeCard = ({ resume }) => {
  return (
    <div>
      <Link
        to={`/resume/${resume.id}`}
        className="resume-card animate-in fade-in duration-1000"
      >
        <div className="flex flex-col gap-2 ">
          <h2 className="text-black font-bold break-after">
            {resume.companyName}
          </h2>
          <h3 className="text-gray-500 text-4xl">job: {resume.jobTitle}</h3>
          <div
          className="flex-shrink-0 flex  "
          >
            <ScoreCircle />

          </div>
        </div>
      </Link>
    </div>
  );
};

export default ResumeCard;
