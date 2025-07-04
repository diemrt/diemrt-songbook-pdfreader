
const basePathApi = 'https://localhost:7010/api';


export const getStatus = async () => {
  const response = await fetch(`${basePathApi}/Status`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Connection APIs
export const connect = async (connectionDto: { deviceId?: string; userAgent?: string; ipAddress?: string }) => {
  const response = await fetch(`${basePathApi}/Connection/connect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(connectionDto),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};


export const disconnect = async (deviceId: string) => {
  const response = await fetch(`${basePathApi}/Connection/disconnect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deviceId),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const keepAlive = async (deviceId: string) => {
  const response = await fetch(`${basePathApi}/Connection/keepalive`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deviceId),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getActiveConnection = async () => {
  const response = await fetch(`${basePathApi}/Connection/active`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getOnlineInteractions = async () => {
  const response = await fetch(`${basePathApi}/PageInteraction/online-interactions`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// PageInteraction APIs
export const trackPageInteraction = async (pageInteractionDto: { deviceId?: string; pdfFileName?: string; pageNumber: number }) => {
  const response = await fetch(`${basePathApi}/PageInteraction/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pageInteractionDto),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getPageInteractionHistory = async (deviceId: string, pdfFileName?: string) => {
  const url = new URL(`${basePathApi}/PageInteraction/history/${encodeURIComponent(deviceId)}`);
  if (pdfFileName) url.searchParams.append('pdfFileName', pdfFileName);
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getCurrentPageInteraction = async (deviceId: string, pdfFileName?: string) => {
  const url = new URL(`${basePathApi}/PageInteraction/current/${encodeURIComponent(deviceId)}`);
  if (pdfFileName) url.searchParams.append('pdfFileName', pdfFileName);
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// FavoritePages APIs
export const getFavoritePages = async (deviceId: string) => {
  const response = await fetch(`${basePathApi}/FavoritePages/${encodeURIComponent(deviceId)}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const deleteFavoritePages = async (deviceId: string) => {
  const response = await fetch(`${basePathApi}/FavoritePages/${encodeURIComponent(deviceId)}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const addFavoritePages = async (favoritePagesDto: { deviceId: string, pages: string}) => {
  const response = await fetch(`${basePathApi}/FavoritePages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(favoritePagesDto),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};