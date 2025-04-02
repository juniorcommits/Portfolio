import  { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowUp } from 'lucide-react';
import TerminalModal from './TerminalModal';

export default function FloatingControls() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Show scroll to top button when page is scrolled down
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setShowScrollTop(window.scrollY > 500);
    });
  }
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <>
      <motion.div 
        className="fixed bottom-6 left-6 z-30 flex flex-col gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <button 
          className="bg-white dark:bg-dark-200 shadow-lg rounded-full p-3 flex items-center justify-center text-primary-600 dark:text-primary-400 hover:scale-110 transition-transform"
          onClick={() => setIsTerminalOpen(true)}
          aria-label="Ouvrir le terminal"
        >
          <Terminal size={20} />
        </button>
        
        {showScrollTop && (
          <motion.button 
            className="bg-white dark:bg-dark-200 shadow-lg rounded-full p-3 flex items-center justify-center text-primary-600 dark:text-primary-400 hover:scale-110 transition-transform"
            onClick={scrollToTop}
            aria-label="Retour en haut"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </motion.div>
      
      {isTerminalOpen && (
        <TerminalModal onClose={() => setIsTerminalOpen(false)} />
      )}
    </>
  );
}
 