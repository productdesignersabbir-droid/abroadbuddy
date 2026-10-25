// Extra sample lab profiles for the demo, built from per-field topics so the
// directory covers every field and most universities. Names, scores and reviews
// are placeholders, like the hand-written profiles in labs.ts.
import type { Accepting, Lab, Position } from "@/data/labs";
import { UNIVERSITIES, type Country, type Major } from "@/data/universities";

type Topic = {
  lab: string;
  dept: string;
  areas: [string, string, string];
  pubs: [string, string][];
  reqs: [string, string, string];
};

const TOPICS: Record<Major, Topic[]> = {
  "Computer Science": [
    { lab: "Distributed Systems Lab", dept: "Computer Science", areas: ["Cloud systems", "Consensus protocols", "Serverless computing"], pubs: [["Cutting tail latency in serverless platforms", "OSDI"], ["Fast consensus for geo-distributed databases", "NSDI"], ["Energy-aware scheduling in data centres", "EuroSys"]], reqs: ["Strong C++, Go or Rust", "Operating systems and networking coursework", "A systems project on GitHub"] },
    { lab: "Programming Languages Group", dept: "Computer Science", areas: ["Compilers", "Program verification", "Type systems"], pubs: [["Verified compilation for smart contracts", "PLDI"], ["Gradual typing at scale", "POPL"], ["Finding bugs with symbolic execution", "OOPSLA"]], reqs: ["Functional programming experience", "Discrete maths and logic", "Compiler or interpreter project"] },
    { lab: "Human-Computer Interaction Lab", dept: "Computer Science", areas: ["Accessible computing", "Mobile interaction", "ICT for development"], pubs: [["Voice interfaces for low-literacy users", "CHI"], ["Designing mobile money apps for first-time users", "CSCW"], ["Screen reader use in Bangla", "ASSETS"]], reqs: ["Web or mobile development", "Interest in user studies", "Good writing in English"] },
    { lab: "Theory and Algorithms Group", dept: "Computer Science", areas: ["Graph algorithms", "Approximation algorithms", "Online algorithms"], pubs: [["Near-linear time max-flow in practice", "SODA"], ["Online matching with predictions", "STOC"], ["Faster shortest paths in dynamic graphs", "FOCS"]], reqs: ["Strong maths background", "Algorithms coursework with top grades", "Competitive programming is a plus"] },
  ],
  "Data Science": [
    { lab: "Statistical Learning Lab", dept: "Statistics & Data Science", areas: ["Causal inference", "Bayesian methods", "Uncertainty quantification"], pubs: [["Causal effects from observational health records", "JASA"], ["Scalable Bayesian inference for large datasets", "AISTATS"], ["Conformal prediction under distribution shift", "ICML"]], reqs: ["Probability and statistics", "Python or R", "Linear algebra"] },
    { lab: "Urban Data Lab", dept: "Data Science Institute", areas: ["Mobility data", "Remote sensing", "Smart cities"], pubs: [["Mapping informal settlements from satellite images", "KDD"], ["Predicting traffic jams in megacities", "WWW"], ["Mobile phone data for disaster response", "Nature Communications"]], reqs: ["Python and SQL", "Some GIS or geospatial work", "A data project with real-world data"] },
    { lab: "Health Data Science Group", dept: "Data Science", areas: ["Clinical prediction", "Electronic health records", "Fairness in ML"], pubs: [["Early warning scores from hospital records", "Lancet Digital Health"], ["Fair risk models across patient groups", "FAccT"], ["Federated learning across hospitals", "NeurIPS"]], reqs: ["Python and machine learning", "Statistics coursework", "Interest in health data"] },
  ],
  "Artificial Intelligence": [
    { lab: "Natural Language Processing Lab", dept: "Computer Science", areas: ["Large language models", "Low-resource languages", "Multilingual NLP"], pubs: [["Instruction-tuning for low-resource languages", "ACL"], ["Benchmarks for Bangla reasoning", "EMNLP"], ["Evaluating factuality in long answers", "NAACL"]], reqs: ["PyTorch and transformers", "Machine learning coursework", "An NLP project or paper"] },
    { lab: "Computer Vision Lab", dept: "Electrical & Computer Engineering", areas: ["3D vision", "Video understanding", "Self-supervised learning"], pubs: [["Self-supervised video representations", "CVPR"], ["Reconstructing 3D scenes from phone videos", "ICCV"], ["Robust detection in bad weather", "ECCV"]], reqs: ["Deep learning with PyTorch", "Linear algebra and calculus", "A vision project with results"] },
    { lab: "Trustworthy AI Group", dept: "Computer Science", areas: ["AI safety", "Interpretability", "Robustness"], pubs: [["Finding circuits in language models", "ICLR"], ["Certified robustness for image models", "NeurIPS"], ["Auditing bias in hiring algorithms", "AIES"]], reqs: ["Strong maths and ML", "Python", "Curiosity about how models fail"] },
    { lab: "Reinforcement Learning Lab", dept: "Computing Science", areas: ["Reinforcement learning", "Planning", "Multi-agent systems"], pubs: [["Sample-efficient RL with world models", "ICML"], ["Cooperative agents for traffic control", "AAMAS"], ["Offline RL for healthcare decisions", "NeurIPS"]], reqs: ["Probability and optimisation", "PyTorch or JAX", "An RL or robotics project"] },
  ],
  Cybersecurity: [
    { lab: "Systems Security Lab", dept: "Computer Science", areas: ["Software security", "Fuzzing", "Memory safety"], pubs: [["Fuzzing embedded firmware at scale", "USENIX Security"], ["Finding memory bugs in Rust unsafe code", "IEEE S&P"], ["Kernel hardening with low overhead", "CCS"]], reqs: ["C and assembly", "Operating systems", "CTF experience is a plus"] },
    { lab: "Network Security Group", dept: "Electrical & Computer Engineering", areas: ["Intrusion detection", "5G security", "IoT security"], pubs: [["Detecting botnets in encrypted traffic", "NDSS"], ["Attacks on 5G core networks", "CCS"], ["Securing smart home devices", "USENIX Security"]], reqs: ["Networking coursework", "Python and Linux", "Packet analysis tools like Wireshark"] },
    { lab: "Applied Cryptography Lab", dept: "Computer Science", areas: ["Post-quantum cryptography", "Privacy", "Zero-knowledge proofs"], pubs: [["Fast post-quantum signatures on phones", "CRYPTO"], ["Private contact discovery", "PETS"], ["Zero-knowledge proofs for identity", "Eurocrypt"]], reqs: ["Number theory and algebra", "Programming in C or Rust", "Cryptography coursework"] },
  ],
  "Electrical Engineering": [
    { lab: "Power Electronics Lab", dept: "Electrical Engineering", areas: ["Power converters", "EV charging", "Wide-bandgap devices"], pubs: [["A 98% efficient GaN converter for EV chargers", "IEEE Trans. Power Electronics"], ["Grid-forming inverters for weak grids", "IEEE ECCE"], ["Fast charging with battery health in mind", "APEC"]], reqs: ["Circuits and power electronics coursework", "MATLAB/Simulink or PLECS", "Hands-on hardware experience"] },
    { lab: "Wireless Communications Lab", dept: "Electrical & Computer Engineering", areas: ["6G networks", "Massive MIMO", "Signal processing"], pubs: [["Reconfigurable surfaces for 6G coverage", "IEEE JSAC"], ["Learning-based channel estimation", "IEEE ICC"], ["Low-cost satellite internet links", "IEEE GLOBECOM"]], reqs: ["Signals and systems", "Communication theory", "MATLAB or Python"] },
    { lab: "Integrated Circuits Lab", dept: "Electrical Engineering", areas: ["Analog IC design", "Low-power sensors", "RF circuits"], pubs: [["A sub-microwatt wake-up receiver", "ISSCC"], ["Low-noise amplifiers for biomedical sensing", "IEEE JSSC"], ["Energy harvesting for IoT nodes", "CICC"]], reqs: ["VLSI or analog design coursework", "Cadence Virtuoso", "Strong undergraduate thesis"] },
    { lab: "Smart Grid Lab", dept: "Electrical Engineering", areas: ["Power systems", "Microgrids", "Demand response"], pubs: [["Solar home systems as a virtual power plant", "IEEE Trans. Smart Grid"], ["Stability of low-inertia grids", "IEEE PES GM"], ["Peer-to-peer energy trading", "Applied Energy"]], reqs: ["Power systems coursework", "MATLAB or PowerFactory", "Python is a plus"] },
  ],
  "Mechanical Engineering": [
    { lab: "Robotics and Control Lab", dept: "Mechanical Engineering", areas: ["Legged robots", "Control theory", "Soft robotics"], pubs: [["Robust walking on rough terrain", "ICRA"], ["Soft grippers for fragile food items", "IROS"], ["Learning controllers from simulation", "RSS"]], reqs: ["Dynamics and control", "ROS and C++ or Python", "A robotics competition or project"] },
    { lab: "Thermal Fluids Lab", dept: "Mechanical Engineering", areas: ["Heat transfer", "CFD", "Cooling of electronics"], pubs: [["Two-phase cooling for AI chips", "Int. J. Heat and Mass Transfer"], ["CFD of urban heat islands", "Building and Environment"], ["Passive cooling for hot climates", "Applied Thermal Engineering"]], reqs: ["Thermodynamics and fluid mechanics", "ANSYS Fluent or OpenFOAM", "Experimental lab work"] },
    { lab: "Advanced Manufacturing Lab", dept: "Mechanical & Manufacturing Engineering", areas: ["3D printing", "Digital twins", "Composites"], pubs: [["Defect detection in metal 3D printing", "Additive Manufacturing"], ["Digital twins for garment factories", "J. Manufacturing Systems"], ["Recycled carbon-fibre composites", "Composites Part B"]], reqs: ["Manufacturing processes", "CAD and FEA", "Industry internship is a plus"] },
  ],
  "Civil Engineering": [
    { lab: "Structural Resilience Lab", dept: "Civil Engineering", areas: ["Earthquake engineering", "Structural health monitoring", "Bridges"], pubs: [["Low-cost seismic retrofits for masonry buildings", "Earthquake Engineering & Structural Dynamics"], ["Drone inspection of bridges", "Automation in Construction"], ["Sensors for building damage after quakes", "Structural Control and Health Monitoring"]], reqs: ["Structural analysis and design", "ETABS, SAP2000 or OpenSees", "Strong maths"] },
    { lab: "Water Resources Lab", dept: "Civil & Environmental Engineering", areas: ["Hydrology", "River engineering", "Flood forecasting"], pubs: [["Flood forecasting for large deltas", "Journal of Hydrology"], ["Riverbank erosion under climate change", "Water Resources Research"], ["Machine learning for rainfall-runoff", "HESS"]], reqs: ["Hydraulics and hydrology", "HEC-RAS, SWAT or MIKE", "Python or MATLAB"] },
    { lab: "Transportation Systems Lab", dept: "Civil Engineering", areas: ["Traffic modelling", "Public transport", "Road safety"], pubs: [["Bus rapid transit in dense cities", "Transportation Research Part A"], ["Crash prediction from video", "Accident Analysis & Prevention"], ["Ride-hailing and congestion", "Transportation Research Part C"]], reqs: ["Transport engineering coursework", "Statistics", "VISSIM, SUMO or Python"] },
    { lab: "Geotechnical Engineering Lab", dept: "Civil Engineering", areas: ["Soft soils", "Ground improvement", "Landslides"], pubs: [["Building on soft delta clay", "Géotechnique"], ["Rainfall-triggered landslides in hill tracts", "Landslides"], ["Bio-cementation for ground improvement", "J. Geotech. Geoenviron. Eng."]], reqs: ["Soil mechanics and foundations", "PLAXIS or similar", "Lab testing experience"] },
  ],
  "Chemical Engineering": [
    { lab: "Catalysis and Reaction Engineering Lab", dept: "Chemical Engineering", areas: ["Green hydrogen", "Catalysis", "CO2 conversion"], pubs: [["Cheap catalysts for water splitting", "ACS Catalysis"], ["Turning CO2 into methanol", "Nature Catalysis"], ["Ammonia as a hydrogen carrier", "Energy & Environmental Science"]], reqs: ["Reaction engineering and thermodynamics", "Wet-lab experience", "Aspen Plus is a plus"] },
    { lab: "Process Systems Engineering Lab", dept: "Chemical & Biomolecular Engineering", areas: ["Process optimisation", "Process control", "Life-cycle assessment"], pubs: [["Optimising fertiliser plants for lower emissions", "Computers & Chemical Engineering"], ["Machine learning for process control", "AIChE Journal"], ["Life-cycle costs of green ammonia", "Industrial & Engineering Chemistry Research"]], reqs: ["Process design", "Aspen, GAMS or Python", "Optimisation coursework"] },
    { lab: "Membrane Separations Lab", dept: "Chemical Engineering", areas: ["Membranes", "Desalination", "Water treatment"], pubs: [["Fouling-resistant membranes for textile wastewater", "Journal of Membrane Science"], ["Low-energy desalination", "Desalination"], ["Removing arsenic from groundwater", "Water Research"]], reqs: ["Mass transfer", "Lab experience in materials", "Strong undergraduate grades"] },
  ],
  "Biomedical Engineering": [
    { lab: "Medical Imaging Lab", dept: "Biomedical Engineering", areas: ["MRI reconstruction", "Deep learning for imaging", "Ultrasound"], pubs: [["Faster MRI scans with deep learning", "IEEE Trans. Medical Imaging"], ["Portable ultrasound for rural clinics", "MICCAI"], ["Segmenting tumours with little data", "Medical Image Analysis"]], reqs: ["Signal processing", "Python and PyTorch", "Some biology or physiology"] },
    { lab: "Biomaterials and Tissue Engineering Lab", dept: "Biomedical Engineering", areas: ["Tissue engineering", "Biomaterials", "Drug delivery"], pubs: [["Hydrogels that heal diabetic wounds", "Biomaterials"], ["3D-printed bone scaffolds", "Acta Biomaterialia"], ["Nanoparticles for targeted drug delivery", "Advanced Materials"]], reqs: ["Biology and chemistry lab skills", "Cell culture experience", "Materials science coursework"] },
    { lab: "Wearable Health Lab", dept: "Electrical & Biomedical Engineering", areas: ["Wearable sensors", "Digital health", "Biosignal processing"], pubs: [["Smartwatch screening for heart rhythm problems", "npj Digital Medicine"], ["Sweat sensors for dehydration", "Science Advances"], ["Low-cost ECG patches", "IEEE EMBC"]], reqs: ["Embedded systems or signal processing", "Python or MATLAB", "Hardware prototyping"] },
  ],
  Architecture: [
    { lab: "Sustainable Design Lab", dept: "School of Architecture", areas: ["Climate-responsive design", "Building energy", "Daylighting"], pubs: [["Passive cooling in tropical housing", "Building and Environment"], ["Daylight and productivity in classrooms", "Energy and Buildings"], ["Net-zero retrofits for apartments", "Building Research & Information"]], reqs: ["Portfolio of design work", "Rhino, Revit or Grasshopper", "Energy simulation is a plus"] },
    { lab: "Urban Futures Lab", dept: "Architecture & Urban Planning", areas: ["Informal settlements", "Urban design", "Housing policy"], pubs: [["Upgrading informal settlements without eviction", "Environment and Urbanization"], ["Public space in dense cities", "Urban Studies"], ["Floating architecture for flood zones", "Journal of Urban Design"]], reqs: ["Strong portfolio", "GIS skills", "Fieldwork experience"] },
    { lab: "Computational Design Lab", dept: "Architecture", areas: ["Parametric design", "Digital fabrication", "Timber structures"], pubs: [["Robotic fabrication of timber shells", "ACADIA"], ["Generative design for low-carbon buildings", "CAADRIA"], ["Bamboo as a structural material", "Construction and Building Materials"]], reqs: ["Grasshopper or scripting", "Model making", "Portfolio with built work"] },
  ],
  Business: [
    { lab: "Entrepreneurship Research Group", dept: "School of Management", areas: ["Startups", "Venture capital", "Innovation"], pubs: [["How first-time founders raise money", "Strategic Management Journal"], ["Startups in emerging markets", "Journal of Business Venturing"], ["Platforms and small business growth", "Management Science"]], reqs: ["Business or economics degree", "Statistics and econometrics", "GMAT or GRE"] },
    { lab: "Marketing Science Lab", dept: "Business School", areas: ["Consumer behaviour", "Digital marketing", "Pricing"], pubs: [["Social proof in online shopping", "Journal of Marketing Research"], ["Dynamic pricing on ride-hailing apps", "Marketing Science"], ["Mobile ads in emerging markets", "Journal of Marketing"]], reqs: ["Statistics and experiments", "R or Python", "GMAT or GRE"] },
    { lab: "Organisations and Work Group", dept: "Management", areas: ["Remote work", "Leadership", "Gig economy"], pubs: [["Productivity of hybrid teams", "Academy of Management Journal"], ["Gig workers and platform rules", "Organization Science"], ["Women in leadership in Asia", "Leadership Quarterly"]], reqs: ["Social science research methods", "Survey design", "Strong writing"] },
  ],
  Finance: [
    { lab: "Financial Markets Group", dept: "Finance", areas: ["Asset pricing", "Market microstructure", "Fintech"], pubs: [["High-frequency trading and liquidity", "Journal of Finance"], ["Crypto markets and retail investors", "Review of Financial Studies"], ["Climate risk in stock prices", "Journal of Financial Economics"]], reqs: ["Econometrics", "Python, R or Stata", "GMAT or GRE"] },
    { lab: "Development Finance Lab", dept: "Finance & Economics", areas: ["Microfinance", "Mobile money", "Financial inclusion"], pubs: [["Mobile money and household savings", "Journal of Development Economics"], ["Microcredit for women entrepreneurs", "World Development"], ["Remittances and small business", "Journal of Banking & Finance"]], reqs: ["Economics or finance degree", "Stata or R", "Field survey experience is a plus"] },
    { lab: "Quantitative Finance Lab", dept: "Mathematics & Finance", areas: ["Risk modelling", "Derivatives pricing", "Machine learning in finance"], pubs: [["Deep hedging with transaction costs", "Mathematical Finance"], ["Credit risk from alternative data", "Quantitative Finance"], ["Volatility forecasting with transformers", "Journal of Financial Econometrics"]], reqs: ["Stochastic calculus or probability", "Python or C++", "Strong maths grades"] },
  ],
  Economics: [
    { lab: "Development Economics Lab", dept: "Economics", areas: ["Poverty", "Field experiments", "Labour markets"], pubs: [["Cash transfers and child schooling", "American Economic Review"], ["Migration and rural wages", "Journal of Development Economics"], ["Garment work and women's empowerment", "Quarterly Journal of Economics"]], reqs: ["Econometrics", "Stata or R", "Field research experience"] },
    { lab: "Environmental Economics Group", dept: "Economics", areas: ["Climate policy", "Energy economics", "Air pollution"], pubs: [["The health cost of brick-kiln pollution", "Journal of Public Economics"], ["Carbon pricing in developing countries", "Journal of Environmental Economics and Management"], ["Solar subsidies and adoption", "Energy Economics"]], reqs: ["Microeconomics and econometrics", "Python, R or Stata", "GRE quant score helps"] },
    { lab: "Macroeconomics and Trade Group", dept: "Economics", areas: ["International trade", "Monetary policy", "Global value chains"], pubs: [["Tariffs and garment exports", "Journal of International Economics"], ["Exchange rates in small open economies", "Journal of Monetary Economics"], ["Supply chain shocks after the pandemic", "Econometrica"]], reqs: ["Advanced macro and maths", "MATLAB or Julia", "Research assistant experience"] },
  ],
  "Supply Chain Management": [
    { lab: "Supply Chain Analytics Lab", dept: "Industrial & Systems Engineering", areas: ["Logistics optimisation", "Inventory", "Demand forecasting"], pubs: [["Last-mile delivery in crowded cities", "Transportation Science"], ["Forecasting demand with sparse data", "Manufacturing & Service Operations Management"], ["Inventory for medicine supply chains", "Production and Operations Management"]], reqs: ["Operations research", "Python and optimisation solvers", "Industry experience helps"] },
    { lab: "Sustainable Operations Group", dept: "Operations Management", areas: ["Circular supply chains", "Ethical sourcing", "Carbon footprints"], pubs: [["Traceability in apparel supply chains", "Journal of Operations Management"], ["Recycling textiles at scale", "Production and Operations Management"], ["Measuring supplier emissions", "Management Science"]], reqs: ["Operations or industrial engineering", "Statistics", "Interest in sustainability"] },
    { lab: "Port and Maritime Logistics Lab", dept: "Logistics & Maritime Studies", areas: ["Port operations", "Shipping", "Container logistics"], pubs: [["Berth scheduling under uncertainty", "Transportation Research Part B"], ["Green shipping corridors", "Maritime Policy & Management"], ["Simulation of container terminals", "European Journal of Operational Research"]], reqs: ["Operations research", "Simulation tools", "Logistics coursework"] },
  ],
  "Public Health": [
    { lab: "Global Health Lab", dept: "Global Health", areas: ["Maternal health", "Health systems", "Implementation science"], pubs: [["Community health workers and newborn survival", "The Lancet"], ["Digital tools for antenatal care", "BMJ Global Health"], ["Costs of hospital care in South Asia", "Health Policy and Planning"]], reqs: ["Public health or medical degree", "Biostatistics", "Field experience in health programs"] },
    { lab: "Infectious Disease Epidemiology Group", dept: "Epidemiology", areas: ["Dengue", "Antimicrobial resistance", "Disease modelling"], pubs: [["Forecasting dengue outbreaks with climate data", "PLOS Neglected Tropical Diseases"], ["Antibiotic resistance in hospital settings", "Lancet Infectious Diseases"], ["Modelling cholera vaccination", "Nature Medicine"]], reqs: ["Epidemiology and biostatistics", "R or Stata", "Interest in modelling"] },
    { lab: "Environmental Health Lab", dept: "Environmental Health Sciences", areas: ["Air pollution", "Water and sanitation", "Heat and health"], pubs: [["Indoor air pollution from cooking fuels", "Environmental Health Perspectives"], ["Heat waves and hospital visits", "Lancet Planetary Health"], ["Arsenic in drinking water and child growth", "Environment International"]], reqs: ["Public health or environmental science", "Statistics", "GIS is a plus"] },
  ],
  Pharmacy: [
    { lab: "Drug Delivery Lab", dept: "Pharmaceutical Sciences", areas: ["Nanomedicine", "Formulation", "Controlled release"], pubs: [["Oral delivery of insulin with nanoparticles", "Journal of Controlled Release"], ["Heat-stable vaccines for hot climates", "Advanced Drug Delivery Reviews"], ["3D-printed tablets", "International Journal of Pharmaceutics"]], reqs: ["B.Pharm with good grades", "Lab experience in formulation", "HPLC is a plus"] },
    { lab: "Medicinal Chemistry Lab", dept: "Pharmacy", areas: ["Drug discovery", "Antibiotics", "Computational chemistry"], pubs: [["New antibiotics against resistant bacteria", "Journal of Medicinal Chemistry"], ["Virtual screening for antivirals", "J. Chem. Inf. Model."], ["Natural products from mangrove plants", "Journal of Natural Products"]], reqs: ["Organic chemistry", "Synthesis lab experience", "Molecular docking is a plus"] },
    { lab: "Pharmacy Practice and Policy Group", dept: "Pharmacy Practice", areas: ["Medicine safety", "Pharmacoeconomics", "Access to medicines"], pubs: [["Over-the-counter antibiotic sales", "BMJ Global Health"], ["Cost-effectiveness of diabetes medicines", "PharmacoEconomics"], ["Pharmacist-led care for hypertension", "Research in Social and Administrative Pharmacy"]], reqs: ["Pharmacy degree", "Survey and statistics skills", "Community pharmacy experience"] },
  ],
  Biotechnology: [
    { lab: "Synthetic Biology Lab", dept: "Bioengineering", areas: ["Genetic circuits", "Metabolic engineering", "Biomanufacturing"], pubs: [["Engineering yeast to make medicines", "Nature Chemical Biology"], ["Biosensors for water contamination", "ACS Synthetic Biology"], ["Microbes that turn waste into plastic", "Metabolic Engineering"]], reqs: ["Molecular biology lab skills", "Cloning and PCR", "Some coding helps"] },
    { lab: "Genomics and Bioinformatics Lab", dept: "Biology", areas: ["Genomics", "Bioinformatics", "Microbiome"], pubs: [["Gut microbiome in malnourished children", "Cell Host & Microbe"], ["Tracking pathogens with genome sequencing", "Nature Microbiology"], ["Pipelines for long-read sequencing", "Bioinformatics"]], reqs: ["Biology or bioinformatics degree", "Python or R", "Linux command line"] },
    { lab: "Plant Biotechnology Lab", dept: "Plant Sciences", areas: ["Crop genetics", "Gene editing", "Stress tolerance"], pubs: [["Gene-edited rice that survives flooding", "Nature Plants"], ["Salt-tolerant crops for coastal farms", "Plant Biotechnology Journal"], ["CRISPR for disease-resistant wheat", "Plant Cell"]], reqs: ["Plant biology or genetics", "Lab experience with DNA", "Field trials are a plus"] },
  ],
  Physics: [
    { lab: "Quantum Materials Lab", dept: "Physics", areas: ["Quantum materials", "2D materials", "Superconductivity"], pubs: [["Superconductivity in twisted graphene", "Nature"], ["Spin transport in 2D magnets", "Physical Review Letters"], ["Topological states in thin films", "Nature Physics"]], reqs: ["Quantum mechanics and solid-state physics", "Lab or simulation experience", "Strong maths"] },
    { lab: "Astrophysics Group", dept: "Physics & Astronomy", areas: ["Cosmology", "Galaxy formation", "Gravitational waves"], pubs: [["Dark matter maps from weak lensing", "Astrophysical Journal"], ["Simulating the first galaxies", "MNRAS"], ["Neutron star mergers in gravitational waves", "Physical Review D"]], reqs: ["Physics degree with strong grades", "Python and numerical methods", "Research project in astronomy"] },
    { lab: "Photonics Lab", dept: "Physics", areas: ["Lasers", "Optical sensing", "Quantum optics"], pubs: [["Chip-scale lasers for sensing", "Optica"], ["Single-photon sources at room temperature", "Nature Photonics"], ["Low-cost optical gas sensors", "Optics Express"]], reqs: ["Optics and electromagnetism", "Lab experience with lasers", "MATLAB or Python"] },
  ],
  Mathematics: [
    { lab: "Applied Mathematics Group", dept: "Mathematics", areas: ["Mathematical modelling", "Differential equations", "Numerical analysis"], pubs: [["Models of epidemic spread on networks", "SIAM Journal on Applied Mathematics"], ["Fast solvers for fluid flow", "Journal of Computational Physics"], ["Stability of nonlinear waves", "Physica D"]], reqs: ["Analysis and differential equations", "Programming in Python or Julia", "Strong grades in maths"] },
    { lab: "Probability and Statistics Group", dept: "Mathematics", areas: ["Random graphs", "Stochastic processes", "High-dimensional statistics"], pubs: [["Phase transitions in random networks", "Annals of Probability"], ["Estimation in high dimensions", "Annals of Statistics"], ["Random walks on groups", "Probability Theory and Related Fields"]], reqs: ["Measure theory and probability", "Real analysis", "Research or thesis experience"] },
    { lab: "Optimisation and Operations Research Group", dept: "Mathematics", areas: ["Convex optimisation", "Integer programming", "Optimal transport"], pubs: [["First-order methods for huge problems", "Mathematical Programming"], ["Scheduling with integer programming", "Operations Research"], ["Optimal transport in machine learning", "SIAM Journal on Optimization"]], reqs: ["Linear algebra and optimisation", "Python or Julia", "Strong maths grades"] },
  ],
  Chemistry: [
    { lab: "Materials Chemistry Lab", dept: "Chemistry", areas: ["Battery materials", "Perovskites", "Metal-organic frameworks"], pubs: [["Sodium-ion batteries from cheap materials", "Journal of the American Chemical Society"], ["Stable perovskite solar cells", "Nature Energy"], ["MOFs that pull water from air", "Science"]], reqs: ["Inorganic or materials chemistry", "Synthesis and XRD experience", "Good lab notebook habits"] },
    { lab: "Analytical and Environmental Chemistry Lab", dept: "Chemistry", areas: ["Pollutant detection", "Mass spectrometry", "Microplastics"], pubs: [["Microplastics in river fish", "Environmental Science & Technology"], ["Portable sensors for heavy metals", "Analytical Chemistry"], ["Pesticide residues in vegetables", "Food Chemistry"]], reqs: ["Analytical chemistry", "HPLC or GC-MS", "Field sampling is a plus"] },
    { lab: "Computational Chemistry Group", dept: "Chemistry", areas: ["Quantum chemistry", "Molecular dynamics", "Machine learning for molecules"], pubs: [["Machine-learned force fields", "Journal of Chemical Physics"], ["Predicting catalysts with DFT", "ACS Catalysis"], ["Simulating proteins in water", "J. Chem. Theory Comput."]], reqs: ["Physical chemistry", "Python and Linux", "DFT software like Gaussian or VASP"] },
  ],
  "Environmental Science": [
    { lab: "Climate Adaptation Lab", dept: "Environmental Studies", areas: ["Climate adaptation", "Sea-level rise", "Coastal communities"], pubs: [["Migration after cyclones in coastal Bangladesh", "Nature Climate Change"], ["Salinity and farming in deltas", "Global Environmental Change"], ["Nature-based flood defences", "One Earth"]], reqs: ["Environmental science or geography", "GIS and statistics", "Fieldwork experience"] },
    { lab: "Atmospheric Chemistry Group", dept: "Earth & Environmental Sciences", areas: ["Air quality", "Aerosols", "Satellite remote sensing"], pubs: [["Satellite tracking of winter smog in South Asia", "Atmospheric Chemistry and Physics"], ["Brick kilns and black carbon", "Environmental Research Letters"], ["Low-cost air sensors in megacities", "Atmospheric Environment"]], reqs: ["Chemistry or physics background", "Python", "Data analysis skills"] },
    { lab: "Ecosystems and Biodiversity Lab", dept: "Ecology", areas: ["Mangroves", "Wetlands", "Carbon storage"], pubs: [["Carbon stored in mangrove soils", "Nature Geoscience"], ["Wetland loss and bird populations", "Conservation Biology"], ["Drones for forest monitoring", "Remote Sensing of Environment"]], reqs: ["Ecology or biology degree", "R and statistics", "Field skills"] },
  ],
  "Renewable Energy": [
    { lab: "Solar Energy Lab", dept: "Energy Engineering", areas: ["Solar cells", "Solar forecasting", "Floating solar"], pubs: [["Floating solar on reservoirs", "Joule"], ["Forecasting solar output with satellites", "Solar Energy"], ["Tandem cells beyond 30% efficiency", "Nature Energy"]], reqs: ["EEE, physics or materials degree", "MATLAB or Python", "Lab or simulation work"] },
    { lab: "Wind Energy Group", dept: "Wind & Energy Systems", areas: ["Offshore wind", "Wind turbine aerodynamics", "Wind farm control"], pubs: [["Wake steering in offshore wind farms", "Wind Energy Science"], ["Floating turbines in deep water", "Renewable Energy"], ["Cyclone-proof turbine design", "Journal of Wind Engineering"]], reqs: ["Fluid mechanics or power systems", "Python or MATLAB", "Interest in offshore engineering"] },
    { lab: "Energy Storage Lab", dept: "Mechanical & Energy Engineering", areas: ["Batteries", "Hydrogen storage", "Second-life batteries"], pubs: [["Second-life EV batteries for solar homes", "Applied Energy"], ["Battery ageing in hot climates", "Journal of Power Sources"], ["Green hydrogen for heavy industry", "Energy & Environmental Science"]], reqs: ["Electrochemistry or power systems", "Lab or modelling experience", "Strong grades"] },
  ],
  Agriculture: [
    { lab: "Crop Science Lab", dept: "Plant & Soil Sciences", areas: ["Rice systems", "Climate-smart farming", "Soil health"], pubs: [["Alternate wetting and drying in rice", "Field Crops Research"], ["Heat stress and wheat yields", "Nature Food"], ["Soil carbon under conservation farming", "Global Change Biology"]], reqs: ["Agriculture degree", "Field trial experience", "Statistics with R"] },
    { lab: "Aquaculture and Fisheries Lab", dept: "Animal & Aquacultural Sciences", areas: ["Aquaculture", "Fish nutrition", "Fisheries management"], pubs: [["Feeds that cut costs for fish farmers", "Aquaculture"], ["Disease control in shrimp farms", "Reviews in Aquaculture"], ["Hilsa fishery management", "Fish and Fisheries"]], reqs: ["Fisheries or aquaculture degree", "Lab and farm experience", "Statistics"] },
    { lab: "Agricultural Economics and Policy Lab", dept: "Agricultural & Applied Economics", areas: ["Food security", "Farmer markets", "Agricultural policy"], pubs: [["Mobile phones and crop prices", "American Journal of Agricultural Economics"], ["Fertiliser subsidies and yields", "Food Policy"], ["Crop insurance for smallholders", "World Development"]], reqs: ["Economics or agricultural economics", "Stata or R", "Survey experience"] },
  ],
  "Public Policy": [
    { lab: "Governance and Development Lab", dept: "Public Policy", areas: ["Public service delivery", "Corruption", "Local government"], pubs: [["Digital ID and welfare leakage", "American Political Science Review"], ["Citizen feedback and local services", "World Development"], ["Bureaucrats and performance pay", "Journal of Public Administration Research and Theory"]], reqs: ["Social science degree", "Quantitative methods", "Policy or NGO work experience"] },
    { lab: "Migration Policy Group", dept: "Government", areas: ["Labour migration", "Refugee policy", "Remittances"], pubs: [["Recruitment costs for migrant workers", "International Migration Review"], ["Refugee camps and host communities", "Journal of Refugee Studies"], ["Policy for climate migrants", "Global Policy"]], reqs: ["Political science or economics", "Qualitative and quantitative methods", "Fieldwork experience"] },
    { lab: "Technology Policy Lab", dept: "School of Public Policy", areas: ["AI governance", "Data protection", "Digital public infrastructure"], pubs: [["Regulating AI in the Global South", "Policy & Internet"], ["Data protection laws compared", "Telecommunications Policy"], ["Digital public goods", "Government Information Quarterly"]], reqs: ["Policy, law or computing background", "Strong writing", "Interest in technology"] },
  ],
  Law: [
    { lab: "International Law Centre", dept: "Faculty of Law", areas: ["International human rights", "Refugee law", "Climate litigation"], pubs: [["Climate cases in national courts", "American Journal of International Law"], ["Protection for climate-displaced people", "International Journal of Refugee Law"], ["Business and human rights", "European Journal of International Law"]], reqs: ["LLB with strong grades", "Legal research writing sample", "Moot court is a plus"] },
    { lab: "Law and Technology Group", dept: "Law", areas: ["Data privacy", "Platform regulation", "Intellectual property"], pubs: [["Copyright and generative AI", "Harvard Journal of Law & Technology"], ["Regulating gig platforms", "Modern Law Review"], ["Data localisation laws", "International Data Privacy Law"]], reqs: ["Law degree", "Interest in technology", "Writing sample"] },
    { lab: "Trade and Investment Law Group", dept: "Law", areas: ["WTO law", "Investment treaties", "Trade and labour"], pubs: [["Least-developed country graduation and trade preferences", "Journal of International Economic Law"], ["Investor-state disputes in Asia", "ICSID Review"], ["Labour clauses in trade agreements", "World Trade Review"]], reqs: ["LLB or LLM", "International law coursework", "Writing sample"] },
  ],
};

