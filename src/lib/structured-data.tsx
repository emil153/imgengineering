import { company } from "@/content/site";

/**
 * Schema.org builders. ONLY verified fields are included.
 * Missing on purpose until verified: postalCode, building number,
 * geo coordinates, logo URL on production, sameAs profiles.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    legalName: company.legalName,
    taxID: company.eik,
    identifier: { "@type": "PropertyValue", propertyID: "ЕИК", value: company.eik },
    url: company.url,
    foundingDate: String(company.foundingYear),
    telephone: company.phone.display,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressCountry: company.address.country,
    },
    ...(company.email ? { email: company.email } : {}),
    sameAs: [company.facebook],
    areaServed: [
      { "@type": "City", name: "София" },
      {
        "@type": "GeoCircle",
        geoMidpoint: { "@type": "GeoCoordinates", latitude: company.geo.lat, longitude: company.geo.lng },
        geoRadius: "30000",
      },
    ],
    openingHoursSpecification: company.hours.schema.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here: data is static, typed, and contains no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
