import type { MetadataRoute } from "next";
import { guides } from "@/content/guides";
import { projects } from "@/content/projects";
import { servicePages } from "@/content/services";
import { company } from "@/content/site";

/** XML sitemap of every public, indexable page. Thank-you/error pages are excluded on purpose. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/za-doma/",
    "/za-doma/tsyalostno-reshenie/",
    "/za-biznesa/",
    "/uslugi/",
    ...servicePages.map((s) => `/uslugi/${s.slug}/`),
    "/oferti/",
    "/proekti/",
    ...projects.map((p) => `/proekti/${p.slug}/`),
    "/polezno/",
    ...guides.map((g) => `/polezno/${g.slug}/`),
    "/za-nas/",
    "/kontakti/",
    "/poiskayte-oferta/",
    "/poveritelnost/",
    "/biskvitki/",
  ];
  return paths.map((p) => ({ url: `${company.url}${p}` }));
}
