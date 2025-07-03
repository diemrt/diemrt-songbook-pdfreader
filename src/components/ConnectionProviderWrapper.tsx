import React from 'react';
import { ConnectionProvider } from '../hooks/useConnection';

// Questo componente wrapper va inserito in alto nell'albero dell'app (es. in App.tsx)
export const ConnectionProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ConnectionProvider>{children}</ConnectionProvider>;
};
