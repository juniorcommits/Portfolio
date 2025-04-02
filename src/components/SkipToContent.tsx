import  { useState } from 'react';

export default function SkipToContent() {
  const [focused, setFocused] = useState(false);
  
  return (
    <a
      href="#main-content"
      className={`fixed top-4 left-4 bg-primary-600 text-white px-4 py-2 rounded focus:outline-none z-[100] transition-transform ${
        focused ? 'transform-none' : '-translate-y-20'
      }`}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const mainContent = document.getElementById('main-content');
          if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }}
    >
      Aller au contenu principal
    </a>
  );
}
 