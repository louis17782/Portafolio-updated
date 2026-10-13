import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const testimonials = [
  { quote: "Louis entendió el reto desde el primer día. El nuevo sitio no solo se ve increíble: ahora convierte visitas en clientes.", name: "María López", role: "Fundadora · Nómada Studio", initials: "ML", color: "bg-lilac" },
  { quote: "Un colaborador brillante, con criterio técnico y una sensibilidad de diseño poco común. El proceso fue impecable.", name: "Diego Fernández", role: "Product Lead · Altura", initials: "DF", color: "bg-lime" },
  { quote: "Pasamos de depender de plataformas de terceros a tener una experiencia propia que nuestros clientes aman.", name: "Sofía Martínez", role: "Directora · Casa Oliva", initials: "SM", color: "bg-orange-200" },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];
  const change = (direction: number) => setIndex((value) => (value + direction + testimonials.length) % testimonials.length);

  return (
    <div className="mt-12 grid gap-8 md:grid-cols-[.7fr_1.3fr] md:items-center">
      <div>
        <p className="text-5xl font-semibold tracking-[-.06em]">5.0<span className="text-2xl text-muted">/5</span></p>
        <div className="mt-3 flex gap-1 text-lime" aria-label="5 de 5 estrellas">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
        <p className="mt-2 text-sm text-muted">Calificación promedio de clientes</p>
        <div className="mt-7 flex gap-2">
          <button onClick={() => change(-1)} aria-label="Testimonio anterior" className="grid size-10 place-items-center rounded-full border border-white/10 transition-colors hover:border-lime hover:text-lime"><ArrowLeft size={16} /></button>
          <button onClick={() => change(1)} aria-label="Siguiente testimonio" className="grid size-10 place-items-center rounded-full border border-white/10 transition-colors hover:border-lime hover:text-lime"><ArrowRight size={16} /></button>
        </div>
      </div>
      <div className="glass-card relative min-h-[245px] overflow-hidden rounded-3xl p-7 sm:p-9" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.figure key={index} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.25 }}>
            <div className="flex gap-1 text-lime">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
            <blockquote className="mt-5 text-lg leading-8 text-white/90 sm:text-xl">“{current.quote}”</blockquote>
            <figcaption className="mt-7 flex items-center gap-3">
              <span className={`grid size-10 place-items-center rounded-full text-xs font-bold text-ink ${current.color}`}>{current.initials}</span>
              <span><span className="block text-sm font-medium">{current.name}</span><span className="mt-0.5 block text-xs text-muted">{current.role}</span></span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
        <span aria-hidden="true" className="absolute right-7 top-5 font-serif text-7xl text-white/[0.06]">”</span>
      </div>
    </div>
  );
}
