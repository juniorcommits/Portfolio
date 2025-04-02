import  { useState } from 'react';
import { motion } from 'framer-motion';
import { Accessibility, X, ZoomIn, Eye, Zap, RefreshCw } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export default function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    preferences, 
    toggleHighContrast, 
    toggleLargeText, 
    toggleReducedMotion,
    toggleFocusIndicator,
    resetPreferences
  } = useAccessibility();

  return (
    <>
      {/* Accessibility Button */}
      <motion.button
        className="fixed bottom-24 left-6 z-30 bg-primary-600 text-white rounded-full p-3 shadow-lg"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        aria-label="Paramètres d'accessibilité"
      >
        <Accessibility size={20} />
      </motion.button>
      
      {/* Accessibility Panel */}
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="accessibility-title"
        >
          <motion.div 
            className="bg-white dark:bg-dark-200 rounded-xl shadow-xl max-w-md w-full p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 id="accessibility-title" className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Accessibility size={20} className="text-primary-600 dark:text-primary-400" />
                Paramètres d'accessibilité
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Fermer le panneau d'accessibilité"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-300 rounded-lg">
                <div className="flex items-center gap-3">
                  <Eye size={20} className="text-primary-600 dark:text-primary-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Contraste élevé</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Améliore la lisibilité du texte</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={preferences.highContrast}
                    onChange={toggleHighContrast}
                    aria-label="Activer le contraste élevé"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-dark-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-300 rounded-lg">
                <div className="flex items-center gap-3">
                  <ZoomIn size={20} className="text-primary-600 dark:text-primary-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Texte agrandi</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Augmente la taille du texte</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={preferences.largeText}
                    onChange={toggleLargeText}
                    aria-label="Activer le texte agrandi"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-dark-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-300 rounded-lg">
                <div className="flex items-center gap-3">
                  <Zap size={20} className="text-primary-600 dark:text-primary-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Animations réduites</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Limite les animations et transitions</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={preferences.reducedMotion}
                    onChange={toggleReducedMotion}
                    aria-label="Activer les animations réduites"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-dark-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-300 rounded-lg">
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" width="20" height="20" className="text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Indicateur de focus</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Met en évidence l'élément sélectionné</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={preferences.focusIndicator}
                    onChange={toggleFocusIndicator}
                    aria-label="Activer l'indicateur de focus"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-dark-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <button 
                onClick={resetPreferences}
                className="flex items-center justify-center gap-2 w-full mt-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-dark-300 dark:hover:bg-dark-400 rounded-lg text-gray-700 dark:text-gray-300 transition-colors"
                aria-label="Réinitialiser tous les paramètres d'accessibilité"
              >
                <RefreshCw size={18} />
                <span>Réinitialiser les paramètres</span>
              </button>
            </div>
            
            <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
              Ces paramètres sont enregistrés et seront appliqués lors de vos prochaines visites.
            </p>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
 