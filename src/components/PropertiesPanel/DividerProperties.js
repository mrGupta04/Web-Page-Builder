import React from 'react';

const DividerProperties = ({ component, onUpdate }) => {
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
        <label>Height</label>
        <input
          type="range"
          min="1"
          max="10"
          value={parseInt(component.properties.height) || 2}
          onChange={(e) => updateProperty('height', `${e.target.value}px`)}
        />
        <span className="property-value">{parseInt(component.properties.height) || 2}px</span>
      </div>
      
      <div className="property-group">
        <label>Background Color</label>
        <input
          type="color"
          value={component.properties.backgroundColor || '#dee2e6'}
          onChange={(e) => updateProperty('backgroundColor', e.target.value)}
        />
      </div>
      
      <div className="property-group">
        <label>Width</label>
        <select
          value={component.properties.width || '100%'}
          onChange={(e) => updateProperty('width', e.target.value)}
        >
          <option value="100%">Full Width</option>
          <option value="80%">80% Width</option>
          <option value="60%">60% Width</option>
          <option value="40%">40% Width</option>
          <option value="20%">20% Width</option>
        </select>
      </div>
      
      <div className="property-group">
        <label>Margin</label>
        <input
          type="range"
          min="0"
          max="50"
          value={parseInt(component.properties.margin.split(' ')[0]) || 20}
          onChange={(e) => updateProperty('margin', `${e.target.value}px 0`)}
        />
        <span className="property-value">{parseInt(component.properties.margin.split(' ')[0]) || 20}px</span>
      </div>
    </>
  );
};

export default DividerProperties;