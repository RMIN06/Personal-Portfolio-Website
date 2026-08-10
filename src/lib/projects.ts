export type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  role: string;
  summary: string;
  problem: string;
  solution: string;
  stack: string[];
  live?: string;
  github?: string;
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "barq-ai-assistant",
    title: "Barq AI Assistant",
    tagline: "Desktop AI Assistant · Python",
    year: "2026",
    role: "Full-stack Developer",
    summary:
      "A fully authoritative desktop AI assistant inspired by JARVIS, featuring voice interaction, system control, and intelligent task automation.",
    problem:
      "Existing desktop assistants lack deep system integration and contextual awareness, limiting their utility for power users and developers.",
    solution:
      "Built a modular Python-based desktop assistant with voice recognition, system-level command execution, plugin architecture, and contextual memory for autonomous task execution.",
    stack: ["Python", "PyQt6", "SpeechRecognition", "pyttsx3", "OpenAI API", "psutil", "keyboard", "mouse"],
    live: "",
    github: "https://github.com/RMIN06/barq-ai-assistant",
    accent: "#7c9bff",
  },
  {
    slug: "ai-clipping-tool-fast-whisper",
    title: "AI Clipping Tool",
    tagline: "YouTube Automation · Fast Whisper",
    year: "2026",
    role: "Full-stack Developer",
    summary:
      "An AI-powered master clipper for YouTube automation and shorts creation, leveraging fast-whisper for real-time transcription and intelligent clip detection.",
    problem:
      "Content creators spend hours manually clipping long-form videos into shorts, with existing tools lacking accuracy in highlight detection and transcription speed.",
    solution:
      "Built a Python-based clipping pipeline using faster-whisper for real-time transcription, LLM-based highlight detection, and automated vertical video formatting for YouTube Shorts/TikTok.",
    stack: ["Python", "faster-whisper", "OpenAI API", "FFmpeg", "MoviePy", "yt-dlp", "LangChain"],
    live: "",
    github: "https://github.com/RMIN06/Ai-Clipping-Tool-fast-whisper",
    accent: "#ff6b6b",
  },
  {
    slug: "sleek-solar-bot",
    title: "Sleek Solar Bot",
    tagline: "Solar Monitoring Bot · Python",
    year: "2026",
    role: "Backend Developer",
    summary:
      "A solar monitoring and automation bot for tracking solar panel performance, energy generation, and system health metrics in real-time.",
    problem:
      "Solar system owners lack accessible real-time monitoring tools with alerting capabilities for performance degradation and system issues.",
    solution:
      "Developed a Python-based monitoring bot that integrates with solar inverter APIs, provides real-time dashboard, automated alerts for anomalies, and historical performance analytics.",
    stack: ["Python", "asyncio", "aiohttp", "InfluxDB", "Grafana", "Telegram Bot API", "Schedule"],
    live: "",
    github: "https://github.com/RMIN06/sleek_solar_bot",
    accent: "#f4a261",
  },
  {
    slug: "rag-document",
    title: "RAG Document Analyzer",
    tagline: "Enterprise RAG · TypeScript",
    year: "2026",
    role: "Full-stack Developer",
    summary:
      "An enterprise-grade RAG (Retrieval-Augmented Generation) document analyzer for secure, private document querying and knowledge extraction.",
    problem:
      "Enterprises need secure document analysis without sending sensitive data to external APIs, while maintaining high retrieval accuracy and response quality.",
    solution:
      "Built a TypeScript-based RAG pipeline with local embedding models, vector database integration, hybrid search (semantic + keyword), and on-premise LLM support for complete data privacy.",
    stack: ["TypeScript", "Node.js", "LangChain", "ChromaDB", "Ollama", "HuggingFace Transformers", "Express", "PostgreSQL"],
    live: "",
    github: "https://github.com/RMIN06/RAG-Document",
    accent: "#2ecc71",
  },
  {
    slug: "automated-transit-route-monitoring",
    title: "Transit Route Monitor",
    tagline: "AI Transit Monitoring · Python",
    year: "2026",
    role: "AI/ML Engineer",
    summary:
      "AI-powered automated transit and route monitoring system with real-time tracking, route optimization, and predictive analytics for public transportation.",
    problem:
      "Transit agencies struggle with real-time route monitoring, delay prediction, and dynamic route optimization due to fragmented data sources and lack of ML infrastructure.",
    solution:
      "Built an end-to-end ML pipeline ingesting GTFS-realtime feeds, GPS data, and historical patterns to provide real-time ETAs, delay predictions, and automated route optimization recommendations.",
    stack: ["Python", "TensorFlow/Keras", "GTFS-realtime", "Pandas", "GeoPandas", "Kafka", "Redis", "FastAPI", "PostGIS"],
    live: "",
    github: "https://github.com/RMIN06/Automated-Transit-and-Route-Monitoring-Agent",
    accent: "#3498db",
  },
  {
    slug: "gmail-auto-categorizer",
    title: "Gmail Auto Categorizer",
    tagline: "Email AI Agent · Python",
    year: "2026",
    role: "AI/ML Engineer",
    summary:
      "An AI agent that automatically categorizes emails into SPAM, FYI, Urgent, and custom categories using LLMs and rule-based classification.",
    problem:
      "Email overload leads to missed important messages; existing filters are rigid and can't understand context or nuance in email content.",
    solution:
      "Developed a Gmail-integrated AI agent using LLMs for semantic email understanding, few-shot classification, user feedback loops for continuous improvement, and privacy-preserving local processing option.",
    stack: ["Python", "Gmail API", "OpenAI API", "LangChain", "ChromaDB", "OAuth2", "FastAPI", "Docker"],
    live: "",
    github: "https://github.com/RMIN06/Gmail-Auto-Catagorizer",
    accent: "#e74c3c",
  },
  {
    slug: "ai-notes-summarizer",
    title: "AI Notes Summarizer",
    tagline: "PDF Notes Summarizer · Python",
    year: "2026",
    role: "Full-stack Developer",
    summary:
      "A PDF notes summarizer that extracts, structures, and summarizes academic and professional notes using LLMs with citation tracking.",
    problem:
      "Students and professionals accumulate hundreds of pages of notes but lack tools to efficiently summarize, search, and cross-reference key concepts.",
    solution:
      "Built a PDF processing pipeline with OCR fallback, semantic chunking, LLM-based summarization with citations, concept extraction, and interactive Q&A over the knowledge base.",
    stack: ["Python", "PyMuPDF", "pdfplumber", "OpenAI API", "LangChain", "FAISS", "Streamlit", "Tesseract OCR"],
    live: "",
    github: "https://github.com/RMIN06/Ai-Notes-Summarizer",
    accent: "#9b59b6",
  },
  {
    slug: "oop-project-rpg-game",
    title: "OOP RPG Game",
    tagline: "SFML RPG Game · C++",
    year: "2025",
    role: "Game Developer",
    summary:
      "A 2D RPG game built with SFML as a 2nd semester OOP project, featuring entity-component architecture, state management, and real-time combat.",
    problem:
      "Learning game architecture patterns while building a complete, playable RPG with inventory, quests, combat, and progression systems from scratch.",
    solution:
      "Implemented a C++ RPG with Entity-Component-System architecture, finite state machines for AI, resource management, save/load system, and modular level design using SFML for graphics and audio.",
    stack: ["C++17", "SFML 2.6", "CMake", "Entity-Component-System", "State Machines", "JSON for save data"],
    live: "",
    github: "https://github.com/RMIN06/OOP-Project-RPG-Game",
    accent: "#e67e22",
  },
  {
    slug: "ai-background-remover",
    title: "AI Background Remover",
    tagline: "Offline Background Removal · Python",
    year: "2025",
    role: "ML Engineer",
    summary:
      "An offline AI-powered background remover using segmentation models, providing privacy-preserving background removal without cloud dependencies.",
    problem:
      "Existing background removal tools require uploading images to cloud services, raising privacy concerns and requiring internet connectivity.",
    solution:
      "Implemented an offline background removal tool using ONNX Runtime with U2-Net segmentation model, batch processing CLI, and simple GUI, achieving near-cloud quality fully offline.",
    stack: ["Python", "ONNX Runtime", "U2-Net", "OpenCV", "NumPy", "PyTorch (export)", "Tkinter", "Pillow"],
    live: "",
    github: "https://github.com/RMIN06/ai-background-remover",
    accent: "#1abc9c",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}