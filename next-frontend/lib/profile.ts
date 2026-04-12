export const profile = {
  name: "Oswin Alex",
  title: "Software Engineer",
  contact: {
    phone: "+91 9324498843",
    email: "oswinalex1@gmail.com",
    github: "https://github.com/Alexoswin",
    location: "Mumbai, India",
  },
  summary: "Software Engineer specializing in AI-powered platforms, backend APIs (Node/NestJS), and full-stack development. Experienced in building scalable roleplay workflows, analytics pipelines, and contributing to open-source frameworks.",
  experience: [
    {
      company: "MIDGENIE AI LABS PRIVATE LIMITED — mple.ai",
      role: "Software Engineer",
      period: "Sept. 2025 – Present",
      location: "Mumbai, India",
      achievements: [
        "Working on mple.ai, an AI-powered sales training and agentic learning platform.",
        "Built robust error tracking mechanisms with contextual error codes, improving observability.",
        "Developed and optimized backend APIs using Node.js and NestJS for scalable roleplay workflows.",
        "Created dashboard analytics using MongoDB aggregation pipelines and charts.",
        "Implemented persona customization for dynamic control over AI avatar behavior.",
        "Optimized real-time communication using WebSockets for live AI interactions.",
      ],
    },
  ],
  openSource: [
    {
      project: "Frappe Framework",
      contribution: "OAuth2 Refresh Token Fix",
      link: "https://github.com/frappe/frappe/pull/36145",
      details: "Fixed a critical issue where OAuth2 refresh token requests returned 403 Forbidden. Implemented RFC 6749 compliant validation methods.",
    },
  ],
  education: [
    {
      institution: "Don Bosco Institute of Technology",
      degree: "Bachelor of Engineering in Information Technology",
      period: "Dec. 2021 – May 2025",
      grade: "CGPA 7.25",
      location: "Mumbai",
    },
    {
      institution: "Xavier’s Technical Institute",
      degree: "Diploma in Electronics and Telecommunication Engineering",
      period: "Sep. 2019 – Sep. 2022",
      grade: "74.03%",
      location: "Mumbai",
    },
  ],
  achievements: [
    {
      title: "Winner – Innovex 2025",
      event: "DBIT Annual Project Exhibition",
      date: "Mar. 2025",
      description: "Project: LawQuest – The School Edition. 1st place for a gamified legal awareness platform.",
    },
    {
      title: "Finalist – Yukti Startup Innovation Challenge 2024",
      event: "Startup Challenge",
      date: "Mar. 2024",
      description: "Innovation: Centralized System for De-addiction Centers.",
    },
    {
      title: "Winner – Smart India Hackathon 2023",
      event: "SIH1366",
      date: "Dec. 2023",
      description: "Udaipur. Led development of a full-stack centralized system for de-addiction centers.",
    },
  ],
  projects: [
    {
      title: "IoT Based Live Tracking",
      tech: ["ESP8266", "Neo 6M GPS", "SIM800L", "MERN Stack", "WebSockets"],
      highlights: [
        "Real-time location tracking system using ESP8266 and Neo 6M GPS module.",
        "Integrated SIM800L module to transmit live coordinates to mobile devices.",
        "Full-stack MERN application incorporating WebSockets for instantaneous location updates.",
      ],
    },
    {
      title: "AI-Based Edema Score Assessment System",
      link: "https://edema.mple.ai/",
      tech: ["Next.js", "NestJS", "MongoDB", "Tailwind CSS"],
      highlights: [
        "Web platform for edema severity assessment with automated scoring.",
        "AI-powered doctor avatar for real-time symptom guidance.",
        "AI-based report generation analyzing medical responses.",
      ],
    },
    {
      title: "Centralized De-Addiction Centers System",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "TypeScript", "Leaflet.js"],
      highlights: [
        "Streamlined operations for rehab centers with RBAC model.",
        "Interactive map integration using Leaflet.js.",
        "Secured sensitive data using Blowfish encryption.",
      ],
    },
    {
      title: "Data Analysis and Prediction on Drug Addicts",
      tech: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
      highlights: [
        "Exploratory data analysis and ML models to predict recovery duration.",
        "Identified demographic trends impacting addiction recovery.",
      ],
    },
  ],
  skills: {
    programming: ["Java", "Python", "JavaScript", "TypeScript"],
    web: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "NestJS", "WebSockets", "Bootstrap"],
    mobile: ["Flutter", "React Native"],
    iotEmbedded: ["ESP8266", "GPS Modules", "SIM800L"],
    databases: ["MySQL", "MongoDB"],
    cloudDevOps: ["AWS", "Render", "Git", "Docker", "Jenkins"],
    dataAnalysis: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Power BI"],
  },
  certifications: [
    {
      name: "AWS Academy Cloud Foundations",
      issuer: "Amazon Web Services",
      date: "Apr. 2025",
      link: "https://www.credly.com/go/gUNJh086",
      details: "Core AWS services (EC2, S3, RDS, Lambda) and cloud security best practices.",
    },
  ],
};
