import  Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Tools from './components/Tools';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeSelector from './components/ThemeSelector';
import FloatingControls from './components/FloatingControls';
import AIChat from './components/AIChat';
import Breadcrumbs from './components/Breadcrumbs';
import AccessibilityControls from './components/AccessibilityControls';
import SEO from './components/SEO';
import LegacyBrowserAlert from './components/LegacyBrowserAlert';
import SkipToContent from './components/SkipToContent';
import SecurityBanner from './components/SecurityBanner';
import ResponsiveTips from './components/ResponsiveTips';

function App() {
  return (
    <>
      <SEO 
        title="Portfolio Développeur | Projets et Compétences Créatives"
        description="Portfolio de développeur créatif spécialisé en React, Next.js et TypeScript. Découvrez mes projets, compétences et expériences professionnelles."
      />
      
      <LegacyBrowserAlert />
      <SkipToContent />
      
      <div className="min-h-screen">
        <Navbar />
        <Breadcrumbs />
        <SecurityBanner />
        
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <About />
          <Projects />
          <ResponsiveTips />
          <Blog />
          <Tools />
          <Contact />
        </main>
        
        <Footer />
        <ThemeSelector />
        <FloatingControls />
        <AIChat />
        <AccessibilityControls />
      </div>
    </>
  );
}

export default App;
 