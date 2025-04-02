import  { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, AlertCircle, Shield } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import SectionTitle from './SectionTitle';
import { sanitizeInput, isValidEmail, generateCSRFToken } from '../utils/security';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const csrfToken = useRef(generateCSRFToken());
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Veuillez entrer un email valide';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est requis';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setStatus('loading');
    
    // Simulate form submission with CSRF protection
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      subject: sanitizeInput(formData.subject),
      message: sanitizeInput(formData.message),
      _csrf: csrfToken.current
    };
    
    // In a real implementation, this would be an API call
    setTimeout(() => {
      console.log('Form submitted with CSRF protection:', sanitizedData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Generate new CSRF token for future submissions
      csrfToken.current = generateCSRFToken();
      
      // Reset status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <AnimatedSection id="contact">
      <SectionTitle 
        title="Contact" 
        subtitle="Vous avez un projet en tête ? N'hésitez pas à me contacter pour discuter de vos idées." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Contact Info */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Restons en contact</h3>
          
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Je suis toujours ouvert aux nouvelles opportunités. Que vous ayez une question ou que vous souhaitiez simplement dire bonjour, 
            n'hésitez pas à me contacter et je vous répondrai dans les plus brefs délais.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/20 rounded-full p-3 mr-4 flex-shrink-0">
                <Mail className="text-primary-600 dark:text-primary-400" size={24} />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">Email</h4>
                <a href="mailto:contact@example.com" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors break-all">
                  contact@example.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/20 rounded-full p-3 mr-4 flex-shrink-0">
                <MapPin className="text-primary-600 dark:text-primary-400" size={24} />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">Localisation</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Paris, France
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary-100 dark:bg-primary-900/20 rounded-full p-3 mr-4 flex-shrink-0">
                <Phone className="text-primary-600 dark:text-primary-400" size={24} />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">Téléphone</h4>
                <a href="tel:+33123456789" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  +33 1 23 45 67 89
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form with Security Enhancements */}
        <div>
          <div className="flex items-center mb-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg p-3 text-blue-700 dark:text-blue-300 text-sm">
            <Shield size={18} className="mr-2 flex-shrink-0" />
            <p>Ce formulaire est sécurisé par protection CSRF et validation des données</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Hidden CSRF token field */}
            <input type="hidden" name="_csrf" value={csrfToken.current} />
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nom
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={100}
                className={`w-full px-4 py-3 bg-white dark:bg-dark-300 border ${
                  errors.name ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-dark-400'
                } rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-400 dark:focus:border-primary-400 outline-none transition-colors`}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                maxLength={100}
                autoComplete="email"
                className={`w-full px-4 py-3 bg-white dark:bg-dark-300 border ${
                  errors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-dark-400'
                } rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-400 dark:focus:border-primary-400 outline-none transition-colors`}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sujet
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                maxLength={150}
                className={`w-full px-4 py-3 bg-white dark:bg-dark-300 border ${
                  errors.subject ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-dark-400'
                } rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-400 dark:focus:border-primary-400 outline-none transition-colors`}
                aria-describedby={errors.subject ? "subject-error" : undefined}
              />
              {errors.subject && (
                <p id="subject-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                maxLength={2000}
                className={`w-full px-4 py-3 bg-white dark:bg-dark-300 border ${
                  errors.message ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-dark-400'
                } rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-400 dark:focus:border-primary-400 outline-none transition-colors resize-none`}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
              )}
              <div className="mt-1 text-right text-xs text-gray-500 dark:text-gray-400">
                <span id="char-count">{formData.message.length}</span>/2000
              </div>
            </div>

            {status === 'error' && (
              <div className="flex items-center p-4 text-red-800 bg-red-100 dark:bg-red-900/20 dark:text-red-400 rounded-lg">
                <AlertCircle size={20} className="mr-2 flex-shrink-0" />
                <span>Une erreur est survenue. Veuillez réessayer.</span>
              </div>
            )}
            
            {status === 'success' && (
              <div className="flex items-center p-4 text-green-800 bg-green-100 dark:bg-green-900/20 dark:text-green-400 rounded-lg">
                <AlertCircle size={20} className="mr-2 flex-shrink-0" />
                <span>Message envoyé avec succès!</span>
              </div>
            )}
            
            <motion.button
              type="submit"
              className="btn btn-primary w-full flex items-center justify-center gap-2"
              disabled={status === 'loading'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid="contact-submit"
            >
              {status === 'loading' ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Envoyer le message
                </>
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </AnimatedSection>
  );
}
 