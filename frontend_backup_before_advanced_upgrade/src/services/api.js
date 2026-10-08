export const API_URL =
  "https://nextpath-api-wdww.onrender.com";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(
      `API Error ${response.status}: ${response.statusText}`
    );
  }

  return response.json();
}

export function getCareerMarket() {
  return request("/career-market");
}

export function getCareerByName(name) {
  return request(
    `/career-market/${encodeURIComponent(name)}`
  );
}

export function getLearningResources() {
  return request("/learning-resources");
}

export function getLearningResourcesBySkill(skill) {
  return request(
    `/learning-resources/${encodeURIComponent(skill)}`
  );
}

export function getHealth() {
  return request("/health");
}

export default {
  API_URL,
  getCareerMarket,
  getCareerByName,
  getLearningResources,
  getLearningResourcesBySkill,
  getHealth,
};