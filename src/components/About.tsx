import  { motion } from 'framer-motion';
import { Download, User } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import SectionTitle from './SectionTitle';
import SkillBar from './SkillBar';
import SmartBioSection from './SmartBioSection';
import SkillRecommendations from './SkillRecommendations';
import { skills, experiences, education } from '../data';
import ResponsiveImage from './ResponsiveImage';

export default function About() {
  return (
    <AnimatedSection id="about" className="bg-gray-50 dark:bg-dark-200">
      <SectionTitle 
        title="À propos" 
        subtitle="Découvrez mon parcours, mes compétences et mes expériences professionnelles." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Biography */}
        <div>
          <div className="relative mb-8">
            <ResponsiveImage 
              src="https://images.unsplash.com/photo-1501159599894-155982264a55?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXNrJTIwZGV2ZWxvcGVyJTIwc2V0dXB8ZW58MHx8fHwxNzQzMzYwNzA3fDA&ixlib=rb-4.0.3"
              alt="Bureau ergonomique avec MacBook Pro et accessoires de développeur" 
              className="w-full h-60 md:h-72 object-cover rounded-xl shadow-lg" 
              mobileSizes="100vw"
              tabletSizes="100vw"
              desktopSizes="50vw"
            />
            <div className="absolute bottom-4 right-4 p-2 bg-primary-600 rounded-lg text-white shadow-lg" aria-hidden="true">
              <User size={24} />
            </div>
          </div>

          <SmartBioSection />
          
          <motion.a 
            href="#tools" 
            className="btn btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Générer mon CV en version PDF"
          >
            <Download size={18} aria-hidden="true" />
            <span>Générer mon CV</span>
          </motion.a>
        </div>

        {/* Right: Skills */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Mes compétences</h3>
          
          <div className="space-y-6 mb-8">
            {skills.map((skill, index) => (
              <SkillBar 
                key={skill.name}
                name={skill.name}
                level={skill.level}
                delay={index * 0.1}
              />
            ))}
          </div>
          
          <SkillRecommendations />
        </div>
      </div>

      {/* Experience & Education Section */}
      <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
        {/* Experience */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Expérience professionnelle</h3>
          
          <div className="space-y-6 sm:space-y-8">
            {experiences.map((exp, index) => (
              <motion.div 
                key={exp.id}
                className="border-l-4 border-primary-600 pl-4 sm:pl-5 py-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">{exp.role}</h4>
                <p className="text-primary-600 dark:text-primary-400 font-medium">{exp.company}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{exp.period}</p>
                <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Formation</h3>
          
          <div className="space-y-6 sm:space-y-8">
            {education.map((edu, index) => (
              <motion.div 
                key={edu.id}
                className="border-l-4 border-primary-600 pl-4 sm:pl-5 py-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">{edu.degree}</h4>
                <p className="text-primary-600 dark:text-primary-400 font-medium">{edu.institution}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{edu.period}</p>
                <p className="text-gray-700 dark:text-gray-300">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
 