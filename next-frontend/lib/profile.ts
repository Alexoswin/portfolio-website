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
        "Develop and scale backend services for mple.ai, an AI-driven sales training and agentic learning platform serving 500K+ users across realistic customer service and sales roleplay simulations.",
        "Cut REST API and MongoDB aggregation response times from 5–7 seconds to under 300 ms (95% faster) by rewriting 20+ aggregation pipelines, adding compound indexes, and root-causing production incidents end to end.",
        "Integrated LLM agents, Retrieval-Augmented Generation (RAG), and a host/worker multi-agent architecture that sustains 10K+ conversational roleplay sessions per month at sub-2 second first-response latency.",
        "Engineered a rate-limited asynchronous messaging service on AWS SQS and Redis, processing 1K+ messages/minute with queue-based concurrency caps and caching that eliminated 100% of downstream overload failures.",
        "Delivered and maintain seeedemaseekhelp.com, an AI-based edema score assessment platform.",
      ],
    },
  ],
  openSource: [
    {
      project: "Frappe Framework",
      contribution: "OAuth2 Refresh Token Fix",
      link: "https://github.com/frappe/frappe/pull/36145",
      details:
        "Resolved a defect in the Frappe Framework (8K+ star repository) where OAuth2 refresh token requests returned 403 Forbidden. Diagnosed the root cause across 2 token validation methods that loaded OAuth Bearer Token documents without ignore_permissions=True, failing under guest context. Patched validation by passing ignore_permissions=True and setting request.user = otoken.user, restoring 100% of refresh token requests to success and full OAuth2 RFC 6749 compliance, with 0 regressions across existing flows.",
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
      event: "SIH1366 — Centralized System for De-addiction Centers",
      date: "Dec. 2023",
      description:
        "Udaipur. Led a 6-member team to 1st place among 10,000+ competing teams, shipping a centralized full-stack system with real-time patient tracking and RBAC across 4 user roles in 36 hours.",
    },
  ],
  projects: [
    {
      title: "AI-Based Edema Score Assessment System",
      link: "https://edema.mple.ai/",
      tech: ["Next.js", "NestJS", "MongoDB", "Tailwind CSS"],
      highlights: [
        "Public patient self-screening web platform that scores edema risk from a structured questionnaire and returns an instant preliminary score with guidance on when to seek care.",
        "Integrated a conversational AI doctor avatar to guide patients through symptom questions in real time.",
        "Automated assessment report generation from questionnaire responses, giving patients a formatted summary of their score.",
        "Designed REST APIs for edema scoring, patient response processing, and report delivery.",
      ],
    },
    {
      title: "ReachConvert — AI-Powered Outreach Platform",
      link: "https://reachconvert.site",
      tech: [
        "Next.js",
        "NestJS",
        "MongoDB",
        "Redis",
        "AWS SES",
        "Twilio",
        "Google Gemini",
        "Tailwind CSS",
      ],
      highlights: [
        "Open-source AI-powered outreach platform combining personalized email campaigns, AI voice calling, lead management, and campaign analytics in a unified workspace.",
        "Automated AI voice agents for outbound calling and conversational lead engagement, alongside bulk email campaigns with personalized messaging and delivery tracking.",
        "Scalable full-stack architecture supporting AI agents, campaign automation, contact management, and real-time outreach tracking.",
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
    Backend: ["Node.js", "NestJS", "Express.js", "REST APIs", "WebSockets"],
    Frontend: ["Next.js", "React.js", "React Native", "React Native WebView"],
    Databases: ["MongoDB", "Redis", "PostgreSQL"],
    "AI/ML": [
      "Generative AI",
      "LLM Integration",
      "Multi-Agent Systems",
      "Retrieval-Augmented Generation (RAG)",
    ],
    "Cloud & Infra": [
      "AWS S3",
      "AWS SES",
      "AWS SQS",
      "AWS CloudFront",
      "Google Cloud Run",
      "Google Compute Engine (GCE)",
      "Google Cloud Scheduler",
    ],
    Tools: ["Docker", "Git", "GitHub", "CI/CD", "Linux"],
  },
  certifications: [
    {
      name: "AWS Academy Cloud Foundations",
      issuer: "Amazon Web Services",
      date: "Apr. 2025",
      link: "https://www.credly.com/go/gUNJh086",
      details:
        "Completed a foundational cloud program spanning 10+ core AWS services (EC2, S3, IAM, VPC, RDS, Lambda) plus cloud security, the shared responsibility model, pricing, and compliance frameworks.",
    },
  ],
};
