export const api = {
  create: async <T,>(endpoint: string, data: T) => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return response.json();
  },
  update: async <T,>(endpoint: string, id: number, data: T) => {
    const response = await fetch(`${endpoint}/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return response.json();
  },
  delete: async (endpoint: string, id: number) => {
    await fetch(`${endpoint}/${id}`, { method: 'DELETE' });
  }
};