import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Building2, ShoppingBag, Utensils } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Demo = {
  number: string;
  title: string;
  type: string;
  description: string;
  cover: string;
  coverAlt: string;
  href: string;
  icon: LucideIcon;
  color: string;
};

const demos: Demo[] = [
  {
    number: "01",
    title: "Tienda online",
    type: "E-commerce",
    description: "Una tienda digital diseñada para descubrir productos y disfrutar una compra sencilla.",
    cover: "image1.png",
    coverAlt: "Portada de la demo de tienda online",
    href: "https://electronics-ecommerc-oeno.bolt.host/",
    icon: ShoppingBag,
    color: "from-[#66513a] to-[#252321]",
  },
  {
    number: "02",
    title: "Restaurante",
    type: "Gastronomía · Reservas",
    description: "Un espacio para conocer el menú, descubrir el restaurante y planear una visita.",
    cover: "image2.png",
    coverAlt: "Portada de la demo de restaurante",
    href: "https://sabore-restaurant-la-7pxk.bolt.host/",
    icon: Utensils,
    color: "from-[#344f44] to-[#1b2527]",
  },
  {
    number: "03",
    title: "Web corporativa",
    type: "Servicios · Empresas",
    description: "Sitio web corporativo optimizado para generar autoridad de marca, posicionar servicios de alto valor y captar clientes potenciales cualificados.",
    cover: "image3.png",
    coverAlt: "Portada de la demo de sitio corporativo",
    href: "https://sweet-kelpie-896b7c.netlify.app/",
    icon: Building2,
    color: "from-[#4f3d78] to-[#1d2333]",
  },
    {
    number: "04",
    title: "Panel de Control y Gestión Operativa",
    type: "Tienda Online",
    description: "Panel de control intuitivo para gestionar ventas, pedidos, inventario en tiempo real y visualizar métricas clave de rendimiento de tu negocio.",
    cover: "image4.png",
    coverAlt: "Portada de la demo de sitio corporativo",
    href: "https://electronics-store-ad-i0e3.bolt.host/",
    icon: Building2,
    color: "from-[#4f3d78] to-[#1d2333]",
  },
];

export default function DemoShowcase() {
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

  function scrollDemos(direction: -1 | 1) {
    const element = carousel.current;
    const firstCard = element?.querySelector<HTMLElement>("[data-demo-card]");
    if (!element || !firstCard) return;

    const gap = Number.parseFloat(window.getComputedStyle(element).columnGap) || 0;
    element.scrollBy({ left: direction * (firstCard.offsetWidth + gap), behavior: "smooth" });
  }

  return (
    <div className="relative mt-12 md:px-12">
      <div
        ref={carousel}
        role="region"
        aria-label="Demos del portafolio"
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {demos.map((demo) => {
          const Icon = demo.icon;

          return (
            <article
              key={demo.number}
              data-demo-card
              className="glass-card group w-[88%] shrink-0 snap-start overflow-hidden rounded-3xl sm:w-[calc((100%-1.25rem)/2)]"
            >
              <div className={`relative m-3 aspect-[16/9] overflow-hidden rounded-2xl bg-gradient-to-br ${demo.color}`}>
                {demo.cover ? (
                  <img
                    src={demo.cover}
                    alt={demo.coverAlt}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_50%_50%,rgba(255,255,255,.2),transparent_60%)]" />
                    <Icon size={64} strokeWidth={1} className="relative text-white/75 transition-transform duration-500 group-hover:scale-110" />
                    <span className="absolute bottom-4 font-mono text-[10px] uppercase tracking-[.18em] text-white/55">
                      Portada del demo
                    </span>
                  </div>
                )}
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 font-mono text-xs text-white/80 backdrop-blur">
                  {demo.number} / DEMO
                </span>
              </div>
              <div className="p-5 pt-2">
                <p className="text-xs text-lime">{demo.type}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{demo.title}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-muted">{demo.description}</p>
                {demo.href ? (
                  <a
                    href={demo.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-lime px-4 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
                  >
                    Ver demo <ArrowUpRight size={16} />
                  </a>
                ) : (
                  <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm text-muted">
                    <a href="#">abrir demo</a>
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>
      <div className="mt-5 flex justify-end gap-3 md:hidden">
        <button
          type="button"
          onClick={() => scrollDemos(-1)}
          disabled={!canScrollBack}
          aria-label="Ver demos anteriores"
          className="grid size-11 place-items-center rounded-full border border-white/15 bg-ink text-white shadow-lg transition-colors hover:border-lime hover:text-lime disabled:pointer-events-none disabled:opacity-40"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => scrollDemos(1)}
          disabled={!canScrollForward}
          aria-label="Ver siguientes demos"
          className="grid size-11 place-items-center rounded-full border border-white/15 bg-ink text-white shadow-lg transition-colors hover:border-lime hover:text-lime disabled:pointer-events-none disabled:opacity-40"
        >
          <ArrowRight size={18} />
        </button>
      </div>
      <button
        type="button"
        onClick={() => scrollDemos(-1)}
        disabled={!canScrollBack}
        aria-label="Ver demos anteriores"
        className="absolute left-0 top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink/90 text-white shadow-lg backdrop-blur transition-colors hover:border-lime hover:text-lime disabled:pointer-events-none disabled:opacity-0 md:grid"
      >
        <ArrowLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => scrollDemos(1)}
        disabled={!canScrollForward}
        aria-label="Ver siguientes demos"
        className="absolute right-0 top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink/90 text-white shadow-lg backdrop-blur transition-colors hover:border-lime hover:text-lime disabled:pointer-events-none disabled:opacity-0 md:grid"
      >
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
