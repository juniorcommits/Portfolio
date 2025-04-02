import  { motion } from 'framer-motion';
import { Monitor, Smartphone, Tablet, Layers, RefreshCw } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import SectionTitle from './SectionTitle';
import { useIsMobile, useIsTablet, useIsDesktop } from './ResponsiveUtils';
import ResponsiveImage from './ResponsiveImage';

export default function ResponsiveTips() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();
  
  const getCurrentDevice = () => {
    if (isMobile) return 'mobile';
    if (isTablet) return 'tablet';
    return 'desktop';
  };

  return (
    <AnimatedSection id="responsive-tips" className="bg-gray-50 dark:bg-dark-200">
      <SectionTitle 
        title="Design Responsive" 
        subtitle="Découvrez comment ce portfolio s'adapte parfaitement à tous les appareils et tailles d'écran." 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="card p-responsive overflow-hidden">
          <ResponsiveImage 
            src="https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxyZXNwb25zaXZlJTIwd2ViJTIwZGVzaWduJTIwcGF0dGVybnMlMjBtb2JpbGUlMjBkZXNrdG9wfGVufDB8fHx8MTc0MzQyOTE0MXww&ixlib=rb-4.0.3"
            alt="Conception web responsive illustrée par un livre sur le design et un smartphone" 
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Vous consultez actuellement sur {getCurrentDevice()}</h3>
          
          <div className="flex items-center gap-4 mb-4">
            {isMobile && <Smartphone className="text-primary-600 dark:text-primary-400" size={24} />}
            {isTablet && <Tablet className="text-primary-600 dark:text-primary-400" size={24} />}
            {isDesktop && <Monitor className="text-primary-600 dark:text-primary-400" size={24} />}
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                L'interface s'adapte automatiquement à votre appareil pour une expérience optimale.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full">
                <Layers size={16} className="text-blue-700 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Design Fluide</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Utilisation de grilles flexibles et d'unités relatives pour s'adapter à toutes les tailles d'écran.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full">
                <RefreshCw size={16} className="text-blue-700 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Optimisation Dynamique</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Chargement adaptatif des ressources en fonction de votre appareil et de votre connexion.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card p-responsive">
          <ResponsiveImage 
            src="https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxyZXNwb25zaXZlJTIwd2ViJTIwZGVzaWduJTIwcGF0dGVybnMlMjBtb2JpbGUlMjBkZXNrdG9wfGVufDB8fHx8MTc0MzQyOTE0MXww&ixlib=rb-4.0.3"
            alt="Design épuré et minimaliste illustrant les principes de design responsive" 
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Techniques Responsive Utilisées</h3>
          
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <div className="bg-primary-100 dark:bg-primary-900/20 p-1 rounded-full flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
              </div>
              <span>Media queries pour adapter les layouts aux différentes tailles d'écran</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-primary-100 dark:bg-primary-900/20 p-1 rounded-full flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
              </div>
              <span>Grilles CSS flexibles et Flexbox pour un alignement optimal</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-primary-100 dark:bg-primary-900/20 p-1 rounded-full flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
              </div>
              <span>Images responsives avec tailles et chargement optimisés</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-primary-100 dark:bg-primary-900/20 p-1 rounded-full flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
              </div>
              <span>Typographie fluide qui s'adapte aux dimensions de l'écran</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-primary-100 dark:bg-primary-900/20 p-1 rounded-full flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
              </div>
              <span>Navigation optimisée pour mobiles avec menu hamburger</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-100 rounded-xl shadow-lg p-responsive">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Démonstration d'Adaptation</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="rounded-lg bg-gray-50 dark:bg-dark-200 p-4 flex flex-col items-center">
            <Smartphone size={36} className="text-primary-600 dark:text-primary-400 mb-3" />
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Mobile</h4>
            <p className="text-center text-sm text-gray-700 dark:text-gray-300">
              Interface simplifiée, boutons plus grands, navigation par menu hamburger
            </p>
          </div>
          
          <div className="rounded-lg bg-gray-50 dark:bg-dark-200 p-4 flex flex-col items-center">
            <Tablet size={36} className="text-primary-600 dark:text-primary-400 mb-3" />
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Tablette</h4>
            <p className="text-center text-sm text-gray-700 dark:text-gray-300">
              Mise en page hybride, navigation partiellement compacte, contenu adapté
            </p>
          </div>
          
          <div className="rounded-lg bg-gray-50 dark:bg-dark-200 p-4 flex flex-col items-center">
            <Monitor size={36} className="text-primary-600 dark:text-primary-400 mb-3" />
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Desktop</h4>
            <p className="text-center text-sm text-gray-700 dark:text-gray-300">
              Mise en page complète, navigation horizontale, utilisation optimale de l'espace
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
 