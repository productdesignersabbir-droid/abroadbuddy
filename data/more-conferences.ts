// Upcoming conferences, fests and paper deadlines. Dates for 2027 events follow
// each event's usual yearly cycle; check the official site before you submit.
import type { Conference } from "@/data/conferences";

export const MORE_CONFERENCES: Conference[] = [
  // ── Bangladesh ──────────────────────────────────────
  {
    id: "icece-2026", name: "ICECE 2026 — International Conference on Electrical and Computer Engineering", host: "BUET, Dept. of EEE",
    type: "Conference", fields: ["Electrical Engineering", "Computer Science"], locationType: "Local", city: "BUET, Dhaka, Bangladesh", format: "In-person",
    eventDate: "2026-12-20", eventEndDate: "2026-12-22", deadline: "2026-08-31", url: "https://icece.buet.ac.bd",
    description: "BUET's long-running IEEE-sponsored conference on power, electronics, communications and computing.",
  },
  {
    id: "bids-adc-2026", name: "BIDS Annual Development Conference 2026", host: "Bangladesh Institute of Development Studies",
    type: "Conference", fields: ["Economics", "Public Policy"], locationType: "Local", city: "Dhaka, Bangladesh", format: "In-person",
    eventDate: "2026-12-01", eventEndDate: "2026-12-03", deadline: "2026-09-30", url: "https://bids.org.bd",
    description: "Bangladesh's main gathering for development economists, with sessions on poverty, labour, trade and climate.",
  },
  {
    id: "icpc-dhaka-regional-2026", name: "ICPC Asia Dhaka Regional Contest 2026", host: "ICPC Foundation with a host university",
    type: "Research Fest", fields: ["Computer Science"], locationType: "Local", city: "Dhaka, Bangladesh", format: "In-person",
    eventDate: "2026-12-12", deadline: "2026-11-15", url: "https://icpc.global",
    description: "The biggest university programming contest in Bangladesh — top teams qualify for the ICPC World Finals.",
  },
  {
    id: "gobeshona-2027", name: "Gobeshona Global Conference 2027", host: "ICCCAD, Independent University Bangladesh",
    type: "Conference", fields: ["Environmental Science", "Public Policy", "Agriculture"], locationType: "Local", city: "Dhaka, Bangladesh", format: "Hybrid",
    eventDate: "2027-02-14", eventEndDate: "2027-02-18", deadline: "2026-11-30", url: "https://www.icccad.net",
    description: "A global conference on locally led climate adaptation, with researchers, NGOs and policymakers.",
  },
  {
    id: "ecce-cuet-2027", name: "ECCE 2027 — International Conference on Electrical, Computer and Communication Engineering", host: "Chittagong University of Engineering & Technology",
    type: "Conference", fields: ["Electrical Engineering", "Computer Science"], locationType: "Local", city: "CUET, Chattogram, Bangladesh", format: "In-person",
    eventDate: "2027-02-25", eventEndDate: "2027-02-27", deadline: "2026-11-20", url: "https://ecce.cuet.ac.bd",
    description: "CUET's IEEE-indexed conference covering power, communication, machine learning and embedded systems.",
  },
  {
    id: "iccesd-2027", name: "ICCESD 2027 — Civil Engineering for Sustainable Development", host: "Khulna University of Engineering & Technology",
    type: "Conference", fields: ["Civil Engineering", "Environmental Science"], locationType: "Local", city: "KUET, Khulna, Bangladesh", format: "In-person",
    eventDate: "2027-02-11", eventEndDate: "2027-02-13", deadline: "2026-11-30", url: "https://iccesd.kuet.ac.bd",
    description: "KUET's biennial civil engineering conference on structures, water, geotechnics and transport in Bangladesh.",
  },
  {
    id: "icrest-2027", name: "ICREST 2027 — Robotics, Electrical and Signal Processing Techniques", host: "American International University-Bangladesh (AIUB)",
    type: "Conference", fields: ["Electrical Engineering", "Artificial Intelligence", "Mechanical Engineering"], locationType: "Local", city: "Dhaka, Bangladesh", format: "Hybrid",
    eventDate: "2027-01-09", eventEndDate: "2027-01-10", deadline: "2026-10-31", url: "https://www.aiub.edu",
    description: "An IEEE conference on robotics, signal processing and power, popular for undergraduate first papers.",
  },
  {
    id: "iceeict-2027", name: "ICEEICT 2027 — Electrical, Information and Communication Technology", host: "Military Institute of Science and Technology (MIST)",
    type: "Conference", fields: ["Electrical Engineering", "Computer Science", "Data Science"], locationType: "Local", city: "MIST, Dhaka, Bangladesh", format: "In-person",
    eventDate: "2027-05-06", eventEndDate: "2027-05-08", deadline: "2027-01-31", url: "https://iceeict.mist.ac.bd",
    description: "MIST's IEEE conference on electrical engineering, ICT and AI applications.",
  },
  {
    id: "icerie-2027", name: "ICERIE 2027 — Engineering Research, Innovation and Education", host: "Shahjalal University of Science and Technology (SUST)",
    type: "Conference", fields: ["Civil Engineering", "Chemical Engineering", "Computer Science", "Mechanical Engineering"], locationType: "Local", city: "SUST, Sylhet, Bangladesh", format: "In-person",
    eventDate: "2027-01-23", eventEndDate: "2027-01-25", deadline: "2026-11-15", url: "https://www.sust.edu",
    description: "SUST's multi-disciplinary engineering conference with tracks for students and early researchers.",
  },
  {
    id: "icddrb-ascon-2027", name: "ASCON 2027 — Annual Scientific Conference", host: "icddr,b",
    type: "Conference", fields: ["Public Health"], locationType: "Local", city: "Dhaka, Bangladesh", format: "Hybrid",
    eventDate: "2027-03-14", eventEndDate: "2027-03-16", deadline: "2026-12-15", url: "https://www.icddrb.org",
    description: "icddr,b's scientific conference on child health, nutrition, infectious disease and health systems.",
  },
  {
    id: "icca-2027", name: "ICCA 2027 — International Conference on Computing Advancements", host: "Independent University, Bangladesh with ACM",
    type: "Conference", fields: ["Computer Science", "Artificial Intelligence", "Data Science"], locationType: "Local", city: "Dhaka, Bangladesh", format: "Hybrid",
    eventDate: "2027-08-26", eventEndDate: "2027-08-28", deadline: "2027-05-15", url: "https://www.iub.edu.bd",
    description: "An ACM-published computing conference held in Dhaka, covering AI, HCI and software engineering.",
  },
  {
    id: "wiecon-ece-2026", name: "IEEE WIECON-ECE 2026", host: "IEEE Women in Engineering, Bangladesh Section",
    type: "Conference", fields: ["Electrical Engineering", "Computer Science"], locationType: "Local", city: "Dhaka, Bangladesh", format: "Hybrid",
    eventDate: "2026-12-26", eventEndDate: "2026-12-27", deadline: "2026-10-30", url: "https://ieeebangladesh.org",
    description: "An IEEE WIE conference on electrical and computer engineering, with a strong focus on women researchers.",
  },
  {
    id: "nasa-space-apps-bd-2026", name: "NASA Space Apps Challenge Bangladesh", host: "BASIS and NASA Space Apps local leads",
    type: "Research Fest", fields: ["Computer Science", "Data Science", "Environmental Science"], locationType: "Local", city: "Dhaka and divisional cities, Bangladesh", format: "Hybrid",
    eventDate: "2027-10-02", eventEndDate: "2027-10-03", deadline: "2027-09-20", url: "https://www.spaceappschallenge.org",
    description: "A 48-hour hackathon using NASA data. Bangladeshi teams have won global awards several times.",
  },
  {
    id: "national-science-tech-fair-2027", name: "National Science and Technology Fair 2027", host: "Ministry of Science and Technology, Bangladesh",
    type: "Research Fest", fields: ["Physics", "Chemistry", "Computer Science", "Biotechnology", "Renewable Energy"], locationType: "Local", city: "Dhaka, Bangladesh", format: "In-person",
    eventDate: "2027-03-20", eventEndDate: "2027-03-22", deadline: "2027-02-15", url: "https://most.gov.bd",
    description: "Students show science projects at district, divisional and national rounds.",
  },
  {
    id: "bd-pharma-research-fest-2027", name: "Pharma Research Fest 2027", host: "Faculty of Pharmacy, University of Dhaka",
    type: "Research Fest", fields: ["Pharmacy", "Biotechnology"], locationType: "Local", city: "Dhaka University, Dhaka, Bangladesh", format: "In-person",
    eventDate: "2027-04-17", deadline: "2027-03-10", url: "https://www.du.ac.bd",
    description: "Pharmacy students present posters and talks on drug discovery, formulation and public health.",
  },
  {
    id: "bau-agri-research-fest-2027", name: "Agricultural Research Fest 2027", host: "Bangladesh Agricultural University",
    type: "Research Fest", fields: ["Agriculture", "Environmental Science"], locationType: "Local", city: "BAU, Mymensingh, Bangladesh", format: "In-person",
    eventDate: "2027-05-22", deadline: "2027-04-15", url: "https://www.bau.edu.bd",
    description: "Undergraduate and master's students share research on crops, fisheries, livestock and agribusiness.",
  },

  // ── Computing and AI ────────────────────────────────
  {
    id: "cvpr-2027", name: "CVPR 2027 — Computer Vision and Pattern Recognition", host: "IEEE / CVF",
    type: "Conference", fields: ["Artificial Intelligence", "Computer Science"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-06-14", eventEndDate: "2027-06-18", deadline: "2026-11-13", url: "https://cvpr.thecvf.com",
    description: "The largest computer vision conference, with tens of thousands of attendees and huge workshops.",
  },
  {
    id: "iclr-2027", name: "ICLR 2027 — International Conference on Learning Representations", host: "ICLR",
    type: "Conference", fields: ["Artificial Intelligence", "Computer Science"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-04-24", eventEndDate: "2027-04-28", deadline: "2026-10-01", url: "https://iclr.cc",
    description: "A top deep learning venue with open peer review on OpenReview.",
  },
  {
    id: "icml-2027", name: "ICML 2027 — International Conference on Machine Learning", host: "International Machine Learning Society",
    type: "Conference", fields: ["Artificial Intelligence", "Computer Science", "Data Science"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-07-12", eventEndDate: "2027-07-18", deadline: "2027-01-28", url: "https://icml.cc",
    description: "One of the three flagship machine learning conferences, covering theory and applications.",
  },
  {
    id: "ijcai-2027", name: "IJCAI 2027 — International Joint Conference on Artificial Intelligence", host: "IJCAI Organization",
    type: "Conference", fields: ["Artificial Intelligence", "Computer Science"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-08-14", eventEndDate: "2027-08-20", deadline: "2027-01-20", url: "https://www.ijcai.org",
    description: "The longest-running international AI conference, covering every area of AI.",
  },
  {
    id: "acl-2027", name: "ACL 2027 — Association for Computational Linguistics", host: "Association for Computational Linguistics",
    type: "Conference", fields: ["Artificial Intelligence", "Computer Science"], locationType: "International", city: "To be announced", format: "Hybrid",
    eventDate: "2027-07-25", eventEndDate: "2027-07-30", deadline: "2027-02-15", url: "https://www.aclweb.org",
    description: "The top NLP venue. Submit through ACL Rolling Review and commit your reviewed paper to ACL.",
  },
  {
    id: "emnlp-2027", name: "EMNLP 2027 — Empirical Methods in Natural Language Processing", host: "Association for Computational Linguistics (SIGDAT)",
    type: "Conference", fields: ["Artificial Intelligence", "Computer Science"], locationType: "International", city: "To be announced", format: "Hybrid",
    eventDate: "2027-11-08", eventEndDate: "2027-11-12", deadline: "2027-05-19", url: "https://www.aclweb.org",
    description: "A leading NLP conference with a strong track record for low-resource and multilingual work, including Bangla.",
  },
  {
    id: "neurips-2027", name: "NeurIPS 2027 — Neural Information Processing Systems", host: "NeurIPS Foundation",
    type: "Conference", fields: ["Artificial Intelligence", "Computer Science", "Data Science"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-12-06", eventEndDate: "2027-12-12", deadline: "2027-05-14", url: "https://neurips.cc",
    description: "The largest machine learning conference, with a datasets and benchmarks track and many workshops.",
  },
  {
    id: "kdd-2027", name: "KDD 2027 — Knowledge Discovery and Data Mining", host: "ACM SIGKDD",
    type: "Conference", fields: ["Data Science", "Computer Science", "Artificial Intelligence"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-08-08", eventEndDate: "2027-08-12", deadline: "2027-02-08", url: "https://kdd.org",
    description: "The top data mining conference, with research and applied data science tracks.",
  },
  {
    id: "iccv-2027", name: "ICCV 2027 — International Conference on Computer Vision", host: "IEEE / CVF",
    type: "Conference", fields: ["Artificial Intelligence", "Computer Science"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-10-17", eventEndDate: "2027-10-23", deadline: "2027-03-07", url: "https://iccv.thecvf.com",
    description: "A flagship vision conference held every other year.",
  },
  {
    id: "www-2027", name: "The Web Conference 2027", host: "ACM / IW3C2",
    type: "Conference", fields: ["Computer Science", "Data Science"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-04-26", eventEndDate: "2027-04-30", deadline: "2026-10-28", url: "https://www2027.thewebconf.org",
    description: "The main venue for web research: search, social networks, web mining and online economics.",
  },
  {
    id: "chi-2027", name: "CHI 2027 — Human Factors in Computing Systems", host: "ACM SIGCHI",
    type: "Conference", fields: ["Computer Science"], locationType: "International", city: "To be announced", format: "Hybrid",
    eventDate: "2027-05-03", eventEndDate: "2027-05-07", deadline: "2026-09-11", url: "https://chi2027.acm.org",
    description: "The biggest HCI conference, including work on accessibility and technology for development.",
  },
  {
    id: "chi-2027-lbw", name: "CHI 2027 Late-Breaking Work", host: "ACM SIGCHI",
    type: "Paper Deadline", fields: ["Computer Science"], locationType: "International", city: "Online submission", format: "Virtual",
    eventDate: "2027-02-20", deadline: "2027-01-22", url: "https://chi2027.acm.org",
    description: "Short, early-stage HCI papers presented as posters at CHI — a good first submission for students.",
  },
  {
    id: "sigir-2027", name: "SIGIR 2027 — Research and Development in Information Retrieval", host: "ACM SIGIR",
    type: "Conference", fields: ["Computer Science", "Data Science"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-07-11", eventEndDate: "2027-07-15", deadline: "2027-01-21", url: "https://sigir.org",
    description: "The top conference for search, recommendation and information retrieval.",
  },
  {
    id: "sigcomm-2027", name: "ACM SIGCOMM 2027", host: "ACM SIGCOMM",
    type: "Conference", fields: ["Computer Science", "Electrical Engineering"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-08-23", eventEndDate: "2027-08-27", deadline: "2027-01-29", url: "https://conferences.sigcomm.org",
    description: "The flagship computer networking conference.",
  },
  {
    id: "sosp-2027", name: "SOSP 2027 — Symposium on Operating Systems Principles", host: "ACM SIGOPS",
    type: "Conference", fields: ["Computer Science"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-10-18", eventEndDate: "2027-10-21", deadline: "2027-04-16", url: "https://sosp.org",
    description: "The top systems research venue, held every other year.",
  },
  {
    id: "arr-feb-2027", name: "ACL Rolling Review — February 2027 cycle", host: "Association for Computational Linguistics",
    type: "Paper Deadline", fields: ["Artificial Intelligence", "Computer Science"], locationType: "International", city: "Online submission", format: "Virtual",
    eventDate: "2027-04-15", deadline: "2027-02-15", url: "https://aclrollingreview.org",
    description: "Submit an NLP paper for review once, then commit it to ACL, NAACL or EMNLP.",
  },
  {
    id: "arr-may-2027", name: "ACL Rolling Review — May 2027 cycle", host: "Association for Computational Linguistics",
    type: "Paper Deadline", fields: ["Artificial Intelligence", "Computer Science"], locationType: "International", city: "Online submission", format: "Virtual",
    eventDate: "2027-07-15", deadline: "2027-05-19", url: "https://aclrollingreview.org",
    description: "The cycle that feeds into EMNLP 2027.",
  },

  // ── Security ────────────────────────────────────────
  {
    id: "ieee-sp-2027", name: "IEEE Symposium on Security and Privacy 2027", host: "IEEE Computer Society",
    type: "Conference", fields: ["Cybersecurity", "Computer Science"], locationType: "International", city: "San Francisco, USA", format: "In-person",
    eventDate: "2027-05-17", eventEndDate: "2027-05-20", deadline: "2026-11-13", url: "https://www.ieee-security.org",
    description: "The oldest top-tier security conference, known as 'Oakland'.",
  },
  {
    id: "usenix-security-2027", name: "USENIX Security 2027", host: "USENIX",
    type: "Conference", fields: ["Cybersecurity", "Computer Science"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-08-11", eventEndDate: "2027-08-13", deadline: "2027-01-28", url: "https://www.usenix.org",
    description: "A top security venue with two submission cycles a year and open-access papers.",
  },
  {
    id: "ccs-2027", name: "ACM CCS 2027 — Computer and Communications Security", host: "ACM SIGSAC",
    type: "Conference", fields: ["Cybersecurity", "Computer Science"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-10-25", eventEndDate: "2027-10-29", deadline: "2027-04-14", url: "https://www.sigsac.org/ccs.html",
    description: "One of the 'big four' security conferences, covering systems, crypto and privacy.",
  },
  {
    id: "ndss-2027", name: "NDSS Symposium 2027", host: "Internet Society",
    type: "Conference", fields: ["Cybersecurity"], locationType: "International", city: "San Diego, USA", format: "In-person",
    eventDate: "2027-02-22", eventEndDate: "2027-02-26", deadline: "2026-07-09", url: "https://www.ndss-symposium.org",
    description: "A top security venue focused on network and distributed system security.",
  },

  // ── Electrical, robotics and energy ─────────────────
  {
    id: "ieee-icc-2027", name: "IEEE ICC 2027 — International Conference on Communications", host: "IEEE Communications Society",
    type: "Conference", fields: ["Electrical Engineering"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-06-07", eventEndDate: "2027-06-11", deadline: "2026-10-15", url: "https://icc2027.ieee-icc.org",
    description: "A flagship communications conference covering wireless, networking and signal processing.",
  },
  {
    id: "ieee-globecom-2027", name: "IEEE GLOBECOM 2027", host: "IEEE Communications Society",
    type: "Conference", fields: ["Electrical Engineering"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-12-06", eventEndDate: "2027-12-10", deadline: "2027-04-15", url: "https://www.comsoc.org",
    description: "IEEE's other flagship communications conference, on 6G, IoT and satellite networks.",
  },
  {
    id: "ieee-pes-gm-2027", name: "IEEE PES General Meeting 2027", host: "IEEE Power & Energy Society",
    type: "Conference", fields: ["Electrical Engineering", "Renewable Energy"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-07-25", eventEndDate: "2027-07-29", deadline: "2026-11-10", url: "https://pes-gm.org",
    description: "The main yearly meeting for power systems engineers and researchers.",
  },
  {
    id: "isscc-2027", name: "ISSCC 2027 — International Solid-State Circuits Conference", host: "IEEE Solid-State Circuits Society",
    type: "Conference", fields: ["Electrical Engineering"], locationType: "International", city: "San Francisco, USA", format: "In-person",
    eventDate: "2027-02-14", eventEndDate: "2027-02-18", deadline: "2026-09-10", url: "https://www.isscc.org",
    description: "The 'chip Olympics' — where the most advanced integrated circuits are first presented.",
  },
  {
    id: "ieee-ecce-2027", name: "IEEE ECCE 2027 — Energy Conversion Congress and Expo", host: "IEEE Power Electronics Society",
    type: "Conference", fields: ["Electrical Engineering", "Renewable Energy"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-10-10", eventEndDate: "2027-10-14", deadline: "2027-02-20", url: "https://www.ieee-ecce.org",
    description: "A major power electronics conference covering converters, motor drives and EV charging.",
  },
  {
    id: "ieee-tencon-2027", name: "IEEE TENCON 2027", host: "IEEE Region 10 (Asia-Pacific)",
    type: "Conference", fields: ["Electrical Engineering", "Computer Science"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-11-15", eventEndDate: "2027-11-18", deadline: "2027-06-30", url: "https://www.ieeer10.org",
    description: "IEEE Asia-Pacific's flagship conference — friendly to students from Bangladesh and the region.",
  },
  {
    id: "icra-2027", name: "ICRA 2027 — International Conference on Robotics and Automation", host: "IEEE Robotics and Automation Society",
    type: "Conference", fields: ["Mechanical Engineering", "Artificial Intelligence", "Electrical Engineering"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-06-01", eventEndDate: "2027-06-05", deadline: "2026-09-15", url: "https://www.ieee-ras.org",
    description: "The largest robotics conference, with a huge exhibition and student competitions.",
  },
  {
    id: "iros-2027", name: "IROS 2027 — Intelligent Robots and Systems", host: "IEEE / RSJ",
    type: "Conference", fields: ["Mechanical Engineering", "Artificial Intelligence"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-10-04", eventEndDate: "2027-10-08", deadline: "2027-03-01", url: "https://www.ieee-ras.org",
    description: "A flagship robotics conference with many workshops for early-career researchers.",
  },
  {
    id: "rss-2027", name: "RSS 2027 — Robotics: Science and Systems", host: "RSS Foundation",
    type: "Conference", fields: ["Mechanical Engineering", "Artificial Intelligence"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-07-12", eventEndDate: "2027-07-16", deadline: "2027-01-30", url: "https://roboticsconference.org",
    description: "A selective single-track robotics conference.",
  },
  {
    id: "ieee-pvsc-2027", name: "IEEE PVSC 2027 — Photovoltaic Specialists Conference", host: "IEEE Electron Devices Society",
    type: "Conference", fields: ["Renewable Energy", "Electrical Engineering", "Physics"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-06-06", eventEndDate: "2027-06-11", deadline: "2027-01-31", url: "https://www.ieee-pvsc.org",
    description: "The main conference for solar cell and photovoltaic system research.",
  },
  {
    id: "wesc-2027", name: "Wind Energy Science Conference 2027", host: "European Academy of Wind Energy",
    type: "Conference", fields: ["Renewable Energy", "Mechanical Engineering"], locationType: "International", city: "To be announced, Europe", format: "In-person",
    eventDate: "2027-06-21", eventEndDate: "2027-06-24", deadline: "2027-01-15", url: "https://www.eawe.eu",
    description: "Europe's largest academic wind energy conference, held every two years.",
  },
  {
    id: "ieee-embc-2027", name: "IEEE EMBC 2027 — Engineering in Medicine and Biology", host: "IEEE Engineering in Medicine and Biology Society",
    type: "Conference", fields: ["Biomedical Engineering", "Electrical Engineering"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-07-19", eventEndDate: "2027-07-23", deadline: "2027-03-15", url: "https://embc.embs.org",
    description: "The largest biomedical engineering conference, with a student paper competition.",
  },
  {
    id: "miccai-2027", name: "MICCAI 2027 — Medical Image Computing and Computer Assisted Intervention", host: "MICCAI Society",
    type: "Conference", fields: ["Biomedical Engineering", "Artificial Intelligence"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-09-26", eventEndDate: "2027-09-30", deadline: "2027-03-01", url: "https://miccai.org",
    description: "The top venue for AI in medical imaging, with many open challenges to join.",
  },

  // ── Engineering ─────────────────────────────────────
  {
    id: "asme-imece-2027", name: "ASME IMECE 2027 — International Mechanical Engineering Congress", host: "American Society of Mechanical Engineers",
    type: "Conference", fields: ["Mechanical Engineering"], locationType: "International", city: "To be announced, USA", format: "In-person",
    eventDate: "2027-11-07", eventEndDate: "2027-11-11", deadline: "2027-03-01", url: "https://event.asme.org/IMECE",
    description: "ASME's largest research conference, covering every area of mechanical engineering.",
  },
  {
    id: "trb-2027", name: "TRB Annual Meeting 2027", host: "Transportation Research Board",
    type: "Conference", fields: ["Civil Engineering", "Public Policy"], locationType: "International", city: "Washington, D.C., USA", format: "In-person",
    eventDate: "2027-01-10", eventEndDate: "2027-01-14", deadline: "2026-08-01", url: "https://www.trb.org",
    description: "The world's biggest transport research meeting, with over 13,000 attendees.",
  },
  {
    id: "trb-2028", name: "TRB Annual Meeting 2028", host: "Transportation Research Board",
    type: "Conference", fields: ["Civil Engineering", "Public Policy"], locationType: "International", city: "Washington, D.C., USA", format: "In-person",
    eventDate: "2028-01-09", eventEndDate: "2028-01-13", deadline: "2027-08-01", url: "https://www.trb.org",
    description: "Submit papers in summer for the January meeting. Many papers go on to Transportation Research Record.",
  },
  {
    id: "iahr-world-congress-2027", name: "IAHR World Congress 2027", host: "International Association for Hydro-Environment Engineering and Research",
    type: "Conference", fields: ["Civil Engineering", "Environmental Science"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-09-12", eventEndDate: "2027-09-17", deadline: "2027-01-31", url: "https://www.iahr.org",
    description: "The main global meeting for hydraulics, rivers, coasts and water engineering.",
  },
  {
    id: "aiche-annual-2027", name: "AIChE Annual Meeting 2027", host: "American Institute of Chemical Engineers",
    type: "Conference", fields: ["Chemical Engineering"], locationType: "International", city: "To be announced, USA", format: "In-person",
    eventDate: "2027-11-07", eventEndDate: "2027-11-11", deadline: "2027-04-15", url: "https://www.aiche.org",
    description: "The largest chemical engineering conference, with a big student poster competition.",
  },
  {
    id: "caadria-2027", name: "CAADRIA 2027", host: "Association for Computer-Aided Architectural Design Research in Asia",
    type: "Conference", fields: ["Architecture"], locationType: "International", city: "To be announced, Asia", format: "In-person",
    eventDate: "2027-04-05", eventEndDate: "2027-04-09", deadline: "2026-11-15", url: "https://caadria.org",
    description: "Asia's main conference for computational and digital design in architecture.",
  },
  {
    id: "acadia-2027", name: "ACADIA 2027", host: "Association for Computer Aided Design in Architecture",
    type: "Conference", fields: ["Architecture"], locationType: "International", city: "To be announced, North America", format: "In-person",
    eventDate: "2027-10-21", eventEndDate: "2027-10-24", deadline: "2027-06-01", url: "https://acadia.org",
    description: "A leading venue for architectural research on fabrication, robotics and computational design.",
  },

  // ── Science ─────────────────────────────────────────
  {
    id: "aps-global-physics-summit-2027", name: "APS Global Physics Summit 2027", host: "American Physical Society",
    type: "Conference", fields: ["Physics"], locationType: "International", city: "To be announced, USA", format: "Hybrid",
    eventDate: "2027-03-14", eventEndDate: "2027-03-19", deadline: "2026-10-30", url: "https://summit.aps.org",
    description: "The world's largest physics meeting, combining the APS March and April meetings.",
  },
  {
    id: "iciam-2027", name: "ICIAM 2027 — International Congress on Industrial and Applied Mathematics", host: "ICIAM",
    type: "Conference", fields: ["Mathematics", "Data Science"], locationType: "International", city: "The Hague, Netherlands", format: "In-person",
    eventDate: "2027-07-19", eventEndDate: "2027-07-23", deadline: "2027-01-31", url: "https://iciam2027.org",
    description: "The biggest applied maths congress, held every four years.",
  },
  {
    id: "acs-spring-2027", name: "ACS Spring 2027", host: "American Chemical Society",
    type: "Conference", fields: ["Chemistry", "Chemical Engineering"], locationType: "International", city: "To be announced, USA", format: "Hybrid",
    eventDate: "2027-03-21", eventEndDate: "2027-03-25", deadline: "2026-10-26", url: "https://www.acs.org",
    description: "One of the world's largest chemistry meetings, with undergraduate poster sessions.",
  },
  {
    id: "acs-fall-2027", name: "ACS Fall 2027", host: "American Chemical Society",
    type: "Conference", fields: ["Chemistry", "Chemical Engineering"], locationType: "International", city: "To be announced, USA", format: "Hybrid",
    eventDate: "2027-08-15", eventEndDate: "2027-08-19", deadline: "2027-03-29", url: "https://www.acs.org",
    description: "ACS's autumn national meeting, with thousands of talks and posters.",
  },
  {
    id: "ismb-2027", name: "ISMB 2027 — Intelligent Systems for Molecular Biology", host: "International Society for Computational Biology",
    type: "Conference", fields: ["Biotechnology", "Data Science"], locationType: "International", city: "To be announced", format: "Hybrid",
    eventDate: "2027-07-11", eventEndDate: "2027-07-15", deadline: "2027-01-15", url: "https://www.iscb.org",
    description: "The flagship conference for bioinformatics and computational biology.",
  },
  {
    id: "igem-jamboree-2027", name: "iGEM Grand Jamboree 2027", host: "iGEM Foundation",
    type: "Research Fest", fields: ["Biotechnology"], locationType: "International", city: "Paris, France", format: "In-person",
    eventDate: "2027-10-27", eventEndDate: "2027-10-30", deadline: "2027-04-30", url: "https://igem.org",
    description: "The world's biggest synthetic biology competition for student teams.",
  },

  // ── Environment and agriculture ─────────────────────
  {
    id: "egu-2027", name: "EGU General Assembly 2027", host: "European Geosciences Union",
    type: "Conference", fields: ["Environmental Science", "Civil Engineering", "Physics"], locationType: "International", city: "Vienna, Austria", format: "Hybrid",
    eventDate: "2027-04-25", eventEndDate: "2027-04-30", deadline: "2027-01-13", url: "https://www.egu.eu",
    description: "Europe's largest earth and climate science meeting — abstracts only, with support for early-career scientists.",
  },
  {
    id: "agu-2027", name: "AGU Annual Meeting 2027", host: "American Geophysical Union",
    type: "Conference", fields: ["Environmental Science", "Physics"], locationType: "International", city: "To be announced, USA", format: "Hybrid",
    eventDate: "2027-12-13", eventEndDate: "2027-12-17", deadline: "2027-07-28", url: "https://www.agu.org",
    description: "The world's largest earth and space science meeting, abstracts only.",
  },
  {
    id: "tropentag-2027", name: "Tropentag 2027", host: "German universities and ATSAF",
    type: "Conference", fields: ["Agriculture", "Environmental Science"], locationType: "International", city: "To be announced, Germany", format: "In-person",
    eventDate: "2027-09-15", eventEndDate: "2027-09-17", deadline: "2027-04-15", url: "https://www.tropentag.de",
    description: "A friendly conference on tropical agriculture and food security, popular with students from South Asia.",
  },
  {
    id: "world-water-week-2027", name: "World Water Week 2027", host: "Stockholm International Water Institute",
    type: "Conference", fields: ["Environmental Science", "Civil Engineering", "Public Policy"], locationType: "International", city: "Stockholm, Sweden", format: "Hybrid",
    eventDate: "2027-08-22", eventEndDate: "2027-08-26", deadline: "2027-02-15", url: "https://www.worldwaterweek.org",
    description: "The main global event on water, with sessions on deltas, sanitation and climate.",
  },
  {
    id: "adaptation-futures-2027", name: "Adaptation Futures 2027", host: "World Adaptation Science Programme",
    type: "Conference", fields: ["Environmental Science", "Public Policy"], locationType: "International", city: "To be announced", format: "Hybrid",
    eventDate: "2027-10-11", eventEndDate: "2027-10-14", deadline: "2027-03-31", url: "https://wasp-adaptation.org",
    description: "A major conference on climate adaptation research and practice, held every two years.",
  },

  // ── Business, economics and policy ──────────────────
  {
    id: "aom-2027", name: "Academy of Management Annual Meeting 2027", host: "Academy of Management",
    type: "Conference", fields: ["Business"], locationType: "International", city: "To be announced, USA", format: "In-person",
    eventDate: "2027-08-06", eventEndDate: "2027-08-10", deadline: "2027-01-12", url: "https://aom.org",
    description: "The largest management research conference, with doctoral consortia for PhD students.",
  },
  {
    id: "informs-annual-2027", name: "INFORMS Annual Meeting 2027", host: "INFORMS",
    type: "Conference", fields: ["Supply Chain Management", "Business", "Mathematics"], locationType: "International", city: "To be announced, USA", format: "In-person",
    eventDate: "2027-10-17", eventEndDate: "2027-10-20", deadline: "2027-05-15", url: "https://www.informs.org",
    description: "The biggest operations research and analytics meeting, with many student awards.",
  },
  {
    id: "poms-2027", name: "POMS Annual Conference 2027", host: "Production and Operations Management Society",
    type: "Conference", fields: ["Supply Chain Management", "Business"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-04-30", eventEndDate: "2027-05-03", deadline: "2026-11-30", url: "https://www.poms.org",
    description: "A key conference for operations and supply chain management research.",
  },
  {
    id: "efa-2027", name: "European Finance Association Annual Meeting 2027", host: "European Finance Association",
    type: "Conference", fields: ["Finance", "Economics"], locationType: "International", city: "To be announced, Europe", format: "In-person",
    eventDate: "2027-08-18", eventEndDate: "2027-08-21", deadline: "2027-02-15", url: "https://www.efa2027.org",
    description: "Europe's main academic finance conference, with a doctoral tutorial.",
  },
  {
    id: "eea-esem-2027", name: "EEA-ESEM Congress 2027", host: "European Economic Association and Econometric Society",
    type: "Conference", fields: ["Economics"], locationType: "International", city: "To be announced, Europe", format: "In-person",
    eventDate: "2027-08-23", eventEndDate: "2027-08-27", deadline: "2027-02-15", url: "https://www.eeassoc.org",
    description: "Europe's largest economics conference.",
  },
  {
    id: "neudc-2027", name: "NEUDC 2027 — Northeast Universities Development Consortium", host: "NEUDC host university",
    type: "Conference", fields: ["Economics", "Public Policy"], locationType: "International", city: "To be announced, USA", format: "In-person",
    eventDate: "2027-11-06", eventEndDate: "2027-11-07", deadline: "2027-07-15", url: "https://www.neudc.org",
    description: "A key development economics conference where many PhD students present job-market papers.",
  },
  {
    id: "appam-2027", name: "APPAM Fall Research Conference 2027", host: "Association for Public Policy Analysis and Management",
    type: "Conference", fields: ["Public Policy", "Economics"], locationType: "International", city: "To be announced, USA", format: "In-person",
    eventDate: "2027-11-11", eventEndDate: "2027-11-13", deadline: "2027-05-10", url: "https://www.appam.org",
    description: "The main public policy research conference in the US.",
  },
  {
    id: "asil-2027", name: "Asian Society of International Law Biennial Conference 2027", host: "Asian Society of International Law",
    type: "Conference", fields: ["Law", "Public Policy"], locationType: "International", city: "To be announced, Asia", format: "In-person",
    eventDate: "2027-08-26", eventEndDate: "2027-08-28", deadline: "2027-02-28", url: "https://www.asiansil.org",
    description: "A conference for international law scholars across Asia, with an early-career track.",
  },
  {
    id: "hult-prize-2027", name: "Hult Prize 2027", host: "Hult Prize Foundation",
    type: "Research Fest", fields: ["Business", "Economics", "Public Policy"], locationType: "International", city: "Campus rounds worldwide, finals abroad", format: "Hybrid",
    eventDate: "2027-09-20", deadline: "2026-12-15", url: "https://www.hultprize.org",
    description: "A student social enterprise competition with a USD 1 million prize. Many Bangladeshi universities run campus rounds.",
  },

  // ── Health and pharmacy ─────────────────────────────
  {
    id: "cugh-2027", name: "CUGH 2027 Global Health Conference", host: "Consortium of Universities for Global Health",
    type: "Conference", fields: ["Public Health"], locationType: "International", city: "To be announced, USA", format: "Hybrid",
    eventDate: "2027-03-19", eventEndDate: "2027-03-21", deadline: "2026-11-01", url: "https://www.cugh.org",
    description: "A global health meeting with a large student poster competition.",
  },
  {
    id: "apha-2027", name: "APHA Annual Meeting 2027", host: "American Public Health Association",
    type: "Conference", fields: ["Public Health"], locationType: "International", city: "To be announced, USA", format: "Hybrid",
    eventDate: "2027-11-07", eventEndDate: "2027-11-10", deadline: "2027-03-15", url: "https://www.apha.org",
    description: "The largest public health gathering in the US.",
  },
  {
    id: "world-health-summit-2027", name: "World Health Summit 2027", host: "World Health Summit",
    type: "Research Fest", fields: ["Public Health", "Public Policy"], locationType: "International", city: "Berlin, Germany", format: "Hybrid",
    eventDate: "2027-10-10", eventEndDate: "2027-10-12", deadline: "2027-06-30", url: "https://www.worldhealthsummit.org",
    description: "A global health policy forum with a young physicians and researchers program.",
  },
  {
    id: "fip-congress-2027", name: "FIP World Congress of Pharmacy and Pharmaceutical Sciences 2027", host: "International Pharmaceutical Federation",
    type: "Conference", fields: ["Pharmacy"], locationType: "International", city: "To be announced", format: "In-person",
    eventDate: "2027-09-05", eventEndDate: "2027-09-09", deadline: "2027-03-31", url: "https://www.fip.org",
    description: "The global meeting of pharmacists and pharmaceutical scientists.",
  },
  {
    id: "aaps-pharmsci-360-2027", name: "AAPS PharmSci 360 2027", host: "American Association of Pharmaceutical Scientists",
    type: "Conference", fields: ["Pharmacy", "Biotechnology"], locationType: "International", city: "To be announced, USA", format: "In-person",
    eventDate: "2027-10-17", eventEndDate: "2027-10-20", deadline: "2027-05-15", url: "https://www.aaps.org",
    description: "A big pharmaceutical science meeting on drug discovery, formulation and manufacturing.",
  },

  // ── Research fests and student competitions ─────────
  {
    id: "falling-walls-lab-2027", name: "Falling Walls Lab Dhaka 2027", host: "Falling Walls Foundation with local partners",
    type: "Research Fest", fields: ["Computer Science", "Public Health", "Environmental Science", "Biotechnology", "Electrical Engineering"], locationType: "Local", city: "Dhaka, Bangladesh", format: "In-person",
    eventDate: "2027-09-15", deadline: "2027-07-31", url: "https://falling-walls.com",
    description: "Pitch your research idea in three minutes. Winners go to the Falling Walls finale in Berlin.",
  },
  {
    id: "3mt-asia-pacific-2027", name: "Three Minute Thesis (3MT) Asia-Pacific 2027", host: "University of Queensland and partner universities",
    type: "Research Fest", fields: [], locationType: "International", city: "Online and Brisbane, Australia", format: "Hybrid",
    eventDate: "2027-10-01", deadline: "2027-08-15", url: "https://threeminutethesis.uq.edu.au",
    description: "PhD students explain their thesis in three minutes with one slide. Enter through your university's own round.",
  },
  {
    id: "imagine-cup-2027", name: "Microsoft Imagine Cup 2027", host: "Microsoft",
    type: "Research Fest", fields: ["Computer Science", "Artificial Intelligence"], locationType: "International", city: "Online, finals at Microsoft Build", format: "Hybrid",
    eventDate: "2027-05-18", deadline: "2027-01-15", url: "https://imaginecup.microsoft.com",
    description: "A global student startup competition for AI-powered products.",
  },
  {
    id: "solar-decathlon-2027", name: "Solar Decathlon Design Challenge 2027", host: "U.S. Department of Energy",
    type: "Research Fest", fields: ["Architecture", "Renewable Energy", "Civil Engineering"], locationType: "International", city: "Golden, Colorado, USA", format: "Hybrid",
    eventDate: "2027-04-16", eventEndDate: "2027-04-18", deadline: "2026-10-30", url: "https://www.solardecathlon.gov",
    description: "Student teams design zero-energy buildings. International teams can join the design challenge.",
  },

  // ── Paper deadlines (journals and special calls) ────
  {
    id: "usenix-security-2027-cycle1", name: "USENIX Security 2027 — first submission cycle", host: "USENIX",
    type: "Paper Deadline", fields: ["Cybersecurity"], locationType: "International", city: "Online submission", format: "Virtual",
    eventDate: "2026-12-10", deadline: "2026-08-26", url: "https://www.usenix.org",
    description: "The first of two yearly cycles. Accepted papers appear at USENIX Security 2027.",
  },
  {
    id: "neurips-2027-datasets", name: "NeurIPS 2027 Datasets and Benchmarks Track", host: "NeurIPS Foundation",
    type: "Paper Deadline", fields: ["Artificial Intelligence", "Data Science"], locationType: "International", city: "Online submission", format: "Virtual",
    eventDate: "2027-09-25", deadline: "2027-05-28", url: "https://neurips.cc",
    description: "A track for new datasets and benchmarks — a great fit for Bangla language or local health datasets.",
  },
  {
    id: "mlhc-2027", name: "Machine Learning for Healthcare (MLHC) 2027", host: "MLHC",
    type: "Paper Deadline", fields: ["Artificial Intelligence", "Public Health", "Data Science"], locationType: "International", city: "Online submission", format: "Virtual",
    eventDate: "2027-06-15", deadline: "2027-04-10", url: "https://www.mlforhc.org",
    description: "Papers on machine learning for clinical and public health problems.",
  },
  {
    id: "compass-2027", name: "ACM COMPASS 2027 — Computing and Sustainable Societies", host: "ACM SIGCAS",
    type: "Conference", fields: ["Computer Science", "Public Policy"], locationType: "International", city: "To be announced", format: "Hybrid",
    eventDate: "2027-07-20", eventEndDate: "2027-07-23", deadline: "2027-02-15", url: "https://compass.acm.org",
    description: "A conference on computing for development, health and sustainability in the Global South.",
  },
  {
    id: "ictd-2027", name: "ICTD 2027 — Information and Communication Technologies and Development", host: "ICTD community",
    type: "Conference", fields: ["Computer Science", "Public Policy", "Economics"], locationType: "International", city: "To be announced", format: "Hybrid",
    eventDate: "2027-12-06", eventEndDate: "2027-12-09", deadline: "2027-06-15", url: "https://ictdx.org",
    description: "A multi-disciplinary conference on technology and development, with strong South Asia participation.",
  },
];
