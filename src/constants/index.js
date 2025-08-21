// constants.js
export const COMPONENT_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  BUTTON: 'button',
  CONTAINER: 'container',
  DIVIDER: 'divider',
  VIDEO: 'video',
  
};

export const COMPONENT_CATEGORIES = [
  { id: 'all', name: 'All', icon: '📦' },
  { id: 'basic', name: 'Basic', icon: '🔰' },
  { id: 'media', name: 'Media', icon: '🖼️' },
  { id: 'layout', name: 'Layout', icon: '📐' },
  { id: 'navigation', name: 'Navigation', icon: '🧭' },
];

export const DEFAULT_COMPONENTS = [
  { type: COMPONENT_TYPES.TEXT, label: 'Text', icon: 'T', category: 'basic' },
  { type: COMPONENT_TYPES.IMAGE, label: 'Image', icon: '🖼️', category: 'media' },
  { type: COMPONENT_TYPES.BUTTON, label: 'Button', icon: '🔘', category: 'basic' },
  { type: COMPONENT_TYPES.CONTAINER, label: 'Container', icon: '📦', category: 'layout' },
  { type: COMPONENT_TYPES.DIVIDER, label: 'Divider', icon: '➖', category: 'layout' },
  { type: COMPONENT_TYPES.VIDEO, label: 'Video', icon: '🎬', category: 'media' },
  
];

// Add this missing export
export const INITIAL_CANVAS_BACKGROUND = '#ffffff';