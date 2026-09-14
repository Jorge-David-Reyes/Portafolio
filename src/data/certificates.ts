import rdbmsImg from '@/assets/certificates/rdbms.webp';
import pythonProjectImg from '@/assets/certificates/python-proyecto.webp';
import pythonCienciaImg from '@/assets/certificates/python-ciencia.webp';
import introDataEngImg from '@/assets/certificates/intro-data-eng.webp';
import sqlImg from '@/assets/certificates/sql-postgresql.webp';

export const certificates = [
  {
    title: 'Introduction to Data Engineering',
    issuer: 'Coursera',
    date: 'Julio 2026',
    image: introDataEngImg,
    links: [
      { label: 'Coursera', icon: 'simple-icons:coursera', url: 'https://coursera.org/share/b09e043c74b1a2d52dfa2e800ed1cf9a' },
      { label: 'Credly', icon: 'simple-icons:credly', url: 'https://www.credly.com/badges/a67e4602-bcf9-4d7c-9b9e-bb3a8140f056/public_url' },
    ],
  },
  {
    title: 'Python Project for Data Engineering',
    issuer: 'Coursera',
    date: 'Agosto 2026',
    image: pythonProjectImg,
    links: [
      { label: 'Coursera', icon: 'simple-icons:coursera', url: 'https://coursera.org/share/c9cb549394690e56e472103112ee767e' },
      { label: 'Credly', icon: 'simple-icons:credly', url: 'https://www.credly.com/badges/e51ee155-be19-4b45-bd4d-8c812102005a/public_url' },
    ],
  },
  {
    title: 'Introduction to Relational Databases (RDBMS)',
    issuer: 'Coursera',
    date: 'Septiembre 2026',
    image: rdbmsImg,
    links: [
      { label: 'Coursera', icon: 'simple-icons:coursera', url: 'https://coursera.org/share/4a6b1438b139edbfb3901335c50a5816' },
      { label: 'Credly', icon: 'simple-icons:credly', url: 'https://www.credly.com/badges/b9afaee6-3ac3-4d4f-9701-43d745c04a88/public_url' },
    ],
  },
  {
    title: 'Python for Data Science, AI & Development',
    issuer: 'Coursera',
    date: 'Julio 2026',
    image: pythonCienciaImg,
    links: [
      { label: 'Coursera', icon: 'simple-icons:coursera', url: 'https://coursera.org/share/dcc0f3f1473765cedc4cd021b6017878' },
      { label: 'Credly', icon: 'simple-icons:credly', url: 'https://www.credly.com/badges/bbf78109-09c0-48f6-bd1a-58d5cc06c702/public_url' },
    ],
  },
  {
    title: 'SQL de cero: Tu guía práctica con PostgreSQL',
    issuer: 'Udemy',
    date: 'Febrero 2024',
    image: sqlImg,
    links: [
      { label: 'Udemy', icon: 'simple-icons:udemy', url: 'https://www.udemy.com/certificate/UC-3b984827-cd2d-474e-8f5a-37ec5a1babf1/' },
    ],
  },
];