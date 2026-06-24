# Franco Dellorsi — Portfolio

Portafolio personal de **Franco Dellorsi**, Full-stack Developer especializado en
SaaS, sistemas de gestión, POS, reservas, dashboards y backoffice para negocios reales.

🔗 **GitHub:** [7Francus7](https://github.com/7Francus7) · **LinkedIn:** [franco-dellorsi](https://www.linkedin.com/in/franco-dellorsi/)

## Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Framer Motion
- **Routing:** React Router
- **Build:** Vite
- **Calidad:** ESLint + TypeScript estricto

## Estructura

```
src/
├── components/   # Hero, FeaturedProjects, TechStack, Process, CTA, Footer, etc.
├── pages/        # Home, Proyectos, Sobre mí, Contacto
├── data/         # projects.ts — fuente única de los proyectos
└── utils/        # helpers de proyectos
```

Los proyectos se editan en un único lugar: `src/data/projects.ts`.

## Desarrollo

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo
npm run build    # build de producción (type-check + Vite)
npm run preview  # previsualizar el build
npm run lint     # linter
```

## Deploy

El build genera estáticos en `dist/`, listos para Vercel, Netlify o cualquier hosting estático.

---

© Franco Dellorsi
