import React from 'react';

const TextProperties = ({ component, onUpdate }) => {
  const updateProperty = (property, value) => {
    onUpdate({
      ...component,
      properties: {
        ...component.properties,
        [property]: value
      }
    });
  };

  return (
    <>
      <div className="property-group">
        <label>Font Size</label>
        <input
          type="range"
          min="8"
          max="72"
          value={parseInt(component.properties.fontSize) || 16}
          onChange={(e) => updateProperty('fontSize', `${e.target.value}px`)}
        />
        <span className="property-value">{parseInt(component.properties.fontSize) || 16}px</span>
      </div>
      
      <div className="property-group">
        <label>Text Color</label>
        <input
          type="color"
          value={component.properties.color || '#000000'}
          onChange={(e) => updateProperty('color', e.target.value)}
        />
      </div>
      
      <div className="property-group">
        <label>Background Color</label>
        <input
          type="color"
          value={component.properties.backgroundColor || 'transparent'}
          onChange={(e) => updateProperty('backgroundColor', e.target.value)}
        />
      </div>
      
      <div className="property-group">
        <label>Alignment</label>
        <select
          value={component.properties.textAlign || 'left'}
          onChange={(e) => updateProperty('textAlign', e.target.value)}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
          <option value="justify">Justify</option>
        </select>
      </div>
      
      <div className="property-group">
        <label>Font Weight</label>
        <select
          value={component.properties.fontWeight || 'normal'}
          onChange={(e) => updateProperty('fontWeight', e.target.value)}
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="lighter">Light</option>
        </select>
      </div>
      
      <div className="property-group">
        <label>Font Style</label>
        <select
          value={component.properties.fontStyle || 'normal'}
          onChange={(e) => updateProperty('fontStyle', e.target.value)}
        >
          <option value="normal">Normal</option>
          <option value="italic">Italic</option>
        </select>
      </div>
      
      <div className="property-group">
        <label>Text Decoration</label>
        <select
          value={component.properties.textDecoration || 'none'}
          onChange={(e) => updateProperty('textDecoration', e.target.value)}
        >
          <option value="none">None</option>
          <option value="underline">Underline</option>
          <option value="line-through">Line Through</option>
        </select>
      </div>
      
      <div className="property-group">
        <label>Font Family</label>
        <select
          value={component.properties.fontFamily || 'Arial, sans-serif'}
          onChange={(e) => updateProperty('fontFamily', e.target.value)}
        >
          <option value="Arial, sans-serif">Arial</option>
          <option value="Georgia, serif">Georgia</option>
          <option value="'Courier New', monospace">Courier New</option>
          <option value="Verdana, sans-serif">Verdana</option>
          <option value="'Times New Roman', serif">Times New Roman</option>
        </select>
      </div>
      
      <div className="property-group">
        <label>Line Height</label>
        <input
          type="range"
          min="1"
          max="3"
          step="0.1"
          value={parseFloat(component.properties.lineHeight) || 1.5}
          onChange={(e) => updateProperty('lineHeight', e.target.value)}
        />
        <span className="property-value">{parseFloat(component.properties.lineHeight) || 1.5}</span>
      </div>
      
      <div className="property-group">
        <label>Padding</label>
        <input
          type="range"
          min="0"
          max="40"
          value={parseInt(component.properties.padding) || 10}
          onChange={(e) => updateProperty('padding', `${e.target.value}px`)}
        />
        <span className="property-value">{parseInt(component.properties.padding) || 10}px</span>
      </div>
      
      <div className="property-group">
        <label>Border Radius</label>
        <input
          type="range"
          min="0"
          max="20"
          value={parseInt(component.properties.borderRadius) || 0}
          onChange={(e) => updateProperty('borderRadius', `${e.target.value}px`)}
        />
        <span className="property-value">{parseInt(component.properties.borderRadius) || 0}px</span>
      </div>
    </>
  );
};

export default TextProperties;