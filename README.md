# Portafolio web

Portafolio estático en Astro con islas React para animaciones y experiencias interactivas. Usa Tailwind CSS 4, Motion y una escena 3D en Three.js.

## Empezar

Requisitos: Node.js 20.3.0 o posterior y npm.

```sh
npm install
npm run dev
```

Comandos disponibles: `npm run dev`, `npm run build` y `npm run preview`.

## Estructura

```text
src/
  components/       # Secciones Astro y componentes interactivos React
  layouts/          # Layout y metadatos base
  pages/            # Rutas Astro
  styles/           # Tema Tailwind y estilos globales
public/             # Recursos estáticos
astro.config.mjs    # Integraciones React y Tailwind
```

## Personalización antes de publicar

- Actualiza el nombre, los textos, los enlaces sociales y los datos de contacto en `Navbar.astro`, `Footer.astro`, `ContactForm.tsx` y `index.astro`.
- Reemplaza el número de ejemplo `0000000000` del enlace de WhatsApp en `ContactForm.tsx`.
- Sustituye los proyectos, enlaces y métricas de ejemplo en `Projects.tsx` y los testimonios de muestra en `Testimonials.tsx`.
- Edita el arreglo `demos` de `src/components/DemoShowcase.tsx` para actualizar las tres demos. Guarda sus portadas en `public/` y asigna la ruta desde la raíz del sitio en `cover` (por ejemplo, `/demos/tienda.jpg`); completa `href` con el enlace publicado para activar el botón «Ver demo».
- El formulario valida los campos y muestra un estado de confirmación en el cliente; para recibir mensajes, conecta `ContactForm.tsx` con un endpoint o servicio de formularios.
- La escena 3D está generada localmente con Three.js, sin necesitar una URL de Spline ni una API externa.
