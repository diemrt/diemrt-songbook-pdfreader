const basePathApi = 'https://localhost:7010/api';

export const getStatus = async () => {
  const response = await fetch(`${basePathApi}/status`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}