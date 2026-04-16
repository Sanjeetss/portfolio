import fallbackData from "../data/fallbackPortfolio";

const normalizeApiBaseUrl = (baseUrl) => {
  if (!baseUrl) return null;

  const sanitizedBaseUrl = baseUrl.replace(/\/+$/, "");

  return sanitizedBaseUrl.endsWith("/api")
    ? sanitizedBaseUrl
    : `${sanitizedBaseUrl}/api`;
};

const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);

// 🔥 Core fetch wrapper with fallback and timeout
const fetchWithFallback = async (path, fallback) => {
  if (!API_BASE_URL) {
    // No backend → use local data
    return fallback;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(`${API_BASE_URL}${path}`, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) throw new Error();

    return await response.json();
  } catch (error) {
    console.warn(`API failed for ${path}, using fallback`, error.message);
    return fallback;
  }
};

export const portfolioApi = {
  getAbout: () => fetchWithFallback("/about", fallbackData.about),
  getProjects: () => fetchWithFallback("/projects", fallbackData.projects),
  getSkills: () => fetchWithFallback("/skills", fallbackData.skills),
  getExperience: () =>
    fetchWithFallback("/experience", fallbackData.experience),
  getEducation: () => fetchWithFallback("/education", fallbackData.education),
  getContact: () => fetchWithFallback("/contact", fallbackData.contact),
};
