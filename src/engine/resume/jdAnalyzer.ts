/* =========================================================
   JOB DESCRIPTION ANALYZER
   Toolwala Resume Engine
========================================================= */

export type JDAnalysis = {
  jobTitle: string;

  skills: string[];

  keywords: string[];

  requirements: string[];

  responsibilities: string[];

  experienceRequirements: string[];

  educationRequirements: string[];
};

/* =========================================================
   TECHNICAL SKILLS DATABASE
========================================================= */

const technicalSkills = [
  // Programming Languages
  "Java",
  "JavaScript",
  "TypeScript",
  "Python",
  "C",
  "C++",
  "C#",
  "Go",
  "Golang",
  "Rust",
  "Kotlin",
  "Swift",
  "PHP",
  "Ruby",

  // Frontend
  "HTML",
  "CSS",
  "React",
  "React.js",
  "Next.js",
  "Angular",
  "Vue",
  "Vue.js",
  "Svelte",
  "Tailwind CSS",
  "Bootstrap",

  // Backend
  "Node.js",
  "Express.js",
  "Express",
  "Spring",
  "Spring Boot",
  "Spring MVC",
  "Hibernate",
  "JPA",
  ".NET",
  "ASP.NET",
  "Django",
  "Flask",
  "FastAPI",

  // APIs
  "REST",
  "REST API",
  "REST APIs",
  "GraphQL",
  "gRPC",
  "WebSocket",
  "WebSockets",

  // Databases
  "SQL",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Oracle",
  "SQLite",
  "Cassandra",
  "DynamoDB",
  "Firebase",
  "Elasticsearch",

  // Cloud
  "AWS",
  "Amazon Web Services",
  "Azure",
  "Microsoft Azure",
  "GCP",
  "Google Cloud",
  "Google Cloud Platform",

  // DevOps
  "Docker",
  "Kubernetes",
  "Jenkins",
  "GitHub Actions",
  "GitLab CI",
  "CI/CD",
  "Terraform",
  "Ansible",
  "Linux",
  "Nginx",

  // Architecture
  "Microservices",
  "Distributed Systems",
  "System Design",
  "Event Driven Architecture",
  "Event-Driven Architecture",
  "Message Queues",

  // Messaging
  "Kafka",
  "Apache Kafka",
  "RabbitMQ",

  // Version Control
  "Git",
  "GitHub",
  "GitLab",
  "Bitbucket",

  // Testing
  "JUnit",
  "Mockito",
  "Jest",
  "Cypress",
  "Selenium",
  "Playwright",

  // AI / ML
  "Artificial Intelligence",
  "AI",
  "Machine Learning",
  "Deep Learning",
  "Generative AI",
  "GenAI",
  "RAG",
  "Retrieval Augmented Generation",
  "LLM",
  "Large Language Models",
  "TensorFlow",
  "PyTorch",
  "OpenAI",

  // Data
  "Pandas",
  "NumPy",
  "Apache Spark",
  "Hadoop",
  "Power BI",
  "Tableau",

  // Tools
  "Postman",
  "Jira",
  "Confluence",
  "Figma",
];

/* =========================================================
   IMPORTANT JOB KEYWORDS
========================================================= */

const commonKeywords = [
  "software development",
  "software engineering",
  "backend development",
  "frontend development",
  "full stack development",
  "full-stack development",
  "web development",
  "web application",
  "mobile development",

  "API development",
  "REST",
  "API",
  "microservices",
  "distributed systems",

  "database",
  "databases",
  "cloud",
  "cloud computing",
  "deployment",

  "testing",
  "unit testing",
  "integration testing",
  "debugging",

  "scalability",
  "performance",
  "optimization",
  "security",

  "agile",
  "scrum",
  "kanban",

  "problem solving",
  "problem-solving",
  "communication",
  "leadership",
  "teamwork",
  "collaboration",

  "code review",
  "clean code",
  "design patterns",

  "technical documentation",
  "documentation",

  "continuous integration",
  "continuous deployment",

  "production environment",
  "production systems",

  "data structures",
  "algorithms",

  "object oriented programming",
  "object-oriented programming",

  "version control",

  "customer facing",
  "client facing",
];

