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
  // --- REGIONAL CONSTRUCTION & DOUBTS (CHENNAI/TAMIL NADU) ---
  {
    keywords: ["cost", "square feet", "sqft", "price per sqft", "chennai construction cost", "budget per sqft", "rate", "building cost", "how much to build", "construction rate", "estimate"],
    answer: "In Chennai, residential construction typically ranges from <strong>₹1,800 to ₹2,500+ per sq.ft</strong> depending on the finish (Basic, Premium, or Luxury). Commercial and industrial PEB structures often range between ₹1,200 to ₹1,800 per sq.ft. We offer a transparent, detailed quote tailored to your exact needs.",
  },
  {
    keywords: ["approval", "cmda", "dtcp", "gcc", "corporation", "panchayat", "plan approval", "building permit", "sanction", "legal approval", "chennai corporation"],
    answer: "For building in Chennai, you need <strong>CMDA</strong> (Chennai Metropolitan Development Authority) or <strong>DTCP</strong> approval for the land layout, followed by building plan sanction from the Greater Chennai Corporation (GCC) or local Panchayat. We handle this entire end-to-end approval process for our clients.",
  },
  {
    keywords: ["methods", "construction methods", "types of construction", "framed structure", "load bearing", "peb", "pre engineered", "building technique", "how do you build"],
    answer: "The most common methods in Tamil Nadu are <strong>RCC Framed Structures</strong> (columns and beams) for residential and commercial buildings (highly earthquake resistant in Zone III), and <strong>Load Bearing</strong> for smaller single-story homes. We also specialize in <strong>PEB (Pre-Engineered Buildings)</strong> for fast industrial setups.",
  },
  {
    keywords: ["sand", "m-sand", "river sand", "p-sand", "plastering sand", "materials", "which sand is best", "aggregate", "m sand"],
    answer: "Due to river sand scarcity and ecological regulations in Tamil Nadu, <strong>M-Sand (Manufactured Sand)</strong> is the standard for concreting and blockwork, while finely graded <strong>P-Sand (Plastering Sand)</strong> is used for smooth wall finishes. It is highly durable, ethically sourced, and eco-friendly.",
  },
  {
    keywords: ["soil", "testing", "soil test", "sbc", "safe bearing capacity", "clay", "sandy", "foundation", "basement", "chennai soil"],
    answer: "Soil testing is critical! Chennai has varied soil types (sandy near the coast like ECR/OMR, clayey in central regions like Anna Nagar). We determine the <strong>Safe Bearing Capacity (SBC)</strong> through rigorous testing to decide between Isolated Footings, Raft Foundations, or deep Pile Foundations.",
  },
  {
    keywords: ["water", "borewell", "groundwater", "sump", "water scarcity", "depth", "water table", "monsoon", "chennai water"],
    answer: "Chennai experiences significant groundwater fluctuations. Depending on the zone, borewells range from 80ft to over 600ft (e.g., OMR/Medavakkam). We always integrate high-capacity underground sumps and mandatory Rain Water Harvesting (RWH) pits into our plans to secure water resources.",
  },
  {
    keywords: ["waterproofing", "monsoon", "leakage", "rain", "dampness", "roof treatment", "weathering course", "terrace", "terrace cooling", "heat", "summer"],
    answer: "To handle Chennai's heavy cyclonic monsoons and peak summer heat, we use advanced <strong>waterproofing chemicals</strong> layered with a <strong>Weathering Course</strong> (usually pressed clay tiles or heat-reflective cool roof tiles) on the terrace to prevent leakage and dramatically reduce indoor temperatures.",
  },
  {
    keywords: ["cement", "tmt", "steel", "bar", "grade", "opc", "ppc", "53 grade", "43 grade", "fe500", "fe550", "which cement", "best steel", "tata tiscon", "jsw"],
    answer: "We strictly use ISI-certified, top-tier materials: <strong>Fe500D or Fe550D grade TMT steel bars</strong> for superior ductility (crucial for earthquake resistance) and premium <strong>Grade 53 OPC/PPC cement</strong> customized for structural setting time and coastal environmental exposure.",
  },
  {
    keywords: ["vastu", "vaastu", "vasthu", "direction", "facing", "north", "east", "entrance", "auspicious", "energy"],
    answer: "We fully accommodate <strong>Vastu Shastra</strong> compliance based on client requests. This involves optimal placement of the main entrance (typically North, East, or North-East), Pooja room, Kitchen (South-East corner), and Master Bedroom (South-West) to ensure harmonious positive energy.",
  },
  {
    keywords: ["delay", "flood", "cyclone", "chennai weather", "natural disaster", "rain delay", "schedule", "on time"],
    answer: "Chennai faces heavy cyclonic rains during Nov-Dec. We account for this by scheduling major concrete and foundation work during dry months, and focusing on controlled curing and interior finishing during the monsoons to stay exactly on deadlines.",
  },
  {
    keywords: ["brick", "red brick", "fly ash", "solid block", "aac block", "hollow block", "masonry", "wall construction", "which brick", "blocks"],
    answer: "While traditional <strong>Red Chamber Bricks</strong> are iconic, <strong>AAC (Autoclaved Aerated Concrete) Blocks</strong> are highly recommended in modern Chennai builds. AAC blocks are lightweight, offer excellent thermal insulation against the heat, and reduce structural dead loads significantly.",
  },
  {
    keywords: ["elevation", "design", "3d", "facade", "front design", "exterior", "looks", "architectural"],
    answer: "We provide complete <strong>3D Elevation Designs</strong> before construction. In Tamil Nadu, current trends range from traditional Chettinad-inspired elements to ultra-modern contemporary facades featuring structural glazing, louvers, and biophilic vertical gardens.",
  },
  {
    keywords: ["contract", "agreement", "hidden cost", "transparency", "how you work", "process", "lump sum", "turnkey", "contractor", "package", "hidden charges"],
    answer: "We operate on a transparent <strong>Turnkey Contract</strong> basis. Everything from exact material specifications, project timelines, to phase-wise payment schedules is documented clearly in a legal agreement before work begins—ensuring absolute trust and zero hidden costs.",
  },
  // --- ADVANCED STRUCTURAL, INTERIOR & LOGISTICAL KNOWLEDGE ---
  {
    keywords: ["fsi", "carpet area", "plinth area", "built up area", "super built up area", "sqft calculation", "floor space index", "coverage"],
    answer: "<strong>FSI (Floor Space Index)</strong> determines how much you can build on your plot based on road width in Chennai. <strong>Carpet Area</strong> is the actual usable floor space. <strong>Plinth/Built-up Area</strong> includes wall thickness, while <strong>Super Built-up</strong> adds common areas like stairs and lobbies. We optimize designs to maximize your legal FSI.",
  },
  {
    keywords: ["setback", "leaving space", "margin", "compound space", "rules", "cmda rules", "building rules", "gap", "distance"],
    answer: "CMDA/DTCP mandates specific <strong>Setbacks</strong> (empty space around the building) for ventilation and fire safety. Typically, front setbacks rely on road width, while side and rear setbacks are usually 1.5m to 2m for independent houses to ensure legal compliance and natural lighting.",
  },
  {
    keywords: ["loan", "bank loan", "home loan", "finance", "emi", "sbi", "hdfc", "lic", "estimation for loan", "approval"],
    answer: "We provide detailed, bank-approved <strong>Construction Estimations and Blueprints</strong> required to easily secure home loans from major banks (SBI, HDFC, LIC, etc.). Because we follow CMDA norms strictly, our clients face zero hassle during bank technical valuations.",
  },
  {
    keywords: ["plumbing", "pipe", "pipes", "water line", "cpvc", "upvc", "pvc", "ashirvad", "supreme", "water pressure", "plumber"],
    answer: "For plumbing, we use high-grade <strong>CPVC pipes for hot water</strong> and <strong>UPVC/PVC for cold water and drainage</strong> (brands like Ashirvad or Supreme). We also incorporate pressure-testing mechanisms to guarantee zero-leakage inside concealed bathroom walls before tiling.",
  },
  {
    keywords: ["electrical", "wire", "wires", "cable", "switch", "switches", "finolex", "havells", "anchor", "frls", "concealed wiring"],
    answer: "Electrical safety is paramount. We use <strong>FRLS (Fire Retardant Low Smoke)</strong> copper wires (Finolex, Havells, etc.) with heavy-duty PVC conduits. We provide ample plug points, AC provisions, and high-quality modular switches (Anchor Roma/Legrand) mapped to modern family needs.",
  },
  {
    keywords: ["paint", "painting", "asian paints", "putty", "primer", "emulsion", "weather proof", "color", "wall finish", "exterior paint"],
    answer: "Our standard painting process includes 2 coats of premium wall putty, 1 coat of primer, and 2 coats of high-grade <strong>Tractor or Premium Emulsion (Asian Paints)</strong>. For exteriors, we use Weather-Proof emulsion to drastically reduce sun fading and algae growth during monsoons.",
  },
  {
    keywords: ["floor", "flooring", "tile", "tiles", "vitrified", "granite", "marble", "epoxy", "kajaria", "somany", "bathroom tile", "anti slip"],
    answer: "We offer diverse flooring options. For main areas, we recommend <strong>2x2 or 4x2 Premium Vitrified Tiles</strong> (Kajaria/Somany) or natural <strong>Granite/Marble</strong>. For bathrooms and balconies, we use specialized anti-skid, textured tiles to ensure absolute safety.",
  },
  {
    keywords: ["door", "window", "wood", "teak", "upvc window", "aluminium glass", "mesh", "frame", "carpentry", "padouk", "sal wood"],
    answer: "Main doors are crafted from solid <strong>First-Quality Teak Wood</strong> for grandeur and security. Interior doors use flush doors with laminates, and for windows, we highly recommend <strong>UPVC sliding/openable profiles</strong> with mosquito mesh for weather-proofing and noise reduction.",
  },
  {
    keywords: ["ceiling", "false ceiling", "pop", "gypsum", "grid ceiling", "roof design", "lighting", "cove light", "led"],
    answer: "We execute stunning <strong>Gypsum False Ceilings</strong> embedded with profile lights, LED strips, and cove lighting. This not only enhances the interior aesthetics but also traps a small layer of insulating air, helping cool the room down against Chennai's heat.",
  },
  {
    keywords: ["kitchen", "modular kitchen", "bwp", "wpc", "plywood", "countertop", "granite top", "trolley", "kitchen design", "chimney"],
    answer: "For Modular Kitchens, we use <strong>BWP (Boiling Water Proof) Plywood</strong> or WPC boards to prevent moisture and termite logic. We top it with rich Black Galaxy/Jet Black Granite counters and seamless factory-finish acrylic or laminate shutters.",
  },
  {
    keywords: ["pest", "termite", "cockroach", "anti termite", "pest control", "white ant", "foundation chemical", "pre construction"],
    answer: "We execute robust <strong>Pre-Construction Anti-Termite Treatment</strong>. Chemical barriers are injected deep into the foundation soil and at the plinth level to completely barricade your home against white ants and ground pests before the floors are ever laid.",
  },
  {
    keywords: ["curing", "water curing", "concrete strength", "how many days", "pond curing", "wet", "slab curing", "cracks", "heat cracks"],
    answer: "Concrete achieves its strength through water. We enforce continuous <strong>Pond Curing for roof slabs (minimum 14-21 days)</strong> and gunny-bag curing for columns. In Chennai's heat, this meticulous hydration prevents thermal cracks and maximizes structural lifespan.",
  },
  {
    keywords: ["sump", "water tank", "underground tank", "septic tank", "oht", "overhead tank", "bio septic", "capacity", "liter"],
    answer: "We custom-design underground sumps (typically 8,000 to 15,000+ Liters) using strict RCC structures to prevent inward soil water seepage. We also build overhead tanks and traditional or eco-friendly Bio-Septic tanks calculated exactly for your family's daily usage.",
  },
  {
    keywords: ["solar", "ev", "electric vehicle", "charging", "inverter", "green energy", "solar panel", "ups"],
    answer: "Future-proofing is standard: We actively provide dedicated heavy-duty wiring lines for <strong>EV (Electric Vehicle) charging points</strong> in the parking area, and pre-run conduits to the terrace to easily hook up massive Solar Panel grids in the future.",
  },
  {
    keywords: ["lift", "elevator", "home lift", "machine room less", "mrl", "johnson", "kone", "schindler", "wheelchair"],
    answer: "For multi-story residences and commercial spaces, we integrate elevator shafts seamlessly. We work with leading brands like Johnson or Schindler to install modern <strong>Machine-Room-Less (MRL) Elevators</strong> that save space and run whisper-quiet.",
  },
  {
    keywords: ["demolition", "destroy", "old house", "debris", "removal", "junk", "scrap", "break down"],
    answer: "If you have an old structure, we handle <strong>safe, controlled demolition</strong>. We manage the heavy machinery, secure the surrounding neighbor walls, and efficiently remove and dispose of all debris through corporation-approved channels before breaking ground.",
  },
  {
    keywords: ["hidden", "extra charge", "eb connection", "metro water", "sewerage connection", "patta", "surveyor"],
    answer: "Government connections (like 3-Phase EB lines, Metro Water, and underground sewerage links) involve standard separate departmental fees. However, our team provides full operational assistance to process these applications smoothly without stressful delays.",
  },
  // --- CHENNAI/TAMIL NADU EXPERT CIVIL ENGINEER KNOWLEDGE (LAND, SOIL, LEGAL) ---
  {
    keywords: ["patta", "chitta", "adangal", "ec", "encumbrance certificate", "document", "land documents", "property check", "legal opinion", "survey number"],
    answer: "As an experienced civil firm in Chennai, we advise checking your <strong>Patta, Chitta, and Adangal</strong> (revenue records), and extracting a 30-year <strong>Encumbrance Certificate (EC)</strong> before starting planning. We also cross-verify the Field Measurement Book (FMB) sketch to ensure the physical plot matches the documented survey numbers to avoid boundary disputes later.",
  },
  {
    keywords: ["osr", "open space reservation", "corporation limit", "dtcp limit", "panchayat", "unapproved plot", "regularisation", "corner plot"],
    answer: "If your plot is inside an unapproved layout, you'll need regularisation. For large developments, CMDA/DTCP strictly enforces <strong>10% OSR (Open Space Reservation)</strong> for parks/roads. We always check if your land falls under Greater Chennai Corporation limits or local Panchayat, as the maximum allowable height and FSI rules change accordingly.",
  },
  {
    keywords: ["blue metal", "jalli", "aggregate", "20mm", "40mm", "stones", "gravel", "m sand", "river sand", "aathu manal"],
    answer: "For structural concrete, we use high-grade <strong>20mm angular Blue Metal (Jalli)</strong> sourced from reliable quarries around Chengalpattu/Kanchipuram, ensuring perfect interlocking. While 'Aathu Manal' (river sand) is scarce, we strictly use double-washed IS-certified <strong>M-Sand</strong> for structural work, which gives much higher compressive strength than adulterated river sand.",
  },
  {
    keywords: ["water table", "velachery", "ecr", "omr", "pallikaranai", "coastal", "dewatering", "ground water", "flooding"],
    answer: "Coastal and low-lying zones (ECR, OMR, Velachery, Pallikaranai) have extremely high water tables. As Chennai engineers, we tackle this using heavy <strong>dewatering pumps</strong> during excavation, applying high-grade waterproofing to the basement retaining walls, and elevating the plinth level by at least 3-4 feet above the road level to guarantee flood safety.",
  },
  {
    keywords: ["hard rock", "pallavaram", "chromepet", "tambaram", "excavation", "rock breaking", "hard strata", "footing depth"],
    answer: "In areas like Pallavaram, Chromepet, and parts of Tambaram, we often hit hard rock within just 3 to 5 feet. For this, we use mechanical rock breakers instead of blasting (for neighborhood safety). Finding rock is actually excellent for foundation stability—we anchor the column footings directly to the rock strata for unmatched strength.",
  },
  {
    keywords: ["surki", "weathering course", "kerala tile", "terracotta", "pressed clay tile", "cool roof", "terrace heat"],
    answer: "Chennai summers are notoriously harsh. Instead of plain concrete finishes, we lay a traditional <strong>Weathering Course</strong>. We typically use a mixture of brick jelly and lime (Surki), compacted manually, and finish it with <strong>terracotta pressed clay tiles (Kerala tiles)</strong> or modern heat-reflective white tiles. This drastically drops the top-floor room temperature.",
  },
  {
    keywords: ["borewell distance", "septic tank limits", "soak pit", "ugd", "underground drainage", "sewage"],
    answer: "According to Chennai building norms, we ensure a minimum safe distance of <strong>20 to 30 feet between the Borewell and Septic Tank</strong> to prevent biological contamination. If you are within GCC limits connected to Metro Water UGD, we build an inspection chamber inside your compound to route the sewage safely without a septic tank.",
  },
  {
    keywords: ["rain water harvesting", "rwh", "recharge pit", "percolation pit", "rainwater", "water saving"],
    answer: "<strong>Rain Water Harvesting (RWH)</strong> is legally mandatory in Tamil Nadu and essential for our water table. We design deep percolation pits packed with layers of blue metal, pebbles, and coarse river sand. We route all terrace rainwater directly into this pit or your underground sump through a specialized filtration unit.",
  },
  {
    keywords: ["property tax", "completion certificate", "cc", "occupancy", "eb deposit", "tneb", "assessment"],
    answer: "Once construction is finished, we guide you through obtaining the <strong>Completion Certificate (CC)</strong> from CMDA/GCC. This is mandatory now in Chennai to get your permanent domestic TNEB (Electricity) connection and Metro Water connection. After that, we help initiate your first Property Tax assessment.",
  },
  {
    keywords: ["centering", "shuttering", "formwork", "steel plates", "wooden planks", "slab casting", "roof concrete"],
    answer: "For slab and column casting, we strictly use rigid <strong>steel plates and modern plywood formwork (centering)</strong> with adjustable steel props instead of old wooden poles (casuarina/savukku). This ensures the roof concrete sets perfectly level without undulations, preventing hairline cracks and plastering issues.",
  },
  {
    keywords: ["civil engineer", "expert", "local knowledge", "chennai engineer", "tamil nadu typical", "why hire you"],
    answer: "As native Civil Engineers rooted in Chennai, we don't just build; we engineer for our exact climate and regulations. From understanding Patta/Chitta legality, surviving monsoon cyclones, combatting saline coastal air, to securing CMDA approvals and Metro Water lines—we know Tamil Nadu construction inside and out.",
  },
  // --- EXTREME LOCAL KNOWLEDGE (CHENNAI TANGLISH & PROFESSIONAL CIVIL ENGINEERING) ---
  {
    keywords: ["basement", "mattam", "plinth", "road level", "uyaram", "basement height", "flood", "thanni", "road mattam"],
    answer: "We carefully calculate the <strong>Basement Mattam (Plinth Level)</strong>. In Chennai, the road level usually increases during relaying by the Corporation. To ensure rain water ('thanni') never enters the house, we always recommend keeping the basement at least <strong>3 to 4.5 feet above the current road level</strong>, especially in low-lying zones.",
  },
  {
    keywords: ["steel", "kambi", "kambi katturathu", "bar bending", "iron", "tmt", "ring", "stirrup"],
    answer: "For 'Kambi Katturathu' (Steel Reinforcement), we strictly use <strong>Fe500D or Fe550D TMT bars</strong>. As civil engineers, we calculate the exact load for columns and beams, ensuring the rings (stirrups) are tightly spaced at joints (usually 4 to 6 inches) to handle Chennai's Zone III seismic vibrations flawlessly.",
  },
  {
    keywords: ["plastering", "poochu vela", "patti", "finish", "smooth wall", "crack", "hairline", "cement poochu", "wall crack"],
    answer: "<strong>'Poochu Vela' (Plastering)</strong> is what determines the final look. We use finely sieved P-Sand for smooth internal plastering, and M-Sand for rough exterior plastering to grip tiles/paint. We strictly cure the wall for 7-10 days before applying 2 coats of 'Patti' (Wall Putty) so you never see hairline cracks.",
  },
  {
    keywords: ["door frame", "vasakkal", "nilavu", "main door", "wood", "teak", "maram", "front door", " நிலை", "vasapadal"],
    answer: "The Main <strong>'Vasakkal' (Door Frame)</strong> is the soul of a Chennai home. We only use 1st Quality solid Burma or Ghana Teak (Thekku Maram) measuring standard 5x3 or 4x3 thickness. For extra stability, we embed concrete hold-fasts so the frame never shakes when the door slams.",
  },
  {
    keywords: ["terrace", "maadi", "motta maadi", "heat", "sun", "cooling tile", "koolangal", "leakage", "slope"],
    answer: "For the <strong>'Motta Maadi' (Terrace)</strong>, we ensure a perfect gradient (slope) towards the rain water pipes so water never stagnates (thanni nika koodathu). To beat the 'Chennai Veyil' (heat), we lay heat-reflective white tiles or Kerala clay pressed tiles over a chemical waterproofed weathering course.",
  },
  {
    keywords: ["borewell", "bore", "adi", "adi aalam", "motor", "submersible", "salt water", "uppu thanni", "bore podurathu"],
    answer: "Before 'Bore Podurathu' (drilling a borewell), we check local ground strata. In places with 'Uppu Thanni' (saline water like ECR), we restrict depth. In safer areas, we might drill 150 to 500 'adi' (feet). We safely lower heavy-duty submersible Texmo/CRI motors based exactly on the yield.",
  },
  {
    keywords: ["supervisor", "maistry", "sithaal", "contractor", "kothanaar", "mason", "labor", "who builds", "engineer supervisor"],
    answer: "While traditional <strong>Maistrys and Kothanaars (Masons)</strong> have great manual skills, our rigorous Civil Engineering supervision takes it to the next level. We constantly overlap site checks verifying the cement ratio, steel alignment, and structural cover, ensuring manual work matches modern IS code safety standards.",
  },
  {
    keywords: ["loft", "paran", "wardrobe", "cuddapah", "shelf", "slab", "storage", "cupboard"],
    answer: "We design perfectly aligned <strong>'Parans' (Lofts)</strong> in bedrooms or kitchens for storage. Instead of traditional heavy Cuddapah stones, we now pour slim RCC slabs integrated with the wall, or eliminate conventional lofts entirely to design floor-to-ceiling sleek modular wardrobes.",
  },
  {
    keywords: ["staircase", "padi", "padikattu", "steps", "granite", "handrail", "ss handrail", "glass railing", "stair"],
    answer: "For the <strong>'Padikattu' (Staircase)</strong>, we calculate a comfortable riser (usually 6 inches) and tread (10 inches). We finish the stairs with heavy-duty anti-slip Granite or factory-cut marble, bordered perfectly with modern 304-grade SS (Stainless Steel) or toughened glass handrails.",
  },
  {
    keywords: ["bathroom", "leak", "waterproof", "sunken", "core cutting", "pipes", "drain", "bathroom leak"],
    answer: "Bathroom leaks are a nightmare. We pre-plan using <strong>Sunken Slabs</strong> (dropping the bathroom floor concrete level). Before any plumbing hides behind tiles, we coat the sunken portion with heavy chemical waterproofing resins and test it by filling it with water for 48 hours.",
  },
  {
    keywords: ["elevation", "mugappu", "front look", "design", "house front", "parapet"],
    answer: "The <strong>'Mugappu' (Front Elevation)</strong> gives your home its identity. We design spectacular 3D views ranging from classic pillars to modern minimalist boxes, executed flawlessly on-site with CNC-cut panels, texture paints, and concealed profile lighting across the parapet walls.",
  },
  {
    keywords: ["pooja", "puja", "pooja arai", "poojai", "sami", "vasthu", "god room"],
    answer: "The <strong>'Pooja Arai' (Puja Room)</strong> is designed with absolute Vastu precision, typically placed in the North-East or East. We provide custom niches for idols, special exhaust vents for camphor smoke, and luxurious wooden-carved 'vasakkals' right at your home's spiritual hub.",
  },
  {
    keywords: ["sump", "thotti", "tank", "water tank", "metro water", "lorry water", "lakh liters"],
    answer: "A robust <strong>RCC Sump (Underground Thotti)</strong> is essential for Chennai's summer. We normally size it to easily hold 1 to 1.5 'Lorry' loads of Metro Water (typically 12,000 Liters). We cure the sump walls vigorously to ensure absolute structural water-tightness.",
  },
  {
    keywords: ["concrete", "kaancrete", "rcc", "m20", "m25", "mixing", "ratio", "paal", "cement milk", "vibrator"],
    answer: "For all <strong>'Kaancrete' (RCC)</strong> work, we use precise M20 or M25 ratio mixes. We strictly use mechanical needle Vibrators during roofing to remove air gaps and prevent honeycombing, ensuring the 'cement paal' (slurry) bonds optimally with the steel reinforcement.",
  },
  // --- MASTER-TIER CHENNAI CIVIL ENGINEERING KNOWLEDGE (PRACTICAL & STRUCTURAL) ---
  {
    keywords: ["soil type", "red soil", "clay", "sand", "coastal sand", "foundation type", "raft foundation", "pile foundation", "isolated footing", "omr", "velachery", "soil test"],
    answer: "As an engineer, the first thing I check is the soil. In Chennai, it varies massively. OMR and ECR have loose coastal sand, meaning we often need Pile foundations reaching 30+ feet. Areas like Velachery have soft clay covering former lakebeds, requiring Raft (Mat) foundations to prevent sinking. But in hard strata areas like Tambaram, simple Isolated footings are perfect. A soil test (SBC) decides this, saving you lakhs in over-engineering."
  },
  {
    keywords: ["waterlogging", "monsoon", "rain problem", "velachery flood", "chennai flood", "groundwater", "stagnation", "plinth", "raise house"],
    answer: "Chennai monsoons are brutal. My rule for waterlogging zones (like Velachery, Madipakkam, Pallikaranai): Never settle for a standard 2-foot basement. We bring in earthmovers to raise your Plinth level at least 4 to 5 feet above the current road level. It costs a bit more upfront for gravel filling, but guarantees flood water never touches your living room when the corporation inevitably raises the road height later."
  },
  {
    keywords: ["cement brand", "ultratech", "ramco", "chettinad", "coromandel", "dalmia", "opc", "ppc", "53 grade", "which cement is best"],
    answer: "Clients always ask 'which cement is best?' For Chennai's coastal climate, I strictly use Grade 53 OPC from top brands like UltraTech or Ramco for fast-setting structural work (slabs & columns). For plastering and brickwork, PPC cement from Dalmia or Chettinad is excellent because it combats coastal dampness and gives a smooth, crack-free finish."
  },
  {
    keywords: ["sand", "m sand", "river sand", "aathu manal", "p sand", "plastering sand", "crusher dust", "adulteration"],
    answer: "Let's be practical: good 'Aathu Manal' (River sand) is scarce and expensive now. Do not fall for adulterated river sand mixed with filter sand. We enforce 100% double-washed, IS-certified M-Sand (Manufactured Sand) for all concrete work. It literally bonds better with cement than river sand. For plastering, we use ultra-fine P-Sand to guarantee zero wall cracks."
  },
  {
    keywords: ["steel", "tmt bar", "tata tiscon", "jsw", "vizag steel", "rust", "corrosion", "fe500d", "fe550d", "kambi"],
    answer: "Steel is the backbone of your house. Because Chennai air is highly humid, cheap steel rusts inside the pillars, expands, and cracks the concrete. I only procure primary Fe500D or Fe550D grade TMT bars from primary steel makers (Tata Tiscon, JSW, Vizag). 'D' stands for Ductility—it allows the building to flex safely during earthquakes instead of snapping."
  },
  {
    keywords: ["load calculation", "rcc", "beam", "slab", "column", "weight", "crack", "structural drawing", "load bearing", "pillers"],
    answer: "Here's RCC explained simply: The Slab carries your furniture and transfers the weight to the Beams. The Beams push it to the Columns, and Columns send it deep into the Foundation. Without proper Structural Drawings, local masons just guess the steel sizes. We calculate the exact 'Dead Load' and 'Live Load' so you aren't wasting money on overly thick pillars, or risking cracks with thin ones."
  },
  {
    keywords: ["common mistake", "contractor mistake", "honeycomb", "honeycombing", "cover block", "steel exposed", "concrete packing"],
    answer: "A massive mistake I see on amateur sites is 'Honeycombing'—when concrete is poured without a vibrator, leaving ugly stony gaps. Another fatal error is forgetting 'Cover Blocks' (small concrete spacers). Without cover blocks, the steel touches the wooden centering plate, gets exposed to air after removing the wood, and rusts immediately. Our engineers overlap these site checks vigorously."
  },
  {
    keywords: ["cmda rule", "corporation approval", "fsi", "setback", "leaving space", "plot coverage", "how much can build", "approval delay"],
    answer: "CMDA and DTCP rules can be strict but they save you from legal trouble. FSI (Floor Space Index) in Chennai is usually 1.5, meaning on a 2400 sq.ft plot, you can build up to 3600 sq.ft. We also strictly obey Setback rules (leaving 1.5m around the house) to ensure proper cross-ventilation and zero hassle while getting your final Completion Certificate (CC)."
  },
  {
    keywords: ["cost", "sq ft rate", "market rate", "chennai price", "labour rate", "budget", "premium", "why is it costly", "cheap contractor"],
    answer: "Construction rates in Chennai currently run from ₹1,900/sq.ft for a standard finish up to ₹2,500+/sq.ft for luxury. Beware of 'cheap' contractors quoting below ₹1,700/sq.ft—they survive by using unauthorized sub-standard steel, unwashed M-sand, or hitting you with massive hidden 'escalation' charges mid-project. Our turnkey quotes are locked and 100% transparent."
  },
  {
    keywords: ["stage", "stages", "step by step", "how to start", "process", "construction flow", "payment stage", "lintel", "roofing"],
    answer: "To keep clients comfortable, we breakdown execution into major Milestones: 1. Earthwork & Foundation 2. Plinth level (Basement) 3. Lintel level (Door top) 4. Roof Slab casting 5. Brickwork & Plastering 6. Flooring & Finishes. Payments are tied explicitly to these physical stages on-site so you always see exactly what you are paying for."
  },
  {
    keywords: ["brick", "red brick", "chamber brick", "country brick", "fly ash", "aac block", "aerocon", "wire cut", "weight"],
    answer: "Traditional Red Chamber Bricks look emotional, but modern AAC (Autoclaved Aerated Concrete) blocks are a civil engineer's dream for Chennai. They are massive (replacing 6 bricks at once), incredibly lightweight (reducing the load on your beams), and full of tiny air pockets that block 30% more summer heat from entering your house compared to red bricks."
  },
  {
    keywords: ["safety", "site safety", "fall", "helmet", "net", "worker", "insurance"],
    answer: "A safe site is a fast, productive site. We enforce hard hats, exterior safety nets for multi-story builds, and secure steel scaffolding instead of dangerous bamboo poles. We also handle worker compensation insurance, so as the plot Owner, you have absolute peace of mind against any liabilities."
  },
  // --- RENOVATION & MODERNIZATION KNOWLEDGE (PAZHAYA VEEDU / REPAIRS) ---
  {
    keywords: ["renovation", "renovate", "remodel", "old house", "pazhaya veedu", "alteration", "modify", "expand", "add room", "repair"],
    answer: "Yes! We specialize in comprehensive <strong>Renovations (Pazhaya Veedu Alteration)</strong>. Whether it's expanding your living room, adding a new floor to a 30-year-old house, or completely modernizing the elevation, we handle structural checks and safe execution seamlessly.",
  },
  {
    keywords: ["wall breaking", "break wall", "remove wall", "column", "beam", "load bearing", "crack", "strengthen", "jacketing"],
    answer: "Before breaking any walls, our structural engineers assess if the house is 'Load Bearing' or an 'RCC Framed' structure. For old weak foundations, we perform <strong>Column Jacketing and Micro-piling</strong> to safely increase load capacity before adding an extra floor.",
  },
  {
    keywords: ["tile replacing", "change tile", "overlay tile", "flooring change", "old tile", "marble to tile", "mosaic", "break tile"],
    answer: "If you have old mosaic or red oxide floors, we can either <strong>break and relay</strong> new 2x2/4x2 Vitrified tiles for perfect leveling, or use specialized high-strength Epoxy Adhesives (like Roff/Weber) to paste new modern tiles directly <strong>over the old flooring</strong> to save time and dust.",
  },
  {
    keywords: ["old plumbing", "gi pipe", "rust", "low pressure", "repipe", "bathroom leak", "change pipe", "change plumbing"],
    answer: "Old houses usually suffer from rusted galvanized iron (GI) pipes causing low water pressure and hidden leaks. During bathroom renovations, we <strong>rip out the old GI network and upgrade entirely to CPVC (for hot) and UPVC (for cold) pipes</strong>, sealing the sunken slab afresh to permanently stop leaks.",
  },
  {
    keywords: ["old wiring", "rewiring", "electrical change", "inverter line", "extra plug", "ac point", "change wire", "tripping"],
    answer: "In 20-30 year old houses, aluminum wiring or thin copper is a fire hazard with modern ACs/appliances. For renovations, we do <strong>complete electrical rewiring</strong> using heavy-duty FRLS copper wires, establishing independent MCB circuits, proper Earthing, and dedicated Inverter/EV charging lines.",
  },
  {
    keywords: ["old terrace", "maadi leak", "roof leak", "change weathering course", "re-roof", "crack in roof"],
    answer: "For badly leaking old terraces, patch-work fails. We fully <strong>dismantle the failed old weathering course</strong> down to the bare mother-slab. We then apply flexible polyurethane (PU) waterproofing coatings and lay fresh pressed clay tiles or cool-roof tiles for guaranteed leak protection and heat reduction.",
  },
  {
    keywords: ["front look", "old elevation", "modernize facade", "frontage", "exterior change", "make it look new", "cladding"],
    answer: "We breathe new life into outdated facades! Without breaking major structures, we can modernized your old elevation using <strong>Shera (Cement) boards, ACP panels, CNC-cut MS screens, frame louvers, and structural glazing</strong> to make a 90s house look like a 2026 contemporary masterpiece.",
  },
  // --- VASTU SHASTRA (TRADITIONAL ARCHITECTURAL SCIENCE) ---
  {
    keywords: ["vasthu", "vastu", "shastra", "directions", "auspicious", "energy", "which direction", "manaiyadi shastram", "vasthu expert"],
    answer: "We seamlessly integrate modern Civil Engineering with traditional <strong>Vastu Shastra (Manaiyadi Shastram)</strong>. By carefully zoning the 5 elements (Water, Fire, Earth, Air, Space), we guarantee architectural harmony, positive energy, and peace of mind without compromising on ventilation or aesthetics.",
  },
  {
    keywords: ["main door", "entrance vasthu", "which facing", "front door vasthu", "house facing", "north facing", "east facing", "south facing"],
    answer: "For the <strong>Main Entrance</strong>, North, East, and North-East facings are highly auspicious, bringing prosperity. West and South can also be optimized using specific Vastu corrections. We ensure the main 'Vasakkal' is the largest door in the house and opens clockwise inward.",
  },
  {
    keywords: ["kitchen vasthu", "agni moolai", "cooking direction", "stove", "kitchen corner", "south east"],
    answer: "The Kitchen belongs in the <strong>Agni Moolai (South-East corner)</strong> representing fire. If South-East isn't possible, North-West is the secondary option. Regardless of placement, we design the counter so the person cooking always <strong>faces East</strong>.",
  },
  {
    keywords: ["master bedroom", "bedroom vasthu", "kanni moolai", "sleeping direction", "head direction", "south west"],
    answer: "The Master Bedroom must be located in the <strong>Kanni Moolai (South-West corner)</strong> representing Earth and stability. For peaceful sleep and health, we spatially design the room so your bed allows you to sleep with your <strong>head pointing South or East</strong> (never North).",
  },
  {
    keywords: ["borewell vasthu", "sump vasthu", "water tank", "eesanya moolai", "underground water", "north east"],
    answer: "Water elements mean wealth. The Underground Sump and Borewell strictly belong in the <strong>Eesanya Moolai (North-East corner)</strong>. We ensure no heavy structures or septic tanks are ever built in this crucial, sacred zone.",
  },
  {
    keywords: ["septic tank vasthu", "toilet vasthu", "bathroom direction", "vayu moolai", "north west", "drainage"],
    answer: "Bathrooms and Septic Tanks deal with waste, so they are placed in the <strong>Vayu Moolai (North-West corner)</strong> or the West. We strictly avoid placing septic tanks in the North-East, South-West, or dead center (Brahmasthan) of the plot.",
  },
  {
    keywords: ["staircase vasthu", "padi vasthu", "steps climbing", "stair direction", "clock wise"],
    answer: "The Staircase is a heavy load, so it thrives in the South, West, or South-West zones. As per Vastu, we design the flights so you always <strong>climb from North to South, or East to West</strong>, turning in a clockwise direction.",
  },
  {
    keywords: ["pooja vasthu", "god room", "sami arai", "prayer room", "idol facing", "puja vasthu"],
    answer: "The <strong>Pooja Room</strong> is best placed in the North-East (Eesanyam), East, or North. We design the sacred niches so the idols face West or South, meaning you will face East or North while praying, drawing in maximum cosmic energy.",
  },
  // --- CHENNAI & TAMIL NADU REAL ESTATE & INVESTMENT KNOWLEDGE ---
  {
    keywords: ["real estate", "buy land", "invest", "property", "investment", "chennai real estate", "where to buy", "appreciation", "buy plot", "buy flat"],
    answer: "For real estate in Chennai, investment strategy dictates location. For high rental yields, the IT corridors (OMR, Sholinganallur) are unmatched. For long-term land appreciation, South-West industrial zones (GST Road, Sriperumbudur, Oragadam) give massive returns. For pure luxury and lifestyle, ECR is the golden strip."
  },
  {
    keywords: ["omr", "old mahabalipuram road", "it corridor", "sholinganallur", "siruseri", "navalur", "kelambakkam"],
    answer: "<strong>OMR (IT Corridor)</strong> is the backbone of Chennai's rental economy. Stretching from Madhya Kailash to Kelambakkam, it is packed with tech parks. Investing in an apartment here practically guarantees steady rental income from IT professionals, making it the safest bet for passive real estate investors."
  },
  {
    keywords: ["ecr", "east coast road", "crz", "coastal regulation", "villa", "beach house", "luxury property", "neelankarai", "palavakkam"],
    answer: "<strong>ECR (East Coast Road)</strong> is Chennai's ultra-luxury residential strip. However, when buying land here, you must strictly check the <strong>CRZ (Coastal Regulation Zone)</strong> guidelines. Building too close to the High Tide Line is illegal, and obtaining CRZ clearance is mandatory before CMDA will approve your plan."
  },
  {
    keywords: ["gst road", "oragadam", "sriperumbudur", "maraimalai nagar", "tambaram", "industrial hub", "land appreciation", "factory land"],
    answer: "The <strong>GST Road & Oragadam belt</strong> is the Detroit of India, packed with massive auto and electronic manufacturing hubs. Land here is strictly poised for massive long-term appreciation, making it the perfect zone to buy empty plots or industrial lands and hold them for a 5 to 10 year horizon."
  },
  {
    keywords: ["uds", "undivided share", "flat buying", "apartment share", "carpet area", "land value", "real estate legal"],
    answer: "If you buy an apartment, <strong>UDS (Undivided Share of Land)</strong> is the most critical metric! Your building degrades over 50 years, but the land appreciates. Ensure the builder gives you a high UDS percentage—if you buy a 1000 sq.ft flat, a healthy UDS should be at least 400 to 500 sq.ft assigned directly in your registration document."
  },
  {
    keywords: ["registration", "stamp duty", "guideline value", "market value", "sub registrar", "property tax", "register land", "document charges"],
    answer: "In Tamil Nadu, property registration typically costs around <strong>11% of the property value</strong> (7% Stamp Duty + 4% Registration Fee). Always note the difference between 'Guideline Value' (the government-fixed base rate) and 'Market Value' (the actual buying price). Registration fees are paid on whichever is higher."
  },
  {
    keywords: ["rera", "tn rera", "tnrera", "builder fraud", "real estate act", "promoter", "delay", "handover"],
    answer: "Never buy a new flat or approved plot without a <strong>TN RERA (Tamil Nadu Real Estate Regulatory Authority)</strong> registration number. It legally binds the builder to a strict handover timeline and structural warranty, heavily protecting your money against construction delays or developer fraud."
  },
  {
    keywords: ["agricultural land", "farmland", "natham", "punja", "nanja", "panchami", "convert land", "farm house", "dtcp conversion"],
    answer: "Buying land in rural Tamil Nadu requires extreme caution. Identify if it is 'Nanja' (wetland) or 'Punja' (dryland). Converting wet agricultural land for residential use is nearly impossible under state law. Also, absolutely steer clear of 'Panchami lands' or 'Poramboke' (government waste lands) as they cannot be legally registered to private buyers."
  },
  {
    keywords: ["tier 2", "coimbatore", "madurai", "trichy", "salem", "tamil nadu real estate", "smart city", "outside chennai"],
    answer: "Beyond Chennai, Tamil Nadu's real estate future lies in Tier-2 booming hubs. <strong>Coimbatore</strong> is exploding in textiles and IT (Saravanampatti). <strong>Madurai and Trichy</strong> are seeing huge infrastructural growth as Smart Cities. Investing in plots along the upcoming bypass highways in these districts is an incredibly smart financial move."
  },
  {
    keywords: ["parent document", "title deed", "trace document", "30 years ec", "legal check", "safe land", "dispute", "lawyer"],
    answer: "When buying resale property in TN, don't just look at the current sale deed. A massive mistake is failing to trace the <strong>Parent Document</strong>. You must engage a property lawyer to trace the unbroken chain of ownership for the last 30 years via Encumbrance Certificates to ensure the title is perfectly 'clean' and free of civil disputes."
  },
  // --- CHENNAI MICRO-MARKET REAL ESTATE & METRO DYNAMICS ---
  {
    keywords: ["metro phase 2", "metro expansion", "madhavaram", "sipcot", "porur", "poonamallee", "sholinganallur", "land value increase", "metro train"],
    answer: "<strong>Chennai Metro Phase 2</strong> is completely reshaping real estate. Areas like Madhavaram, Porur, Poonamallee, and the Sholinganallur-Sipcot stretch are witnessing a 25-40% spike in land values. If you are buying a plot today, securing land within 2 to 3 kilometers of a Phase 2 upcoming station is guaranteed to yield massive capital appreciation in the next 5 years."
  },
  {
    keywords: ["central chennai", "anna nagar", "t nagar", "adyar", "mylapore", "alwarpet", "redevelopment", "luxury"],
    answer: "<strong>Central Core (Anna Nagar, T. Nagar, Adyar)</strong>: Land availability here is practically zero. The dominant real estate model here is <strong>Redevelopment</strong>. Older 30-year-old independent houses are being demolished and converted into ultra-luxury 4-story Stilt+3 apartments. Buying here means paying extremely high per-sqft rates directly tied to high UDS value."
  },
  {
    keywords: ["joint venture", "jv", "builder share", "land owner", "50:50", "60:40", "redevelop my land", "give land to builder"],
    answer: "If you own land in prime Chennai, destroying the old house to sign a <strong>Joint Venture (JV)</strong> with a builder is highly lucrative. The typical ratio in Chennai is <strong>50:50 or 60:40</strong> (Landowner to Builder ratio) based on the area's Guideline value. We handle the entire end-to-end JV construction securely for landowners wanting premium flats in return."
  },
  {
    keywords: ["orr", "outer ring road", "minjur", "vandalur", "logistics", "warehouse", "commercial real estate", "cheap land"],
    answer: "The <strong>Outer Ring Road (ORR) connecting Vandalur to Minjur</strong> is Chennai's booming logistics and warehousing hub. Huge tracts of agricultural/dry land are being converted. Buying plots along the ORR is not ideal for immediate residential living, but it is the ultimate goldmine for long-term commercial property investors."
  },
  {
    keywords: ["south chennai", "tambaram", "guduvanchery", "urapakkam", "vandalur", "maraimalai nagar", "affordable", "middle class"],
    answer: "<strong>South Suburbs (Tambaram to Guduvanchery/Urapakkam)</strong> remain the absolute favorite for middle-class homebuyers. Connectivity via the Suburban train line, upcoming Metro extensions, and proximity to the GST Road IT/Automobile hubs make it the perfect balance of affordable plot prices and immediate livability."
  },
  {
    keywords: ["north chennai", "royapuram", "washermanpet", "perambur", "kolathur", "commercial zone", "dense population"],
    answer: "<strong>North Chennai (Royapuram, Washermanpet, Perambur)</strong> is densely populated and heavily commercial. While finding vast empty plots here is tough, areas like Perambur and Kolathur are seeing a massive surge of premium apartment complexes. It's a fantastic zone if your business heavily relies on Chennai's cargo/port logistics."
  },
  {
    keywords: ["200ft radial road", "pallavaram thoraipakkam", "radial road", "it parks", "commercial corridor"],
    answer: "The <strong>Pallavaram-Thoraipakkam 200ft Radial Road</strong> is currently Chennai's hottest commercial corridor. It perfectly bridges the GST Road with OMR. Massive IT parks and luxury malls are opening here, making investing in apartments or commercial spaces incredibly profitable right now."
  },
  {
    keywords: ["cma", "chennai metropolitan area", "cmda expansion", "kanchipuram", "chengalpattu", "tiruvallur", "greater chennai"],
    answer: "The <strong>Chennai Metropolitan Area (CMA) has officially expanded</strong>. Massive parts of Kanchipuram, Chengalpattu, and Tiruvallur districts now fall directly under CMDA master planning rather than just local DTCP. This means better roads, strict zoning, and a definite increase in land value for plots in these outer districts."
  },
  // --- CRYSTAL CLEAR MEGA-EXPLANATIONS FOR MAJOR CLIENT DOUBTS ---
  {
    keywords: ["how to calculate cost", "cost breakdown", "why so expensive", "where does my money go", "construction budget explained", "explain cost"],
    answer: "Let’s make the construction cost <strong>crystal clear</strong>. When we quote ₹2,000 per sq.ft, here is exactly where your money goes:<br/><br/><ul><li><strong>40% on Raw Materials:</strong> Cement, M-sand, Blue metal, and heavy TMT steel.</li><li><strong>30% on Labor & Engineering:</strong> Expert masons, bar-benders, centering workers, and continuous civil engineering supervision.</li><li><strong>20% on Finishing Items:</strong> Tiles, Teak wood doors, UPVC windows, plumbing pipes, electrical wires, and Asian Paints.</li><li><strong>10% on Approvals & Logistics:</strong> Machinery rentals, water curing, scaffolding, and transportation.</li></ul><br/>Cheaper contractors simply cut the 'Raw Materials' quality or ignore 'Engineering Supervision', leading to a weak, unsafe house."
  },
  {
    keywords: ["step by step process", "how to build a house", "stages of building", "construction flow exactly", "from scratch", "what happens first", "what is the process"],
    answer: "Building a house is like baking a massive, structural cake. Here is the <strong>crystal clear step-by-step process</strong>:<br/><br/><ul><li><strong>Step 1: Bhoomi Pooja & Excavation:</strong> We dig deep into the earth for the foundation based on soil tests.</li><li><strong>Step 2: Foundation & Plinth:</strong> We pour the concrete footings and raise the basement level above the road (to prevent flooding).</li><li><strong>Step 3: Superstructure (Columns & Bricks):</strong> We raise the RCC pillars and build the brick walls up to the roof.</li><li><strong>Step 4: Roof Casting (Kaancrete):</strong> The most important day! We pour the roof slab using mechanical vibrators.</li><li><strong>Step 5: Concealed Works:</strong> We cut into the walls to hide your plumbing pipes and electrical wires safely.</li><li><strong>Step 6: Plastering & Curing:</strong> We coat the walls with smooth cement and cure it with water for weeks.</li><li><strong>Step 7: Finishing:</strong> Painting, laying floor tiles, fixing wooden doors, and handing over the keys!</li></ul>"
  },
  {
    keywords: ["explain uds", "what is uds", "undivided share explained", "why uds is important", "apartment land value"],
    answer: "Let me explain <strong>UDS (Undivided Share)</strong> crystal clearly with an analogy:<br/><br/>Imagine an apartment building is a giant pizza sitting on a plate. The 'pizza' is the building, and the 'plate' is the land. Over 50 years, the pizza gets stale and crumbles (the building degrades), but the plate (the land) becomes a rare antique worth crores!<br/><br/>UDS is mathematically <strong>your exact slice of that valuable plate</strong>. If you buy a 1,000 sq.ft flat, and your UDS is 500 sq.ft, it means you legally own 500 sq.ft of the earth below the building. Always demand a high UDS because that is where your true generational wealth lies!"
  },
  {
    keywords: ["explain fsi", "how to calculate fsi", "floor space index explained", "math for building size", "how big can i build"],
    answer: "Here is the <strong>crystal clear math behind FSI (Floor Space Index)</strong>.<br/><br/>FSI is simply a multiplier the true government uses to tell you how much total floor area you can build on your plot.<br/><br/><strong>The Formula:</strong> <em>Plot Area × FSI = Maximum Buildable Area.</em><br/><br/><strong>Example:</strong> In Chennai, if you own a <strong>2,400 sq.ft plot</strong> (1 Ground) and the local FSI is <strong>1.5</strong>.<br/>You calculate: 2,400 × 1.5 = <strong>3,600 sq.ft</strong>.<br/>This means your house's total built-up area (Ground Floor + First Floor etc.) cannot exceed 3,600 sq.ft. We expertly design your floor plans to max out this absolute legal limit!"
  },
  {
    keywords: ["explain jv", "how joint venture works", "builder share explained", "jv ratio", "land owner benefit"],
    answer: "A <strong>Joint Venture (JV)</strong> is a beautiful partnership between a Landowner and a Builder. Let’s make it crystal clear:<br/><br/><ul><li><strong>Your Role:</strong> You own an old house on prime land but don't have ₹2 Crores to knock it down and build luxury flats.</li><li><strong>Our Role (The Builder):</strong> We spend our own money to demolish it, get CMDA approvals, and build a stunning 4-story apartment complex on your land.</li><li><strong>The Deal (Ratio):</strong> Once built, we split the flats based on a ratio (like 50:50). If we build 4 flats, you keep 2 ultra-luxury flats entirely for free (which you can live in or rent out), and we sell the other 2 flats to recover our construction costs and profit.</li></ul><br/>It’s a zero-investment way for you to multiply your property value!"
  },
  {
    keywords: ["why curing", "curing importance", "cement hydration explained", "watering concrete", "water spraying"],
    answer: "Why do we spray water continuously on concrete? Let’s make the science <strong>crystal clear</strong>:<br/><br/>Concrete does not dry like paint; it actually undergoes a chemical reaction called <em>Hydration</em>. When cement mixes with water, it creates chemical bonds that turn it into solid rock. This reaction produces immense heat.<br/><br/>If we don't continuously spray cold water (curing) for 14-21 days, the heat will evaporate the moisture too fast, halting the chemical reaction. The result? Weak, powdery concrete that develops giant thermal cracks. We enforce strict 'Pond Curing' (building tiny sand dams on the roof to hold water) to ensure your roof achieves 100% bulletproof strength!"
  },
  // --- ADVANCED FINISHING & MEP (MECHANICAL, ELECTRICAL, PLUMBING) KNOWLEDGE ---
  {
    keywords: ["flooring detail", "tile laying process", "epoxy", "spacer", "white cement", "italian marble", "granite vs tile", "vitrified tile depth"],
    answer: "<strong>Flooring involves precision engineering:</strong><br/><ul><li><strong>Tile Spacers & Epoxy:</strong> We never just push tiles together with white cement. We use 2mm to 4mm <em>Spacers</em> and fill the gaps with high-grade Epoxy Grout (like Laticrete). This prevents tiles from popping up due to thermal expansion.</li><li><strong>Granite & Marble:</strong> Unlike tiles which are factory-made, natural Granite/Marble requires diamond-polishing on-site. Granite is indestructible, making it perfect for staircases, whilst imported Italian Marble gives a seamless highly-luxurious finish but requires high maintenance.</li><li><strong>Double Charged Vitrified:</strong> For bedrooms, we use 'Double Charged' 2x2/4x2 vitrified tiles because the color pigment is 3mm thick, ensuring scratches never expose a different color underneath.</li></ul>"
  },
  {
    keywords: ["plumbing detail", "cpvc", "upvc", "concealed tank", "bad smell bathroom", "p trap", "water pressure", "ashirvad", "astral"],
    answer: "<strong>Our Plumbing Standards are absolutely leak-proof:</strong><br/><ul><li><strong>Hot vs Cold Lines:</strong> We strictly separate them. We use heavy-duty <strong>CPVC</strong> pipes (cream color) for geyser hot water lines because they won't melt, and <strong>UPVC</strong> pipes (white) for high-pressure cold water lines. (Brands: Ashirvad/Astral).</li><li><strong>Odor Control:</strong> To stop sewer smells, we install specialized water-sealing <em>P-Traps and Floor Traps</em> that block harmful gases from entering the bathroom.</li><li><strong>Fittings & Concealed Tanks:</strong> We use pressure-tested brand fittings (Jaquar/Kohler) and install <em>Concealed Flush Tanks</em> strictly with thick masonry backing so they never leak inside the wall cavity.</li></ul>"
  },
  {
    keywords: ["electrical detail", "db board", "mcb", "rccb", "frls", "3 phase", "wire rating", "tripping", "switch board", "automation"],
    answer: "<strong>Electrical Safety and balancing is complex:</strong><br/><ul><li><strong>FRLS Copper:</strong> We only use FRLS (Fire Retardant Low Smoke) pure copper wires (Finolex/Polycab). If a short circuit happens, the wire jacket will not catch fire or release toxic smoke.</li><li><strong>Three-Phase Balancing:</strong> We mathematically divide heavy loads (ACs, Geysers, Motors) across 3 incoming EB phases. If one phase loses power locally, your house still runs partially.</li><li><strong>RCCB & DB Boards:</strong> Inside the main Distribution Board (DB), we install an RCCB (Residual Current Circuit Breaker). If a child touches a live wire, the RCCB detects the leak in milliseconds and trips the entire house, literally saving lives.</li><li><strong>Switches:</strong> We fit premium modular switches (Legrand/Anchor Roma) mapped for smart-home automation.</li></ul>"
  },
  {
    keywords: ["handrail", "ss handrail", "304", "316 grade", "toughened glass", "glass railing", "balcony grill", "staircase rail"],
    answer: "<strong>Handrails are crucial for safety and aesthetics:</strong><br/><ul><li><strong>Stainless Steel (SS):</strong> We only use <strong>SS 304 or SS 316 grade</strong> steel for handrails. Lower grades (like SS 202) will heavily rust in Chennai's humid coastal air within months.</li><li><strong>Glass Railings:</strong> For modern balconies, we use 10mm to 12mm <strong>Toughened Glass</strong> or laminated glass clamped with SS D-brackets. If toughened glass breaks, it shatters into harmless blunt pebbles instead of deadly sharp shards.</li><li><strong>Wooden Handrails:</strong> For classic interiors, we sculpt continuous Teak Wood or Mahogany handrails mounted over cast-iron balusters.</li></ul>"
  },
  {
    keywords: ["gate", "grill", "ms grill", "cnc cut gate", "cast iron", "sliding gate", "folding gate", "window grill", "safety gate"],
    answer: "<strong>Gates and Grills determine your exterior security:</strong><br/><ul><li><strong>MS (Mild Steel) vs Cast Iron:</strong> Window safety grills are made from heavy 12mm/16mm MS square rods welded tightly. Cast Iron is used for highly ornamental historical designs.</li><li><strong>Main Gate Mechanics:</strong> Depending on driveway space, we engineer <strong>Heavy-Duty Sliding Tracks</strong> with bottom wheels to save space, or Multi-fold gates.</li><li><strong>CNC Designs:</strong> For an ultra-modern look, we use laser-cut MS sheets (CNC profiles) displaying geometric patterns or trees, powder-coated to prevent rusting.</li></ul>"
  },
  {
    keywords: ["carpentry", "flush door", "teak wood", "padouk", "sal wood", "mortise lock", "hinges", "lamina", "door finish", "laminate"],
    answer: "<strong>Carpentry is a blend of brutal strength and smooth finish:</strong><br/><ul><li><strong>Wood Selection:</strong> Main doors and frames belong to solid 1st-Quality Burma/Ghana Teak. For bedroom door frames, we often use highly durable Padouk or Sal wood which naturally resist termites.</li><li><strong>Flush Doors & Laminates:</strong> Inside rooms, we use heavy factory-pressed Flush Doors pasted with 1mm waterproof/scratchproof Laminates (Sunmica). They outlast handmade doors because they don't bend or warp during monsoons.</li><li><strong>Hardware:</strong> Heavy doors need heavy hardware. We use 5-inch SS ball-bearing hinges so doors don't sag over time, and highly secure SS <em>Mortise Locks</em> (Godrej/Dorma) instead of basic handles.</li></ul>"
  }
];