const FUNDING: Record<Country, string> = {
  USA: "$30k–$45k/yr stipend + tuition waiver (RA/TA)",
  UK: "Funded studentship: fees + ~£20k/yr stipend",
  Canada: "CAD $22k–$32k/yr funding package",
  Australia: "RTP: full tuition + ~AUD 37k/yr stipend",
  Germany: "Paid PhD post (TV-L E13, 65–75%), ~€2,300–€2,800/month net",
  Japan: "MEXT ¥144k/month, or lab RA salary",
  Malaysia: "Graduate research assistantship: fee waiver + MYR 1,500–2,500/month",
  China: "CSC scholarship: tuition, housing + CNY 3,500/month",
  "South Korea": "Lab scholarship: tuition + KRW 1.2M–2M/month",
  Sweden: "Salaried PhD, ~SEK 31,000/month",
  Finland: "Salaried doctoral researcher, ~€2,600/month",
  Netherlands: "Salaried PhD, €2,770–€3,539/month",
  France: "Doctoral contract, ~€2,200/month gross",
  Italy: "PhD grant, ~€16,200/yr + fee waiver",
  Ireland: "Stipend €22k–€25k/yr + fees",
  "New Zealand": "Doctoral scholarship: NZD 35k/yr + fees",
  Denmark: "Salaried PhD, ~DKK 30,000/month",
  Norway: "Salaried PhD, ~NOK 530,000/yr",
  Hungary: "Stipendium Hungaricum PhD: HUF 180,000/month + housing",
  Turkey: "Tuition waiver + monthly stipend",
  Singapore: "SGD 2,700–3,300/month + tuition",
  "Hong Kong": "HKPFS: HKD 340,000/yr, or studentship ~HKD 18,000/month",
  Taiwan: "Lab RA: NTD 15,000–30,000/month + fee waiver",
  Belgium: "PhD scholarship, ~€2,400/month net",
  Austria: "Salaried PhD (FWF project), ~€3,000/month gross",
  Spain: "Pre-doctoral contract, ~€1,500/month",
  Poland: "Doctoral school stipend, PLN 3,400–5,200/month",
  "Czech Republic": "Doctoral stipend + project salary",
  Switzerland: "Salaried PhD, CHF 47,000–50,000/yr",
  "Saudi Arabia": "Free tuition, housing + monthly stipend",
};

