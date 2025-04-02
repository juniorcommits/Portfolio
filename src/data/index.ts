import  { Project, BlogPost, Skill, Experience, Education } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "Application E-commerce",
    description: "Une application e-commerce complète avec panier, paiement et gestion des commandes.",
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGVjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "https://ecommerce-example.com",
    github: "https://github.com/username/ecommerce",
  },
  {
    id: 2,
    title: "Tableau de bord Analytics",
    description: "Dashboard interactif pour visualiser les données d'analyse et les métriques clés.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRhc2hib2FyZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    tags: ["React", "D3.js", "Firebase", "TypeScript"],
    link: "https://analytics-dashboard.com",
    github: "https://github.com/username/analytics-dashboard",
  },
  {
    id: 3,
    title: "Application Mobile Fitness",
    description: "Application mobile pour suivre les séances d'entraînement et les progrès sportifs.",
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZpdG5lc3MlMjBhcHB8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    tags: ["React Native", "Redux", "Firebase", "Expo"],
    link: "https://fitness-app.com",
    github: "https://github.com/username/fitness-app",
  },
  {
    id: 4,
    title: "Portfolio Créatif",
    description: "Portfolio interactif pour artiste avec galerie dynamique et animations fluides.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRmb2xpb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    tags: ["Next.js", "GSAP", "Tailwind CSS", "Framer Motion"],
    link: "https://creative-portfolio.com",
    github: "https://github.com/username/creative-portfolio",
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Comment optimiser les performances de votre application React",
    excerpt: "Découvrez les techniques avancées pour améliorer significativement les performances de vos applications React.",
    date: "2023-05-15",
    content: "# Comment optimiser les performances de votre application React\n\nLes performances sont cruciales pour offrir une bonne expérience utilisateur. Dans cet article, nous allons explorer plusieurs techniques pour optimiser vos applications React.\n\n## Utiliser React.memo pour éviter les rendus inutiles\n\nReact.memo est une fonction de haut niveau (HOC) qui mémorise le résultat du rendu d'un composant...",
    tags: ["React", "Performance", "JavaScript"]
  },
  {
    id: 2,
    title: "Introduction à Tailwind CSS : Un framework utilitaire puissant",
    excerpt: "Apprenez comment Tailwind CSS peut transformer votre workflow de développement frontend.",
    date: "2023-04-02",
    content: "# Introduction à Tailwind CSS\n\nTailwind CSS est un framework CSS utilitaire qui permet de construire rapidement des designs personnalisés sans quitter votre HTML...",
    tags: ["CSS", "Tailwind", "Frontend"]
  },
  {
    id: 3,
    title: "Les avantages de TypeScript pour vos projets JavaScript",
    excerpt: "Découvrez pourquoi TypeScript devient indispensable pour les projets JavaScript à grande échelle.",
    date: "2023-03-10",
    content: "# Les avantages de TypeScript\n\nTypeScript ajoute des types statiques à JavaScript, ce qui permet de détecter les erreurs plus tôt dans le cycle de développement...",
    tags: ["TypeScript", "JavaScript", "Development"]
  }
];

export const skills: Skill[] = [
  { name: "JavaScript", icon: "Code", level: 90 },
  { name: "TypeScript", icon: "Code", level: 85 },
  { name: "React", icon: "Code", level: 90 },
  { name: "Next.js", icon: "Code", level: 80 },
  { name: "Node.js", icon: "Server", level: 75 },
  { name: "Tailwind CSS", icon: "Palette", level: 95 },
  { name: "GraphQL", icon: "Database", level: 70 },
  { name: "Docker", icon: "Package", level: 65 }
];

export const experiences: Experience[] = [
  {
    id: 1,
    role: "Lead Developer",
    company: "Tech Solutions Inc.",
    period: "2021 - Présent",
    description: "Gestion d'une équipe de 5 développeurs. Conception et implémentation d'applications web scalables. Mise en place de processus d'intégration continue."
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "Digital Agency",
    period: "2018 - 2021",
    description: "Développement d'interfaces utilisateur responsives et performantes. Collaboration avec les designers UX/UI. Implémentation de solutions accessibles."
  },
  {
    id: 3,
    role: "Junior Developer",
    company: "StartUp Innovate",
    period: "2016 - 2018",
    description: "Développement de fonctionnalités pour une application SaaS. Correction de bugs et amélioration des performances. Intégration de services tiers."
  }
];

export const education: Education[] = [
  {
    id: 1,
    degree: "Master en Informatique",
    institution: "Université de Technologie",
    period: "2014 - 2016",
    description: "Spécialisation en développement d'applications web et mobiles. Projet de fin d'études sur l'optimisation des performances des applications React."
  },
  {
    id: 2,
    degree: "Licence en Informatique",
    institution: "École Supérieure des Sciences",
    period: "2011 - 2014",
    description: "Formation généraliste en informatique avec une spécialisation en développement logiciel."
  }
];

export const socialLinks = {
  github: "https://github.com/username",
  linkedin: "https://linkedin.com/in/username",
  twitter: "https://twitter.com/username",
  instagram: "https://instagram.com/username",
};
 