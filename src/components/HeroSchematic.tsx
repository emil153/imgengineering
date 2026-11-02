/**
 * Illustrative building-services section drawing (not a photo, not an IMG project).
 * Shows the four disciplines in one building: ventilation, air conditioning,
 * underfloor heating and an air-to-water heat pump. Built as inline SVG:
 * zero network requests, crisp at every size, and honest about what it is.
 */

const RED = "var(--color-img-red)";
const BLUE = "var(--color-img-blue)";
const YELLOW = "var(--color-img-yellow)";

function PipeRow({ y, from, to }: { y: number; from: number; to: number }) {
  const dots = [];
  for (let x = from; x <= to; x += 14) dots.push(<circle key={x} cx={x} cy={y} r="2.6" fill={RED} />);
  return <g>{dots}</g>;
}

function Label({ x, y, n, text, anchor = "start" }: { x: number; y: number; n: string; text: string; anchor?: "start" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className="fill-img-black font-mono" fontSize="12.5" letterSpacing="1.4">
      <tspan fontWeight="500">{n}</tspan>
      <tspan className="fill-img-grey-dark"> {text}</tspan>
    </text>
  );
}

export function HeroSchematic() {
  return (
    <svg viewBox="0 0 640 520" className="h-auto w-full" aria-hidden="true">
      {/* ground */}
      <path d="M24 440H616" stroke="black" strokeWidth="1.5" />
      {Array.from({ length: 30 }, (_, i) => (
        <path key={i} d={`M${34 + i * 20} 446l-10 10`} stroke="black" strokeOpacity="0.25" />
      ))}

      {/* building section */}
      <path d="M100 440V170L290 82L480 170V440" fill="white" stroke="black" strokeWidth="2" strokeLinejoin="miter" />
      <path d="M100 170H480" stroke="black" strokeWidth="1.5" />
      <rect x="100" y="298" width="380" height="9" fill="black" />
      <path d="M100 426H480" stroke="black" strokeOpacity="0.35" />
      <path d="M100 286H480" stroke="black" strokeOpacity="0.35" />

      {/* 03 underfloor heating: pipe cross-sections in screed */}
      <PipeRow y={433} from={116} to={466} />
      <PipeRow y={293} from={116} to={466} />

      {/* 01 ventilation ducts + riser */}
      <rect x="128" y="178" width="300" height="16" fill={BLUE} fillOpacity="0.28" stroke={BLUE} strokeWidth="1.5" />
      <rect x="128" y="314" width="300" height="16" fill={BLUE} fillOpacity="0.28" stroke={BLUE} strokeWidth="1.5" />
      <rect x="428" y="140" width="16" height="190" fill={BLUE} fillOpacity="0.28" stroke={BLUE} strokeWidth="1.5" />
      <path d="M428 140h16l6-22h-28Z" fill="white" stroke="black" strokeWidth="1.2" />
      {[188, 268, 348].map((x) => (
        <g key={x}>
          <path d={`M${x - 10} 194h20l-5 6h-10Z`} fill="black" />
          <path d={`M${x} 204V236`} stroke={BLUE} strokeWidth="1.5" className="flow" />
          <path d={`M${x - 10} 330h20l-5 6h-10Z`} fill="black" />
          <path d={`M${x} 340V372`} stroke={BLUE} strokeWidth="1.5" className="flow" />
        </g>
      ))}

      {/* 02 air conditioning indoor unit */}
      <rect x="108" y="216" width="58" height="20" fill="white" stroke="black" strokeWidth="1.3" />
      <path d="M112 231h50" stroke="black" strokeOpacity="0.4" />
      <path d="M120 242c4 8-4 14 0 22M136 242c4 8-4 14 0 22M152 242c4 8-4 14 0 22" stroke={BLUE} strokeWidth="1.4" fill="none" className="flow" />

      {/* buffer tank / hydraulic module */}
      <rect x="440" y="350" width="26" height="70" rx="2" fill="white" stroke="black" strokeWidth="1.3" />
      <path d="M440 372h26M440 398h26" stroke="black" strokeOpacity="0.3" />

      {/* 04 heat pump outdoor unit + flow/return */}
      <path d="M466 368H528" stroke={RED} strokeWidth="2" className="flow" />
      <path d="M466 404H528" stroke={BLUE} strokeWidth="2" className="flow" />
      <path d="M440 412H116" stroke={RED} strokeWidth="1.2" strokeOpacity="0.6" />
      <rect x="528" y="352" width="84" height="76" fill="white" stroke="black" strokeWidth="1.5" />
      <circle cx="562" cy="390" r="25" fill="none" stroke={YELLOW} strokeWidth="3" />
      <path d="M562 366v48M538 390h48M545 373l34 34M579 373l-34 34" stroke="black" strokeOpacity="0.35" />
      <circle cx="562" cy="390" r="4" fill="black" />
      <path d="M596 364v52" stroke="black" strokeOpacity="0.3" strokeDasharray="3 3" />
      <path d="M532 428v12M608 428v12" stroke="black" strokeWidth="1.5" />

      {/* annotations */}
      <g stroke="black" strokeWidth="0.9">
        <path d="M444 132 L500 92 H612" fill="none" />
        <circle cx="444" cy="132" r="2.5" fill="black" />
        <path d="M137 216 L84 132 H24" fill="none" />
        <circle cx="137" cy="216" r="2.5" fill="black" />
        <path d="M228 433 V490" fill="none" />
        <circle cx="228" cy="433" r="2.5" fill="black" />
        <path d="M570 352 V310 H612" fill="none" />
        <circle cx="570" cy="352" r="2.5" fill="black" />
      </g>
      <Label x={612} y={84} n="01" text="ВЕНТИЛАЦИЯ" anchor="end" />
      <Label x={24} y={124} n="02" text="КЛИМАТИЗАЦИЯ" />
      <Label x={236} y={494} n="03" text="ПОДОВО ОТОПЛЕНИЕ" />
      <Label x={612} y={302} n="04" text="ТЕРМОПОМПА" anchor="end" />

      {/* registration marks */}
      <g stroke="black" strokeOpacity="0.5">
        <path d="M12 24V12H24M628 24V12H616M12 496V508H24M628 496V508H616" fill="none" />
      </g>
    </svg>
  );
}
