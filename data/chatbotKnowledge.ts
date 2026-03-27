export type KnowledgeItem = {
  keywords: string[];
  answer: string;
};

export const chatbotKnowledge: KnowledgeItem[] = [
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "greetings", "anyone there", "hi there", "hello there", "whos this", "who are you"],
    answer: "Hello! 👋 I'm the Delphin Associates virtual assistant. I can tell you about our <strong>services</strong>, show you our <strong>projects</strong>, or help you <strong>contact</strong> our team. What can I do for you today?",
  },
  {
    keywords: ["thank you", "thanks", "thanks a lot", "thank you so much", "perfect", "great", "awesome", "good", "cool", "helpful", "okay", "ok", "got it"],
    answer: "You're very welcome! 😊 Is there anything else you'd like to know about our construction services or projects? I'm here to help!",
  },
  {
    keywords: [
      "who", "founder", "owner", "delphin stanley", "leader", "stanley", "delphin p stanley",
      "started", "created", "boss", "managed", "head", "principal", "visionary", "director", "establish",
      "who started this", "who is the owner", "who is the boss", "founder details", "mr delphin", "stanley sir"
    ],
    answer: "Delphin Associates was established in 1999 by <strong>Mr. Delphin P. Stanley (DCE, B.Tech)</strong>. A visionary leader with over 25 years of proven experience in civil construction, he founded the organization with a commitment to 100% Quality Assurance. His motto, <em>\"You Dream We Build\"</em>, reflects his dedication to turning client visions into high-quality reality.",
  },
  {
    keywords: [
      "history", "since", "established", "year", "how old", "experience", "how long",
      "founded", "roots", "timeline", "past", "legacy", "decades", "proven", "track record",
      "how long have you been in business", "when was it started", "company history", "years of experience"
    ],
    answer: "Established in <strong>1999</strong>, Delphin Associates has over <strong>25 years of impeccable industry experience</strong> in civil construction and building consultancy across Tamil Nadu.",
  },
  {
    keywords: [
      "motto", "philosophy", "catchphrase", "slogan", "you dream we build",
      "vision", "mission", "values", "core", "principle", "standard", "goal", "aim",
      "company vision", "what do you believe", "quality policy", "your motto"
    ],
    answer: "Our core motto is: <em>\"You Dream We Build.\"</em> We focus on building lifelong trust through unparalleled quality and commitment to our clients' visions.",
  },
  {
    keywords: [
      "church", "churches", "csi", "st mark", "madipakkam", "madhavaram", "wallajabad", "thiruvottiyur", "irumbedu", "religious",
      "shrine", "cathedral", "chapel", "parish", "worship", "liturgy", "altar", "nave", "aisle", "pews", "choir",
      "church construction", "build a church", "religious building", "csi church projects", "st mark's church"
    ],
    answer: "We have specialized architectural capabilities for specialized church buildings. Notable projects include <strong>CSI St Mark's Church (Madipakkam)</strong>, <strong>CSI Arul Church (Madhavaram - Ongoing)</strong>, and projects in Wallajabad and Thiruvottiyur. <a href='/projects' class='text-accent underline pt-1 block'>View Church Projects</a>",
  },
  {
    keywords: [
      "industrial", "factory", "factories", "ford", "alliance", "mm nagar", "peb", "manufacturing", "warehouse",
      "plant", "unit", "production", "dock", "crane", "heavy-duty", "steel", "assembly", "logistics", "oem",
      "industrial construction", "factory building", "manufacturing plant", "it park", "ford factory"
    ],
    answer: "We specialize in heavy-duty manufacturing units and IT parks. Our portfolio includes the <strong>Ford Alliance Group</strong> infrastructure at MM Nagar, featuring 30m clear span PEB structures. <a href='/projects' class='text-accent underline pt-1 block'>View Industrial Projects</a>",
  },
  {
    keywords: [
      "residential", "flat", "flats", "home", "homes", "villa", "villas", "apartment", "apartments", "t nagar", "mambalam", "kolathur", "chengalpattu", "porur",
      "house", "houses", "dwelling", "residence", "living", "luxury", "rooms", "kitchen", "bedroom", "floor", "independent",
      "build a house", "buy a flat", "residential project", "apartment construction", "luxury villa"
    ],
    answer: "We build elite apartments and standalone villas. Recent projects include luxury redevelopments in <strong>T. Nagar</strong>, boutique residences in <strong>West Mambalam</strong>, and premium flats in <strong>Porur</strong> and <strong>Chengalpattu</strong>. <a href='/projects' class='text-accent underline pt-1 block'>View Residential Projects</a>",
  },
  {
    keywords: [
      "institutional", "school", "schools", "college", "colleges", "peri", "education", "hub", "public sector",
      "campus", "university", "lab", "classroom", "student", "academic", "infrastructure", "training",
      "educational building", "school construction", "college campus", "peri college project"
    ],
    answer: "We construct state-of-the-art educational hubs and public sector facilities. A key project is the <strong>Peri College</strong> campus expansion, serving over 3,200 students with advanced laboratories.",
  },
  {
    keywords: [
      "service", "services", "what do you do", "offer", "construct", "build", "provide",
      "work", "capability", "specialization", "expert", "professional", "civil", "engineering", "renovate", "renovation",
      "what services do you provide", "what can you do", "types of construction", "construction work"
    ],
    answer: "Our services include <strong>Residential Construction</strong>, <strong>Industrial & Commercial</strong>, <strong>Institutional Buildings</strong>, <strong>Church Buildings</strong>, and <strong>End-to-end Consultancy</strong> (including plan approval and structural design). <a href='/services' class='text-accent underline pt-1 block'>Explore Services</a>",
  },
  {
    keywords: [
      "consult", "consultancy", "plan", "plans", "design", "designs", "architect", "structural", "analysis", "soil testing", "approval",
      "layout", "blueprint", "estimation", "valuation", "survey", "permit", "legal", "stability",
      "building approval", "structural design", "architectural planning", "cmda approval", "dtcp approval"
    ],
    answer: "Yes, we offer comprehensive <strong>Building Consultancy Services</strong>. This includes soil testing, structural design, plan approval, and project management to ensure a seamless construction experience.",
  },
  {
    keywords: [
      "location", "located", "where", "address", "city", "office", "chennai", "tamil nadu", "ooty",
      "map", "direction", "place", "reach", "visit", "area", "region", "district", "state",
      "where is your office", "your location", "office address", "chennai office", "where are you based"
    ],
    answer: "We are headquartered in <strong>Chennai</strong>, but we handle projects practically across the entire state of <strong>Tamil Nadu</strong>, including Ooty, Chengalpattu, and Wallajabad. <a href='/contact' class='text-accent underline pt-1 block'>Get Directions</a>",
  },
  {
    keywords: [
      "time", "duration", "how long", "long", "timeline", "completion", "period",
      "days", "months", "schedule", "deadline", "fast", "speed", "quick", "delivery",
      "how much time", "project duration", "how long to build", "estimated time"
    ],
    answer: "Project timelines vary by scale. Large-scale church or industrial projects typically take <strong>11-14 months</strong>, while residential redevelopments are often completed within <strong>12 months</strong>.",
  },
  {
    keywords: [
      "price", "pricing", "cost", "budget", "quote", "quoted", "estimate", "free consultation",
      "money", "payment", "cheap", "expensive", "affordable", "economical", "rate", "fees", "billing",
      "how much", "cost of construction", "price per sqft", "get a quote", "budget estimate"
    ],
    answer: "We focus on designing <strong>economical yet high-quality</strong> buildings. We offer a <strong>free consultation</strong> to discuss your project scope and provide a transparent estimate. <a href='/contact' class='text-accent underline pt-1 block'>Get a Quote</a>",
  },
  {
    keywords: [
      "quality", "trust", "assurance", "safe", "safely", "precision", "integrity",
      "reliable", "standard", "certified", "safety", "lti", "strong", "concrete", "durable", "material",
      "is it safe", "quality of work", "safety standards", "construction quality"
    ],
    answer: "Quality is our cornerstone. We provide <strong>100% quality assurance</strong> and maintain strict safety protocols, including a zero Loss Time Injury (LTI) record on our industrial projects.",
  },
  {
    keywords: [
      "contact", "phone", "email", "reach", "call", "appointment",
      "message", "talk", "speak", "number", "mobile", "whatsapp", "mail", "inquiry",
      "phone number", "email address", "how to contact", "your mobile number", "contact details"
    ],
    answer: "You can reach us at <strong>+91 98412 43345</strong> or via email at <strong>delphinassociates@gmail.com</strong>. You can also visit our <a href='/contact' class='text-accent underline pt-1 block'>Contact Page</a>.",
  },
  {
    keywords: [
      "renovation", "renovations", "renovate", "remodel", "remodeling", "alter", "modernize", "repair", "fix", "upgrade", "maintenance", "house renovation"
    ],
    answer: "Yes, we handle extensive renovation and modernization projects for residential and commercial buildings, ensuring structural integrity while giving them a fresh, modern look.",
  },
  {
    keywords: [
      "approval", "legal", "cmda", "dtcp", "corporation", "permit", "sanction", "building permit"
    ],
    answer: "We assist clients in navigating the legal landscape, including obtaining necessary approvals from bodies like CMDA, DTCP, and local corporations for both residential and industrial projects.",
  },
  {
    keywords: ["team", "staff", "employees", "people", "workers", "engineers", "management", "leadership", "technical team", "management team", "who works here", "office staff"],
    answer: "Our team consists of highly experienced management and technical professionals. Our Management is led by <strong>Mr. Delphin P. Stanley</strong> (Founder) and <strong>Mr. B.S. Sundar Singh</strong>. Our Technical Division is led by <strong>Mr. S.M. Darwin Rholland</strong>. <a href='/about' class='text-accent underline pt-1 block'>Meet the Full Team</a>",
  },
  {
    keywords: ["sundar singh", "management leader", "financial", "operations manager", "bs sundar singh", "who handles accounts", "finance head"],
    answer: "<strong>Mr. B.S. Sundar Singh (DCE, B.Tech)</strong> is our Management Team Leader. He ensures transparency in financial systems and organizational efficiency, emphasizing timely project completion and client satisfaction.",
  },
  {
    keywords: ["darwin rholland", "technical leader", "design innovation", "technical division", "sm darwin rholland", "who leads technical", "technical head", "head of engineering"],
    answer: "<strong>Mr. S.M. Darwin Rholland (B.Tech)</strong> leads our Technical Division. He focuses on precision planning, design innovation, and ensuring all projects meet the highest technical standards.",
  },
  {
    keywords: ["godwin", "planning engineer", "execution engineer", "mr godwin", "who handles planning"],
    answer: "<strong>Mr. Godwin (DCE)</strong> is an experienced engineer with 10 years of expertise in project planning and execution at Delphin Associates.",
  },
  {
    keywords: ["janarthanan", "structural engineer", "quality control", "mr janarthanan", "who does structural design", "quality inspector"],
    answer: "<strong>Mr. Janarthanan. S (DCE)</strong> is a skilled engineer with 10 years of experience, specializing in structural design and rigorous quality control.",
  },
  {
    keywords: ["john griffin", "residential engineer", "commercial engineer", "mr john griffin", "who builds flats"],
    answer: "<strong>Mr. John Griffin. C (DCE Civil)</strong> is a dedicated engineer with 6 years of experience, focusing specifically on our residential and commercial construction projects.",
  },
  {
    keywords: ["glenn grifton", "civil engineer", "junior engineer", "mr glenn", "young engineer"],
    answer: "<strong>Mr. Glenn Grifton. C (BE Civil)</strong> is a young professional engineer with 4 years of experience, contributing to our innovative and modern construction solutions.",
  },
  {
    keywords: ["st mark", "madipakkam church", "madipakkam project"],
    answer: "The <strong>CSI St Mark's Church (Madipakkam)</strong> is a 14,500 sq.ft contemporary worship space for 600 people. It features exposed concrete fins for passive cooling and was delivered in just 14 months.",
  },
  {
    keywords: ["thiruvottiyur church", "thiruvottiyur project", "historic church"],
    answer: "Our project in <strong>Thiruvottiyur</strong> focused on preserving a historic heritage façade while reinforcing the structure with micro-piles and integrating modern acoustics.",
  },
  {
    keywords: ["irumbedu church", "irumbedu project", "precast church"],
    answer: "At <strong>Irumbedu</strong>, we delivered a dignified structure using 60% on-site prefabrication, achieving 18% annual energy savings for the parish community.",
  },
  {
    keywords: ["wallajabad church", "wallajabad project", "rcc roof"],
    answer: "The <strong>Wallajabad church</strong> features a unique sculpted RCC roof with a 21m clear span and handcrafted stained-glass panels sourced from Puducherry artisans.",
  },
  {
    keywords: ["t nagar project", "t nagar apartment", "mechanized parking"],
    answer: "Our <strong>T. Nagar</strong> redevelopment features 8 luxury apartments with a concierge lobby, mechanized parking, and structural design using PT slabs for a premium feel.",
  },
  {
    keywords: ["mambalam project", "mambalam residence", "cross ventilation"],
    answer: "In <strong>West Mambalam</strong>, we built 12 boutique homes focusing on cross-ventilated layouts and community terraces for multigenerational living.",
  },
  {
    keywords: ["kolathur project", "kolathur housing", "low maintenance"],
    answer: "Our <strong>Kolathur</strong> project delivered 18 apartments and 4 retail shops with a focus on 100% budget adherence and low lifecycle maintenance costs.",
  },
  {
    keywords: ["chengalpattu project", "chengalpattu flats", "gated community"],
    answer: "The <strong>Chengalpattu</strong> super deluxe flats comprise a 1.1 lakh sq.ft gated community with EV-ready infrastructure and IGBC pre-certification for sustainability.",
  },
  {
    keywords: ["porur project", "porur residence", "biophilic"],
    answer: "Our <strong>Porur</strong> residences feature biophilic pockets and vertical greens, with 42% open space ratio tailored for modern urban families.",
  },
  {
    keywords: ["ford alliance", "factory project", "assembly line"],
    answer: "The <strong>Ford Alliance</strong> facility was built to global OEM standards, featuring 30m clear span PEB structures and a zero LTI safety record during its execution.",
  },
  {
    keywords: ["mm nagar factory", "manufacturing floor", "linear dock"],
    answer: "Our <strong>MM Nagar</strong> factory expansion (78,000 sq.ft) improved material handling time by 28% through linear dock planning and double-skin panel roofing.",
  },
  {
    keywords: ["poonamallee project", "poonamallee industrial", "multi tenant"],
    answer: "The <strong>Poonamallee</strong> industrial complex is a 4-acre multi-tenant ecosystem supporting 5 MSME units with shared services and 11m clear height sheds.",
  },
  {
    keywords: ["peri college", "academic block", "campus expansion"],
    answer: "The <strong>Peri College</strong> campus expansion serves over 3,200 students, adding 12 specialized laboratories and advanced academic blocks linked by shaded corridors.",
  },
  {
    keywords: ["ooty project", "ooty cottage", "nilgiri"],
    answer: "Our <strong>Ooty cottage cluster</strong> blends stone masonry and timber trusses at an altitude of 2,200m, achieving 70% local material sourcing for authentic Nilgiri aesthetics.",
  },
  {
    keywords: ["road project", "village road", "flood resilience"],
    answer: "We have executed <strong>24 km of community roads</strong> connecting 18 habitations, integrating 320 recharge pits to improve flood resilience and village connectivity.",
  },
  {
    keywords: ["drainage project", "survey project", "gis mapping"],
    answer: "Our urban modernization works include <strong>6,500 acres of DGPS survey</strong> and 17 km of new drainage lines, reducing monsoon waterlogging by 48%.",
  },
  {
    keywords: ["arul church", "madhavaram project", "ongoing church"],
    answer: "The <strong>CSI Arul Church (Madhavaram)</strong> is an ongoing project for 700 worshippers, featuring soaring hybrid arches and ETFE skylights for natural daylighting.",
  },
];



