const normalizeApiBaseUrl = (baseUrl) => {
  const sanitizedBaseUrl = (baseUrl || 'http://localhost:5000/api').replace(
    /\/+$/,
    ''
  );

  return sanitizedBaseUrl.endsWith('/api')
    ? sanitizedBaseUrl
    : `${sanitizedBaseUrl}/api`;
};

const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);

const fetchJson = async (path) => {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed for ${path}`);
  }

  return response.json();
};

export const portfolioApi = {
  getAbout: () => fetchJson('/about'),
  getProjects: () => fetchJson('/projects'),
  getSkills: () => fetchJson('/skills'),
  getExperience: () => fetchJson('/experience'),
  getEducation: () => fetchJson('/education'),
  getContact: () => fetchJson('/contact')
};
