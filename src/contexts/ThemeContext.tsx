import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type ThemeVariant = 
  | 'default'        // Original warm saffron theme
  | 'starbucks'      // Starbucks Green (#00754A)
  | 'costa'          // Costa Coffee Red/Brown
  | 'blue-bottle'    // Blue Bottle minimalist blue
  | 'caribou'        // Caribou Coffee teal/brown
  | 'dunkin'         // Dunkin Orange/Pink
  | 'lavazza'        // Lavazza Italian Blue
  | 'espresso'       // Dark roast browns
  | 'mocha'          // Mocha chocolate tones
  | 'caramel'        // Caramel golden warmth
  | 'latte'          // Creamy latte neutrals
  | 'chai'           // Chai spice warm oranges
  | 'matcha'         // Matcha green tea
  | 'vanilla'        // Vanilla cream soft tones
  | 'hazelnut';      // Hazelnut earthy browns

export interface ThemeConfig {
  id: ThemeVariant;
  name: string;
  description: string;
  category: 'brand' | 'palette' | 'special';
  preview: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const themes: ThemeConfig[] = [
  // Original Theme
  {
    id: 'default',
    name: 'Shradhanand Saffron',
    description: 'Original warm saffron theme with Indian heritage colors',
    category: 'special',
    preview: { primary: '#E8892E', secondary: '#F5E6D3', accent: '#4CAF50' }
  },
  // Brand-Inspired Themes
  {
    id: 'starbucks',
    name: 'Starbucks Green',
    description: 'Iconic Starbucks green with clean whites',
    category: 'brand',
    preview: { primary: '#00754A', secondary: '#D4E9E2', accent: '#1E3932' }
  },
  {
    id: 'costa',
    name: 'Costa Crimson',
    description: 'Costa Coffee warm red and rich browns',
    category: 'brand',
    preview: { primary: '#6D1F34', secondary: '#F5E6D3', accent: '#8B4513' }
  },
  {
    id: 'blue-bottle',
    name: 'Blue Bottle',
    description: 'Minimalist blue with clean modern aesthetic',
    category: 'brand',
    preview: { primary: '#0066B3', secondary: '#F5F5F5', accent: '#2196F3' }
  },
  {
    id: 'caribou',
    name: 'Caribou Teal',
    description: 'Caribou Coffee calming teal and warm brown',
    category: 'brand',
    preview: { primary: '#79AFBC', secondary: '#E8D8B0', accent: '#4E3B31' }
  },
  {
    id: 'dunkin',
    name: 'Dunkin Vibrant',
    description: 'Dunkin energetic orange and magenta',
    category: 'brand',
    preview: { primary: '#FF671F', secondary: '#FFF5F0', accent: '#DA1884' }
  },
  {
    id: 'lavazza',
    name: 'Lavazza Italian',
    description: 'Italian sophistication with deep navy blue',
    category: 'brand',
    preview: { primary: '#002776', secondary: '#F0F4F8', accent: '#C4A35A' }
  },
  // Palette-Based Themes
  {
    id: 'espresso',
    name: 'Espresso Elegance',
    description: 'Rich, dark roast browns for sophisticated feel',
    category: 'palette',
    preview: { primary: '#3B2A2A', secondary: '#E8D8B0', accent: '#A65E2E' }
  },
  {
    id: 'mocha',
    name: 'Mocha Magic',
    description: 'Chocolate mocha tones, warm and inviting',
    category: 'palette',
    preview: { primary: '#5D4037', secondary: '#EFEBE9', accent: '#8D6E63' }
  },
  {
    id: 'caramel',
    name: 'Caramel Bliss',
    description: 'Golden caramel with creamy undertones',
    category: 'palette',
    preview: { primary: '#C69C6D', secondary: '#F5E1A4', accent: '#7B4B3A' }
  },
  {
    id: 'latte',
    name: 'Latte Love',
    description: 'Soft creamy latte with gentle warmth',
    category: 'palette',
    preview: { primary: '#A68A6B', secondary: '#F5F0E6', accent: '#7B5B3A' }
  },
  {
    id: 'chai',
    name: 'Chai Charm',
    description: 'Spicy chai with warm orange accents',
    category: 'palette',
    preview: { primary: '#A76D4D', secondary: '#F5E1A4', accent: '#E3C6A8' }
  },
  {
    id: 'matcha',
    name: 'Matcha Zen',
    description: 'Calming green tea inspired palette',
    category: 'palette',
    preview: { primary: '#8BC34A', secondary: '#F1F8E9', accent: '#558B2F' }
  },
  {
    id: 'vanilla',
    name: 'Vanilla Dream',
    description: 'Soft vanilla cream with elegant neutrals',
    category: 'palette',
    preview: { primary: '#D4A574', secondary: '#FFF8E7', accent: '#8B7355' }
  },
  {
    id: 'hazelnut',
    name: 'Hazelnut Warmth',
    description: 'Earthy hazelnut with natural wood tones',
    category: 'palette',
    preview: { primary: '#7B5B3A', secondary: '#D9CBAE', accent: '#4B3D3A' }
  }
];

interface ThemeContextType {
  currentTheme: ThemeVariant;
  setTheme: (theme: ThemeVariant) => void;
  themes: ThemeConfig[];
  isDevMode: boolean;
  toggleDevMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeVariant>(() => {
    const saved = localStorage.getItem('cafe-theme');
    return (saved as ThemeVariant) || 'default';
  });

  const [isDevMode, setIsDevMode] = useState(() => {
    return localStorage.getItem('dev-mode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('cafe-theme', currentTheme);
    // Apply theme class to document
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    localStorage.setItem('dev-mode', isDevMode.toString());
  }, [isDevMode]);

  const setTheme = (theme: ThemeVariant) => {
    setCurrentTheme(theme);
  };

  const toggleDevMode = () => {
    setIsDevMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ 
      currentTheme, 
      setTheme, 
      themes, 
      isDevMode, 
      toggleDevMode 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
