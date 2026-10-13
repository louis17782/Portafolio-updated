import { useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Github, Linkedin, Send } from "lucide-react";

type FormState = "idle" | "sent";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setState("sent");
    form.reset();
  }

  return (
    <div className="mt-12 grid gap-10 md:grid-cols-[.8fr_1.2fr]">
      <div>
        <h3 className="max-w-sm text-3xl font-semibold leading-tight tracking-tight">¿Tienes un proyecto en mente?</h3>
        <p className="mt-4 max-w-sm text-sm leading-7 text-muted">Cuéntame qué quieres construir. Siempre estoy abierto a una buena conversación y nuevos retos.</p>
        <a href="https://wa.me/+584127924818" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm transition-colors hover:border-lime hover:text-lime">Escríbeme por WhatsApp <ArrowUpRight size={15} /></a>
        <div className="mt-8 flex gap-3">
          <a href="https://github.com/louis17782" target="_blank" rel="noreferrer" aria-label="GitHub" className="grid size-11 place-items-center rounded-full border border-white/10 text-muted transition-colors hover:border-white hover:text-white"><Github size={18} /></a>
          <a href="https://www.linkedin.com/in/luis-j-santeliz-s-678935193?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid size-11 place-items-center rounded-full border border-white/10 text-muted transition-colors hover:border-white hover:text-white"><Linkedin size={18} /></a>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-5 sm:p-7">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-xs text-muted">Nombre<input name="name" required minLength={2} autoComplete="name" className="mt-2 w-full rounded-xl border border-white/10 bg-ink/70 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-lime" placeholder="Tu nombre" /></label>
          <label className="text-xs text-muted">Email<input name="email" type="email" required autoComplete="email" className="mt-2 w-full rounded-xl border border-white/10 bg-ink/70 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-lime" placeholder="tu@email.com" /></label>
        </div>
        <label className="mt-4 block text-xs text-muted">¿En qué puedo ayudarte?<textarea name="message" required minLength={10} rows={4} className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-ink/70 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-lime" placeholder="Cuéntame un poco sobre tu proyecto..." /></label>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.02]">{state === "sent" ? "Mensaje listo" : "Enviar mensaje"} {state === "sent" ? <CheckCircle2 size={16} /> : <Send size={15} />}</button>
          {state === "sent" && <p role="status" className="text-xs text-lime">Formulario validado. Configura un endpoint para recibir mensajes.</p>}
        </div>
      </form>
    </div>
  );
}
