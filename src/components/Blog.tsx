import  { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, ChevronRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import SectionTitle from './SectionTitle';
import Modal from './Modal';
import { blogPosts } from '../data';
import ReactMarkdown from 'react-markdown';
import BlogContentGenerator from './BlogContentGenerator';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [generatedContents, setGeneratedContents] = useState<Record<number, string>>({});
  
  const getPostById = (id: number) => blogPosts.find(post => post.id === id);
  
  const handleContentGenerated = (postId: number, content: string) => {
    setGeneratedContents(prev => ({
      ...prev,
      [postId]: content
    }));
  };
  
  return (
    <AnimatedSection id="blog" className="bg-gray-50 dark:bg-dark-200">
      <SectionTitle 
        title="Blog" 
        subtitle="Articles, astuces et réflexions sur le développement web et les technologies modernes." 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <motion.div 
            key={post.id}
            className="card overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedPost(post.id)}
          >
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                <Calendar size={14} className="mr-1" />
                <span>{post.date}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{post.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-primary-600 dark:text-primary-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {post.tags[0]}
                    {post.tags.length > 1 && `, +${post.tags.length - 1}`}
                  </span>
                </div>
                
                <span className="text-primary-600 dark:text-primary-400 flex items-center text-sm font-medium">
                  Lire l'article 
                  <ChevronRight size={16} className="ml-1" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedPost && (
        <Modal onClose={() => setSelectedPost(null)}>
          <div className="overflow-y-auto max-h-[80vh]">
            {getPostById(selectedPost) && (
              <>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <Calendar size={14} className="mr-1" />
                  <span>{getPostById(selectedPost)?.date}</span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  {getPostById(selectedPost)?.title}
                </h2>
                
                <div className="flex gap-2 mb-6">
                  {getPostById(selectedPost)?.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-xs bg-gray-100 dark:bg-dark-300 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {generatedContents[selectedPost] ? (
                  <div className="prose dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-primary-600 dark:prose-a:text-primary-400 max-w-none">
                    <ReactMarkdown>{generatedContents[selectedPost]}</ReactMarkdown>
                  </div>
                ) : (
                  <BlogContentGenerator 
                    post={getPostById(selectedPost)!} 
                    onContentGenerated={(content) => handleContentGenerated(selectedPost, content)}
                  />
                )}
              </>
            )}
          </div>
        </Modal>
      )}
    </AnimatedSection>
  );
}
 