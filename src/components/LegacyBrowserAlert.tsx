import  { useState, useEffect } from 'react';

export default function LegacyBrowserAlert() {
  const [isLegacyBrowser, setIsLegacyBrowser] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Détection des navigateurs obsolètes
    const isLegacy = () => {
      // Détection d'Internet Explorer
      const isIE = /*@cc_on!@*/false || !!(document as any).documentMode;
      
      // Détecter les anciennes versions de Edge (EdgeHTML)
      const isOldEdge = !(window as any).CSS || (window as any).navigator.userAgent.indexOf("Edge/") > -1;
      
      // Détecter les anciennes versions de Firefox (< 70)
      const firefoxMatch = navigator.userAgent.match(/Firefox\/(\d+)/);
      const isOldFirefox = firefoxMatch && parseInt(firefoxMatch[1]) < 70;
      
      // Détecter les anciennes versions de Chrome (< 80)
      const chromeMatch = navigator.userAgent.match(/Chrome\/(\d+)/);
      const isOldChrome = chromeMatch && parseInt(chromeMatch[1]) < 80;
      
      // Détecter les anciennes versions de Safari (< 13)
      const safariMatch = navigator.userAgent.match(/Version\/(\d+).*Safari/);
      const isOldSafari = safariMatch && parseInt(safariMatch[1]) < 13;
      
      return isIE || isOldEdge || isOldFirefox || isOldChrome || isOldSafari;
    };
    
    setIsLegacyBrowser(isLegacy());
    
    // Vérifier si l'alerte a déjà été rejetée
    const alertDismissed = localStorage.getItem('legacy-browser-alert-dismissed');
    if (alertDismissed) {
      setDismissed(true);
    }
  }, []);

  if (!isLegacyBrowser || dismissed) {
    return null;
  }

  const handleDismiss = () => {
    localStorage.setItem('legacy-browser-alert-dismissed', 'true');
    setDismissed(true);
  };

  return (
    <div className="bg-yellow-100 text-yellow-800 px-4 py-3 fixed top-0 left-0 right-0 z-50 flex justify-between items-center" role="alert">
      <div>
        <strong className="font-bold">Navigateur obsolète détecté!</strong>
        <span className="block sm:inline ml-2">
          Ce site fonctionne mieux avec un navigateur moderne. Veuillez mettre à jour votre navigateur pour une expérience optimale.
        </span>
      </div>
      <button 
        onClick={handleDismiss}
        className="ml-4 bg-yellow-200 hover:bg-yellow-300 px-3 py-1 rounded text-sm"
        aria-label="Fermer l'alerte de navigateur obsolète"
      >
        Fermer
      </button>
    </div>
  );
}
 