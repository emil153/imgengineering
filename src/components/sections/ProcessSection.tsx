import { processSteps } from "@/content/site";
import { PrototypeNote, SectionHeader, TONES, cx, tone } from "../ui";

/** Horizontal timeline on desktop, vertical on mobile. Proposed process pending confirmation. */
type Step = { title: string; text: string };
type Props = { index?: string; title?: string; steps?: Step[]; note?: string | null };

const gridCols: Record<number, string> = { 4: "lg:grid-cols-4", 5: "lg:grid-cols-5", 6: "lg:grid-cols-6" };

export function ProcessSection({
  index = "06",
  title = "От първото запитване до дългосрочната поддръжка.",
  steps = processSteps,
  note = "Предложен процес. Етапите ще бъдат потвърдени от IMG Engineering преди публикуване.",
}: Props = {}) {
  return (
    <section aria-labelledby="process-title" className="py-20 md:py-28">
      <div className="container-x">
        <SectionHeader index={index} eyebrow="Как работим" title={title} id="process-title" />

        <ol className={"relative mt-14 grid gap-0 lg:gap-6 " + (gridCols[steps.length] ?? "lg:grid-cols-6")}>
          {/* desktop connector line */}
          <span aria-hidden="true" className="absolute left-0 right-0 top-[19px] hidden h-px bg-black/20 lg:block" />
          {steps.map((s, i) => (
            <li key={s.title} className="reveal group relative grid grid-cols-[2.5rem_1fr] gap-x-5 pb-10 last:pb-0 lg:block lg:pb-0">
              {/* mobile connector line */}
              {i < steps.length - 1 && (
                <span aria-hidden="true" className="absolute bottom-0 left-[19px] top-10 w-px bg-black/20 lg:hidden" />
              )}
              <span
                className={cx(
                  "relative z-10 flex h-10 w-10 items-center justify-center font-mono text-xs font-medium transition-transform duration-300 group-hover:scale-110",
                  i === 0 ? "bg-img-green text-white" : cx(tone[TONES[i % 4]].tint, "text-img-black"),
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="lg:mt-6 lg:pr-2">
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-img-grey-dark">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        {note && <PrototypeNote className="mt-12">{note}</PrototypeNote>}
      </div>
    </section>
  );
}
