import  { useState } from 'react';
import { motion } from 'framer-motion';
import { PenLine, Loader } from 'lucide-react';
import { fetchOpenAIResponse } from '../utils/openai';
import { BlogPost } from '../types';
import ReactMarkdown from 'react-markdown';

interface BlogContentGeneratorProps {
  post: BlogPost;
  onContentGenerated: (content: string) => void;
}

export default function BlogContentGenerator({ post, onContentGenerated }: BlogContentGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateContent = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const prompt = `Écris un article de blog complet sur "${post.title}". 
Utilise ces tags comme thèmes: ${post.tags.join(', ')}.
Voici l'introduction/extrait de l'article: "${post.excerpt}"

Génère un article complet au format Markdown avec:
1. Introduction développée
2. 2-3 sections principales avec sous-titres
3. Conclusion
4. Exemples pratiques si pertinent`;

      const content = await fetchOpenAIResponse(prompt, 600);
      setGeneratedContent(content);
      onContentGenerated(content);
    } catch (err) {
      console.error('Erreur génération contenu:', err);
      setError("Une erreur s'est produite lors de la génération du contenu.");
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/20 rounded-lg p-4 text-red-600 dark:text-red-400">
        {error}
        <button 
          onClick={handleGenerateContent}
          className="mt-2 text-sm underline hover:no-underline"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (generatedContent) {
    return (
      <div className="prose dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-primary-600 dark:prose-a:text-primary-400 max-w-none">
        <div className="relative mb-8">
          <div className="bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300 text-xs px-2 py-1 rounded-full inline-flex items-center gap-1 absolute top-0 right-0">
            <PenLine size={12} />
            <span>Contenu généré par IA</span>
          </div>
        </div>
        <ReactMarkdown>{generatedContent}</ReactMarkdown>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
      <PenLine size={36} className="text-gray-400 dark:text-gray-600 mb-4" />
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
        Vous pouvez générer automatiquement le contenu complet de cet article à l'aide de l'IA.
      </p>
      <motion.button
        onClick={handleGenerateContent}
        className="btn btn-primary inline-flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader size={18} className="animate-spin" />
            <span>Génération en cours...</span>
          </>
        ) : (
          <>
            <PenLine size={18} />
            <span>Générer l'article complet</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
 