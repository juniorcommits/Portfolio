import  AnimatedSection from './AnimatedSection';
import SectionTitle from './SectionTitle';
import CVGenerator from './CVGenerator';

export default function Tools() {
  return (
    <AnimatedSection id="tools" className="bg-gray-50 dark:bg-dark-200">
      <SectionTitle 
        title="Outils" 
        subtitle="Découvrez les outils interactifs mis à votre disposition pour explorer mon profil." 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CVGenerator />
        
        <div className="card p-6 sm:p-8 flex flex-col items-center text-center">
          <img
            src="https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw1fHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXNrJTIwZGV2ZWxvcGVyJTIwc2V0dXB8ZW58MHx8fHwxNzQzMzU4NzYxfDA&ixlib=rb-4.0.3"
            alt="MacBook avec café et notes"
            className="w-full h-48 object-cover rounded-lg mb-6"
          />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Mode Terminal</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Explorez mon portfolio comme un développeur avec l'interface en ligne de commande.
            Accédez à mes projets, compétences et expériences avec des commandes simples.
          </p>
          <button
            onClick={() => {
              // Trigger terminal modal from FloatingControls component
              const terminalButton = document.querySelector('[aria-label="Ouvrir le terminal"]');
              if (terminalButton) {
                (terminalButton as HTMLButtonElement).click();
              }
            }}
            className="btn btn-outline"
          >
            Ouvrir le Terminal
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
}
 