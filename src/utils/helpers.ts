import { Repository } from "@/types";
import { API_ENDPOINTS } from "@/constants/config";

/**
 * Fetch repositories from GitHub API
 */
export const fetchRepositories = async (): Promise<Repository[]> => {
  try {
    const response = await fetch(API_ENDPOINTS.GITHUB_REPOS);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Repository[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
};

/**
 * Filter repositories by technology
 */
export const filterRepositoriesByTechnology = (
  repositories: Repository[],
  technology: string
): Repository[] => {
  return repositories.filter((repo) =>
    repo.description?.toLowerCase().includes(technology.toLowerCase())
  );
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

/**
 * Format date to readable string
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

/**
 * Check if device is mobile based on viewport width
 */
export const isMobile = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
};

/**
 * Scroll to element by ID
 */
export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
