import  { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Terminal } from 'lucide-react';
import { useState } from 'react';
import { socialLinks } from '../data';
import TerminalModal from './TerminalModal';
import ResponsiveImage from './ResponsiveImage';

export default function Hero() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ResponsiveImage 
          src="https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXNrJTIwZGV2ZWxvcGVyJTIwc2V0dXB8ZW58MHx8fHwxNzQzMzYwNzA3fDA&ixlib=rb-4.0.3"
          alt="Espace de travail moderne avec iMac - bureau minimaliste avec ordinateur Apple" 
          className="w-full h-full object-cover opacity-10 dark:opacity-5"
          priority={true}
          mobileSizes="100vw"
          tabletSizes="100vw"
          desktopSizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white dark:from-dark-100/80 dark:to-dark-100" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 z-10 py-12 sm:py-0">
        <div className="max-w-4xl mx-auto">
          <motion.h4
            className="text-primary-600 dark:text-primary-400 font-medium mb-2 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Bonjour, je suis
          </motion.h4>
          
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="block">Développeur Créatif &</span>
            <span className="text-primary-600 dark:text-primary-400">Passionné</span>
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Je conçois et développe des expériences numériques exceptionnelles, 
            en combinant créativité et expertise technique pour des solutions innovantes.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a 
              href="#projects" 
              className="btn btn-primary text-center"
              aria-label="Voir mes projets"
            >
              Voir mes projets
            </a>
            <button 
              onClick={() => setIsTerminalOpen(true)}
              className="btn btn-outline flex items-center justify-center gap-2"
              aria-label="Ouvrir le mode terminal"
            >
              <Terminal size={18} aria-hidden="true" />
              <span>Mode Terminal</span>
            </button>
          </motion.div>
          
          <motion.div 
            className="flex gap-6 mt-8 sm:mt-12 justify-center sm:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a 
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
              aria-label="Visiter mon profil GitHub"
            >
              <Github size={24} aria-hidden="true" />
            </a>
            <a 
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
              aria-label="Visiter mon profil LinkedIn"
            >
              <Linkedin size={24} aria-hidden="true" />
            </a>
            <a 
              href="#contact"
              className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
              aria-label="Me contacter par email"
            >
              <Mail size={24} aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <a 
          href="#about"
          className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          aria-label="Défiler vers la section À propos"
        >
          <span className="text-sm mb-2">Défiler</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={20} aria-hidden="true" />
          </motion.div>
        </a>
      </motion.div>

      {isTerminalOpen && (
        <TerminalModal onClose={() => setIsTerminalOpen(false)} />
      )}
    </section>
  );
}
 