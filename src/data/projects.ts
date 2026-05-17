export interface Project {
  id: string
  name: string
  tagline: string
  description: string
  coreIdea: string
  tech: string[]
  githubUrl: string
  demoUrl: string
  /** Full-page ambient gradient when this project is active */
  ambientBg: string
}

export const projects: Project[] = [
  {
    id: '01',
    name: 'MarketSense AI',
    tagline: 'AI-powered competitor intelligence',
    description:
      'AI-powered competitor intelligence platform that transforms startup ideas into structured market research using semantic search, grounded synthesis, deterministic validation, and Pydantic-enforced outputs.',
    coreIdea:
      'Grounded competitor intelligence from unstructured web data.',
    tech: [
      'Streamlit',
      'Groq',
      'Exa',
      'Pydantic',
      'Python',
    ],
    githubUrl: 'https://github.com/sudo-Harshk/marketsense-ai',
    demoUrl: 'https://marketsense-research.streamlit.app/',
    ambientBg:
      'linear-gradient(145deg, #FAF5FF 0%, #EDE9FE 45%, #EFF6FF 100%)',
  },

  {
    id: '02',
    name: 'Triad',
    tagline: 'Evidence-grounded claim verification',
    description:
      'Multi-agent claim verification system for YouTube transcripts that extracts interpretive claims and evaluates them through a structured reasoning council with evidence-bounded verdicts and weighted confidence scoring.',
    coreIdea:
      'Evidence-bounded multi-agent reasoning with no external knowledge injection.',
    tech: [
      'Chainlit',
      'Groq',
      'Supadata',
      'Python',
      'AsyncIO',
      'Render',
    ],
    githubUrl: 'https://github.com/sudo-Harshk/triad',
    demoUrl: 'https://triad-55mk.onrender.com/',
    ambientBg:
      'linear-gradient(145deg, #EFF6FF 0%, #DBEAFE 45%, #ECFDF5 100%)',
  },

  {
    id: '03',
    name: 'TenderAI',
    tagline: 'AI-assisted tender evaluation',
    description:
      'AI-assisted government tender evaluation system that extracts structured data from bidder PDFs, applies deterministic eligibility rules, and routes uncertain cases to human procurement officers with immutable audit logging.',
    coreIdea:
      'Deterministic procurement evaluation with explainable AI-assisted extraction.',
    tech: [
      'FastAPI',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'PyMuPDF',
      'Mistral OCR',
      'Groq',
      'Pydantic',
    ],
    githubUrl: 'https://github.com/sudo-Harshk/tender-ai',
    demoUrl: 'https://neon-dodol-3d56d3.netlify.app/',
    ambientBg:
      'linear-gradient(145deg, #F0FDF4 0%, #DCFCE7 45%, #EFF6FF 100%)',
  },

  {
    id: '04',
    name: 'Codemorpher',
    tagline: 'Java-to-multi-language code translator',
    description:
      'Full-stack AI-powered code translation platform that converts Java into Python, JavaScript, C, C++, C#, and PHP with debugging guidance, algorithm explanations, OCR-based image-to-code extraction, and multi-layer syntax validation.',
    coreIdea:
      'Validated multi-language code translation with explainable outputs.',
    tech: [
      'React',
      'Vite',
      'Node.js',
      'Express',
      'Tailwind CSS',
      'SQLite',
      'OpenRouter',
      'Google Gemini',
      'tree-sitter',
      'Docker',
    ],
    githubUrl: 'https://github.com/sudo-Harshk/codemorpher',
    demoUrl: 'https://codemorpher-frontend.web.app/',
    ambientBg:
      'linear-gradient(145deg, #EEF2FF 0%, #DBEAFE 45%, #ECFEFF 100%)',
  },
]