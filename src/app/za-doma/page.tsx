import type { Metadata } from "next";
import { HubPage } from "@/components/hub/HubPage";
import { hubB2C as hub } from "@/content/hubs";

export const metadata: Metadata = {
  title: { absolute: `${hub.seo.title} | IMG Engineering` },
  description: hub.seo.description,
  alternates: { canonical: hub.path },
  openGraph: { title: hub.seo.title, description: hub.seo.description, url: hub.path, images: [{ url: hub.hero.src }] },
};

export default function Page() {
  return <HubPage hub={hub} />;
}
