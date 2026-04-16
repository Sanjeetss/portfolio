USE ai_cube_portfolio;

DELETE FROM contact;
DELETE FROM education;
DELETE FROM experience;
DELETE FROM skills;
DELETE FROM projects;
DELETE FROM about;

INSERT INTO about (id, name, title, bio)
VALUES
  (
    1,
    'Sanjeet Sawardekar',
    'AI Engineer',
    'AI Engineer specializing in converting research prototypes into scalable, production-grade ML and LLM solutions. Experienced in NLP, Computer Vision, model deployment, and cloud-native AI systems across AWS and GCP, with a strong focus on end-to-end ML pipelines and reusable AI components.'
  );

INSERT INTO projects (title, description, tech_stack, github_link, live_link)
VALUES
  (
    'Face Detection Attendance System (FaceMark)',
    'Built a full-stack real-time facial recognition system for attendance tracking using deep learning models, with a team size of two.',
    'Python, Computer Vision, Deep Learning, Full-Stack Development',
    NULL,
    NULL
  ),
  (
    'QR-based Menu Card System (MenuQRWala)',
    'Developed an interactive menu system with responsive design, enhanced with cloud-hosted AI recommendations for a smarter customer experience.',
    'JavaScript, HTML5, CSS3, Responsive UI, Cloud AI',
    NULL,
    NULL
  ),
  (
    'Natural Language Processing for Crime Link Analysis',
    'Conducted NLP-based research to identify and connect crime patterns using Named Entity Recognition and relation extraction techniques.',
    'Python, NLTK, SpaCy, NLP, NER, Relation Extraction',
    NULL,
    NULL
  ),
  (
    'AI/ML Virtual Internship',
    'Integrated machine learning models into React applications and optimized data visualization workflows during the Google virtual internship.',
    'React.js, Machine Learning, Data Visualization',
    NULL,
    NULL
  ),
  (
    'AWS Cloud Virtual Internship',
    'Deployed full-stack AI and ML applications on AWS cloud services with a focus on scalability and performance.',
    'AWS, Full-Stack Development, AI/ML Deployment',
    NULL,
    NULL
  );

INSERT INTO skills (category, skill_name)
VALUES
  ('AI/ML', 'TensorFlow'),
  ('AI/ML', 'PyTorch'),
  ('AI/ML', 'Scikit-learn'),
  ('AI/ML', 'NLTK'),
  ('AI/ML', 'SpaCy'),
  ('AI/ML', 'Pandas'),
  ('AI/ML', 'NumPy'),
  ('AI/ML', 'NLP'),
  ('AI/ML', 'Computer Vision'),
  ('AI/ML', 'Deep Learning'),
  ('AI/ML', 'Neural Networks'),
  ('AI/ML', 'Named Entity Recognition'),
  ('AI/ML', 'Relation Extraction'),
  ('AI/ML', 'Model Deployment'),
  ('Web Dev', 'JavaScript'),
  ('Web Dev', 'HTML5'),
  ('Web Dev', 'CSS3'),
  ('Web Dev', 'React.js'),
  ('Web Dev', 'Redux'),
  ('Web Dev', 'Node.js'),
  ('Web Dev', 'Express.js'),
  ('Web Dev', 'RESTful APIs'),
  ('Cloud & Tools', 'AWS Lambda'),
  ('Cloud & Tools', 'AWS S3'),
  ('Cloud & Tools', 'AWS EC2'),
  ('Cloud & Tools', 'AWS SageMaker'),
  ('Cloud & Tools', 'Google Cloud Vertex AI'),
  ('Cloud & Tools', 'SQL'),
  ('Cloud & Tools', 'Docker'),
  ('Cloud & Tools', 'Git'),
  ('Cloud & Tools', 'GitHub'),
  ('Cloud & Tools', 'CI/CD'),
  ('Cloud & Tools', 'Jupyter Notebooks'),
  ('Cloud & Tools', 'Data Visualization');

INSERT INTO experience (role, company, duration, description)
VALUES
  (
    'Full Stack Development Intern',
    'Seawave Forwarding and Logistics',
    'Jan 2025 - Aug 2025',
    'Developed and deployed AI models integrated with backend services using Python and Node.js, built RESTful APIs for scalable ML-powered features, and implemented AWS cloud deployment for AI workloads while optimizing model serving latency.'
  ),
  (
    'Full Stack Development Intern',
    'Hashedbit Innovations',
    'May 2024 - Sep 2024',
    'Integrated machine learning modules into React applications for real-time predictions, built reusable front-end components for ML visualization, and collaborated on NLP and Computer Vision pipelines using TensorFlow and PyTorch.'
  ),
  (
    'Trainee Python Developer',
    'LakshyaTech Classes',
    'May 2022 - Jun 2023',
    'Engineered an in-house attendance automation solution using Python, RFID scanning, and face recognition for dual-factor identity verification, built backend services for real-time logs, and collaborated with hardware and software teams for deployment.'
  );

INSERT INTO education (degree, institution, year)
VALUES
  ('Master of Computer Applications (M.C.A.)', 'Pimpri Chinchwad University, Pune', '2023 - 2025'),
  ('B.Sc. in Physics', 'Mithibai College, Mumbai', '2019 - 2022');

INSERT INTO contact (type, value)
VALUES
  ('Email', 'sanjeetss2802@gmail.com'),
  ('Phone', '+91-8446960402'),
  ('Location', 'Navi Mumbai, Maharashtra, India'),
  ('LinkedIn', 'Sanjeet Sawardekar'),
  ('GitHub', 'Sanjeetss');
