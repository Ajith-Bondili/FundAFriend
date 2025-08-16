/**
 * Utility functions for handling images in the application
 */

/**
 * Generate a placeholder image URL based on category
 */
export function getPlaceholderImage(category: string, width = 600, height = 300): string {
  const categoryImages: Record<string, string> = {
    business: "photo-1507003211169-0a1dd7228f2d", // Business/startup
    technology: "photo-1518709268805-4e9042af2176", // Technology/coding
    creative: "photo-1513475382585-d06e58bcb0e0", // Art/creative
    education: "photo-1481627834876-b7833e8f5570", // Books/education
    personal: "photo-1494548162494-384bba4ab999", // Personal/lifestyle
    art: "photo-1547036967-23d11aacaee0", // Art supplies
    music: "photo-1493225457124-a3eb161ffa5f", // Music
    food: "photo-1565299624946-b28f40a0ca4b", // Food
    design: "photo-1586717791821-3f44a563fa4c", // Design
    default: "photo-1607827448387-a67db1383b59" // Default abstract
  };

  const imageId = categoryImages[category.toLowerCase()] || categoryImages.default;
  return `https://images.unsplash.com/${imageId}?w=${width}&h=${height}&fit=crop`;
}

/**
 * Generate a random avatar image
 */
export function getRandomAvatar(seed?: string): string {
  const avatars = [
    "photo-1472099645785-5658abf4ff4e", // Man 1
    "photo-1494790108755-2616b612b5e5", // Woman 1
    "photo-1507003211169-0a1dd7228f2d", // Man 2
    "photo-1438761681033-6461ffad8d80", // Woman 2
    "photo-1500648767791-00dcc994a43e", // Man 3
    "photo-1534528741775-53994a69daeb", // Woman 3
  ];

  const index = seed ? seed.charCodeAt(0) % avatars.length : Math.floor(Math.random() * avatars.length);
  return `https://images.unsplash.com/${avatars[index]}?w=150&h=150&fit=crop&crop=face`;
}

/**
 * Check if an image URL is external and needs to be configured in next.config.js
 */
export function isExternalImage(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return !urlObj.hostname.includes('localhost') && urlObj.protocol.startsWith('http');
  } catch {
    return false;
  }
}

/**
 * Get a fallback image for a specific use case
 */
export function getFallbackImage(type: 'avatar' | 'project' | 'update', category?: string): string {
  switch (type) {
    case 'avatar':
      return getRandomAvatar();
    case 'project':
      return getPlaceholderImage(category || 'default');
    case 'update':
      return "https://images.unsplash.com/photo-1607827448387-a67db1383b59?w=400&h=300&fit=crop";
    default:
      return "https://images.unsplash.com/photo-1607827448387-a67db1383b59?w=400&h=300&fit=crop";
  }
}
