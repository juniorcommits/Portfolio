import  { motion } from 'framer-motion';
import { Shield, Lock, Database, Code, AlertCircle } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import SectionTitle from './SectionTitle';

export default function SecuritySection() {
  const securityFeatures = [
    {
      icon: <Shield size={24} />,
      title: "Protection contre les cyberattaques",
      description: "Le portfolio implémente des protections contre les attaques XSS, CSRF, et clickjacking pour garantir la sécurité de vos données."
    },
    {
      icon: <Lock size={24} />,
      title: "Chiffrement des communications",
      description: "Toutes les communications sont sécurisées via HTTPS avec TLS pour protéger la confidentialité et l'intégrité des données."
    },
    {
      icon: <Database size={24} />,
      title: "Gestion sécurisée des données",
      description: "Les informations sensibles sont stockées de manière sécurisée avec un contrôle d'accès strict et validation des entrées."
    },
    {
      icon: <AlertCircle size={24} />,
      title: "Limites de requêtes",
      description: "Des limites de requêtes sont appliquées pour prévenir les abus et garantir la disponibilité du service."
    },
    {
      icon: <Code size={24} />,
      title: "Audit de sécurité du code",
      description: "Le code est régulièrement audité pour identifier et corriger les vulnérabilités potentielles avant leur exploitation."
    }
  ];

  return (
    <AnimatedSection id="security" className="bg-white dark:bg-dark-100">
      <SectionTitle 
        title="Sécurité" 
        subtitle="Notre engagement envers la protection de vos données et la sécurité de votre expérience." 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {securityFeatures.map((feature, index) => (
          <motion.div 
            key={index}
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="bg-primary-100 dark:bg-primary-900/20 p-4 rounded-full inline-block mb-4 text-primary-600 dark:text-primary-400">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-800/30">
        <div className="flex items-start">
          <div className="bg-blue-100 dark:bg-blue-800/30 p-3 rounded-full text-blue-700 dark:text-blue-400 mr-4">
            <Shield size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-2">Centre de confiance et confidentialité</h3>
            <p className="text-blue-700 dark:text-blue-400 mb-4">
              Votre sécurité est notre priorité. Ce portfolio a été développé selon les normes de sécurité les plus strictes pour protéger vos données et vos interactions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-dark-200 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Conformité et standards</h4>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Content Security Policy (CSP)
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Protection contre le Cross-Site Scripting (XSS)
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Tokens CSRF pour les formulaires
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-dark-200 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Confidentialité</h4>
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Aucun traceur publicitaire
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Collecte minimale de données
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Politique de confidentialité transparente
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
 