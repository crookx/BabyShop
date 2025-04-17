import { useEffect } from 'react';

export const useA11y = () => {
  useEffect(() => {
    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove('user-is-tabbing');
    };

    window.addEventListener('keydown', handleTabKey);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleTabKey);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
};