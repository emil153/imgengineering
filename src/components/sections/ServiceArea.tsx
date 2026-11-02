import { AREA_RADIUS_KM } from "@/content/area";
import { AreaMap } from "../area/AreaMap";
import { ButtonLink, Eyebrow } from "../ui";
import { quoteHref } from "@/content/site";

export function ServiceArea({ index = "07" }: { index?: string }) {
  return (
    <section aria-labelledby="area-title" className="bg-img-blue-soft py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow index={index}>Обслужвани райони</Eyebrow>
            <h2 id="area-title" className="mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] md:text-[2.75rem]">
              София и населените места в радиус от {AREA_RADIUS_KM} km.
            </h2>
          </div>
          <div className="flex items-end lg:col-span-5 lg:justify-end">
            <ButtonLink href={quoteHref} withArrow data-event="quote_cta_click" data-location="service_area">
              Проверете за вашия адрес
            </ButtonLink>
          </div>
        </div>
        <div className="mt-12">
          <AreaMap />
        </div>
      </div>
    </section>
  );
}