const FIRST = ["Aisha", "Daniel", "Mei", "Rafael", "Sofia", "Kenji", "Priya", "Lukas", "Amara", "Tomás", "Hana", "Omar", "Ingrid", "Jun", "Leila", "Mateo", "Yuki", "Nadia", "Erik", "Fatima", "Chen", "Grace", "Arjun", "Elena", "Samuel", "Zara", "Min-jun", "Clara", "Hassan", "Olivia", "Rohan", "Anna", "Tariq", "Lena", "Victor", "Ji-woo", "Marta", "Kofi", "Isabel", "Ravi", "Emma", "Ali", "Sara", "Hiro", "Noor", "Pablo", "Mira", "Jonas", "Shirin", "Wei"];
const LAST = ["Haque", "Fischer", "Tanaka", "Okafor", "Moreau", "Lindqvist", "Patel", "Novak", "Rossi", "Chowdhury", "Nakamura", "Schmidt", "Ahmed", "Kowalski", "Bianchi", "Park", "Lee", "Hossain", "Andersen", "Silva", "Zhang", "Murphy", "Rahman", "Dubois", "Kaya", "Islam", "Müller", "Wang", "Singh", "Berg", "Costa", "Yilmaz", "Khan", "Virtanen", "Jansen", "Liu", "Kim", "Sato", "Hughes", "Alam", "Romero", "Petrov", "Nguyen", "Sarkar", "Ibrahim", "Larsen", "Martin", "Choi", "Das", "Weber"];

