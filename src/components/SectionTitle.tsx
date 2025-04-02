import  { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionTitle({ 
  title, 
  subtitle, 
  centered = true 
}: SectionTitleProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.div 
        className={`h-1 w-20 bg-primary-600 mt-4 rounded-full ${centered ? 'mx-auto' : ''}`}
        initial={{ width: 0 }}
        animate={{ width: '5rem' }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
    </div>
  );
}
 