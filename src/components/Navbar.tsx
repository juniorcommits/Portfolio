import  { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Github, Moon, Sun, Linkedin, Twitter } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { socialLinks } from '../data';
import LanguageSelector from './LanguageSelector';
import { useIsMobile } from './ResponsiveUtils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  const isMobile = useIsMobile();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'projects', 'blog', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    // Add event listener only when menu is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isMobile]);

  const navigationItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'projects', label: 'Projets' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled ? 'bg-white/80 dark:bg-dark-100/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      } transition-all duration-300`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4 md:py-6">
          <div className="flex items-center">
            <a href="#home" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              Portfolio
            </a>
          </div>

          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {navigationItems.map(item => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" 
              className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
              <Github size={20} />
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" 
              className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
              <Linkedin size={20} />
            </a>
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" 
              className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
              <Twitter size={20} />
            </a>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-dark-200 text-gray-800 dark:text-gray-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-3">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-dark-200 text-gray-800 dark:text-gray-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 dark:text-gray-300 p-1"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        ref={menuRef}
        className={`md:hidden fixed inset-0 bg-white dark:bg-dark-100 z-40 transform transition-transform duration-300 ease-in-out pt-20 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-4 py-2 h-full overflow-y-auto">
          <nav className="flex flex-col space-y-6 mb-8">
            {navigationItems.map(item => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                className={`text-xl py-2 border-b border-gray-200 dark:border-dark-300 ${
                  activeSection === item.id ? 'text-primary-600 dark:text-primary-400 font-medium' : 'text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center justify-around mt-8 pt-4 border-t border-gray-200 dark:border-dark-300">
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" 
              className="p-3 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
              <Github size={24} />
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" 
              className="p-3 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
              <Linkedin size={24} />
            </a>
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" 
              className="p-3 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
              <Twitter size={24} />
            </a>
          </div>
          
          <div className="mt-8">
            <LanguageSelector isMobile={true} />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
 