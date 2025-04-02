//  Utilitaire pour interagir avec l'API OpenAI via notre proxy sécurisé
import { SecureStore, RateLimiter } from './security';

// Rate limiter to prevent abuse of API
const apiRateLimiter = new RateLimiter(10, 60); // 10 requests per minute

// Create unique rate limiting keys
const generateClientId = (): string => {
  // In a real app, this would use a combination of user identifiers
  // For this portfolio demo, we'll generate a simple session-based identifier
  return `client-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

// Get or create client ID for rate limiting
const getClientId = (): string => {
  const store = SecureStore.getInstance();
  let clientId = store.get('openai-client-id');
  
  if (!clientId) {
    clientId = generateClientId();
    store.set('openai-client-id', clientId);
  }
  
  return clientId;
}

export async function fetchOpenAIResponse(prompt: string, maxTokens: number = 150) {
  try {
    const clientId = getClientId();
    
    // Check rate limit before making request
    if (apiRateLimiter.isRateLimited(clientId)) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    
    // All API requests go through the proxy
    const response = await fetch('https://hooks.jdoodle.net/proxy?url=https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Vous êtes un assistant virtuel sur le portfolio d\'un développeur web. Répondez de manière précise et professionnelle aux questions concernant les compétences, l\'expérience et les projets du développeur.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: maxTokens,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('API Error details:', errorData);
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || generateFallbackResponse(prompt);
  } catch (error) {
    console.error('Erreur lors de la communication avec OpenAI:', error);
    return generateFallbackResponse(prompt);
  }
}

// Fonction pour générer une réponse de secours en cas d'erreur API
function generateFallbackResponse(prompt: string): string {
  // Sanitize prompt before processing
  const cleanPrompt = prompt.toLowerCase().replace(/[^\w\s]/gi, '');
  
  // Analyze the prompt for fallback content type
  if (cleanPrompt.includes('description de projet')) {
    return "Ce projet innovant combine des technologies de pointe pour offrir une solution robuste et évolutive. Son architecture moderne assure des performances optimales et une expérience utilisateur fluide.";
  } 
  else if (cleanPrompt.includes('bio professionnelle')) {
    return "Développeur web passionné avec une solide expertise en technologies front-end et back-end. Spécialisé dans la création d'applications web performantes et intuitives, je reste constamment à l'affût des dernières innovations pour proposer des solutions optimales.";
  } 
  else if (cleanPrompt.includes('compétences complémentaires')) {
    return "1. WebAssembly - Pour améliorer les performances des applications web complexes.\n2. GraphQL - Pour optimiser les requêtes API et améliorer l'efficacité des échanges de données.\n3. Cybersécurité - Pour renforcer la protection des applications et des données utilisateurs.";
  } 
  else if (cleanPrompt.includes('article de blog')) {
    return "# Introduction\n\nDans cet article, nous explorerons les concepts fondamentaux et les meilleures pratiques du sujet.\n\n## Première partie: Comprendre les bases\n\nLes bases constituent le fondement de toute expertise approfondie. Maîtriser ces éléments essentiels permet de construire des connaissances solides.\n\n## Deuxième partie: Applications pratiques\n\nLa théorie prend tout son sens lorsqu'elle est appliquée à des cas concrets. Examinons quelques exemples pratiques et leurs implications.\n\n## Conclusion\n\nEn résumé, ces concepts sont essentiels pour tout développeur souhaitant améliorer ses compétences et rester à la pointe de l'innovation.";
  }
  else if (cleanPrompt.includes('résumé professionnel')) {
    return "Développeur fullstack expérimenté avec une expertise approfondie en JavaScript et ses frameworks modernes. Passionné par la création d'applications web performantes et accessibles, je combine rigueur technique et approche centrée utilisateur pour concevoir des solutions innovantes répondant aux besoins spécifiques de chaque projet.";
  }
  else {
    return "Je suis désolé, je n'ai pas pu générer une réponse personnalisée. Veuillez réessayer ultérieurement ou reformuler votre demande.";
  }
}

// Fonction pour générer une description de projet améliorée
export async function generateProjectDescription(project: {title: string, description: string, tags: string[]}) {
  const prompt = `Améliore cette description de projet de façon concise mais professionnelle et détaillée (max 3 phrases): 
Titre: ${project.title}  
Description actuelle: ${project.description}
Technologies: ${project.tags.join(', ')}`;

  return fetchOpenAIResponse(prompt, 100);
}

// Fonction pour générer une bio personnalisée
export async function generatePersonalizedBio(skills: string[], experience: string, focus: string) {
  const prompt = `Génère une bio professionnelle et engageante pour un développeur web (max 4 phrases).
Compétences principales: ${skills.join(', ')}
Expérience: ${experience}
Domaine d'expertise principal: ${focus}`;

  return fetchOpenAIResponse(prompt, 120);
}

// Fonction pour générer des recommandations de compétences à développer
export async function generateSkillRecommendations(currentSkills: string[]) {
  const prompt = `En fonction de ces compétences d'un développeur web: ${currentSkills.join(', ')},
recommande 3 technologies ou compétences complémentaires qu'il devrait acquérir, avec une brève explication pour chacune (max 1 phrase par technologie).`;

  return fetchOpenAIResponse(prompt, 150);
}
 