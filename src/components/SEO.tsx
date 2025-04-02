import  { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  article?: boolean;
  keywords?: string;
  author?: string;
  schema?: Record<string, any>;
}

export default function SEO({
  title,
  description,
  canonicalUrl = 'https://www.portfolio-developpeur.com',
  ogImage = 'https://images.unsplash.com/photo-1496664444929-8c75efb9546f?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXNrJTIwZGV2ZWxvcGVyJTIwc2V0dXB8ZW58MHx8fHwxNzQzMzYwNzA3fDA&ixlib=rb-4.0.3',
  article = false,
  keywords = 'développeur web, portfolio, React, Next.js, TypeScript, JavaScript',
  author = 'Développeur Créatif',
  schema,
}: SEOProps) {
  // Création du schéma si non fourni
  const schemaOrgJSONLD = schema || {
    '@context': 'http://schema.org',
    '@type': article ? 'Article' : 'WebPage',
    url: canonicalUrl,
    headline: title,
    image: ogImage,
    author: {
      '@type': 'Person',
      name: author,
    },
    description,
  };

  return (
    <Helmet>
      {/* Balises title et meta de base */}
      <title>{title}</title>
      <meta name="description" content={`Built with jdoodle.ai - ${description}`} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Balises pour les robots */}
      <meta name="robots" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={`Built with jdoodle.ai - ${description}`} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={`Built with jdoodle.ai - ${description}`} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
}
 