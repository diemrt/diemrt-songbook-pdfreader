import { createContext } from 'react';

export interface ConnectionContextType {
  deviceId: string | null;
  isConnected: boolean;
  connectDevice: () => Promise<void>;
  disconnectDevice: () => Promise<void>;
}

export const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);
