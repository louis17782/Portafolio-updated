import { SearchCheck, Target, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type MarketingTool = {
  tag: string;
  title: string;
  description: string;
  benefit: string;
  icon: LucideIcon;
};

const tools: MarketingTool[] = [
  {
    tag: "POSICIONAMIENTO ORGÁNICO",
    title: "Google Search Console",
    description:
      "Plataforma gratuita de Google que permite supervisar, mantener y optimizar la presencia de un sitio web en los resultados de búsqueda, ofreciendo datos sobre rendimiento, indexación, rastreo y diagnóstico técnico.",
    benefit: "Tu negocio visible en los primeros resultados de búsqueda.",
    icon: SearchCheck,
  },
  {
    tag: "VISIBILIDAD Y TRÁFICO",
    title: "Posicionamiento Web (SEO)",
    description:
      "Optimización técnica y de contenido para que los motores de búsqueda entiendan, clasifiquen y prioricen tu sitio web frente a la competencia de forma orgánica.",
    benefit: "Atracción constante de clientes sin pagar por cada clic.",
    icon: TrendingUp,
  },
  {
    tag: "CONVERSIÓN Y ANALÍTICA",
    title: "Píxel de Meta",
    description:
      "Fragmento de código JavaScript que se instala en el sitio web para rastrear acciones de los usuarios, medir conversiones y optimizar campañas publicitarias de Meta Ads mediante remarketing y audiencias personalizadas.",
    benefit: "Publicidad inteligente respaldada por datos reales.",
    icon: Target,
  },
];

export default function MarketingTechSection() {
  return (
    <section
      id="posicionamiento"
      aria-labelledby="marketing-tech-title"
      className="border-y border-white/[0.06] bg-white/[0.015] py-24 sm:py-32"
    >
      <div className="section-wrap">
        <div className="max-w-3xl">
          <p className="section-kicker">POSICIONAMIENTO &amp; ESTRATEGIA DIGITAL</p>
          <h2 id="marketing-tech-title" className="section-title">
            Tu sitio web no solo debe verse bien. Debe vender y posicionarse.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            Integro las herramientas fundamentales para asegurar que tu marca
            aparezca en Google, rastree clientes potenciales y optimice tu
            inversión publicitaria.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon;

            return (
              <article
                key={tool.title}
                className="glass-card group flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:border-lime-400/50 sm:p-7"
              >
                <div className="flex size-12 items-center justify-center rounded-xl border border-lime/20 bg-lime/[0.08] text-lime">
                  <Icon size={23} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <p className="mt-6 text-[0.68rem] font-semibold tracking-[0.14em] text-lime">
                  {tool.tag}
                </p>
                <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-white">
                  {tool.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                  {tool.description}
                </p>
                <div className="mt-6 border-t border-white/[0.08] pt-5">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/45">
                    Beneficio para tu negocio
                  </p>
                  <p className="mt-2 text-sm font-medium leading-6 text-white/90">
                    {tool.benefit}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
