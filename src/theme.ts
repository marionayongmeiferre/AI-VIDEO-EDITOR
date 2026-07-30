/** Shared look, kept in one place so every reel is recognisably hers. */
export const theme = {
  ink: "#141110",
  paper: "#f6f1e9",
  accent: "#d2410f",
  font: '"Archivo Black", "Arial Black", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  bodyFont: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
} as const;

/**
 * Instagram overlays its own UI along the bottom and right of a reel, so anything that
 * has to be read stays inside these margins.
 */
export const SAFE = {
  top: 220,
  bottom: 420,
  side: 90,
} as const;
