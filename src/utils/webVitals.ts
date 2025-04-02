import  { ReportHandler } from 'web-vitals';

// Fonction pour initialiser et rapporter les Core Web Vitals
export const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Log les métriques de performance en console pour le développement
export const logWebVitals = (): void => {
  reportWebVitals(console.log);
};

// Envoi des métriques à un service d'analytique (ex: Google Analytics)
export const sendToAnalytics = (metric: any): void => {
  // Implémentation réelle : envoi à Google Analytics, etc.
  console.log('Web Vital Metric:', metric);

  // Exemple de collecte pour un service d'analyse (à personnaliser)
  const body = {
    name: metric.name,
    value: metric.value,
    id: metric.id,
    delta: metric.delta
  };

  // Code pour envoyer à votre service d'analyse
  // fetch('/analytics', {
  //   method: 'POST',
  //   body: JSON.stringify(body),
  //   headers: { 'Content-Type': 'application/json' }
  // });
};
 