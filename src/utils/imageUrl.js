import koi from "../assets/collections/koi.jpg";
import colorarc from "../assets/collections/colorarc.jpg";
import ruby from "../assets/collections/ruby.jpg";
import sorbit from "../assets/collections/sorbit.jpg";
import maa from "../assets/collections/maa.jpg";

// Default luxury fallback image
export const DEFAULT_FALLBACK_IMAGE = koi;

/**
 * Normalizes and safely formats image URLs for frontend display.
 * Handles relative uploaded paths, full HTTP URLs, missing images, and temporary link failures.
 * 
 * @param {string} url - The image URL stored in DB or constants
 * @param {string} fallback - Optional custom fallback image
 * @returns {string} Fully qualified or safe displayable image URL
 */
export function getImageUrl(url, fallback = DEFAULT_FALLBACK_IMAGE) {
  if (!url || typeof url !== "string") {
    return fallback;
  }

  const trimmed = url.trim();
  if (!trimmed) {
    return fallback;
  }

  // If it's an expired googleusercontent link (or temporary broken link)
  if (trimmed.includes("googleusercontent.com/aida-public/")) {
    return fallback;
  }

  // If it's already an absolute URL (http / https / data URI / blob)
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:") || trimmed.startsWith("blob:")) {
    return trimmed;
  }

  // If it's a relative asset path imported or starting with slash / assets
  if (trimmed.startsWith("/") || trimmed.startsWith("src/")) {
    return trimmed;
  }

  // Relative uploaded path like 'uploads/174000.jpg'
  return `/${trimmed}`;
}
