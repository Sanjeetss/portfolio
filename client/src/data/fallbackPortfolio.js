const fallbackPortfolio = {
  about: {
    id: 1,
    name: "Sanjeet Sawardekar",
    title: "AI Engineer | Full Stack Developer",
    bio: "Specializing in converting research prototypes into scalable, production-grade ML and LLM solutions. Experienced in NLP, Computer Vision, model deployment, and cloud-native AI systems across AWS and GCP, with a strong focus on end-to-end ML pipelines and reusable AI components.",
  },

  projects: [
    {
      id: 1,
      title: "Face Detection Attendance System (FaceMark)",
      description:
        "Built a full-stack real-time facial recognition system for attendance tracking using deep learning models, with a team size of two.",
      tech_stack:
        "Python, Computer Vision, Deep Learning, Full-Stack Development",
      github_link: null,
      live_link: null,
    },
    {
      id: 2,
      title: "QR-based Menu Card System (MenuQRWala)",
      description:
        "Developed an interactive menu system with responsive design, enhanced with cloud-hosted AI recommendations for a smarter customer experience.",
      tech_stack: "JavaScript, HTML5, CSS3, Responsive UI, Cloud AI",
      github_link: null,
      live_link: null,
    },
    {
      id: 3,
      title: "Natural Language Processing for Crime Link Analysis",
      description:
        "Conducted NLP-based research to identify and connect crime patterns using Named Entity Recognition and relation extraction techniques.",
      tech_stack: "Python, NLTK, SpaCy, NLP, NER, Relation Extraction",
      github_link: null,
      live_link: null,
    },
    {
      id: 4,
      title: "AI/ML Virtual Internship",
      description:
        "Integrated machine learning models into React applications and optimized data visualization workflows during the Google virtual internship.",
      tech_stack: "React.js, Machine Learning, Data Visualization",
      github_link: null,
      live_link: null,
    },
    {
      id: 5,
      title: "AWS Cloud Virtual Internship",
      description:
        "Deployed full-stack AI and ML applications on AWS cloud services with a focus on scalability and performance.",
      tech_stack: "AWS, Full-Stack Development, AI/ML Deployment",
      github_link: null,
      live_link: null,
    },
  ],

  skills: {
    "AI/ML": [
      { id: 1, skillName: "TensorFlow" },
      { id: 2, skillName: "PyTorch" },
      { id: 3, skillName: "Scikit-learn" },
      { id: 4, skillName: "NLTK" },
      { id: 5, skillName: "SpaCy" },
      { id: 6, skillName: "Pandas" },
      { id: 7, skillName: "NumPy" },
      { id: 8, skillName: "NLP" },
      { id: 9, skillName: "Computer Vision" },
      { id: 10, skillName: "Deep Learning" },
      { id: 11, skillName: "Neural Networks" },
      { id: 12, skillName: "Named Entity Recognition" },
      { id: 13, skillName: "Relation Extraction" },
      { id: 14, skillName: "Model Deployment" },
    ],
    "Web Dev": [
      { id: 15, skillName: "JavaScript" },
      { id: 16, skillName: "HTML5" },
      { id: 17, skillName: "CSS3" },
      { id: 18, skillName: "React.js" },
      { id: 19, skillName: "Redux" },
      { id: 20, skillName: "Node.js" },
      { id: 21, skillName: "Express.js" },
      { id: 22, skillName: "RESTful APIs" },
    ],
    "Cloud & Tools": [
      { id: 23, skillName: "AWS Lambda" },
      { id: 24, skillName: "AWS S3" },
      { id: 25, skillName: "AWS EC2" },
      { id: 26, skillName: "AWS SageMaker" },
      { id: 27, skillName: "Google Cloud Vertex AI" },
      { id: 28, skillName: "SQL" },
      { id: 29, skillName: "Docker" },
      { id: 30, skillName: "Git" },
      { id: 31, skillName: "GitHub" },
      { id: 32, skillName: "CI/CD" },
      { id: 33, skillName: "Jupyter Notebooks" },
      { id: 34, skillName: "Data Visualization" },
    ],
  },

  experience: [
    {
      id: 1,
      role: "Full Stack Development Intern",
      company: "Seawave Forwarding and Logistics",
      duration: "Jan 2025 - Aug 2025",
      description:
        "Developed and deployed AI models integrated with backend services using Python and Node.js, built RESTful APIs for scalable ML-powered features, and implemented AWS cloud deployment for AI workloads while optimizing model serving latency.",
    },
    {
      id: 2,
      role: "Full Stack Development Intern",
      company: "Hashedbit Innovations",
      duration: "May 2024 - Sep 2024",
      description:
        "Integrated machine learning modules into React applications for real-time predictions, built reusable front-end components for ML visualization, and collaborated on NLP and Computer Vision pipelines using TensorFlow and PyTorch.",
    },
    {
      id: 3,
      role: "Trainee Python Developer",
      company: "LakshyaTech Classes",
      duration: "May 2022 - Jun 2023",
      description:
        "Engineered an in-house attendance automation solution using Python, RFID scanning, and face recognition for dual-factor identity verification, built backend services for real-time logs, and collaborated with hardware and software teams for deployment.",
    },
  ],

  education: [
    {
      id: 1,
      degree: "Master of Computer Applications (M.C.A.)",
      institution: "Pimpri Chinchwad University, Pune",
      year: "2023 - 2025",
    },
    {
      id: 2,
      degree: "B.Sc. in Physics",
      institution: "Mithibai College, Mumbai",
      year: "2019 - 2022",
    },
  ],

  contact: [
    {
      id: 1,
      type: "Email",
      value: "sanjeetss2802@gmail.com",
    },
    {
      id: 2,
      type: "Phone",
      value: "+91-8446960402",
    },
    {
      id: 3,
      type: "Location",
      value: "Navi Mumbai, Maharashtra, India",
    },
    {
      id: 4,
      type: "LinkedIn",
      value: "https://linkedin.com/in/sanjeet-sawardekar",
    },
    {
      id: 5,
      type: "GitHub",
      value: "https://github.com/Sanjeetss",
    },
  ],
};

export const normalizePortfolioData = (payload) => {
  // Transform skills array into grouped object if needed
  let normalizedSkills = payload.skills;
  if (Array.isArray(payload.skills)) {
    normalizedSkills = payload.skills.reduce((acc, skill) => {
      const category = skill.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({
        id: skill.id,
        skillName: skill.skill_name || skill.skillName,
      });
      return acc;
    }, {});
  }

  return {
    about: payload.about ?? fallbackPortfolio.about,
    projects:
      Array.isArray(payload.projects) && payload.projects.length > 0
        ? payload.projects
        : fallbackPortfolio.projects,
    skills:
      normalizedSkills && Object.keys(normalizedSkills).length > 0
        ? normalizedSkills
        : fallbackPortfolio.skills,
    experience:
      Array.isArray(payload.experience) && payload.experience.length > 0
        ? payload.experience
        : fallbackPortfolio.experience,
    education:
      Array.isArray(payload.education) && payload.education.length > 0
        ? payload.education
        : fallbackPortfolio.education,
    contact:
      Array.isArray(payload.contact) && payload.contact.length > 0
        ? payload.contact
        : fallbackPortfolio.contact,
  };
};

export default fallbackPortfolio;