const TITLES = ["Assistant Professor", "Associate Professor", "Professor"];

const ROLES = ["PhD student, 1st year", "PhD student, 2nd year", "PhD student, 3rd year", "PhD student, 4th year", "MS student", "Postdoc", "Research assistant", "Former PhD student"];

// Short review lines, grouped so each profile gets one on support, one on life in the lab.
const SUPPORT = [
  "Weekly 1:1s and quick feedback on drafts. You always know where you stand.",
  "Hands-off supervisor — great if you're independent, hard if you need structure.",
  "Very invested in students' careers. Helped me land a summer internship.",
  "Responsive on email and honest about what a paper needs before submission.",
  "Busy PI, so the senior PhDs do much of the day-to-day mentoring. They're good.",
  "Pushes hard for top venues. You'll learn a lot, but expect many rewrites.",
  "Kind and patient with international students settling in.",
  "Clear expectations from day one, with a written plan for each year.",
];
const LIFE = [
  "Funding has been reliable and paid on time every month.",
  "Long hours before deadlines, but normal weeks are manageable.",
  "Friendly lab with regular lunches. Several South Asian students in the group.",
  "Good equipment and compute. Travel to one conference a year is covered.",
  "The city is expensive; the stipend covers a shared flat and basics.",
  "Small group, so you get lots of attention but fewer people to learn from.",
  "Fieldwork trips are well organised and fully paid.",
  "Some competition for authorship on big projects. Talk about it early.",
];

