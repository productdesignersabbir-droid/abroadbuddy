export type ResearchCategory =
  | "Social Sciences & Development"
  | "Public Health & Biostatistics"
  | "Data Science & Applied Statistics"
  | "Business & Economics"
  | "Environmental Science & Climate"
  | "Education Research"
  | "Psychology & Behavioral Science"
  | "Computer Science & AI"
  | "Engineering"
  | "Humanities & Public Policy";

export const RESEARCH_CATEGORIES: ResearchCategory[] = [
  "Social Sciences & Development",
  "Public Health & Biostatistics",
  "Data Science & Applied Statistics",
  "Business & Economics",
  "Environmental Science & Climate",
  "Education Research",
  "Psychology & Behavioral Science",
  "Computer Science & AI",
  "Engineering",
  "Humanities & Public Policy",
];

export type ExpertiseGroup = {
  title: string;
  items: string[];
};

export type MentoringStep = {
  step: string;
  title: string;
  description: string;
};

export type ResearchMentor = {
  id: string;
  name: string;
  title: string;
  tagline: string;
  photoSrc: string;
  photoAlt: string;
  location: string;
  yearsExperience: number;
  category: ResearchCategory;
  researchInterests: string[];
  bio: string;
  expertiseAreas: ExpertiseGroup[];
  mentoringSupport: MentoringStep[];
  achievements: string[];
  toolsSoftware: string[];
  whoCanWorkWith: string[];
  youWillLearn: string[];
  mentoringStyle: string[];
  rating: number;
  reviewCount: number;
  price: number;
  sessionDurationMinutes: number;
};

