import React, { useEffect } from 'react';
import './GoogleTranslate.css';

const GoogleTranslate = () => {
  const handleTranslateClick = () => {
    const dropdownLink = document.querySelector('.goog-te-gadget-simple a');
    if (dropdownLink) {
      dropdownLink.click();
    }
  };

  useEffect(() => {
    // Add Google Translate script to head
    const addScript = () => {
      // Check if script already exists to avoid duplicates
      if (document.querySelector('script[src*="translate.google.com"]')) {
        // If script exists but translate element is not initialized, initialize it
        if (window.google && window.google.translate) {
          initializeTranslate();
        }
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    };

    // Initialize Google Translate
    const initializeTranslate = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,kn,hi,ta,te,ml,bn,ur', 
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        },
        'google_translate_element'
      );
    };

    window.googleTranslateElementInit = initializeTranslate;

    addScript();

    // Cleanup
    return () => {
      // Don't delete the global function as other components might be using it
      // delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <div id="google_translate_wrapper" onClick={handleTranslateClick} className="google-translate-wrapper">
      <div id="google_translate_element" className="google-translate-custom"></div>
    </div>
  );
};

export default GoogleTranslate;