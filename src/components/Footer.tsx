import  { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { socialLinks } from '../data';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-primary-400 mb-4">Portfolio</h2>
            <p className="text-gray-400 mb-6 max-w-md">
              Développeur web passionné, spécialisé dans la création d'applications web modernes, 
              performantes et accessibles.
            </p>
            <div className="flex space-x-4">
              <a 
                href={socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full text-gray-300 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full text-gray-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href={socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full text-gray-300 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="mailto:contact@example.com"
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full text-gray-300 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-primary-400 transition-colors">Accueil</a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-primary-400 transition-colors">À propos</a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-primary-400 transition-colors">Projets</a>
              </li>
              <li>
                <a href="#blog" className="text-gray-400 hover:text-primary-400 transition-colors">Blog</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-primary-400 transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Paris, France</li>
              <li className="break-all">contact@example.com</li>
              <li>+33 1 23 45 67 89</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Portfolio. Tous droits réservés.
          </p>
          
          <motion.p 
            className="text-gray-500 text-sm flex items-center mt-4 md:mt-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Conçu avec 
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="mx-1 text-red-500"
            >
              <Heart size={14} fill="currentColor" />
            </motion.span>
            et passion
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
 