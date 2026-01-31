import { useEffect, useCallback } from 'react';

interface Section {
  id: string;
  element: HTMLElement;
}

export function useKeyboardNavigation() {
  const getSections = useCallback((): Section[] => {
    const sections: Section[] = [];
    const sectionElements = document.querySelectorAll('section[id]');
    
    sectionElements.forEach((el) => {
      const id = el.getAttribute('id');
      if (id) {
        sections.push({ id, element: el as HTMLElement });
      }
    });
    
    return sections;
  }, []);

  const scrollToSection = useCallback((element: HTMLElement) => {
    element.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if not in input/textarea
      if (document.activeElement?.tagName === 'INPUT' || 
          document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      const sections = getSections();
      if (sections.length === 0) return;

      const viewportHeight = window.innerHeight;

      // Find current section
      let currentIndex = 0;
      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].element.getBoundingClientRect();
        if (rect.top <= viewportHeight / 2) {
          currentIndex = i;
        }
      }

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault();
          if (currentIndex < sections.length - 1) {
            scrollToSection(sections[currentIndex + 1].element);
          }
          break;

        case 'ArrowUp':
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          if (currentIndex > 0) {
            scrollToSection(sections[currentIndex - 1].element);
          }
          break;

        case 'Home':
          e.preventDefault();
          scrollToSection(sections[0].element);
          break;

        case 'End':
          e.preventDefault();
          scrollToSection(sections[sections.length - 1].element);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [getSections, scrollToSection]);
}
