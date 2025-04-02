import  { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader, AlertCircle, FileText } from 'lucide-react';
import { fetchOpenAIResponse } from '../utils/openai';
import { experiences, education, skills, socialLinks } from '../data';

export default function CVGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [cvData, setCvData] = useState<any>(null);
  
  const generateCV = async () => {
    setIsGenerating(true);
    setSuccess(false);
    setError(false);
    
    try {
      // Préparer les données pour l'IA
      const skillsData = skills.map(skill => `${skill.name}: ${skill.level}%`).join(', ');
      const experienceData = experiences.map(exp => 
        `${exp.role} chez ${exp.company} (${exp.period}): ${exp.description}`
      ).join('\n\n');
      const educationData = education.map(edu => 
        `${edu.degree} à ${edu.institution} (${edu.period}): ${edu.description}`
      ).join('\n\n');
      
      // Demander à l'IA de générer un résumé professionnel
      const prompt = `Tu es un expert en rédaction de CV. Crée un résumé professionnel concis (max 3 phrases) 
pour un développeur web ayant ces compétences: ${skillsData}.
Expériences: ${experienceData}.
Formation: ${educationData}.
Le résumé doit être percutant, professionnel et mettre en avant les forces clés du profil.`;

      const professionalSummary = await fetchOpenAIResponse(prompt, 150);
      
      // Créer la structure du CV
      const generatedCV = {
        profile: {
          name: "Développeur Fullstack",
          role: "Développeur Créatif & Passionné",
          summary: professionalSummary,
          contact: {
            email: "contact@example.com",
            phone: "+33 1 23 45 67 89",
            location: "Paris, France",
            github: socialLinks.github,
            linkedin: socialLinks.linkedin
          }
        },
        skills: skills.map(skill => ({
          name: skill.name,
          level: skill.level
        })),
        experience: experiences.map(exp => ({
          role: exp.role,
          company: exp.company,
          period: exp.period,
          description: exp.description
        })),
        education: education.map(edu => ({
          degree: edu.degree,
          institution: edu.institution,
          period: edu.period,
          description: edu.description
        }))
      };
      
      // Dans une implémentation réelle, on enverrait ces données à un service pour générer un PDF
      console.log("CV généré avec IA:", generatedCV);
      setCvData(generatedCV);
      setSuccess(true);
    } catch (err) {
      console.error("Erreur génération CV:", err);
      setError(true);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <motion.div 
      className="card p-6 sm:p-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mb-4">
          <FileText size={28} className="text-primary-600 dark:text-primary-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Générateur de CV par IA</h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          Créez instantanément un CV professionnel amélioré par l'IA basé sur mon profil, mes compétences et mon expérience.
        </p>
      </div>
      
      {!success && !error && (
        <motion.button
          onClick={generateCV}
          className="btn btn-primary mx-auto flex items-center justify-center gap-2 w-full sm:w-auto"
          disabled={isGenerating}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isGenerating ? (
            <>
              <Loader className="animate-spin" size={18} />
              <span>Génération en cours...</span>
            </>
          ) : (
            <>
              <FileText size={18} />
              <span>Générer mon CV avec IA</span>
            </>
          )}
        </motion.button>
      )}
      
      {success && cvData && (
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="mb-6 text-green-600 dark:text-green-400 flex items-center justify-center gap-2">
            <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full">
              <AlertCircle size={24} />
            </div>
            <span className="font-medium">CV généré avec succès !</span>
          </div>
          
          <div className="max-w-lg mx-auto mb-6 bg-primary-50 dark:bg-primary-900/10 p-4 rounded-lg text-left">
            <h4 className="font-medium text-primary-800 dark:text-primary-300 mb-2">Résumé professionnel (généré par IA):</h4>
            <p className="text-gray-700 dark:text-gray-300 italic">{cvData.profile.summary}</p>
          </div>
          
          <motion.a 
            href="#" 
            className="btn btn-primary inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              alert("Dans une implémentation réelle, le téléchargement du PDF démarrerait.");
            }}
          >
            <Download size={18} />
            <span>Télécharger mon CV</span>
          </motion.a>
        </motion.div>
      )}
      
      {error && (
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="mb-4 text-red-600 dark:text-red-400 flex items-center justify-center gap-2">
            <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-full">
              <AlertCircle size={24} />
            </div>
            <span className="font-medium">Une erreur est survenue lors de la génération du CV.</span>
          </div>
          
          <motion.button
            onClick={generateCV}
            className="btn btn-primary mx-auto flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText size={18} />
            <span>Réessayer</span>
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
 