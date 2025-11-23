export type ProjectDetailExtras = {
  overview: string;
  scopeOfWork: string[];
  highlights: { label: string; value: string }[];
  outcomes: string[];
};

type ProjectDetailMap = Record<number, ProjectDetailExtras>;

const projectDetails: ProjectDetailMap = {
  1: {
    overview:
      "We partnered with the CSI St Mark's Church Madipakkam congregation to create a contemporary worship space that honors traditional liturgy while delivering modern acoustics, natural light, and thermal comfort for a 600-seat community.",
    scopeOfWork: [
      "End-to-end design-build delivery including structural, MEP, and interiors",
      "Integration of exposed concrete fins for passive cooling and daylighting",
      "Fabrication of custom altar backdrop, choir loft, and baptismal font",
      "Site development with landscape pockets, parking, and stormwater recharge",
    ],
    highlights: [
      { label: "Built-up area", value: "14,500 sq.ft" },
      { label: "Delivery timeline", value: "14 months" },
      { label: "Peak workforce", value: "85 artisans" },
    ],
    outcomes: [
      "Improved congregation capacity by 40% with flexible seating layouts",
      "Reduced internal temperature by 4°C using stack-ventilation strategy",
      "Delivered a low-maintenance envelope with IPS flooring and terracotta jaalis",
    ],
  },
  2: {
    overview:
      "The Thiruvottiyur church build focused on preserving the historic façade while reinforcing the nave and integrating modern audio-visual systems for hybrid services.",
    scopeOfWork: [
      "Structural strengthening using micro-piles and RCC jacketing",
      "New bell tower fabrication with lightning protection system",
      "Acoustic ceiling panels and concealed HVAC distribution",
      "Landscape plaza with seating and rainwater harvesting pits",
    ],
    highlights: [
      { label: "Heritage façade retained", value: "100%" },
      { label: "Service bays added", value: "03" },
      { label: "Completion", value: "Q3 2019" },
    ],
    outcomes: [
      "Extended structural life by an estimated 35 years",
      "Enhanced AV intelligibility with reverberation time tuned to 1.4s",
      "Created an inclusive entry experience with barrier-free ramps",
    ],
  },
  3: {
    overview:
      "At Irumbedu, the parish required a simple yet dignified structure that could be built with local materials and maintained by the community volunteers.",
    scopeOfWork: [
      "Precast column and beam system for accelerated erection",
      "Clay-tile roof with insulation to counter high solar gain",
      "Open-air fellowship court with pergolas and shaded seating",
      "Solar-powered lighting and basic AV integration",
    ],
    highlights: [
      { label: "Construction duration", value: "11 months" },
      { label: "On-site prefabrication", value: "60%" },
      { label: "Energy savings", value: "18% annual" },
    ],
    outcomes: [
      "Delivered within a modest parish budget without compromising quality",
      "Empowered local labor through skills training on precast assembly",
      "Created a versatile hall supporting daily community programs",
    ],
  },
  4: {
    overview:
      "The Wallajabad church combines vernacular cues with a sculpted RCC roof, enabling uninterrupted spans for clear sightlines and choir acoustics.",
    scopeOfWork: [
      "Pile foundations to counter black cotton soil",
      "Cast-in-place folded roof slab with skylight monitors",
      "Handcrafted stained-glass panels sourced from Puducherry artisans",
      "Custom pews, lectern, and pulpit woodworking package",
    ],
    highlights: [
      { label: "Seating capacity", value: "520 people" },
      { label: "Roof span", value: "21 m clear" },
      { label: "Quality audits", value: "8 third-party checks" },
    ],
    outcomes: [
      "Improved natural illumination by 55% through roof monitors",
      "Achieved strict acoustic criteria for sermons and choir recitals",
      "Strengthened community pride with locally crafted liturgical art",
    ],
  },
  5: {
    overview:
      "Premium residential redevelopment in T. Nagar delivering eight luxury apartments with concierge lobby, mechanized parking, and smart-home readiness.",
    scopeOfWork: [
      "Basement + stilt + 5 floor RCC frame with PT slabs",
      "Façade articulation using metal fins and glass guardrails",
      "High-end interiors with VRF air-conditioning and home automation",
      "Common amenities including rooftop garden and fitness studio",
    ],
    highlights: [
      { label: "Apartments", value: "8 units" },
      { label: "Car parks", value: "16 mechanized" },
      { label: "Handover", value: "Jan 2022" },
    ],
    outcomes: [
      "Achieved 30% faster sales velocity due to premium finishes",
      "Optimized floor plates to deliver dual-aspect living spaces",
      "Implemented IoT-based metering for energy transparency",
    ],
  },
  6: {
    overview:
      "Boutique residences in West Mambalam focusing on cross-ventilated layouts, expansive balconies, and community terraces for multigenerational living.",
    scopeOfWork: [
      "Structural design optimized for column-free living areas",
      "Brick cladding with recessed windows to cut heat gain",
      "Modular kitchen fit-outs and wardrobe packages",
      "Rainwater harvesting sump and greywater reuse piping",
    ],
    highlights: [
      { label: "Units delivered", value: "12 homes" },
      { label: "Open terraces", value: "2 communal decks" },
      { label: "Water recycled", value: "22 KL/day" },
    ],
    outcomes: [
      "Reduced HVAC loads by 18% via envelope optimization",
      "Enabled flexible interiors with concealed beam strategy",
      "Improved community interaction through shared terraces",
    ],
  },
  7: {
    overview:
      "Value-focused housing in Kolathur emphasizing durability, low maintenance, and efficient circulation suited for rental yields.",
    scopeOfWork: [
      "Construction using fly-ash bricks and precast staircase modules",
      "Planned service shafts for easy plumbing maintenance",
      "Roof-top solar preparation with conduit routing",
      "Ground floor retail fit-outs supporting mixed-use typology",
    ],
    highlights: [
      { label: "Total units", value: "18 apartments" },
      { label: "Retail bays", value: "4 shops" },
      { label: "Budget adherence", value: "100%" },
    ],
    outcomes: [
      "Achieved 12% lower lifecycle cost compared to market references",
      "Enabled phased leasing by delivering wings sequentially",
      "Enhanced neighborhood streetscape with active ground floor",
    ],
  },
  8: {
    overview:
      "Super deluxe flats in Chengalpattu designed as a gated mini-community with private lobbies, landscaped podium, and EV-ready infrastructure.",
    scopeOfWork: [
      "Two residential blocks connected by landscaped podium level",
      "Post-tensioned slabs for large column-free living-dining areas",
      "Clubhouse interiors including cowork lounge and creche",
      "Complete MEP coordination with BIM level-of-detail 300",
    ],
    highlights: [
      { label: "Built-up area", value: "1.1 lakh sq.ft" },
      { label: "EV chargers", value: "12 bays" },
      { label: "Structural cycles", value: "7-day floor cycle" },
    ],
    outcomes: [
      "Achieved IGBC pre-certification for sustainable features",
      "Delivered seamless handover with digital snag-tracking",
      "Residents report 25% higher usable common space than peers",
    ],
  },
  9: {
    overview:
      "Porur residences integrate biophilic pockets, vertical greens, and dual-aspect homes tailored for young families seeking urban conveniences.",
    scopeOfWork: [
      "Ground + 5 floors with split-level podium parking",
      "Green wall irrigation and automated drip systems",
      "Dual water supply network with STP treated water reuse",
      "Interior fit-out for sample apartment and sales gallery",
    ],
    highlights: [
      { label: "Open space ratio", value: "42%" },
      { label: "Apartments", value: "24 units" },
      { label: "Energy reduction", value: "21% via LEDs + VFD pumps" },
    ],
    outcomes: [
      "Enhanced air quality metrics with 18 indoor planters per floor",
      "Boosted absorption rate through immersive sample flat",
      "Set up residents app for facility management at handover",
    ],
  },
  10: {
    overview:
      "Ford Alliance industrial facility built to global OEM standards, supporting assembly lines, logistics docks, and employee amenities.",
    scopeOfWork: [
      "Pre-engineered building (PEB) with 30 m clear span",
      "Heavy-duty flooring with epoxy finish and embedded rails",
      "Compressed air, process water, and power distribution rings",
      "Administrative block with training rooms and cafeteria",
    ],
    highlights: [
      { label: "Production bays", value: "4 independent lines" },
      { label: "EOT cranes", value: "5T & 10T capacity" },
      { label: "Safety record", value: "0 LTI during execution" },
    ],
    outcomes: [
      "Enabled client to ramp up output by 2X within first quarter",
      "Achieved FM Global compliance for fire and life safety",
      "Delivered flexible utilities corridor for future automation",
    ],
  },
  11: {
    overview:
      "MM Nagar factory expansion providing scalable manufacturing floors with robust utilities backbone and lean material flow.",
    scopeOfWork: [
      "Composite steel columns with RCC plinth beams",
      "Dock levellers, rolling shutters, and insulated roofing",
      "Central utility block for DG, chillers, and compressors",
      "Peripheral road, drains, and security infrastructure",
    ],
    highlights: [
      { label: "Built-up area", value: "78,000 sq.ft" },
      { label: "Loading docks", value: "6 bays" },
      { label: "Execution time", value: "10 months" },
    ],
    outcomes: [
      "Improved material handling time by 28% via linear dock planning",
      "Reduced roof heat gain with double-skin panels and turbo vents",
      "Provisioned spare capacity for 30% future machine additions",
    ],
  },
  12: {
    overview:
      "Poonamallee industrial complex conceived as a multi-tenant ecosystem with shared services, warehousing, and office pods.",
    scopeOfWork: [
      "Site grading and road formation across 4 acres",
      "Twin PEB sheds with mezzanine office inserts",
      "Common utilities hub with STP, ETP, and RO plant",
      "Security, weighbridge, and truck holding zones",
    ],
    highlights: [
      { label: "Tenants supported", value: "5 MSME units" },
      { label: "Clear height", value: "11 m" },
      { label: "Power capacity", value: "2.5 MVA" },
    ],
    outcomes: [
      "Enabled staggered leasing with independent metering",
      "Achieved 100% stormwater percolation through recharge wells",
      "Delivered digital twin for facilities team via BIM exports",
    ],
  },
  14: {
    overview:
      "Peri College campus expansion delivering advanced laboratories, lecture halls, and student commons linked by shaded corridors.",
    scopeOfWork: [
      "Academic block with composite steel + deck slab system",
      "Lab utilities including fume extraction and UPS power",
      "Learning commons fitted with tiered seating and AV",
      "Outdoor courts, cafeteria, and hostel refurbishment",
    ],
    highlights: [
      { label: "Students served", value: "3,200+" },
      { label: "New labs", value: "12 specialized labs" },
      { label: "Site area", value: "7 acres activated" },
    ],
    outcomes: [
      "Accreditation-ready infrastructure delivered ahead of inspection",
      "Increased usable academic hours via daylight and ventilation design",
      "Activated campus heart with inclusive student collaboration zones",
    ],
  },
  15: {
    overview:
      "Ooty cottage cluster that blends stone masonry, timber trusses, and wraparound verandahs to resonate with the Nilgiri landscape.",
    scopeOfWork: [
      "Split-level cottages following natural contours",
      "Locally quarried stone cladding and teak joinery",
      "Radiant heating provisions with concealed piping",
      "Landscape masterplan with herb garden and firepit court",
    ],
    highlights: [
      { label: "Cottages", value: "6 suites" },
      { label: "Altitude", value: "2,200 m above MSL" },
      { label: "Rainwater storage", value: "90 KL" },
    ],
    outcomes: [
      "Achieved 70% local material sourcing for authentic aesthetics",
      "Delivered all-weather access paths without tree felling",
      "Guest satisfaction scores improved with panoramic verandahs",
    ],
  },
  16: {
    overview:
      "Community road formation initiative delivering durable pavements, drains, and street lighting for peri-urban panchayats.",
    scopeOfWork: [
      "Topographical survey and geometric road alignment",
      "Granular sub-base stabilization and bituminous surfacing",
      "Side drains with precast covers for pedestrian safety",
      "Solar street lighting and signage installation",
    ],
    highlights: [
      { label: "Road length", value: "24 km cumulative" },
      { label: "Villages connected", value: "18 habitations" },
      { label: "Drainage pits", value: "320 recharge pits" },
    ],
    outcomes: [
      "Reduced travel time to primary health centers by 35%",
      "Improved flood resilience with integrated drainage",
      "Created local employment through maintenance contracts",
    ],
  },
  17: {
    overview:
      "Turnkey land survey and drainage modernization supporting urban local bodies with accurate datasets and resilient infrastructure.",
    scopeOfWork: [
      "DGPS-based topographical survey and cadastral mapping",
      "Hydrological modelling for micro-watersheds",
      "Design and execution of RCC box drains and culverts",
      "Capacity building workshops for municipal staff",
    ],
    highlights: [
      { label: "Survey coverage", value: "6,500 acres" },
      { label: "Drain lines executed", value: "17 km" },
      { label: "Training sessions", value: "9 cohorts" },
    ],
    outcomes: [
      "Provided actionable GIS layers for future planning",
      "Lowered waterlogging incidents during monsoon by 48%",
      "Enabled municipalities to monitor assets with digital twins",
    ],
  },
  18: {
    overview:
      "CSI Arul Church at Madhavaram is an ongoing project featuring soaring arches, skylit nave, and community annex tailored for outreach programs.",
    scopeOfWork: [
      "Foundation and superstructure works with hybrid steel-RCC arches",
      "Large-span roof with ETFE skylights for diffused daylight",
      "Community block housing classrooms, pantry, and counselling rooms",
      "Phase-wise execution plan to keep existing chapel functional",
    ],
    highlights: [
      { label: "Current status", value: "Structure 80% complete" },
      { label: "Projected seating", value: "700 worshippers" },
      { label: "Target completion", value: "Q2 2027" },
    ],
    outcomes: [
      "Future-ready services routed through accessible trenches",
      "Designed acoustic profile to cater both choir and spoken word",
      "Phased logistics minimize disruption to regular services",
    ],
  },
};

export default projectDetails;



