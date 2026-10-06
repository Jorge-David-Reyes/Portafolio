import ipicytPreview from '@/assets/projects/IPICYT/web_IPICYT.webp';
import noticiasPreview from '@/assets/projects/Sinoticias/web_IPICYT-Sinoticias.webp';
import conageqPreview from '@/assets/projects/CONAGEQ/web_CONAGEQ.webp';

import IPICYT1 from '@/assets/projects/IPICYT/IPICYT1.webp';
import IPICYT2 from '@/assets/projects/IPICYT/IPICYT2.webp';
import IPICYT3 from '@/assets/projects/IPICYT/IPICYT3.webp';
import IPICYT4 from '@/assets/projects/IPICYT/IPICYT4.webp';
import IPICYT5 from '@/assets/projects/IPICYT/IPICYT5.webp';

import sinoticias1 from '@/assets/projects/Sinoticias/sinoticias-1.webp';
import sinoticias2 from '@/assets/projects/Sinoticias/sinoticias-2.webp';
import sinoticias3 from '@/assets/projects/Sinoticias/sinoticias-3.webp';
import sinoticias4 from '@/assets/projects/Sinoticias/sinoticias-4.webp';
import sinoticias5 from '@/assets/projects/Sinoticias/sinoticias-5.webp';
import sinoticias6 from '@/assets/projects/Sinoticias/sinoticias-6.webp';
import sinoticias7 from '@/assets/projects/Sinoticias/sinoticias-7.webp';

export const projects = [
  {
    title: 'Página institucional IPICYT',
    description: 'Desarrollo completo y migración de Vue.js a Nuxt + TypeScript, con SSR para corregir metadatos Open Graph. Backend reestructurado en Laravel con MySQL y Oracle.',
    image: ipicytPreview,
    href: 'https://ipicyt.edu.mx',
    tags: [
      { name: 'Nuxt.js', icon: 'logos:nuxt-icon' },
      { name: 'TypeScript', icon: 'logos:typescript-icon' },
      { name: 'Laravel', icon: 'logos:laravel' },
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
      { name: 'Vuetify', icon: 'logos:vuetifyjs' },
      { name: 'TypeScript', icon: 'logos:typescript-icon' },
      { name: 'Laravel', icon: 'logos:laravel' },
      { name: 'MySQL', icon: 'simple-icons:mysql' },
    ],
    gallery: [noticiasPreview, sinoticias1, sinoticias2, sinoticias3, sinoticias4, sinoticias5, sinoticias6, sinoticias7]
  },
  {
    title: 'CONAGEQ 2026',
    description: 'Sitio web oficial del evento, construido con Astro.',
    image: conageqPreview,
    href: 'https://ipicyt.edu.mx/conageq2026',
    tags: [
      { name: 'Astro', icon: 'simple-icons:astro' },
      { name: 'TypeScript', icon: 'logos:typescript-icon' },
    ],
  },
];