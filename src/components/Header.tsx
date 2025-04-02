//  This component integrates security headers for the portfolio

import { useEffect } from 'react';
import { getCSPPolicy } from '../utils/security';

// Since React doesn't directly control HTTP headers,
// this component will insert a meta tag for CSP in development
// In production, you'd implement proper HTTP headers on your server

export default function SecurityHeaders() {
  useEffect(() => {
    // Add security-related meta tags
    const addSecurityMeta = () => {
      // Content Security Policy
      const cspMetaTag = document.createElement('meta');
      cspMetaTag.httpEquiv = 'Content-Security-Policy';
      cspMetaTag.content = getCSPPolicy();
      document.head.appendChild(cspMetaTag);
      
      // XSS Protection for legacy browsers
      const xssProtectionMetaTag = document.createElement('meta');
      xssProtectionMetaTag.httpEquiv = 'X-XSS-Protection';
      xssProtectionMetaTag.content = '1; mode=block';
      document.head.appendChild(xssProtectionMetaTag);
      
      // Prevent MIME type sniffing
      const noSniffMetaTag = document.createElement('meta');
      noSniffMetaTag.httpEquiv = 'X-Content-Type-Options';
      noSniffMetaTag.content = 'nosniff';
      document.head.appendChild(noSniffMetaTag);
      
      // Referrer Policy
      const referrerPolicyMetaTag = document.createElement('meta');
      referrerPolicyMetaTag.name = 'referrer';
      referrerPolicyMetaTag.content = 'no-referrer-when-downgrade';
      document.head.appendChild(referrerPolicyMetaTag);
      
      // Feature Policy
      const featurePolicyMetaTag = document.createElement('meta');
      featurePolicyMetaTag.httpEquiv = 'Permissions-Policy';
      featurePolicyMetaTag.content = 'camera=(), microphone=(), geolocation=()';
      document.head.appendChild(featurePolicyMetaTag);
    };
    
    addSecurityMeta();
    
    // Cleanup function to remove tags if component unmounts
    return () => {
      const metaTags = document.head.querySelectorAll('meta[http-equiv]');
      metaTags.forEach(tag => {
        if (['Content-Security-Policy', 'X-XSS-Protection', 'X-Content-Type-Options', 'Permissions-Policy'].includes(tag.getAttribute('http-equiv') || '')) {
          document.head.removeChild(tag);
        }
      });
      
      const referrerTag = document.head.querySelector('meta[name="referrer"]');
      if (referrerTag) {
        document.head.removeChild(referrerTag);
      }
    };
  }, []);
  
  return null; // This component doesn't render anything
}
 