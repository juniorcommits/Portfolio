import  { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import SectionTitle from './SectionTitle';
import { projects } from '../data';
import SmartProjectCard from './SmartProjectCard';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const allTags = ['all', ...Array.from(new Set(projects.flatMap(project => project.tags)))];
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.includes(activeFilter));

  return (
    <AnimatedSection id="projects">
      <SectionTitle 
        title="Mes Projets" 
        subtitle="Découvrez une sélection de mes travaux récents. Chaque projet représente un défi unique." 
      />

      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-10 overflow-x-auto py-2">
        <div className="flex items-center bg-gray-100 dark:bg-dark-200 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-1 mr-1">
          <Filter size={14} className="mr-1 text-primary-600 dark:text-primary-400" />
          <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Filtrer:</span>
        </div>
        
        <div className="flex flex-nowrap overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0 hide-scrollbar">
          {allTags.map(tag => (
            <motion.button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeFilter === tag 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 dark:bg-dark-200 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-300'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project, index) => (
          <SmartProjectCard 
            key={project.id} 
            project={project} 
            index={index} 
          />
        ))}
      </div>
    </AnimatedSection>
  );
}
 