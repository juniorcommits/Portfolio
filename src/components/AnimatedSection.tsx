import  { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export default function AnimatedSection({ 
  children, 
  id, 
  className = '', 
  delay = 0.2 
}: AnimatedSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id={id} className={`section-container ${className}`}>
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </section>
  );
}
 