const TIPS = [
  "Read two recent papers and say which open question you'd work on. Keep it under 200 words.",
  "Attach your CV and transcript, and link one project with results you can explain.",
  "Apply through the official portal first, then email with your application number.",
  "Mention a concrete skill you bring, like a tool, dataset or field site.",
  "Ask whether funding is confirmed for your intake before writing a long proposal.",
  "Short, specific emails get replies. Avoid generic templates.",
];

/** A small seeded random generator, so the profiles stay the same on every build. */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

const slug = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const round1 = (n: number) => Math.round(n * 10) / 10;

/** Lower-cases a research area for use mid-sentence, but keeps acronyms like "MRI". */
const midSentence = (area: string) => (/^[A-Z]{2}/.test(area) ? area : area[0].toLowerCase() + area.slice(1));

function buildLabs(perField: number): Lab[] {
  const rand = seeded(20261025);
  const pick = <T,>(list: readonly T[]) => list[Math.floor(rand() * list.length)];
  const labs: Lab[] = [];
  const usedIds = new Set<string>();
  const usedNames = new Set<string>();

  for (const [field, topics] of Object.entries(TOPICS) as [Major, Topic[]][]) {
    // Spread each field across different universities that teach it.
    const hosts = UNIVERSITIES.filter((u) => u.majors.includes(field));
    const pool = [...hosts];
    for (let k = pool.length - 1; k > 0; k--) {
      const j = Math.floor(rand() * (k + 1));
      [pool[k], pool[j]] = [pool[j], pool[k]];
    }

    for (let i = 0; i < perField && i < pool.length; i++) {
      const uni = pool[i];
      const topic = topics[i % topics.length];
      let first = pick(FIRST);
      let last = pick(LAST);
      while (usedNames.has(`${first} ${last}`)) {
        first = pick(FIRST);
        last = pick(LAST);
      }
      usedNames.add(`${first} ${last}`);
      const professor = `Prof. ${first} ${last}`;
      let id = slug(`${last}-${uni.id}`);
      if (usedIds.has(id)) id = slug(`${first}-${last}-${uni.id}`);
      if (usedIds.has(id)) continue;
      usedIds.add(id);

      const r = rand();
      const accepting: Accepting = r < 0.55 ? "Open" : r < 0.85 ? "Limited" : "Closed";
      const title = pick(TITLES);
      const senior = title === "Professor";
      const positions: Position[] =
        accepting === "Closed"
          ? ["Postdoc"]
          : rand() < 0.5
            ? ["PhD", "MS"]
            : rand() < 0.5
              ? ["PhD", "Research assistant"]
              : ["PhD", "MS", "Postdoc"];
      const intake = rand() < 0.6 ? "Fall 2027" : "Spring 2027";
      const acceptingNote =
        accepting === "Open"
          ? `Recruiting ${positions.includes("MS") ? "PhD and MS students" : "PhD students"} for ${intake}`
          : accepting === "Limited"
            ? `Taking 1 PhD student for ${intake}, if funding is confirmed`
            : "Not taking new students this cycle";
      const base = 3.4 + rand() * 0.9;
      const score = () => round1(Math.min(5, Math.max(3, base + (rand() - 0.5) * 1.1)));
      const year = 2026 - Math.floor(rand() * 2);

      labs.push({
        id,
        professor,
        title,
        labName: topic.lab,
        university: uni.name,
        department: topic.dept,
        country: uni.country,
        field,
        researchAreas: [...topic.areas],
        accepting,
        acceptingNote,
        positions,
        labSize: 4 + Math.floor(rand() * (senior ? 18 : 10)),
        bdAlumni: Math.floor(rand() * (uni.intlPct > 20 ? 6 : 3)),
        hIndex: senior ? 30 + Math.floor(rand() * 40) : 10 + Math.floor(rand() * 25),
        subScores: { mentorship: score(), funding: score(), workLifeBalance: score(), publishing: score() },
        fundingInfo: FUNDING[uni.country],
        description: `${topic.lab} at ${uni.name} works on ${topic.areas.slice(0, 2).map(midSentence).join(", ")} and ${midSentence(topic.areas[2])}.`,
        requirements: [...topic.reqs],
        publications: topic.pubs.slice(0, 2 + (i % 2)).map(([t, venue], k) => ({ title: t, venue, year: year - k })),
        contactTip: pick(TIPS),
        reviews: [
          { id: "r1", role: pick(ROLES), date: `${year}-0${1 + Math.floor(rand() * 9)}-1${Math.floor(rand() * 9)}`, body: pick(SUPPORT) },
          { id: "r2", role: pick(ROLES), date: `2025-1${Math.floor(rand() * 3)}-0${1 + Math.floor(rand() * 8)}`, body: pick(LIFE) },
        ],
      });
    }
  }
  return labs;
}

export const MORE_LABS: Lab[] = buildLabs(10);
