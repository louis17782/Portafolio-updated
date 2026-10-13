import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Factory,
  Gauge,
  GraduationCap,
  Heart,
  Hotel,
  Laptop,
  Music2,
  ShoppingBag,
  Sparkles,
  Sun,
  Truck,
} from "lucide-react";

const projects = [
  {
    number: "01",
    title: "Nómada Studio",
    type: "E-commerce · Retail",
    description: "Una experiencia de compra editorial para una marca de diseño independiente.",
    metric: "+38%",
    metricLabel: "conversión",
    icon: ShoppingBag,
    tags: ["Next.js", "Shopify", "Stripe"],
    color: "from-[#4f3d78] to-[#1d2333]",
    href: "https://github.com/tu-usuario/nomada-studio",
  },
  {
    number: "02",
    title: "Altura Finance",
    type: "Fintech · Dashboard",
    description: "Datos complejos, simplificados en una plataforma clara y accesible.",
    metric: "0.8s",
    metricLabel: "carga inicial",
    icon: Gauge,
    tags: ["React", "TypeScript", "Node.js"],
    color: "from-[#344f44] to-[#1b2527]",
    href: "https://github.com/tu-usuario/altura-finance",
  },
  {
    number: "03",
    title: "Casa Oliva",
    type: "Hospitality · Reservas",
    description: "Del descubrimiento a la reserva, una experiencia digital hecha a medida.",
    metric: "+52%",
    metricLabel: "reservas directas",
    icon: Sparkles,
    tags: ["Astro", "Sanity", "Tailwind"],
    color: "from-[#66513a] to-[#252321]",
    href: "https://github.com/tu-usuario/casa-oliva",
  },
  {
    number: "04",
    title: "Campo Noble",
    type: "E-commerce · Equitación",
    description: "Una tienda especializada en productos, equipo y cuidado para caballos.",
    metric: "EQUINO",
    metricLabel: "tienda ecuestre",
    icon: Heart,
    tags: ["Shopify", "React", "Stripe"],
    color: "from-[#69523d] to-[#27251f]",
    href: "https://github.com/tu-usuario/campo-noble",
  },
  {
    number: "05",
    title: "Hotel Brisa",
    type: "Hospitality · Reservas",
    description: "Un sitio para descubrir habitaciones, consultar disponibilidad y reservar.",
    metric: "24/7",
    metricLabel: "reservas online",
    icon: Hotel,
    tags: ["Astro", "React", "Bookings"],
    color: "from-[#31566a] to-[#1c2731]",
    href: "https://github.com/tu-usuario/hotel-brisa",
  },
  {
    number: "06",
    title: "Solaria Energy",
    type: "Energía · Paneles solares",
    description: "Una experiencia clara para explorar soluciones solares y solicitar cotizaciones.",
    metric: "SOLAR",
    metricLabel: "energía limpia",
    icon: Sun,
    tags: ["Next.js", "Tailwind", "Resend"],
    color: "from-[#80603a] to-[#29251f]",
    href: "https://github.com/tu-usuario/solaria-energy",
  },
  {
    number: "07",
    title: "Roadline",
    type: "Transporte · Trucking USA",
    description: "Un portal pensado para camioneros en Estados Unidos: rutas, recursos y oportunidades.",
    metric: "USA",
    metricLabel: "trucking portal",
    icon: Truck,
    tags: ["React", "Maps", "Node.js"],
    color: "from-[#425f72] to-[#1d2731]",
    href: "https://github.com/tu-usuario/roadline",
  },
  {
    number: "08",
    title: "Nexo Industrial",
    type: "Empresarial · Insumos industriales",
    description: "Un catálogo B2B para encontrar insumos, conocer soluciones y solicitar asesoría.",
    metric: "B2B",
    metricLabel: "catálogo industrial",
    icon: Factory,
    tags: ["Astro", "Tailwind", "CMS"],
    color: "from-[#4b5962] to-[#222a31]",
    href: "https://github.com/tu-usuario/nexo-industrial",
  },
  {
    number: "09",
    title: "Ritmo Sessions",
    type: "Música · DJ",
    description: "Una web vibrante para escuchar mezclas, descubrir eventos y reservar al DJ.",
    metric: "LIVE",
    metricLabel: "música y eventos",
    icon: Music2,
    tags: ["React", "Motion", "Audio"],
    color: "from-[#6a3e71] to-[#252033]",
    href: "https://github.com/tu-usuario/ritmo-sessions",
  },
  {
    number: "10",
    title: "Colegio Horizonte",
    type: "Educación · Colegio académico",
    description: "Un espacio digital para conocer la propuesta académica, comunidad y admisiones.",
    metric: "K–12",
    metricLabel: "comunidad escolar",
    icon: GraduationCap,
    tags: ["Next.js", "CMS", "Tailwind"],
    color: "from-[#3d6170] to-[#202b34]",
    href: "https://github.com/tu-usuario/colegio-horizonte",
  },
  {
    number: "11",
    title: "Voltix",
    type: "E-commerce · Electrónica",
    description: "Una tienda digital para explorar y comprar equipos y accesorios electrónicos.",
    metric: "TECH",
    metricLabel: "electrónica online",
    icon: Laptop,
    tags: ["Next.js", "Shopify", "Stripe"],
    color: "from-[#4f4d78] to-[#202433]",
    href: "https://github.com/tu-usuario/voltix",
  },
];

