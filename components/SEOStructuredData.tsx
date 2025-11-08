import Script from "next/script";

interface StructuredDataProps {
  type?: "Organization" | "LocalBusiness" | "WebSite";
}

export default function SEOStructuredData({ type = "LocalBusiness" }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://delphinassociates.com";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Delphin Associates",
    url: baseUrl,
    logo: `${baseUrl}/logo.jpg`,
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
    sameAs: [
      "https://www.instagram.com/delphinassociatesofficial/",
      "https://x.com/delphin75358",
      "https://www.linkedin.com/company/delphin-associates",
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Delphin Associates",
    image: `${baseUrl}/logo.jpg`,
    "@id": baseUrl,
    url: baseUrl,
    telephone: "+91-98412-43345",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot No 9, 8th Street, Kubera Nagar, Madipakkam",
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

  let schema = organizationSchema;
  if (type === "LocalBusiness") {
    schema = localBusinessSchema;
  } else if (type === "WebSite") {
    schema = websiteSchema;
  }

  return (
    <Script
      id={`structured-data-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

