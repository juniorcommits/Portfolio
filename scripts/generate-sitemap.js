/**
  * Script pour générer automatiquement le sitemap.xml
 * 
 * Ajoute toutes les sections et pages du portfolio pour une indexation optimale par les moteurs de recherche
 * Peut être exécuté avec: npm run generate-sitemap
 */

import fs from 'fs';
import path from 'path';

// Configuration du site
const siteConfig = {
  baseUrl: 'https://www.portfolio-developpeur.com',
  sections: ['', 'about', 'projects', 'blog', 'tools', 'contact'],
  lastModified: new Date().toISOString().split('T')[0], // Format YYYY-MM-DD
};

// Construction du sitemap XML
const generateSitemap = () => {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Ajouter l'URL de base
  sitemap += '  <url>\n';
  sitemap += `    <loc>${siteConfig.baseUrl}/</loc>\n`;
  sitemap += `    <lastmod>${siteConfig.lastModified}</lastmod>\n`;
  sitemap += '    <changefreq>monthly</changefreq>\n';
  sitemap += '    <priority>1.0</priority>\n';
  sitemap += '  </url>\n';
  
  // Ajouter les sections
  siteConfig.sections.forEach(section => {
    if (section === '') return; // Skip homepage as it's already added
    
    sitemap += '  <url>\n';
    sitemap += `    <loc>${siteConfig.baseUrl}/#${section}</loc>\n`;
    sitemap += `    <lastmod>${siteConfig.lastModified}</lastmod>\n`;
    sitemap += '    <changefreq>monthly</changefreq>\n';
    sitemap += '    <priority>0.8</priority>\n';
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  return sitemap;
};

// Chemins des fichiers
const publicDir = path.resolve('public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');

// S'assurer que le répertoire public existe
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Générer et écrire le sitemap
const sitemap = generateSitemap();
fs.writeFileSync(sitemapPath, sitemap);

console.log(`Sitemap généré avec succès: ${sitemapPath}`);
 