export default function Projects() {
  const carousel = useRef<HTMLDivElement>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);

  useEffect(() => {
    const element = carousel.current;
    if (!element) return;

    const updateScrollButtons = () => {
      setCanScrollBack(element.scrollLeft > 0);
      setCanScrollForward(element.scrollLeft + element.clientWidth < element.scrollWidth - 1);
    };

    updateScrollButtons();
    element.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      element.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  function scrollProjects(direction: -1 | 1) {
    const element = carousel.current;
    const firstCard = element?.querySelector<HTMLElement>("[data-project-card]");
    if (!element || !firstCard) return;

    const styles = window.getComputedStyle(element);
    const gap = Number.parseFloat(styles.columnGap) || 0;
    element.scrollBy({ left: direction * (firstCard.offsetWidth + gap), behavior: "smooth" });
  }

  return (
    <div className="relative mt-12">
      <div
        ref={carousel}
        aria-label="Proyectos del portafolio"
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project, index) => {
          const Icon = project.icon;
          return (
            <motion.article
              key={project.number}
              data-project-card
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              whileHover={{ y: -7, rotateX: 2 }}
              className="glass-card group w-[85%] shrink-0 snap-start overflow-hidden rounded-3xl sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
            >
              <div className={`relative m-3 flex h-48 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${project.color}`}>
                <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_50%_50%,rgba(255,255,255,.2),transparent_60%)]" />
                <Icon size={62} strokeWidth={1} className="relative text-white/80 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-8deg]" />
                <span className="absolute left-4 top-4 font-mono text-xs text-white/60">{project.number} / CASE STUDY</span>
                <span className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-xs text-white backdrop-blur">{project.metric} <span className="text-white/60">{project.metricLabel}</span></span>
              </div>
              <div className="p-5 pt-3">
                <p className="text-xs text-lime">{project.type}</p>
                <div className="mt-2 flex items-center justify-between">
                  <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
                  <a href={project.href} target="_blank" rel="noreferrer" aria-label={`Ver proyecto ${project.title}`} className="rounded-full border border-white/10 p-2 transition-colors hover:border-lime hover:text-lime">
                    <ArrowUpRight size={16} />
                  </a>
                </div>
                <p className="mt-2 min-h-12 text-sm leading-6 text-muted">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => <span key={tag} className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] text-white/70">{tag}</span>)}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => scrollProjects(-1)}
        disabled={!canScrollBack}
        aria-label="Ver proyectos anteriores"
        className="absolute left-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink/90 text-white shadow-lg backdrop-blur transition-colors hover:border-lime hover:text-lime disabled:pointer-events-none disabled:opacity-0 sm:-left-5"
      >
        <ArrowLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => scrollProjects(1)}
        disabled={!canScrollForward}
        aria-label="Ver siguientes proyectos"
        className="absolute right-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink/90 text-white shadow-lg backdrop-blur transition-colors hover:border-lime hover:text-lime disabled:pointer-events-none disabled:opacity-0 sm:-right-5"
      >
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
