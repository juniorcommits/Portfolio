import  { useEffect, useState } from 'react';
import { Home, ChevronRight } from 'lucide-react';

interface Breadcrumb {
  id: string;
  label: string;
  path: string;
}

export default function Breadcrumbs() {
  const [activeSection, setActiveSection] = useState('home');
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([
    { id: 'home', label: 'Accueil', path: '#home' }
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'blog', 'tools', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
        buildBreadcrumbs(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const buildBreadcrumbs = (section: string) => {
    const breadcrumbsMap: Record<string, Breadcrumb[]> = {
      'home': [
        { id: 'home', label: 'Accueil', path: '#home' }
      ],
      'about': [
        { id: 'home', label: 'Accueil', path: '#home' },
        { id: 'about', label: 'À propos', path: '#about' }
      ],
      'projects': [
        { id: 'home', label: 'Accueil', path: '#home' },
        { id: 'projects', label: 'Projets', path: '#projects' }
      ],
      'blog': [
        { id: 'home', label: 'Accueil', path: '#home' },
        { id: 'blog', label: 'Blog', path: '#blog' }
      ],
      'tools': [
        { id: 'home', label: 'Accueil', path: '#home' },
        { id: 'tools', label: 'Outils', path: '#tools' }
      ],
      'contact': [
        { id: 'home', label: 'Accueil', path: '#home' },
        { id: 'contact', label: 'Contact', path: '#contact' }
      ]
    };
    
    setBreadcrumbs(breadcrumbsMap[section] || breadcrumbsMap['home']);
  };

  return (
    <nav aria-label="Fil d'Ariane" className="hidden md:flex py-2 px-4 sm:px-6 bg-white/90 dark:bg-dark-100/90 backdrop-blur-sm fixed top-20 left-0 right-0 z-40 shadow-sm">
      <ol itemScope itemType="https://schema.org/BreadcrumbList" className="flex items-center space-x-2 text-sm max-w-7xl mx-auto w-full">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.id} 
              itemProp="itemListElement" 
              itemScope 
              itemType="https://schema.org/ListItem"
              className="flex items-center">
            {index === 0 ? (
              <a href={breadcrumb.path} 
                 className="flex items-center text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                 itemProp="item">
                <Home size={14} className="mr-1" aria-hidden="true" />
                <span itemProp="name">{breadcrumb.label}</span>
              </a>
            ) : (
              <>
                <ChevronRight size={14} className="mx-2 text-gray-400" aria-hidden="true" />
                <a href={breadcrumb.path} 
                   className={`${index === breadcrumbs.length - 1 ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400'}`} 
                   itemProp="item">
                  <span itemProp="name">{breadcrumb.label}</span>
                </a>
              </>
            )}
            <meta itemProp="position" content={`${index + 1}`} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
 