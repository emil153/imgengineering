import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustSection } from "@/components/sections/TrustSection";
import { AudiencePathways } from "@/components/sections/AudiencePathways";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { WhyIMG } from "@/components/sections/WhyIMG";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { KnowledgeSection } from "@/components/sections/KnowledgeSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { JsonLd, organizationSchema } from "@/lib/structured-data";

const title = "IMG Engineering | Отопление, климатизация и вентилация";
const description =
  "Проектиране, доставка, монтаж и поддръжка на отоплителни, климатични и вентилационни системи за дома и бизнеса. IMG Engineering, София.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/" },
  // OG image pending: needs approved brand artwork or authentic project photo (1200x630).
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <Hero />
      <TrustSection />
      <AudiencePathways />
      <ServicesSection />
      <FeaturedProjects />
      <WhyIMG />
      <ProcessSection />
      <KnowledgeSection />
      <ContactCTA />
    </>
  );
}
