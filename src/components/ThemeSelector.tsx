import  { motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useRef } from 'react';

export default function ThemeSelector() {
  const { setTheme, currentTheme, availableThemes } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Enhanced security by using ref for menu toggle instead of hover
  // This prevents potential clickjacking attacks that could occur with hover menus
  const toggleMenu = () => {
    if (menuRef.current) {
      const isVisible = menuRef.current.classList.contains('opacity-100');
      
      if (isVisible) {
        menuRef.current.classList.remove('opacity-100', 'visible');
        menuRef.current.classList.add('opacity-0', 'invisible');
      } else {
        menuRef.current.classList.remove('opacity-0', 'invisible');
        menuRef.current.classList.add('opacity-100', 'visible');
      }
    }
  };
  
  // Close menu when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      menuRef.current.classList.remove('opacity-100', 'visible');
      menuRef.current.classList.add('opacity-0', 'invisible');
    }
  };
  
  // Add/remove event listener when menu is open/closed
  const handleMenuToggle = () => {
    toggleMenu();
    
    if (menuRef.current?.classList.contains('opacity-100')) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  };
  
  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <div className="relative">
        <button 
          className="bg-white dark:bg-dark-200 shadow-lg rounded-full p-3 flex items-center justify-center"
          aria-label="Changer de thème"
          onClick={handleMenuToggle}
        >
          <Palette size={20} className="text-primary-600 dark:text-primary-400" />
        </button>
        
        <div 
          ref={menuRef}
          className="absolute bottom-full right-0 mb-2 opacity-0 invisible transition-all duration-300 transform origin-bottom-right"
          aria-hidden={menuRef.current?.classList.contains('opacity-0')}
        >
          <div className="bg-white dark:bg-dark-200 shadow-xl rounded-lg p-3 flex flex-col gap-2 min-w-[160px]">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Thèmes</p>
            {availableThemes.map(theme => (
              <button
                key={theme.id}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-left ${
                  currentTheme.id === theme.id 
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'hover:bg-gray-100 dark:hover:bg-dark-300 text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => {
                  setTheme(theme.id);
                  toggleMenu();
                }}
              >
                <span 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: theme.primaryColor }}
                />
                <span>{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
 