export const RESEARCH_MENTORS: ResearchMentor[] = [
  {
    id: "shahana-parvin",
    name: "Shahana Parvin",
    title: "Research Consultant · Mentor · Trainer",
    tagline: "Turning research ideas into publishable, high-quality work",
    photoSrc:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop&facepad=2",
    photoAlt: "Portrait of a smiling woman with long dark hair",
    location: "Dhaka, Bangladesh",
    yearsExperience: 7,
    category: "Social Sciences & Development",
    researchInterests: [
      "Gender & Women Empowerment",
      "Climate Change & Environment",
      "Public Health & Mental Health",
      "Disaster Risk Reduction",
      "Human Rights & Social Justice",
      "Social Policy & Community Development",
    ],
    bio: "Sociologist, researcher and trainer with 7+ years of experience in academic research, data analysis and capacity building. I help students, researchers and development professionals design rigorous studies and publish work that holds up to scrutiny.",
    expertiseAreas: [
      {
        title: "Research Design",
        items: [
          "Qualitative & quantitative design",
          "Mixed-methods studies",
          "KAP, baseline & endline surveys",
          "Action research",
        ],
      },
      {
        title: "Data Collection",
        items: [
          "Questionnaire & tool design",
          "FGDs & KIIs",
          "Structured interviews",
          "Case study protocols",
        ],
      },
      { title: "Data Analysis", items: ["SPSS", "NVivo", "KoboToolbox"] },
      {
        title: "Academic Writing",
        items: ["Research proposals", "Thesis chapters", "Journal papers", "Policy briefs"],
      },
      {
        title: "Publication Support",
        items: [
          "Literature review structuring",
          "APA referencing (Zotero/Mendeley)",
          "Journal selection & submission",
        ],
      },
    ],
    mentoringSupport: [
      { step: "01", title: "Topic selection & research gap", description: "Narrow a broad interest into a focused, answerable question." },
      { step: "02", title: "Proposal & methodology", description: "Choose a design and write a proposal that survives committee review." },
      { step: "03", title: "Tools & data collection plan", description: "Build questionnaires, interview guides and a realistic field plan." },
      { step: "04", title: "Data analysis (SPSS/NVivo)", description: "Clean, code and analyze your data with the right tool for the job." },
      { step: "05", title: "Writing & referencing", description: "Draft chapters or papers with proper structure and citations." },
      { step: "06", title: "Journal selection & publication", description: "Shortlist journals, format submissions and respond to reviewers." },
    ],
    achievements: [
      "10+ funded research projects completed",
      "15+ journal articles & conference papers published",
      "Research consultant on national and international development projects",
      "Trained 500+ students in research methodology, SPSS and thesis writing",
    ],
    toolsSoftware: ["SPSS", "Excel", "NVivo", "KoboToolbox", "Zotero", "Mendeley"],
    whoCanWorkWith: [
      "Undergraduate students",
      "Master's & PhD scholars",
      "University faculty members",
      "NGO & development professionals",
      "Independent researchers",
    ],
    youWillLearn: [
      "Research topic selection",
      "Literature review",
      "Research proposal writing",
      "Questionnaire & tool development",
      "Qualitative & quantitative research design",
      "Data collection techniques",
      "SPSS data analysis",
      "Qualitative data analysis (NVivo)",
      "Result interpretation",
      "Thesis / research paper writing",
      "Referencing with Zotero / Mendeley",
      "Journal selection & publication guidance",
    ],
    mentoringStyle: [
      "One-to-one personal mentoring",
      "Online (Google Meet / Zoom)",
      "Step-by-step guidance",
      "Paid service",
    ],
    rating: 4.9,
    reviewCount: 84,
    price: 30,
    sessionDurationMinutes: 60,
  },
  {
    id: "kamrul-hasan",
    name: "Dr. Kamrul Hasan",
    title: "Epidemiologist · Biostatistics Mentor",
    tagline: "From messy survey data to a manuscript reviewers respect",
    photoSrc:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80&auto=format&fit=crop&facepad=2",
    photoAlt: "Portrait of a man with a beard smiling",
    location: "Chattogram, Bangladesh",
    yearsExperience: 9,
    category: "Public Health & Biostatistics",
    researchInterests: [
      "Epidemiology",
      "Public Health & Mental Health",
      "Maternal & Child Health",
      "Health Systems Research",
      "Non-Communicable Diseases",
    ],
    bio: "Public health researcher with an MPH and 9 years across cohort studies, clinical epidemiology and health-systems research. I help clinicians and public health students turn raw survey or hospital data into defensible, publishable findings.",
    expertiseAreas: [
      {
        title: "Study Design",
        items: ["Cross-sectional & cohort studies", "Case-control design", "Sample size & power calculation"],
      },
      {
        title: "Data Management",
        items: ["REDCap & survey design", "Data cleaning protocols", "Ethics & IRB documentation"],
      },
      {
        title: "Biostatistics",
        items: ["STATA", "R", "Regression modelling", "Survival analysis"],
      },
      {
        title: "Manuscript Writing",
        items: ["IMRaD structure", "CONSORT/STROBE reporting", "Response-to-reviewer letters"],
      },
      {
        title: "Publication Support",
        items: ["Target journal shortlisting", "Cover letter drafting", "Peer review navigation"],
      },
    ],
    mentoringSupport: [
      { step: "01", title: "Research question & study design", description: "Pick a design that actually answers your clinical or public health question." },
      { step: "02", title: "Protocol & ethics approval", description: "Draft a protocol ready for IRB or ethics committee submission." },
      { step: "03", title: "Data collection & cleaning plan", description: "Set up REDCap or survey tools and a cleaning pipeline before you collect a single row." },
      { step: "04", title: "Statistical analysis (STATA/R)", description: "Run regression or survival models with the right checks." },
      { step: "05", title: "Manuscript drafting", description: "Write an IMRaD-structured manuscript reviewers can follow." },
      { step: "06", title: "Journal submission & revisions", description: "Target the right journal and respond to reviewer comments." },
    ],
    achievements: [
      "9+ years in clinical & public health research",
      "20+ peer-reviewed publications",
      "Reviewer for two regional public health journals",
      "Supervised 30+ MPH thesis projects",
    ],
    toolsSoftware: ["STATA", "R", "REDCap", "Excel", "EndNote"],
    whoCanWorkWith: [
      "MBBS & MPH students",
      "PhD candidates in public health",
      "Clinical researchers",
      "Hospital & NGO health programs",
    ],
    youWillLearn: [
      "Formulating a testable research question",
      "Choosing the right study design",
      "Sample size calculation",
      "Survey & data collection tools",
      "Data cleaning in Excel / STATA",
      "Regression & survival analysis",
      "Interpreting statistical output",
      "IMRaD manuscript structure",
      "STROBE / CONSORT reporting checklists",
      "Responding to peer reviewers",
    ],
    mentoringStyle: [
      "One-to-one personal mentoring",
      "Online (Google Meet / Zoom)",
      "Step-by-step guidance",
      "Paid service",
    ],
    rating: 4.8,
    reviewCount: 61,
    price: 35,
    sessionDurationMinutes: 60,
  },
  {
    id: "nabila-sultana",
    name: "Nabila Sultana",
    title: "Applied Statistician · ML Research Mentor",
    tagline: "Making your analysis reproducible, not just correct",
    photoSrc:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format&fit=crop&facepad=2",
    photoAlt: "Portrait of a woman smiling with glasses",
    location: "Dhaka, Bangladesh",
    yearsExperience: 5,
    category: "Data Science & Applied Statistics",
    researchInterests: [
      "Applied Machine Learning",
      "Survey Statistics",
      "Data Science",
      "Educational Data Mining",
      "Reproducible Research",
    ],
    bio: "PhD candidate in statistics with 5 years of experience mentoring students on quantitative and machine-learning research. I focus on getting your analysis reproducible and your results defensible under questioning.",
    expertiseAreas: [
      {
        title: "Quantitative Design",
        items: ["Hypothesis formulation", "Experimental design", "Survey sampling strategy"],
      },
      {
        title: "Data Wrangling",
        items: ["Python (pandas)", "R (tidyverse)", "Data cleaning pipelines"],
      },
      {
        title: "Modelling & Analysis",
        items: ["Regression & classification", "Time-series analysis", "Model validation"],
      },
      {
        title: "Reproducible Research",
        items: ["Git & version control", "R Markdown / Jupyter reports", "Code documentation"],
      },
      {
        title: "Publication Support",
        items: ["Results visualization", "Journal formatting", "Preprint strategy"],
      },
    ],
    mentoringSupport: [
      { step: "01", title: "Research question & hypotheses", description: "Turn a vague idea into a testable hypothesis." },
      { step: "02", title: "Data collection / sourcing plan", description: "Decide between primary collection, public datasets or APIs." },
      { step: "03", title: "Cleaning & feature preparation", description: "Build a clean, documented pipeline in Python or R." },
      { step: "04", title: "Statistical / ML modelling", description: "Fit and validate models without overfitting your story." },
      { step: "05", title: "Results visualization & writing", description: "Turn output into figures and prose a reader trusts." },
      { step: "06", title: "Journal or conference submission", description: "Format and submit to the right quantitative venue." },
    ],
    achievements: [
      "5+ years mentoring quantitative research",
      "12 papers co-authored across ML & applied statistics venues",
      "Built reproducible-research workshops for 3 universities",
      "Mentored 80+ students on thesis data analysis",
    ],
    toolsSoftware: ["Python", "R", "Jupyter", "Git", "scikit-learn"],
    whoCanWorkWith: [
      "Undergraduate & Master's students",
      "PhD scholars in quantitative fields",
      "Data-focused NGO teams",
      "Independent researchers",
    ],
    youWillLearn: [
      "Formulating testable hypotheses",
      "Sampling & survey statistics",
      "Data cleaning in Python / R",
      "Regression & classification modelling",
      "Time-series analysis basics",
      "Model validation & avoiding overfitting",
      "Reproducible reporting (Jupyter / R Markdown)",
      "Data visualization for papers",
      "Version control with Git",
      "Preparing a manuscript for submission",
    ],
    mentoringStyle: [
      "One-to-one personal mentoring",
      "Online (Google Meet / Zoom)",
      "Step-by-step guidance",
      "Paid service",
    ],
    rating: 4.9,
    reviewCount: 46,
    price: 28,
    sessionDurationMinutes: 45,
  },
  {
    id: "imtiaz-chowdhury",
    name: "Imtiaz Chowdhury",
    title: "Applied Economist · Research Mentor",
    tagline: "Econometrics that survives your viva",
    photoSrc:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&q=80&auto=format&fit=crop&facepad=2",
    photoAlt: "Portrait of a man smiling",
    location: "Dhaka, Bangladesh",
    yearsExperience: 8,
    category: "Business & Economics",
    researchInterests: [
      "Development Economics",
      "Labor Economics",
      "Trade & Finance",
      "Survey-Based Research",
      "Policy Evaluation",
    ],
    bio: "Applied economist with 8 years across development finance and academic econometrics. I mentor business and economics students through survey design, econometric modelling and thesis defense preparation.",
    expertiseAreas: [
      {
        title: "Research Design",
        items: ["Econometric model selection", "Natural experiments", "Survey & panel data design"],
      },
      {
        title: "Data Collection",
        items: ["Household & firm surveys", "Secondary data sourcing", "Questionnaire piloting"],
      },
      {
        title: "Econometrics",
        items: ["STATA", "EViews", "Panel regression", "Instrumental variables"],
      },
      { title: "Academic Writing", items: ["Thesis chapters", "Working papers", "Policy notes"] },
      {
        title: "Publication Support",
        items: ["Journal targeting", "Conference paper prep", "Defense / viva coaching"],
      },
    ],
    mentoringSupport: [
      { step: "01", title: "Research question & literature gap", description: "Find the gap your model can credibly speak to." },
      { step: "02", title: "Model & methodology", description: "Choose OLS, IV, panel or another approach and justify it." },
      { step: "03", title: "Data sourcing & survey design", description: "Source secondary data or design a household/firm survey." },
      { step: "04", title: "Econometric analysis (STATA/EViews)", description: "Run and diagnose your regressions properly." },
      { step: "05", title: "Writing & results interpretation", description: "Translate coefficients into a clear economic story." },
      { step: "06", title: "Defense prep & publication", description: "Rehearse your defense and target the right outlet." },
    ],
    achievements: [
      "8+ years in applied economics research",
      "Advised on 3 national policy evaluation projects",
      "6 working papers & journal articles published",
      "Coached 40+ students through thesis defense",
    ],
    toolsSoftware: ["STATA", "EViews", "Excel", "R"],
    whoCanWorkWith: [
      "Undergraduate & Master's students",
      "MBA & economics researchers",
      "Policy & development professionals",
      "Independent researchers",
    ],
    youWillLearn: [
      "Framing an econometric research question",
      "Choosing the right model (OLS, IV, panel)",
      "Designing household / firm surveys",
      "Sourcing and cleaning secondary data",
      "Running regressions in STATA / EViews",
      "Interpreting econometric output",
      "Structuring a thesis or working paper",
      "Preparing policy-relevant recommendations",
      "Defending your methodology in a viva",
      "Targeting the right journal or conference",
    ],
    mentoringStyle: [
      "One-to-one personal mentoring",
      "Online (Google Meet / Zoom)",
      "Step-by-step guidance",
      "Paid service",
    ],
    rating: 4.7,
    reviewCount: 52,
    price: 32,
    sessionDurationMinutes: 60,
  },
  {
    id: "tahmina-akter",
    name: "Tahmina Akter",
    title: "Climate & Environmental Researcher",
    tagline: "Fieldwork-first guidance for environmental research",
    photoSrc:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80&auto=format&fit=crop&facepad=2",
    photoAlt: "Portrait of a smiling woman outdoors",
    location: "Sylhet, Bangladesh",
    yearsExperience: 6,
    category: "Environmental Science & Climate",
    researchInterests: [
      "Climate Change Adaptation",
      "GIS & Remote Sensing",
      "Water Resource Management",
      "Disaster Risk Reduction",
      "Environmental Policy",
    ],
    bio: "Environmental researcher with 6 years of fieldwork across climate adaptation and water-resource studies. I help students design studies that survive real field conditions, not just the proposal defense.",
    expertiseAreas: [
      {
        title: "Research Design",
        items: ["Field-based study design", "Mixed-methods environmental research", "Baseline / endline monitoring"],
      },
      {
        title: "Data Collection",
        items: ["GIS mapping & remote sensing", "Household & community surveys", "Environmental sampling protocols"],
      },
      { title: "Data Analysis", items: ["QGIS", "SPSS", "R for environmental data"] },
      {
        title: "Academic Writing",
        items: ["Thesis & dissertation chapters", "Technical reports", "Grant proposals"],
      },
      {
        title: "Publication Support",
        items: ["Journal selection for environmental science", "Map & figure preparation", "Referencing"],
      },
    ],
    mentoringSupport: [
      { step: "01", title: "Research question & site selection", description: "Pick a study site and question that's actually fundable and feasible." },
      { step: "02", title: "Proposal & methodology", description: "Write a proposal grounded in field realities, not just theory." },
      { step: "03", title: "Field data collection plan", description: "Plan GIS mapping, sampling and community survey logistics." },
      { step: "04", title: "GIS & statistical analysis", description: "Analyze spatial and survey data in QGIS, SPSS or R." },
      { step: "05", title: "Writing & visualization", description: "Turn maps and numbers into a clear written narrative." },
      { step: "06", title: "Publication & grant reporting", description: "Prepare journal submissions or donor reports." },
    ],
    achievements: [
      "6+ years of applied fieldwork across coastal & climate research",
      "8 published studies on climate adaptation and water resources",
      "Consulted for 2 international climate-resilience projects",
      "Trained 200+ students in QGIS and field survey methods",
    ],
    toolsSoftware: ["QGIS", "SPSS", "R", "Google Earth Engine", "Excel"],
    whoCanWorkWith: [
      "Environmental science students",
      "Geography & GIS researchers",
      "NGO climate / disaster teams",
      "Independent researchers",
    ],
    youWillLearn: [
      "Designing a field-based research study",
      "Site & sampling selection",
      "GIS mapping and remote sensing basics",
      "Household & community survey design",
      "Environmental sampling protocols",
      "Statistical analysis of environmental data",
      "Preparing maps & figures for publication",
      "Writing technical reports and grant proposals",
      "Structuring a thesis or dissertation chapter",
      "Choosing an environmental science journal",
    ],
    mentoringStyle: [
      "One-to-one personal mentoring",
      "Online (Google Meet / Zoom)",
      "Step-by-step guidance",
      "Paid service",
    ],
    rating: 4.8,
    reviewCount: 38,
    price: 26,
    sessionDurationMinutes: 60,
  },
  {
    id: "shariful-islam",
    name: "Shariful Islam",
    title: "Education Researcher · Curriculum Mentor",
    tagline: "Classroom-grounded research, written up properly",
    photoSrc:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&q=80&auto=format&fit=crop&facepad=2",
    photoAlt: "Portrait of a man smiling",
    location: "Rajshahi, Bangladesh",
    yearsExperience: 7,
    category: "Education Research",
    researchInterests: [
      "Curriculum & Pedagogy",
      "Educational Technology",
      "Teacher Development",
      "Inclusive Education",
      "Action Research",
    ],
    bio: "Education researcher and former lecturer with 7 years of experience in curriculum studies and classroom action research. I help education students turn practical classroom questions into rigorous, publishable studies.",
    expertiseAreas: [
      {
        title: "Research Design",
        items: ["Classroom action research", "Mixed-methods education studies", "Program evaluation design"],
      },
      {
        title: "Data Collection",
        items: ["Classroom observation protocols", "Student & teacher surveys", "Focus groups with educators"],
      },
      { title: "Data Analysis", items: ["SPSS", "NVivo", "Thematic coding"] },
      {
        title: "Academic Writing",
        items: ["Thesis & dissertation writing", "Education journal articles", "Conference papers"],
      },
      {
        title: "Publication Support",
        items: ["Journal shortlisting for education research", "Literature review structuring", "Referencing"],
      },
    ],
    mentoringSupport: [
      { step: "01", title: "Research question from classroom practice", description: "Ground your question in a real teaching or learning problem." },
      { step: "02", title: "Proposal & ethics", description: "Write a proposal ready for school or university ethics review." },
      { step: "03", title: "Observation / survey tools", description: "Build observation protocols and survey instruments." },
      { step: "04", title: "Data analysis (SPSS/NVivo)", description: "Analyze quantitative scores or coded classroom data." },
      { step: "05", title: "Writing & referencing", description: "Draft chapters or articles with proper education-journal structure." },
      { step: "06", title: "Journal selection & publication", description: "Target and submit to the right education outlet." },
    ],
    achievements: [
      "7+ years in education research and teaching",
      "10+ published studies in curriculum and pedagogy",
      "Designed teacher-training modules for 2 school networks",
      "Supervised 60+ education thesis projects",
    ],
    toolsSoftware: ["SPSS", "NVivo", "Excel", "Zotero"],
    whoCanWorkWith: [
      "Education & M.Ed students",
      "PhD candidates in education",
      "School & NGO education programs",
      "Independent researchers",
    ],
    youWillLearn: [
      "Turning a classroom question into a research question",
      "Designing action research studies",
      "Classroom observation techniques",
      "Student & teacher survey design",
      "Thematic coding with NVivo",
      "SPSS analysis for education data",
      "Structuring an education thesis",
      "Academic writing for education journals",
      "Referencing with Zotero",
      "Presenting findings at education conferences",
    ],
    mentoringStyle: [
      "One-to-one personal mentoring",
      "Online (Google Meet / Zoom)",
      "Step-by-step guidance",
      "Paid service",
    ],
    rating: 4.7,
    reviewCount: 44,
    price: 24,
    sessionDurationMinutes: 45,
  },
  {
    id: "farhana-yasmin",
    name: "Farhana Yasmin",
    title: "Behavioral Researcher · Psychology Mentor",
    tagline: "Rigorous experimental design, explained simply",
    photoSrc:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80&auto=format&fit=crop&facepad=2",
    photoAlt: "Portrait of a woman smiling",
    location: "Dhaka, Bangladesh",
    yearsExperience: 6,
    category: "Psychology & Behavioral Science",
    researchInterests: [
      "Cognitive Psychology",
      "Mental Health Research",
      "Behavioral Economics",
      "Survey Experiments",
      "Clinical Psychology",
    ],
    bio: "Psychology researcher with 6 years of experience in experimental and survey-based behavioral studies. I mentor students through study design, ethical review, and statistical analysis using SPSS and Jamovi.",
    expertiseAreas: [
      {
        title: "Research Design",
        items: ["Experimental & quasi-experimental design", "Survey experiments", "Between / within-subjects design"],
      },
      {
        title: "Data Collection",
        items: ["Validated psychometric scales", "Online experiment platforms", "Ethics / IRB applications"],
      },
      { title: "Data Analysis", items: ["SPSS", "Jamovi", "ANOVA & regression"] },
      {
        title: "Academic Writing",
        items: ["APA-style manuscripts", "Thesis chapters", "Case study reports"],
      },
      {
        title: "Publication Support",
        items: ["Journal targeting in psychology", "APA referencing", "Peer review response"],
      },
    ],
    mentoringSupport: [
      { step: "01", title: "Research question & hypotheses", description: "Frame a testable psychological hypothesis." },
      { step: "02", title: "Design & ethics approval", description: "Choose experimental or survey design and get ethics sign-off." },
      { step: "03", title: "Instrument / scale selection", description: "Pick validated scales instead of building untested ones." },
      { step: "04", title: "Data analysis (SPSS/Jamovi)", description: "Run ANOVA, regression and check assumptions properly." },
      { step: "05", title: "APA writing & referencing", description: "Write up results in correct APA style." },
      { step: "06", title: "Journal selection & submission", description: "Target the right psychology journal and submit." },
    ],
    achievements: [
      "6+ years in experimental and survey-based psychology research",
      "9 peer-reviewed publications in psychology journals",
      "Ethics-board reviewer experience for student research",
      "Mentored 70+ students on thesis and dissertation data analysis",
    ],
    toolsSoftware: ["SPSS", "Jamovi", "Qualtrics", "Excel"],
    whoCanWorkWith: [
      "Psychology & counseling students",
      "PhD scholars in behavioral science",
      "Clinical & mental health researchers",
      "Independent researchers",
    ],
    youWillLearn: [
      "Formulating testable psychological hypotheses",
      "Choosing experimental vs. survey design",
      "Selecting validated psychometric scales",
      "Navigating ethics / IRB approval",
      "ANOVA & regression in SPSS / Jamovi",
      "Interpreting effect sizes",
      "APA-style manuscript writing",
      "Structuring a thesis or dissertation",
      "Responding to peer reviewers",
      "Targeting the right psychology journal",
    ],
    mentoringStyle: [
      "One-to-one personal mentoring",
      "Online (Google Meet / Zoom)",
      "Step-by-step guidance",
      "Paid service",
    ],
    rating: 4.9,
    reviewCount: 57,
    price: 27,
    sessionDurationMinutes: 60,
  },
  {
    id: "rezaul-karim",
    name: "Rezaul Karim",
    title: "CS Research Mentor · AI/ML Publications",
    tagline: "From half-finished experiments to a submittable paper",
    photoSrc:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80&auto=format&fit=crop&facepad=2",
    photoAlt: "Portrait of a man smiling",
    location: "Dhaka, Bangladesh",
    yearsExperience: 5,
    category: "Computer Science & AI",
    researchInterests: [
      "Machine Learning",
      "Natural Language Processing",
      "Computer Vision",
      "Research Reproducibility",
      "Conference Paper Writing",
    ],
    bio: "CS researcher with 5 years of experience publishing at ML and NLP venues. I help students structure experiments, write reproducible code, and turn results into a paper that survives peer review.",
    expertiseAreas: [
      {
        title: "Research Design",
        items: ["Framing a research problem", "Baseline & ablation design", "Benchmark selection"],
      },
      {
        title: "Experimentation",
        items: ["Python (PyTorch/TensorFlow)", "Experiment tracking", "Reproducible pipelines"],
      },
      {
        title: "Analysis & Evaluation",
        items: ["Statistical significance testing", "Error analysis", "Benchmark comparison"],
      },
      {
        title: "Academic Writing",
        items: ["Conference paper structure (ACL/NeurIPS-style)", "LaTeX formatting", "Related work sections"],
      },
      {
        title: "Publication Support",
        items: ["Venue selection", "Rebuttal writing", "Camera-ready prep"],
      },
    ],
    mentoringSupport: [
      { step: "01", title: "Problem framing & related work", description: "Find a novel angle and position it against prior work." },
      { step: "02", title: "Method & experiment design", description: "Design baselines and ablations before writing any code." },
      { step: "03", title: "Implementation & benchmarking", description: "Build a reproducible pipeline and run it on standard benchmarks." },
      { step: "04", title: "Results analysis & ablations", description: "Test significance and dig into failure cases." },
      { step: "05", title: "Paper writing (LaTeX)", description: "Structure and write a conference-style paper." },
      { step: "06", title: "Venue selection & rebuttal", description: "Pick a venue and respond to reviewer comments." },
    ],
    achievements: [
      "5+ years publishing in ML/NLP research",
      "7 papers at peer-reviewed conferences and workshops",
      "Built reproducible-research tooling used by 3 research groups",
      "Mentored 50+ students on their first research paper",
    ],
    toolsSoftware: ["Python", "PyTorch", "LaTeX", "Git", "Weights & Biases"],
    whoCanWorkWith: [
      "CS undergraduate & Master's students",
      "PhD scholars in AI/ML",
      "Startup R&D teams",
      "Independent researchers",
    ],
    youWillLearn: [
      "Framing a novel research problem",
      "Designing baselines and ablation studies",
      "Writing reproducible experiment code",
      "Tracking experiments properly",
      "Statistical significance testing for ML results",
      "Error analysis and failure case study",
      "Structuring a conference-style paper",
      "LaTeX formatting for CS venues",
      "Writing a strong related-work section",
      "Responding to reviewer rebuttals",
    ],
    mentoringStyle: [
      "One-to-one personal mentoring",
      "Online (Google Meet / Zoom)",
      "Step-by-step guidance",
      "Paid service",
    ],
    rating: 4.8,
    reviewCount: 41,
    price: 30,
    sessionDurationMinutes: 45,
  },
  {
    id: "ashraful-alam",
    name: "Ashraful Alam",
    title: "Engineering Research Mentor",
    tagline: "Experimental rigor for technical theses",
    photoSrc:
      "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=400&q=80&auto=format&fit=crop&facepad=2",
    photoAlt: "Portrait of a man in a casual jacket",
    location: "Khulna, Bangladesh",
    yearsExperience: 8,
    category: "Engineering",
    researchInterests: [
      "Renewable Energy Systems",
      "Materials Science",
      "Structural Engineering",
      "Simulation & Modelling",
      "Technical Report Writing",
    ],
    bio: "Engineering researcher with 8 years across experimental and simulation-based studies. I mentor engineering students on experimental design, MATLAB/simulation work, and writing technical theses that hold up under a panel's questions.",
    expertiseAreas: [
      {
        title: "Research Design",
        items: ["Experimental design for engineering theses", "Simulation study design", "Design of experiments (DOE)"],
      },
      {
        title: "Data Collection",
        items: ["Lab experiment protocols", "Sensor & instrumentation setup", "Simulation parameter selection"],
      },
      {
        title: "Analysis & Modelling",
        items: ["MATLAB", "ANSYS / simulation tools", "Statistical analysis of experimental data"],
      },
      {
        title: "Technical Writing",
        items: ["Thesis & technical report writing", "Conference paper drafting", "Figures & data presentation"],
      },
      {
        title: "Publication Support",
        items: ["Journal selection for engineering research", "Reference management", "Defense preparation"],
      },
    ],
    mentoringSupport: [
      { step: "01", title: "Problem definition & literature gap", description: "Pin down a well-scoped engineering research problem." },
      { step: "02", title: "Experimental / simulation design", description: "Design experiments or simulations with real controls." },
      { step: "03", title: "Lab work or simulation runs", description: "Set up instrumentation or run simulation batches." },
      { step: "04", title: "Data & statistical analysis", description: "Analyze results in MATLAB or your simulation tool of choice." },
      { step: "05", title: "Technical writing", description: "Write a thesis or report with clear figures and data." },
      { step: "06", title: "Defense prep & publication", description: "Rehearse your defense and prepare a conference paper." },
    ],
    achievements: [
      "8+ years in experimental and simulation-based engineering research",
      "11 technical papers and conference proceedings published",
      "Supervised 3 funded undergraduate research projects",
      "Coached 45+ students through thesis defense",
    ],
    toolsSoftware: ["MATLAB", "ANSYS", "Excel", "Origin"],
    whoCanWorkWith: [
      "Undergraduate & Master's engineering students",
      "PhD candidates in engineering fields",
      "R&D teams in industry",
      "Independent researchers",
    ],
    youWillLearn: [
      "Defining a testable engineering research problem",
      "Designing lab experiments or simulations",
      "Setting up instrumentation & data logging",
      "Statistical analysis of experimental data",
      "Using MATLAB / simulation tools effectively",
      "Presenting data with clear figures",
      "Structuring a technical thesis or report",
      "Writing a conference paper",
      "Preparing reference lists correctly",
      "Defending your methodology to a panel",
    ],
    mentoringStyle: [
      "One-to-one personal mentoring",
      "Online (Google Meet / Zoom)",
      "Step-by-step guidance",
      "Paid service",
    ],
    rating: 4.7,
    reviewCount: 35,
    price: 29,
    sessionDurationMinutes: 60,
  },
  {
    id: "mehnaz-rahman",
    name: "Mehnaz Rahman",
    title: "Policy Researcher · Qualitative Research Mentor",
    tagline: "Turning field interviews into policy-ready analysis",
    photoSrc:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80&auto=format&fit=crop&facepad=2",
    photoAlt: "Portrait of a smiling woman with short hair",
    location: "Dhaka, Bangladesh",
    yearsExperience: 6,
    category: "Humanities & Public Policy",
    researchInterests: [
      "Public Policy Analysis",
      "Governance & Institutions",
      "Discourse Analysis",
      "Migration Studies",
      "Qualitative Research Methods",
    ],
    bio: "Policy researcher with 6 years across governance studies and qualitative fieldwork. I mentor students and analysts on interview-based research, discourse analysis, and writing policy-relevant academic work.",
    expertiseAreas: [
      {
        title: "Research Design",
        items: ["Qualitative case study design", "Comparative policy analysis", "Ethnographic approaches"],
      },
      {
        title: "Data Collection",
        items: ["In-depth interviews", "Document & policy analysis", "Participant observation"],
      },
      { title: "Data Analysis", items: ["NVivo", "Thematic & discourse analysis", "Coding frameworks"] },
      {
        title: "Academic Writing",
        items: ["Thesis & dissertation writing", "Policy briefs", "Working papers"],
      },
      {
        title: "Publication Support",
        items: [
          "Journal selection for policy/humanities research",
          "Referencing (Chicago/APA)",
          "Editing for clarity",
        ],
      },
    ],
    mentoringSupport: [
      { step: "01", title: "Research question & framework", description: "Ground your question in a clear theoretical or policy framework." },
      { step: "02", title: "Proposal & fieldwork plan", description: "Plan interviews, sites and document sources." },
      { step: "03", title: "Interviews & document collection", description: "Conduct in-depth interviews and gather policy documents." },
      { step: "04", title: "Coding & discourse analysis", description: "Code transcripts and identify themes in NVivo." },
      { step: "05", title: "Writing & referencing", description: "Draft chapters with correct Chicago/APA referencing." },
      { step: "06", title: "Journal or policy-brief publication", description: "Publish as a journal article or standalone policy brief." },
    ],
    achievements: [
      "6+ years in qualitative policy research",
      "Authored 5 policy briefs used by development organizations",
      "4 peer-reviewed articles in governance & policy journals",
      "Mentored 55+ students on qualitative thesis work",
    ],
    toolsSoftware: ["NVivo", "Zotero", "Excel", "Otter.ai (interview transcription)"],
    whoCanWorkWith: [
      "Humanities & social science students",
      "Public policy & governance researchers",
      "NGO & think-tank analysts",
      "Independent researchers",
    ],
    youWillLearn: [
      "Framing a qualitative research question",
      "Designing case study or ethnographic research",
      "Conducting in-depth interviews",
      "Document & policy analysis techniques",
      "Coding with NVivo",
      "Thematic and discourse analysis",
      "Writing a qualitative thesis chapter",
      "Drafting a policy brief",
      "Referencing in Chicago / APA style",
      "Choosing the right policy or humanities journal",
    ],
    mentoringStyle: [
      "One-to-one personal mentoring",
      "Online (Google Meet / Zoom)",
      "Step-by-step guidance",
      "Paid service",
    ],
    rating: 4.8,
    reviewCount: 33,
    price: 25,
    sessionDurationMinutes: 60,
  },
];

export const RESEARCH_INTERESTS: string[] = Array.from(
  new Set(RESEARCH_MENTORS.flatMap((m) => m.researchInterests))
).sort();
