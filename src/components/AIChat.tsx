import  { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Loader, X } from 'lucide-react';
import { fetchOpenAIResponse } from '../utils/openai';
import { projects, experiences, skills } from '../data';
import { sanitizeInput, RateLimiter } from '../utils/security';

type Message = {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
  isLoading?: boolean;
};

// Create rate limiter for chat to prevent abuse
const chatRateLimiter = new RateLimiter(5, 60); // 5 messages per minute

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "Bonjour ! Je suis l'assistant IA du portfolio. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date()
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);
  
  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Focus the input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Check rate limiting
    if (chatRateLimiter.isRateLimited('chat-user')) {
      setIsRateLimited(true);
      setTimeout(() => setIsRateLimited(false), 5000);
      return;
    }
    
    // Sanitize user input to prevent XSS
    const sanitizedMessage = sanitizeInput(message);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: sanitizedMessage,
      timestamp: new Date()
    };
    
    // Add waiting message from bot
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      text: '',
      timestamp: new Date(),
      isLoading: true
    };
    
    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setMessage('');
    
    try {
      // Enhance context with portfolio data
      const context = `
        Compétences: ${skills.map(s => s.name).join(', ')}
        Expérience: ${experiences.map(e => `${e.role} chez ${e.company}`).join(', ')}
        Projets: ${projects.map(p => p.title).join(', ')}
        
        Question: ${sanitizedMessage}
      `;
      
      // Get actual response from OpenAI
      const aiResponse = await fetchOpenAIResponse(context);
      
      // Replace loading message with actual response
      setMessages(prev => 
        prev.map(msg => 
          msg.isLoading 
            ? { ...msg, text: aiResponse, isLoading: false } 
            : msg
        )
      );
    } catch (error) {
      // Replace loading with error message
      setMessages(prev => 
        prev.map(msg => 
          msg.isLoading 
            ? { 
                ...msg, 
                text: "Désolé, je n'ai pas pu obtenir une réponse. Veuillez réessayer.", 
                isLoading: false 
              } 
            : msg
        )
      );
    }
  };
  
  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-40 bg-primary-600 text-white rounded-full p-4 shadow-lg"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        aria-label="Ouvrir le chat avec l'assistant IA"
      >
        <Bot size={24} />
      </motion.button>
      
      {/* Chat Window */}
      {isOpen && (
        <motion.div 
          className="fixed bottom-24 right-6 z-40 w-full max-w-sm bg-white dark:bg-dark-200 rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-title"
        >
          {/* Chat Header */}
          <div className="bg-primary-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <h3 id="chat-title" className="font-medium">Assistant Portfolio IA</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Fermer le chat"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Messages Container */}
          <div 
            className="h-96 overflow-y-auto p-4 flex flex-col gap-4"
            ref={messagesEndRef}
            role="log"
            aria-live="polite"
          >
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-t-lg ${
                    msg.type === 'user' 
                      ? 'bg-primary-600 text-white rounded-bl-lg' 
                      : 'bg-gray-100 dark:bg-dark-300 text-gray-800 dark:text-gray-200 rounded-br-lg'
                  } p-3`}
                  role={msg.type === 'bot' ? 'status' : undefined}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {msg.type === 'bot' ? (
                      <Bot size={16} className="text-primary-600 dark:text-primary-400" aria-hidden="true" />
                    ) : (
                      <User size={16} aria-hidden="true" />
                    )}
                    <span className="text-xs opacity-70">
                      {msg.type === 'bot' ? 'Assistant IA' : 'Vous'} • {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  
                  {msg.isLoading ? (
                    <div className="flex gap-1 items-center h-6" aria-label="Message en cours de chargement">
                      <div className="bg-gray-300 dark:bg-dark-400 rounded-full w-2 h-2 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="bg-gray-300 dark:bg-dark-400 rounded-full w-2 h-2 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="bg-gray-300 dark:bg-dark-400 rounded-full w-2 h-2 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  ) : (
                    <p>{msg.text}</p>
                  )}
                </div>
              </div>
            ))}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Form */}
          <form 
            onSubmit={handleSubmit}
            className="border-t border-gray-200 dark:border-dark-300 p-4 flex gap-2"
          >
            {isRateLimited && (
              <div className="absolute bottom-16 left-0 right-0 bg-red-100 dark:bg-red-900/20 p-2 text-red-800 dark:text-red-400 text-sm text-center">
                Trop de messages envoyés. Veuillez patienter quelques instants.
              </div>
            )}
            
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Posez une question..."
              className="flex-1 px-4 py-2 bg-gray-100 dark:bg-dark-300 border border-gray-300 dark:border-dark-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-400"
              maxLength={500}
              aria-label="Votre message"
              disabled={isRateLimited}
            />
            <button 
              type="submit"
              className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!message.trim() || messages.some(msg => msg.isLoading) || isRateLimited}
              aria-label="Envoyer le message"
            >
              {messages.some(msg => msg.isLoading) ? (
                <Loader size={20} className="animate-spin" aria-hidden="true" />
              ) : (
                <Send size={20} aria-hidden="true" />
              )}
            </button>
          </form>
        </motion.div>
      )}
    </>
  );
}
 