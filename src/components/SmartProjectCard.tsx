import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Link, Loader, MessageSquare } from 'lucide-react';
import { Project } from '../types';
import { generateProjectDescription } from '../utils/openai';
import ImageWithFallback from './ImageWithFallback';

interface SmartProjectCardProps {
  project: Project;
  index: number;
}

export default function SmartProjectCard({ project, index }: SmartProjectCardProps) {
  const [aiDescription, setAiDescription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAI, setShowAI] = useState(false);

  useEffect(() => {
    // Ne pas charger automatiquement pour économiser des tokens API
    // L'utilisateur peut cliquer pour générer
  }, []);

  const handleGenerateDescription = async () => {
    if (isLoading || aiDescription) return;
    
    setIsLoading(true);
    try {
      const description = await generateProjectDescription(project);
      setAiDescription(description);
      setShowAI(true);
    } catch (error) {
      console.error('Erreur génération description:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="card group overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5 }}
    >
      <div className="relative overflow-hidden aspect-video">
        <ImageWithFallback 
          src={project.image} 
          alt={`Capture d'écran du projet ${project.title} - ${project.description}`}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 flex gap-3">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-colors"
                aria-label={`Voir le code source du projet ${project.title} sur GitHub`}
              >
                <Github size={18} className="text-white" aria-hidden="true" />
              </a>
            )}
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-colors"
                aria-label={`Visiter le site web du projet ${project.title}`}
              >
                <Link size={18} className="text-white" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
          <button 
            onClick={handleGenerateDescription}
            className="p-1.5 rounded-full text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors"
            title="Générer une description par IA"
            aria-label={`Générer une description intelligente du projet ${project.title}`}
            disabled={isLoading || !!aiDescription}
          >
            {isLoading ? (
              <Loader size={18} className="animate-spin" aria-hidden="true" />
            ) : (
              <MessageSquare size={18} aria-hidden="true" />
            )}
          </button>
        </div>
        
        <div className="text-gray-600 dark:text-gray-400 mb-4">
          {showAI && aiDescription ? (
            <div className="relative">
              <p className="italic">{aiDescription}</p>
              <span className="absolute top-0 right-0 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-xs px-1.5 py-0.5 rounded-sm">
                IA
              </span>
            </div>
          ) : (
            <p>{project.description}</p>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span 
              key={tag} 
              className="text-xs bg-gray-100 dark:bg-dark-300 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
 