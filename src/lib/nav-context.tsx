'use client';

import { createContext, useContext } from 'react';

interface NavContextType {
  activeSection: string;
  setActiveSection: (id: string) => void;
  scrollToSection: (id: string) => void;
}

export const NavContext = createContext<NavContextType>({
  activeSection: 'hub',
  setActiveSection: () => {},
  scrollToSection: () => {},
});

export const useNav = () => useContext(NavContext);
