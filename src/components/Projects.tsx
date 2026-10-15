import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Factory,
  GraduationCap,
  Hotel,
  Music2,
  ShoppingBag,
  Sun,
  Truck,
} from "lucide-react";

const projects = [
  {
    number: "01",
    title: "Refuah apothecary",
    type: "E-commerce · Medicina",
    description: "Apothecary es una marca de bienestar botánico fundada por una médica que combina la sabiduría de los remedios herbales.",
    metric: "Miami, USA",
    icon: ShoppingBag,
    tags: ["Shopify"],
    color: "from-[#4f3d78] to-[#1d2333]",
    href: "https://refuahapothecary.com/es",
  },
  {
    number: "02",
    title: "La 95 trucking show",
    type: "Radio - Podcast",
    description: "Una plataforma versátil que combina información, entretenimiento, suscripciones y pasarelas de pagos.",
    metric: "New Jersey, USA",
    icon: Truck,
    tags: ["React", "Ruby", "Node.js"],
    color: "from-[#344f44] to-[#1b2527]",
    href: "https://la95truckingshow.com/",
  },
  {
    number: "03",
    title: "Hotel Simona del mar",
    type: "Hotel · Reservas",
    description: "Un diseño profesional web exclusiva para reservas de habitaciones y pasarela de pagos.",
    metric: "Colombia",
    icon: Hotel,
    tags: ["Workpress", "Bookings", "Woocommerce"],
    color: "from-[#66513a] to-[#252321]",
    href: "https://simonadelmar.com.co/",
  },
  {
    number: "04",
    title: "Para tu caballo",
    type: "E-commerce - Equino",
    description: "Una tienda especializada en productos, equipo y cuidado para caballos con pasarelas de pagos.",
    metric: "Venezuela",
    icon: ShoppingBag,
    tags: ["Vite", "javascript"],
    color: "from-[#69523d] to-[#27251f]",
    href: "https://paratucaballo.com/",
  },
  {
    number: "05",
    title: "HRCC",
    type: "PaneleS Solares",
    description: "Sitio web con interfaz moderna y fluida, con animaciones suaves que mejoran la experiencia del usuario.",
    metric: "Venezuela",
    icon: Sun,
    tags: ["Astro", "React", "Javascript"],
    color: "from-[#31566a] to-[#1c2731]",
    href: "https://construccioneshrcc.com/",
  },
  {
    number: "06",
    title: "Dj Raggart Radio",
    type: "Radio",
    description: "Plataforma musical con álbumes, radio 24/7, galería e integración social.",
    metric: "Venezuela",
    icon: Music2,
    tags: ["Astro"],
    color: "from-[#80603a] to-[#29251f]",
    href: "https://djraggart.com/",
  },
  {
    number: "07",
    title: "Glowtech",
    type: "Ecommnerce - Electronics",
    description: "Tienda online orientada a ventas en Venezuela con catálogos de productos, carrito de compras.",
    metric: "Venezuela",
    icon: ShoppingBag,
    tags: ["Ruby on Rails"],
    color: "from-[#425f72] to-[#1d2731]",
    href: "https://glowtechve.com/",
  },
  {
    number: "08",
    title: "Inprocica International LLC",
    type: "Empresarial · Insumos industriales",
    description: "Un espacio diseñado para brindarte contenido informativo, formulario de contacto",
    metric: "Miami, USA",
    icon: Factory,
    tags: ["Astro", "Node.js", "Resend"],
    color: "from-[#4b5962] to-[#222a31]",
    href: "https://inprocicainternational.com/",
  },
  {
    number: "09",
    title: "Venezolana de acero",
    type: "Empresarial · Metales",
    description: "Landing page para una empresa de aceros en Venezuela, mostrando sus servicios y productos.",
    metric: "Venezuela",
    icon: Factory,
    tags: ["Astro"],
    color: "from-[#6a3e71] to-[#252033]",
    href: "https://venezolanadeacero.netlify.app/",
  },
  {
    number: "10",
    title: "Colegio Casica Anasoli",
    type: "Educación · Colegio académico",
    description: "Un espacio digital para conocer la propuesta académica, comunidad y admisiones.",
    metric: "Venezuela",
    icon: GraduationCap,
    tags: ["Astro"],
    color: "from-[#3d6170] to-[#202b34]",
    href: "https://colegioanasoli.com/",
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
        className="flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
              className="glass-card group flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-3xl sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
            >
              <div className={`relative m-3 flex h-48 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${project.color}`}>
                <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_50%_50%,rgba(255,255,255,.2),transparent_60%)]" />
                <Icon size={62} strokeWidth={1} className="relative text-white/80 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-8deg]" />
                <span className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-xs text-white backdrop-blur">{project.metric} <span className="text-white/60">{project.metricLabel}</span></span>
              </div>
              <div className="flex flex-1 flex-col p-5 pt-3">
                <p className="text-xs text-lime">{project.type}</p>
                <div className="mt-2 flex items-center justify-between">
                  <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
                  <a href={project.href} target="_blank" rel="noreferrer" aria-label={`Ver proyecto ${project.title}`} className="rounded-full border border-white/10 p-2 transition-colors hover:border-lime hover:text-lime">
                    <ArrowUpRight size={16} />
                  </a>
                </div>
                <p className="mt-2 min-h-12 text-sm leading-6 text-muted">{project.description}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
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
