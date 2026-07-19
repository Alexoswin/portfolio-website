export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
}

export interface OpenSourceEntry {
  project: string;
  contribution: string;
  link: string;
  details: string;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  grade: string;
  location: string;
}

export interface AchievementEntry {
  title: string;
  event: string;
  date: string;
  description: string;
}

export interface ProjectEntry {
  title: string;
  link?: string;
  tech: string[];
  highlights: string[];
}

export interface CertificationEntry {
  name: string;
  issuer: string;
  date: string;
  link: string;
  details: string;
}

export interface Profile {
  name: string;
  title: string;
  /** Rotating role titles shown in the hero eyebrow. */
  roles: string[];
  contact: {
    phone: string;
    email: string;
    github: string;
    githubHandle: string;
    linkedin: string;
    linkedinHandle: string;
    location: string;
    resume: string;
  };
  summary: string;
  experience: ExperienceEntry[];
  openSource: OpenSourceEntry[];
  education: EducationEntry[];
  achievements: AchievementEntry[];
  projects: ProjectEntry[];
  skills: Record<string, string[]>;
  certifications: CertificationEntry[];
}

export const profile: Profile = {
  name: "Oswin Alex",
  title: "Software Engineer",
  roles: [
    "Software Engineer",
    "Full-Stack Developer",
    "Backend Engineer",
    "Open Source Contributor",
  ],
  contact: {
    phone: "+91 9324498843",
    email: "oswinalex1@gmail.com",
    github: "https://github.com/Alexoswin",
    githubHandle: "Alexoswin",
    linkedin: "https://www.linkedin.com/in/oswin-alex-727773260/",
    linkedinHandle: "oswin-alex",
    location: "Mumbai, India",
    resume: "/constants/Oswin_Alex_Resume.pdf",
  },
  summary:
    "Software Engineer at mple.ai building AI-powered sales training and agentic learning platforms — working across NestJS APIs, MongoDB aggregation pipelines, real-time WebSockets, and React/Next.js frontends, with a focus on performance, observability, and shipping features end to end.",
  experience: [
    {
      company: "MIDGENIE AI LABS PRIVATE LIMITED — mple.ai",
      role: "Software Engineer",
      period: "Sept. 2025 – Present",
      location: "Mumbai, India",
      achievements: [
        "Building mple.ai, an AI-powered sales training and agentic learning platform delivering realistic customer service and sales roleplay simulations.",
        "Built robust error tracking with contextual error codes, improving observability and cutting time-to-resolution for production issues.",
        "Optimized backend APIs and MongoDB aggregation pipelines in Node.js/NestJS, improving query performance and reducing response latency across core services.",
        "Shipped dashboard analytics with MongoDB aggregations and charts, surfacing user engagement, roleplay performance, and system health.",
        "Implemented persona customization, enabling dynamic control over AI avatar behavior, tone, and background across training scenarios.",
        "Improved reliability and synchronization of live AI avatar interactions over WebSockets.",
        "Delivered product features end to end — from requirements to deployment — across React.js frontends and backend services.",
      ],
    },
  ],
  openSource: [
    {
      project: "Frappe Framework",
      contribution: "OAuth2 Refresh Token Fix",
      link: "https://github.com/frappe/frappe/pull/36145",
      details:
        "Fixed a critical issue where OAuth2 refresh token requests returned 403 Forbidden. Implemented RFC 6749 compliant validation methods.",
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
      description:
        "Project: LawQuest – The School Edition. 1st place for a gamified legal awareness platform.",
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
      description:
        "Udaipur. Led development of a full-stack centralized system for de-addiction centers.",
    },
  ],
  projects: [
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
      title: "OutReach — AI-Powered Signal-Based Outreach Platform",
      tech: [
        "Next.js",
        "NestJS",
        "MongoDB",
        "Redis",
        "Twilio",
        "Google Gemini",
        "AWS SES",
      ],
      highlights: [
        "Full-stack outreach workspace managing contacts, personalized email campaigns, and AI voice calling campaigns.",
        "NestJS backend with modules for auth, contacts, templates, email campaigns, calling bots, signals, and a campaign scheduler.",
        "Bulk email sender for high-volume, templated, personalized dispatch with delivery tracking and provider failover over AWS SES.",
      ],
    },
    {
      title: "Centralized De-Addiction Centers System",
      tech: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "TypeScript",
        "Leaflet.js",
      ],
      highlights: [
        "Streamlined operations for rehab centers with RBAC model.",
        "Interactive map integration using Leaflet.js.",
        "Secured sensitive data using Blowfish encryption.",
      ],
    },
  ],
  skills: {
    Languages: ["TypeScript", "JavaScript", "Python"],
    Backend: ["Node.js", "NestJS", "Express.js", "WebSockets"],
    Frontend: ["Next.js", "React.js", "React Native", "Tailwind CSS", "WebView"],
    Databases: ["MongoDB", "Redis"],
    "Cloud & Infra": [
      "AWS S3",
      "AWS SES",
      "AWS CloudFront",
      "Google Cloud Run",
      "Google Cloud VM",
      "Google Cloud Scheduler",
    ],
  },
  certifications: [
    {
      name: "AWS Academy Cloud Foundations",
      issuer: "Amazon Web Services",
      date: "Apr. 2025",
      link: "https://www.credly.com/go/gUNJh086",
      details:
        "Core AWS services (EC2, S3, RDS, Lambda) and cloud security best practices.",
    },
  ],
};
