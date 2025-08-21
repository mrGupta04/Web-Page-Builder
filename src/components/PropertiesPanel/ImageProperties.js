import React from 'react';

const ImageProperties = ({ component, onUpdate }) => {
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
        <label>Width</label>
        <input
          type="range"
          min="50"
          max="500"
          value={parseInt(component.properties.width) || 200}
          onChange={(e) => updateProperty('width', `${e.target.value}px`)}
        />
        <span className="property-value">{parseInt(component.properties.width) || 200}px</span>
      </div>
      
      <div className="property-group">
        <label>Height</label>
        <input
          type="range"
          min="50"
          max="500"
          value={parseInt(component.properties.height) || 150}
          onChange={(e) => updateProperty('height', `${e.target.value}px`)}
        />
        <span className="property-value">{parseInt(component.properties.height) || 150}px</span>
      </div>
      
      <div className="property-group">
        <label>Border Radius</label>
        <input
          type="range"
          min="0"
          max="50"
          value={parseInt(component.properties.borderRadius) || 0}
          onChange={(e) => updateProperty('borderRadius', `${e.target.value}px`)}
        />
        <span className="property-value">{parseInt(component.properties.borderRadius) || 0}px</span>
      </div>
      
      <div className="property-group">
        <label>Object Fit</label>
        <select
          value={component.properties.objectFit || 'cover'}
          onChange={(e) => updateProperty('objectFit', e.target.value)}
        >
          <option value="cover">Cover</option>
          <option value="contain">Contain</option>
          <option value="fill">Fill</option>
          <option value="scale-down">Scale Down</option>
          <option value="none">None</option>
        </select>
      </div>
      
      <div className="property-group">
        <label>Opacity</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={parseFloat(component.properties.opacity) || 1}
          onChange={(e) => updateProperty('opacity', e.target.value)}
        />
        <span className="property-value">{parseFloat(component.properties.opacity) || 1}</span>
      </div>
      
      <div className="property-group">
        <label>Filter</label>
        <select
          value={component.properties.filter || 'none'}
          onChange={(e) => updateProperty('filter', e.target.value)}
        >
          <option value="none">None</option>
          <option value="grayscale(100%)">Grayscale</option>
          <option value="sepia(100%)">Sepia</option>
          <option value="blur(2px)">Blur</option>
          <option value="brightness(1.5)">Brightness</option>
          <option value="contrast(1.5)">Contrast</option>
        </select>
      </div>
    </>
  );
};

export default ImageProperties;