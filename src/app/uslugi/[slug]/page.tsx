import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageView } from "@/components/service/ServicePageView";
import { getServicePage, servicePages } from "@/content/services";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return servicePages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getServicePage(slug);
  if (!s) return {};
  const path = `/uslugi/${s.slug}/`;
  return {
    title: { absolute: `${s.seo.title} | IMG Engineering` },
    description: s.seo.description,
    alternates: { canonical: path },
    openGraph: { title: s.seo.title, description: s.seo.description, url: path, ...(s.hero ? { images: [{ url: s.hero.src }] } : {}) },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) notFound();
  return <ServicePageView service={service} />;
}