/* =========================================================
   JOB TITLE PATTERNS
========================================================= */

const jobTitlePatterns = [
  "software engineer",
  "software developer",
  "senior software engineer",
  "junior software engineer",
  "frontend developer",
  "frontend engineer",
  "backend developer",
  "backend engineer",
  "full stack developer",
  "full-stack developer",
  "full stack engineer",
  "full-stack engineer",
  "web developer",
  "mobile developer",
  "android developer",
  "ios developer",

  "java developer",
  "python developer",
  "react developer",
  "node.js developer",

  "devops engineer",
  "cloud engineer",
  "data engineer",
  "data scientist",
  "machine learning engineer",
  "ai engineer",
  "ai developer",
  "ml engineer",

  "software architect",
  "solutions architect",
  "technical lead",
  "engineering manager",

  "product engineer",
  "qa engineer",
  "test engineer",

  "database administrator",
  "database engineer",

  "security engineer",
  "cybersecurity engineer",
];

/* =========================================================
   ESCAPE REGEX CHARACTERS
========================================================= */

function escapeRegex(
  value: string
): string {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}

/* =========================================================
   CHECK WHETHER A TERM EXISTS IN TEXT
========================================================= */

function containsTerm(
  text: string,
  term: string
): boolean {
  const normalizedText =
    text.toLowerCase();

  const normalizedTerm =
    term.toLowerCase();

  /*
   Special handling for terms containing
   punctuation such as:
   Node.js
   C++
   .NET
   CI/CD
  */

  const escapedTerm =
    escapeRegex(normalizedTerm);

  const regex =
    new RegExp(
      `(^|[^a-zA-Z0-9])${escapedTerm}([^a-zA-Z0-9]|$)`,
      "i"
    );

  return regex.test(normalizedText);
}

/* =========================================================
   FIND TECHNICAL SKILLS
========================================================= */

function extractSkills(
  text: string
): string[] {
  const found: string[] = [];

  for (const skill of technicalSkills) {
    if (containsTerm(text, skill)) {
      found.push(skill);
    }
  }

  /*
   Remove duplicate concepts.

   Example:
   React
   React.js

   We keep the first detected representation.
  */

  const normalized = new Set<string>();

  return found.filter((skill) => {
    const key = skill
      .toLowerCase()
      .replace(/[.\-_/]/g, "")
      .trim();

    if (normalized.has(key)) {
      return false;
    }

    normalized.add(key);

    return true;
  });
}

/* =========================================================
   FIND IMPORTANT KEYWORDS
========================================================= */

function extractKeywords(
  text: string
): string[] {
  return commonKeywords.filter(
    (keyword) =>
      containsTerm(text, keyword)
  );
}

/* =========================================================
   EXTRACT JOB TITLE
========================================================= */

function extractJobTitle(
  text: string
): string {
  const lowerText =
    text.toLowerCase();

  /*
   First try known job titles.
  */

  for (const title of jobTitlePatterns) {
    if (
      lowerText.includes(
        title.toLowerCase()
      )
    ) {
      return title;
    }
  }

  /*
   Try lines containing:
   Position:
   Role:
   Job Title:
   Title:
  */

  const lines =
    text.split(/\n+/);

  for (const line of lines) {
    const cleanLine =
      line.trim();

    const match =
      cleanLine.match(
        /(?:job\s*title|position|role|title)\s*[:\-]\s*(.+)/i
      );

    if (match?.[1]) {
      return match[1].trim();
    }
  }

  return "";
}

/* =========================================================
   EXTRACT REQUIREMENT LINES
========================================================= */

