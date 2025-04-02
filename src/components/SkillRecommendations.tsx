import  { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader } from 'lucide-react';
import { generateSkillRecommendations } from '../utils/openai';
import { skills } from '../data';

export default function SkillRecommendations() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string | null>(null);

  const handleGenerateRecommendations = async () => {
    if (isLoading || recommendations) return;
    
    setIsLoading(true);
    try {
      const currentSkills = skills.map(s => s.name);
      const recommendations = await generateSkillRecommendations(currentSkills);
      setRecommendations(recommendations);
    } catch (error) {
      console.error('Erreur génération recommandations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!recommendations && !isLoading) {
    return (
      <motion.button
        onClick={handleGenerateRecommendations}
        className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-dark-300 transition-colors"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Sparkles size={18} className="text-primary-600 dark:text-primary-400" />
        <span className="text-gray-700 dark:text-gray-300">Suggérer des compétences à développer</span>
      </motion.button>
    );
  }

  return (
    <div className="p-4 bg-primary-50 dark:bg-primary-900/10 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-900 dark:text-white">
          Compétences recommandées
        </h4>
        <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <Sparkles size={12} />
          <span>IA</span>
        </span>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center p-6">
          <Loader size={24} className="animate-spin text-primary-600 dark:text-primary-400" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">
            Analyse de votre profil...
          </span>
        </div>
      ) : (
        <div className="text-gray-700 dark:text-gray-300 text-sm">
          {recommendations}
        </div>
      )}
    </div>
  );
}
 