import { COMPONENT_TYPES } from '../constants';

export const createComponent = (type, position = { x: 50, y: 50 }) => {
  const id = Date.now().toString();
  
  const baseComponent = {
    id,
    type,
    position,
    properties: {},
    content: '',
  };
  
  switch (type) {
    case COMPONENT_TYPES.TEXT:
      return {
        ...baseComponent,
        content: 'Edit this text',
        properties: {
          fontSize: '16px',
          color: '#000000',
          textAlign: 'left',
          fontWeight: 'normal',
          fontStyle: 'normal',
          textDecoration: 'none',
          fontFamily: 'Arial, sans-serif',
          lineHeight: '1.5',
          padding: '10px',
          backgroundColor: 'transparent',
          borderRadius: '0px',
        },
      };
    
    case COMPONENT_TYPES.IMAGE:
      return {
        ...baseComponent,
        content: '',
        properties: {
          width: '200px',
          height: 'auto',
          borderRadius: '0px',
          objectFit: 'cover',
          opacity: '1',
          filter: 'none',
        },
      };
    
    case COMPONENT_TYPES.BUTTON:
      return {
        ...baseComponent,
        content: 'Click Me',
        properties: {
          backgroundColor: '#007bff',
          color: '#ffffff',
          fontSize: '16px',
          padding: '10px 20px',
          borderRadius: '4px',
          border: 'none',
          fontWeight: 'bold',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          hoverBackgroundColor: '#0056b3',
          hoverColor: '#ffffff',
        },
      };
    
    case COMPONENT_TYPES.CONTAINER:
      return {
        ...baseComponent,
        content: '',
        properties: {
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          minHeight: '100px',
        },
      };
    
    case COMPONENT_TYPES.DIVIDER:
      return {
        ...baseComponent,
        content: '',
        properties: {
          height: '2px',
          backgroundColor: '#dee2e6',
          width: '100%',
          margin: '20px 0',
        },
      };
    
    case COMPONENT_TYPES.VIDEO:
      return {
        ...baseComponent,
        content: '',
        properties: {
          width: '320px',
          height: '180px',
          borderRadius: '8px',
          controls: true,
          autoplay: false,
          loop: false,
        },
      };
    
    default:
      return baseComponent;
  }
};

export const getDefaultContent = (type) => {
  switch (type) {
    case COMPONENT_TYPES.TEXT:
      return 'Edit this text';
    case COMPONENT_TYPES.BUTTON:
      return 'Click Me';
    default:
      return '';
  }
};