function extractRequirements(
  text: string
): string[] {
  const lines =
    text
      .split(/\n+/)
      .map((line) =>
        line
          .replace(
            /^[-•*▪◦]\s*/,
            ""
          )
          .trim()
      )
      .filter(Boolean);

  const requirementKeywords = [
    "require",
    "required",
    "qualification",
    "qualifications",
    "must have",
    "must-have",
    "preferred",
    "experience",
    "degree",
    "bachelor",
    "master",
    "education",
    "knowledge",
    "proficient",
    "proficiency",
    "familiar",
    "familiarity",
    "years",
  ];

  const results =
    lines.filter((line) => {
      const lower =
        line.toLowerCase();

      return requirementKeywords.some(
        (keyword) =>
          lower.includes(keyword)
      );
    });

  return Array.from(
    new Set(results)
  ).slice(0, 15);
}

/* =========================================================
   EXTRACT RESPONSIBILITIES
========================================================= */

function extractResponsibilities(
  text: string
): string[] {
  const lines =
    text
      .split(/\n+/)
      .map((line) =>
        line
          .replace(
            /^[-•*▪◦]\s*/,
            ""
          )
          .trim()
      )
      .filter(Boolean);

  const responsibilityKeywords = [
    "responsibil",
    "develop",
    "design",
    "build",
    "create",
    "implement",
    "maintain",
    "manage",
    "collaborate",
    "work with",
    "lead",
    "deploy",
    "test",
    "debug",
    "optimize",
    "integrate",
    "analyze",
    "support",
    "monitor",
  ];

  const results =
    lines.filter((line) => {
      const lower =
        line.toLowerCase();

      return responsibilityKeywords.some(
        (keyword) =>
          lower.includes(keyword)
      );
    });

  return Array.from(
    new Set(results)
  ).slice(0, 15);
}

/* =========================================================
   EXPERIENCE REQUIREMENTS
========================================================= */

function extractExperienceRequirements(
  text: string
): string[] {
  const lines =
    text
      .split(/\n+/)
      .map((line) =>
        line
          .replace(
            /^[-•*▪◦]\s*/,
            ""
          )
          .trim()
      )
      .filter(Boolean);

  const experienceRegex =
    /\b\d+\+?\s*(?:-|to)?\s*\d*\s*(?:years?|yrs?)\b/i;

  const results =
    lines.filter((line) =>
      experienceRegex.test(
        line
      )
    );

  return Array.from(
    new Set(results)
  ).slice(0, 10);
}

/* =========================================================
   EDUCATION REQUIREMENTS
========================================================= */

function extractEducationRequirements(
  text: string
): string[] {
  const lines =
    text
      .split(/\n+/)
      .map((line) =>
        line
          .replace(
            /^[-•*▪◦]\s*/,
            ""
          )
          .trim()
      )
      .filter(Boolean);

  const educationKeywords = [
    "bachelor",
    "bachelor's",
    "bachelors",
    "master",
    "master's",
    "masters",
    "phd",
    "doctorate",
    "degree",
    "b.tech",
    "btech",
    "m.tech",
    "mtech",
    "b.e",
    "b.e.",
    "m.e",
    "m.e.",
    "computer science",
    "information technology",
    "engineering degree",
  ];

  const results =
    lines.filter((line) => {
      const lower =
        line.toLowerCase();

      return educationKeywords.some(
        (keyword) =>
          lower.includes(keyword)
      );
    });

  return Array.from(
    new Set(results)
  ).slice(0, 10);
}

/* =========================================================
   MAIN ANALYZER
========================================================= */

export function analyzeJobDescription(
  description: string
): JDAnalysis {
  const text =
    description.trim();

  /*
   Empty input
  */

  if (!text) {
    return {
      jobTitle: "",

      skills: [],

      keywords: [],

      requirements: [],

      responsibilities: [],

      experienceRequirements: [],

      educationRequirements: [],
    };
  }

  const skills =
    extractSkills(text);

  const keywords =
    extractKeywords(text);

  const jobTitle =
    extractJobTitle(text);

  const requirements =
    extractRequirements(text);

  const responsibilities =
    extractResponsibilities(text);

  const experienceRequirements =
    extractExperienceRequirements(
      text
    );

  const educationRequirements =
    extractEducationRequirements(
      text
    );

  return {
    jobTitle,

    skills,

    keywords,

    requirements,

    responsibilities,

    experienceRequirements,

    educationRequirements,
  };
}