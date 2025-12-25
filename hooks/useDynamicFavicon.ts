import { useEffect } from 'react';
import { PROFILE_IMAGE } from '../constants/profile';

// Hook to dynamically set the favicon based on profile image
export const useDynamicFavicon = () => {
  useEffect(() => {
    // Remove any existing favicon links
    const existingLinks = document.querySelectorAll("link[rel*='icon']");
    existingLinks.forEach(link => link.remove());

    // Create new favicon link
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/jpeg';
    link.href = PROFILE_IMAGE;
    document.head.appendChild(link);

    // Also set apple-touch-icon for iOS
    const appleLink = document.createElement('link');
    appleLink.rel = 'apple-touch-icon';
    appleLink.href = PROFILE_IMAGE;
    document.head.appendChild(appleLink);

    return () => {
      link.remove();
      appleLink.remove();
    };
  }, []);
};

export default useDynamicFavicon;
