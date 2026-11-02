import type { Metadata } from "next";
import { ServicePageView } from "@/components/service/ServicePageView";
import { homeSolutionPage as page } from "@/content/services";

export const metadata: Metadata = {
  title: { absolute: `${page.seo.title} | IMG Engineering` },
  description: page.seo.description,
  alternates: { canonical: page.path },
  openGraph: { title: page.seo.title, description: page.seo.description, url: page.path, ...(page.hero ? { images: [{ url: page.hero.src }] } : {}) },
};

export default function Page() {
  return <ServicePageView service={page} />;
}
