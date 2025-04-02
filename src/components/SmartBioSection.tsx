import  { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Loader } from 'lucide-react';
import { generatePersonalizedBio } from '../utils/openai';
import { skills } from '../data';

export default function SmartBioSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [aiBio, setAiBio] = useState<string | null>(null);

  const handleGenerateBio = async () => {
    if (isLoading || aiBio) return;
    
    setIsLoading(true);
    try {
      const topSkills = skills
        .sort((a, b) => b.level - a.level)
        .slice(0, 5)
        .map(s => s.name);
        
      const bio = await generatePersonalizedBio(
        topSkills, 
        "7+ ans d'expérience en développement web",
        "Développement d'applications modernes et performantes"
      );
      
      setAiBio(bio);
    } catch (error) {
      console.error('Erreur génération bio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Mon parcours</h3>
        
        <motion.button
          onClick={handleGenerateBio}
          className="px-3 py-1.5 bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300 rounded-full flex items-center gap-1.5 hover:bg-primary-200 dark:hover:bg-primary-900/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isLoading || !!aiBio}
        >
          {isLoading ? (
            <>
              <Loader size={16} className="animate-spin" />
              <span className="text-sm">Génération...</span>
            </>
          ) : (
            <>
              <Wand2 size={16} />
              <span className="text-sm">{aiBio ? 'Bio générée' : 'Générer bio par IA'}</span>
            </>
          )}
        </motion.button>
      </div>
      
      {aiBio ? (
        <div className="relative">
          <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
            {aiBio}
          </p>
          <span className="absolute top-0 right-0 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-xs px-1.5 py-0.5 rounded-sm">
            IA
          </span>
        </div>
      ) : (
        <>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Passionné par le développement web depuis plus de 7 ans, je me spécialise dans la création d'applications web modernes et performantes. 
            Mon approche combine créativité et rigueur technique pour concevoir des solutions innovantes qui répondent aux besoins spécifiques de chaque projet.
          </p>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Adepte des technologies modernes comme React, Next.js et TypeScript, je m'efforce de maintenir mes connaissances à jour 
            pour offrir des solutions à la pointe de l'innovation. 
          </p>
        </>
      )}
    </div>
  );
}
 