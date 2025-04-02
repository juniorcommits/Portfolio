import  { useState } from 'react';
import { Shield, AlertCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SecurityBanner() {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return null;
  
  return (
    <motion.div 
      className="fixed top-20 left-0 right-0 z-40 flex justify-center px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <div className="max-w-2xl w-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-lg shadow-lg px-4 py-3 flex items-center">
        <Shield size={20} className="text-blue-700 dark:text-blue-400 flex-shrink-0 mr-3" />
        <div className="flex-grow">
          <p className="text-blue-800 dark:text-blue-300 text-sm">
            <strong className="font-medium">Site sécurisé</strong>: Ce portfolio implémente des protections avancées pour sécuriser vos données et interactions.
          </p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="ml-3 p-1 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/30 rounded"
          aria-label="Fermer la bannière de sécurité"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
}
 