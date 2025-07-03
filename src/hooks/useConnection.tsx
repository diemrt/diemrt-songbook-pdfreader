import React, { useEffect, useRef, useState } from 'react';
import { connect, disconnect, keepAlive } from '../api';
import { useMutation } from '@tanstack/react-query';
import { ConnectionContext } from './ConnectionContext';

function getBrowserInfo() {
  return {
    userAgent: navigator.userAgent,
    ipAddress: undefined, // opzionale, da backend se serve
  };
}

export const ConnectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const keepAliveRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const connectMutation = useMutation({
    mutationFn: async () => {
      const browserInfo = getBrowserInfo();
      const res = await connect(browserInfo);
      setDeviceId(res.deviceId);
      setIsConnected(true);
    },
  });

  const disconnectMutation = useMutation({
    mutationFn: async () => {
      if (deviceId) {
        await disconnect(deviceId);
        setIsConnected(false);
        setDeviceId(null);
      }
    },
  });

  // Avvia keepalive ogni minuto
  useEffect(() => {
    if (deviceId && isConnected) {
      keepAliveRef.current = setInterval(() => {
        keepAlive(deviceId);
      }, 60000);
    }
    return () => {
      if (keepAliveRef.current) clearInterval(keepAliveRef.current);
    };
  }, [deviceId, isConnected]);

  // Connessione automatica all'avvio
  useEffect(() => {
    if (!deviceId && !isConnected) {
      connectMutation.mutate();
    }
    // eslint-disable-next-line
  }, []);

  const connectDevice = async () => {
    await connectMutation.mutateAsync();
  };

  const disconnectDevice = async () => {
    await disconnectMutation.mutateAsync();
    if (keepAliveRef.current) clearInterval(keepAliveRef.current);
  };

  return (
    <ConnectionContext.Provider value={{ deviceId, isConnected, connectDevice, disconnectDevice }}>
      {children}
    </ConnectionContext.Provider>
  );
};

// Export separato per evitare problemi con Fast Refresh
// Il context e provider sono qui, il relativo hook è in useConnectionHook.ts
