import Script from "next/script";

interface StructuredDataProps {
  type?: "Organization" | "LocalBusiness" | "WebSite";
}

export default function SEOStructuredData({ type = "LocalBusiness" }: StructuredDataProps) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.delphinassociates.com";

  const reviewSchema = [
    {
      "@type": "Review",
      author: {
        "@type": "Organization",
        name: "CSI Madras Diocese",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "4.5",
        bestRating: "5",
      },
      reviewBody:
        "Delphin Associates has built several of our church buildings across Tamil Nadu. Their understanding of sacred architecture, transparent budgeting, and timely completion has made them our trusted construction partner.",
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Mr. V. Gajapathi",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5.0",
        bestRating: "5",
      },
      reviewBody:
        "From planning to handover, the execution was transparent and precise. They delivered exactly what was promised, on schedule - and their support didn't stop after the keys were handed over.",
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Mr. A. Jeyashekar",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5.0",
        bestRating: "5",
      },
      reviewBody:
        "We entrusted Delphin Associates with our commercial building at Tambaram. Their technical strength and clear communication at every stage gave us complete confidence in the build.",
    },
  ];

  const aggregateRatingSchema = {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "3",
  };

  const sameAsSchema = [
    "https://www.instagram.com/delphinassociatesofficial/",
    "https://x.com/delphin75358",
    "https://www.linkedin.com/company/delphin-associates-official/",
    "https://www.threads.com/@delphinassociatesofficial",
  ];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Delphin Associates",
    url: baseUrl,
    logo: `${baseUrl}/favicon.png`,
    description:
      "Delphin Associates - You Dream We Build. Building Trust Through Quality Since 1999. Leading civil construction company in Chennai, Tamil Nadu.",
    foundingDate: "1999",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-98412-43345",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Tamil"],
    },
    sameAs: sameAsSchema,
    aggregateRating: aggregateRatingSchema,
    review: reviewSchema,
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Delphin Associates",
    image: `${baseUrl}/favicon.png`,
    "@id": baseUrl,
    url: baseUrl,
    telephone: "+91-98412-43345",
    sameAs: sameAsSchema,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 261A, 6th Main road, LIC nagar, Madipakkam",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      postalCode: "600091",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "12.958168",
      longitude: "80.203867",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    description:
      "Delphin Associates - You Dream We Build. Building Trust Through Quality Since 1999. Leading civil construction company in Chennai, Tamil Nadu, specializing in residential, industrial, commercial, institutional, and church projects.",
    areaServed: {
      "@type": "City",
      name: "Chennai",
    },
    aggregateRating: aggregateRatingSchema,
    review: reviewSchema,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Residential Construction",
            description: "Residential building construction services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Industrial Construction",
            description: "Industrial building construction services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Commercial Construction",
            description: "Commercial building construction services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Institutional Construction",
            description: "Institutional building construction services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Church Construction",
            description: "Church building construction services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Building Consultancy",
            description: "Building consultancy and project execution services",
          },
        },
      ],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Delphin Associates",
    url: baseUrl,
    description:
      "Delphin Associates - You Dream We Build. Building Trust Through Quality Since 1999. Leading civil construction company in Chennai, Tamil Nadu.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/projects?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // Determine schema based on type - using Record<string, any> or arrays to allow different schema structures
  let schema: any = 
    type === "LocalBusiness" 
      ? localBusinessSchema 
      : type === "WebSite" 
      ? websiteSchema 
      : organizationSchema;

  // Add Upcoming Projects to LocalBusiness and Organization schemas for SEO reach
  if (type === "LocalBusiness" || type === "Organization") {
    schema = [
      schema,
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Upcoming Construction Projects",
        numberOfItems: 3,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "CreativeWork",
              name: "Individual Bungalow",
              description: "4,000 sq.ft individual bungalow - currently under construction.",
              image: `${baseUrl}/upcoming-projects/Proposed-Residential-Madipakkam.jpeg`,
              contentLocation: {
                "@type": "Place",
                name: "Madipakkam, Chennai",
              },
              creativeWorkStatus: "Ongoing",
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "CreativeWork",
              name: "Residential Development",
              description: "Proposed residential project - design and planning stage.",
              image: `${baseUrl}/upcoming-projects/Proposed-Residential-Adambakkam.jpeg`,
              contentLocation: {
                "@type": "Place",
                name: "Adambakkam, Chennai",
              },
              creativeWorkStatus: "Proposed",
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "CreativeWork",
              name: "Commercial Building",
              description: "Proposed commercial building for Measurecon Instruments.",
              image: `${baseUrl}/upcoming-projects/Proposed-Commercial-Building-Measurecon-Instruments-Tambaram.jpeg`,
              contentLocation: {
                "@type": "Place",
                name: "Tambaram, Chennai",
              },
              creativeWorkStatus: "Proposed",
            },
          },
        ],
      }
    ];
  }

  return (
    <Script
      id={`structured-data-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

