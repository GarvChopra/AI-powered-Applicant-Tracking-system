export const Job = {
  title: "",
  description: "",
  location: "",
  requiredSkills: [],
};

export const Feedback = {
  overallScore: 0,
  ATS: {
    score: 0,
    tips: [],
  },
  toneAndStyle: {
    score: 0,
    tips: [],
  },
  content: {
    score: 0,
    tips: [],
  },
  structure: {
    score: 0,
    tips: [],
  },
  skills: {
    score: 0,
    tips: [],
  },
};

export const Resume = {
  id: "",
  companyName: "",
  jobTitle: "",
  imagePath: "",
  resumePath: "",
  feedback: Feedback,
};