import React, { createContext, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useAshramBySlug, type Ashram } from '@/hooks/useAshrams';

interface AshramContextType {
  ashram: Ashram | null;
  ashramId: string | null;
  ashramSlug: string | undefined;
  isLoading: boolean;
  basePath: string;
}

const AshramContext = createContext<AshramContextType | undefined>(undefined);

export function AshramProvider({ children }: { children: React.ReactNode }) {
  const { ashramSlug } = useParams<{ ashramSlug: string }>();
  const { data: ashram, isLoading } = useAshramBySlug(ashramSlug);

  const basePath = ashramSlug ? `/ashram/${ashramSlug}` : '';

  return (
    <AshramContext.Provider value={{
      ashram: ashram ?? null,
      ashramId: ashram?.id ?? null,
      ashramSlug,
      isLoading,
      basePath,
    }}>
      {children}
    </AshramContext.Provider>
  );
}

export function useAshram() {
  const context = useContext(AshramContext);
  if (context === undefined) {
    throw new Error('useAshram must be used within an AshramProvider');
  }
  return context;
}
