import  { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' }
];

interface LanguageSelectorProps {
  isMobile?: boolean;
}

export default function LanguageSelector({ isMobile = false }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  const handleLanguageChange = (code: string) => {
    setCurrentLanguage(code);
    setIsOpen(false);
    // In a real implementation, this would trigger language change
    console.log(`Language changed to ${code}`);
  };
  
  return (
    <div className="relative" ref={menuRef}>
      <button 
        className={`flex items-center gap-1 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 ${
          isMobile ? 'p-3 w-full justify-center text-base border-b border-gray-200 dark:border-dark-300' : 'p-2'
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe size={isMobile ? 20 : 18} />
        <span className={isMobile ? '' : 'hidden sm:inline'}>
          {languages.find(lang => lang.code === currentLanguage)?.name}
        </span>
        <ChevronDown size={isMobile ? 20 : 16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <motion.div 
          className={`bg-white dark:bg-dark-200 shadow-lg rounded-lg py-2 ${
            isMobile 
              ? 'w-full mt-2' 
              : 'absolute top-full right-0 mt-1 w-36 z-50'
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          role="listbox"
        >
          {languages.map(language => (
            <button
              key={language.code}
              className={`w-full text-left px-4 py-2 ${
                currentLanguage === language.code 
                  ? 'text-primary-600 dark:text-primary-400 bg-gray-100 dark:bg-dark-300' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300'
              }`}
              onClick={() => handleLanguageChange(language.code)}
              role="option"
              aria-selected={currentLanguage === language.code}
            >
              {language.name}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
 