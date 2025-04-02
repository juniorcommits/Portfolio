import  { motion } from 'framer-motion';
import { Briefcase, Calendar, GraduationCap } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import SectionTitle from './SectionTitle';
import { experiences, education } from '../data';

export default function TimelineView() {
  // Combine experiences and education into a single timeline
  const timelineItems = [
    ...experiences.map(exp => ({
      ...exp,
      type: 'experience',
      date: exp.period,
      title: exp.role,
      subtitle: exp.company
    })),
    ...education.map(edu => ({
      ...edu,
      type: 'education',
      date: edu.period,
      title: edu.degree,
      subtitle: edu.institution
    }))
  ].sort((a, b) => {
    // Sort by end year (descending)
    const aYear = parseInt(a.date.split('-')[1]?.trim() || a.date);
    const bYear = parseInt(b.date.split('-')[1]?.trim() || b.date);
    return bYear - aYear;
  });

  return (
    <AnimatedSection id="timeline" className="bg-gray-50 dark:bg-dark-200">
      <SectionTitle 
        title="Parcours" 
        subtitle="Découvrez mon évolution professionnelle et académique à travers le temps." 
      />

      <div className="relative">
        {/* Timeline center line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300 dark:bg-gray-700" />
        
        <div className="relative">
          {timelineItems.map((item, index) => (
            <div key={item.id} className="mb-16">
              <motion.div 
                className={`relative flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-dark-300 border-4 border-primary-600 dark:border-primary-500 z-10 flex items-center justify-center">
                  {item.type === 'experience' ? (
                    <Briefcase size={16} className="text-primary-600 dark:text-primary-400" />
                  ) : (
                    <GraduationCap size={16} className="text-primary-600 dark:text-primary-400" />
                  )}
                </div>
                
                {/* Date block */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 top-12 bg-primary-600 dark:bg-primary-700 text-white text-sm font-medium py-1 px-3 rounded-full flex items-center gap-1 z-10`}>
                  <Calendar size={12} />
                  <span>{item.date}</span>
                </div>
                
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-left pr-8' : 'text-right pl-8'}`}>
                  <div className="card p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                    <h4 className="text-primary-600 dark:text-primary-400 font-medium mb-3">{item.subtitle}</h4>
                    <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
 