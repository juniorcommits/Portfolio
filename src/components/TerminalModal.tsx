import  { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon, ChevronRight } from 'lucide-react';
import { TerminalCommand, TerminalHistory } from '../types';
import { projects, blogPosts, skills, experiences, education } from '../data';

export default function TerminalModal({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<TerminalHistory[]>([
    { output: "Bienvenue dans le terminal du portfolio! Tapez 'help' pour voir les commandes disponibles." }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const commands: TerminalCommand[] = [
    {
      command: 'help',
      description: 'Affiche les commandes disponibles',
      action: () => {
        return (
          <div className="space-y-1 mt-1">
            {commands.map((cmd) => (
              <div key={cmd.command} className="grid grid-cols-12 gap-2">
                <span className="col-span-3 text-primary-500 font-mono">{cmd.command}</span>
                <span className="col-span-9 text-gray-300">{cmd.description}</span>
              </div>
            ))}
          </div>
        );
      }
    },
    {
      command: 'clear',
      description: 'Efface l\'historique du terminal',
      action: () => {
        setHistory([]);
        return '';
      }
    },
    {
      command: 'projects',
      description: 'Liste tous les projets',
      action: () => {
        return (
          <div className="space-y-2 mt-1">
            {projects.map((project) => (
              <div key={project.id} className="border-l-2 border-primary-500 pl-2">
                <div className="font-bold text-primary-400">{project.title}</div>
                <div className="text-gray-300 text-sm">{project.description}</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.tags.map(tag => (
                    <span key={tag} className="bg-gray-800 text-xs px-2 py-0.5 rounded">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      }
    },
    {
      command: 'blog',
      description: 'Liste tous les articles de blog',
      action: () => {
        return (
          <div className="space-y-2 mt-1">
            {blogPosts.map((post) => (
              <div key={post.id} className="border-l-2 border-primary-500 pl-2">
                <div className="font-bold text-primary-400">{post.title}</div>
                <div className="text-gray-300 text-sm">{post.excerpt}</div>
                <div className="text-gray-500 text-xs mt-1">Publié le {post.date}</div>
              </div>
            ))}
          </div>
        );
      }
    },
    {
      command: 'skills',
      description: 'Liste mes compétences',
      action: () => {
        return (
          <div className="mt-1">
            <div className="grid grid-cols-12 gap-2">
              {skills.map((skill) => (
                <div key={skill.name} className="col-span-6 sm:col-span-4">
                  <div className="font-medium text-primary-400">{skill.name}</div>
                  <div className="w-full bg-gray-700 h-1.5 mt-1 rounded-full">
                    <div 
                      className="bg-primary-500 h-1.5 rounded-full" 
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
    },
    {
      command: 'experience',
      description: 'Liste mes expériences professionnelles',
      action: () => {
        return (
          <div className="space-y-3 mt-1">
            {experiences.map((exp) => (
              <div key={exp.id} className="border-l-2 border-primary-500 pl-2">
                <div className="font-bold text-primary-400">{exp.role}</div>
                <div className="text-gray-300">{exp.company}</div>
                <div className="text-gray-500 text-sm">{exp.period}</div>
                <div className="text-gray-300 text-sm mt-1">{exp.description}</div>
              </div>
            ))}
          </div>
        );
      }
    },
    {
      command: 'education',
      description: 'Liste mes formations',
      action: () => {
        return (
          <div className="space-y-3 mt-1">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-primary-500 pl-2">
                <div className="font-bold text-primary-400">{edu.degree}</div>
                <div className="text-gray-300">{edu.institution}</div>
                <div className="text-gray-500 text-sm">{edu.period}</div>
                <div className="text-gray-300 text-sm mt-1">{edu.description}</div>
              </div>
            ))}
          </div>
        );
      }
    },
    {
      command: 'contact',
      description: 'Affiche mes informations de contact',
      action: () => {
        return (
          <div className="space-y-2 mt-1">
            <div>
              <span className="text-primary-500 font-bold">Email:</span>
              <span className="text-gray-300 ml-2">contact@example.com</span>
            </div>
            <div>
              <span className="text-primary-500 font-bold">Localisation:</span>
              <span className="text-gray-300 ml-2">Paris, France</span>
            </div>
            <div>
              <span className="text-primary-500 font-bold">LinkedIn:</span>
              <span className="text-gray-300 ml-2">linkedin.com/in/username</span>
            </div>
            <div>
              <span className="text-primary-500 font-bold">GitHub:</span>
              <span className="text-gray-300 ml-2">github.com/username</span>
            </div>
          </div>
        );
      }
    },
    {
      command: 'about',
      description: 'À propos de moi',
      action: () => {
        return (
          <div className="space-y-2 mt-1">
            <p className="text-gray-300">
              Passionné par le développement web depuis plus de 7 ans, je me spécialise dans la création d'applications web modernes et performantes.
            </p>
            <p className="text-gray-300">
              Mon approche combine créativité et rigueur technique pour concevoir des solutions innovantes qui répondent aux besoins spécifiques de chaque projet.
            </p>
            <p className="text-gray-300">
              Adepte des technologies modernes comme React, Next.js et TypeScript, je m'efforce de maintenir mes connaissances à jour pour offrir des solutions à la pointe de l'innovation.
            </p>
          </div>
        );
      }
    },
    {
      command: 'exit',
      description: 'Ferme le terminal',
      action: () => {
        setTimeout(onClose, 500);
        return "Au revoir! Fermeture du terminal...";
      }
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const args = input.trim().split(' ');
    const commandName = args[0].toLowerCase();
    const command = commands.find(cmd => cmd.command === commandName);
    
    const newHistoryItem: TerminalHistory = {
      input,
      output: command 
        ? command.action(args.slice(1)) 
        : `Commande non reconnue: ${commandName}. Tapez 'help' pour voir les commandes disponibles.`
    };
    
    setHistory(prev => [...prev, newHistoryItem]);
    setInput('');
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="relative bg-gray-900 text-white rounded-xl shadow-xl max-w-3xl w-full h-[80vh] flex flex-col"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        <div className="border-b border-gray-800 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TerminalIcon size={20} className="text-primary-500" />
            <h2 className="font-mono text-lg">Portfolio Terminal</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
            aria-label="Fermer le terminal"
          >
            <X size={20} />
          </button>
        </div>
        
        <div 
          ref={terminalRef}
          className="flex-1 p-4 overflow-y-auto font-mono text-sm"
        >
          {history.map((item, index) => (
            <div key={index} className="mb-4">
              {item.input && (
                <div className="flex items-center">
                  <ChevronRight size={16} className="text-primary-500 mr-1" />
                  <span className="text-gray-300">{item.input}</span>
                </div>
              )}
              <div className={`${item.input ? 'mt-1 ml-5' : ''}`}>
                {item.output}
              </div>
            </div>
          ))}
        </div>
        
        <form 
          onSubmit={handleSubmit}
          className="border-t border-gray-800 p-4 flex items-center"
        >
          <ChevronRight size={16} className="text-primary-500 mr-2" />
          <input 
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-white font-mono"
            placeholder="Tapez une commande..."
            autoComplete="off"
          />
        </form>
      </motion.div>
    </motion.div>
  );
}
 