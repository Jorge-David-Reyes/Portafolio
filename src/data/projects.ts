import ipicytPreview from '@/assets/projects/IPICYT/web_IPICYT.webp';
import noticiasPreview from '@/assets/projects/Sinoticias/web_IPICYT-Sinoticias.webp';
import conageqPreview from '@/assets/projects/CONAGEQ/web_CONAGEQ.webp';

import IPICYT1 from '@/assets/projects/IPICYT/IPICYT1.webp';
import IPICYT2 from '@/assets/projects/IPICYT/IPICYT2.webp';
import IPICYT3 from '@/assets/projects/IPICYT/IPICYT3.webp';
import IPICYT4 from '@/assets/projects/IPICYT/IPICYT4.webp';
import IPICYT5 from '@/assets/projects/IPICYT/IPICYT5.webp';

export const projects = [
  {
    title: 'Página institucional IPICYT',
    description: 'Desarrollo completo y migración de Vue.js a Nuxt + TypeScript, con SSR para corregir metadatos Open Graph. Backend reestructurado en Laravel con MySQL y Oracle.',
    image: ipicytPreview,
    href: 'https://ipicyt.edu.mx',
    tags: [
      { name: 'Nuxt.js', icon: 'simple-icons:nuxtdotjs' },
      { name: 'TypeScript', icon: 'simple-icons:typescript' },
      { name: 'Laravel', icon: 'simple-icons:laravel' },
      { name: 'MySQL', icon: 'simple-icons:mysql' },
    ],
    gallery: [ipicytPreview, IPICYT1, IPICYT2, IPICYT3, IPICYT4, IPICYT5]
  },
  {
    title: 'IPICYT: Noticias y Eventos',
    description: 'Panel administrativo para gestión de noticias y contenido, con migración de datos de Oracle a MySQL.',
    image: noticiasPreview,
    href: 'https://ipicyt.edu.mx/sinoticias',
    tags: [
      { name: 'Vuetify', icon: 'simple-icons:vuetify' },
      { name: 'TypeScript', icon: 'simple-icons:typescript' },
      { name: 'Laravel', icon: 'simple-icons:laravel' },
      { name: 'MySQL', icon: 'simple-icons:mysql' },
    ],
  },
  {
    title: 'CONAGEQ 2026',
    description: 'Sitio web oficial del evento, construido con Astro.',
    image: conageqPreview,
    href: 'https://ipicyt.edu.mx/conageq2026',
    tags: [
      { name: 'Astro', icon: 'simple-icons:astro' },
      { name: 'TypeScript', icon: 'simple-icons:typescript' },
    ],
  },
];