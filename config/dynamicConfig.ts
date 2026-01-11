import { RENDERING_STRATEGY } from "./renderingStrategy";

/**
 * Get the appropriate dynamic configuration for Next.js pages
 * This must be used at build time, not runtime
 */
export const getDynamicConfig = (): "auto" | "force-dynamic" | "force-static" => {
  // Since RENDERING_STRATEGY is "ISR", we use "auto" for optimal performance
  // For SSR, you would use "force-dynamic"
  // For static generation, you would use "force-static"

  if (RENDERING_STRATEGY === "SSR") {
    return "force-dynamic";
  } else if (RENDERING_STRATEGY === "ISR") {
    return "auto"; // Allows both static and dynamic rendering as needed
  } else {
    return "force-static";
  }
};

// Export the static value for use in page files
export const DYNAMIC_CONFIG = getDynamicConfig();