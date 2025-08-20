// API Configuration
export const API_ENDPOINTS = {
  GITHUB_REPOS:
    "https://api.github.com/users/kevyncode/repos?sort=created&per_page=6",
  GITHUB_USER: "https://api.github.com/users/kevyncode",
} as const;

// Site Configuration
export const SITE_CONFIG = {
  TITLE: "Kevyn Rodrigues | Portfolio",
  DESCRIPTION: "Software Engineer Student passionate about development",
  AUTHOR: "Kevyn Rodrigues",
} as const;

// Particles Configuration
export const PARTICLES_CONFIG = {
  COLORS: ["#ffffff", "#f8fafc", "#e2e8f0"] as string[],
  COUNT: 200,
  SPREAD: 10,
  SPEED: 0.1,
  BASE_SIZE: 100,
  MOVE_ON_HOVER: true,
  ALPHA: false,
  DISABLE_ROTATION: false,
};
