import React, { useState } from 'react';
import './ContainerProperties.css';

const ContainerProperties = ({ component, onUpdate }) => {
  const [borderValue, setBorderValue] = useState(component.properties.border || '1px solid #dee2e6');
  
  const updateProperty = (property, value) => {
    onUpdate({
      ...component,
      properties: {
        ...component.properties,
        [property]: value
      }
    });
  };

  const handleBorderChange = (part, value) => {
    const parts = borderValue.split(' ');
    let newBorder = borderValue;
    
    if (parts.length === 3) {
      if (part === 'width') newBorder = `${value}px ${parts[1]} ${parts[2]}`;
      if (part === 'style') newBorder = `${parts[0]} ${value} ${parts[2]}`;
      if (part === 'color') newBorder = `${parts[0]} ${parts[1]} ${value}`;
    } else {
      newBorder = `1px solid ${part === 'color' ? value : '#dee2e6'}`;
    }
    
    setBorderValue(newBorder);
    updateProperty('border', newBorder);
  };

  // Extract border properties for the advanced controls
  const getBorderProperties = () => {
    const parts = borderValue.split(' ');
    if (parts.length === 3) {
      return {
        width: parseInt(parts[0]),
        style: parts[1],
        color: parts[2]
      };
    }
    return { width: 1, style: 'solid', color: '#dee2e6' };
  };

  const borderProps = getBorderProperties();
  const paddingValue = parseInt(component.properties.padding) || 20;
  const borderRadiusValue = parseInt(component.properties.borderRadius) || 8;
  const minHeightValue = parseInt(component.properties.minHeight) || 100;
  const widthValue = parseInt(component.properties.width) || 300;
  const heightValue = parseInt(component.properties.height) || 200;

  return (
    <div className="container-properties">
      <div className="property-section">
        <h4>Dimensions</h4>
        
        <div className="property-group">
          <label>Width</label>
          <div className="slider-group">
            <input
              type="range"
              min="100"
              max="800"
              value={widthValue}
              onChange={(e) => updateProperty('width', `${e.target.value}px`)}
              className="slider"
            />
            <div className="slider-value">
              <span>{widthValue}px</span>
              <input
                type="number"
                value={widthValue}
                onChange={(e) => updateProperty('width', `${e.target.value}px`)}
                className="dimension-input"
                min="100"
                max="800"
              />
            </div>
          </div>
        </div>

        <div className="property-group">
          <label>Height</label>
          <div className="slider-group">
            <input
              type="range"
              min="50"
              max="600"
              value={heightValue}
              onChange={(e) => updateProperty('height', `${e.target.value}px`)}
              className="slider"
            />
            <div className="slider-value">
              <span>{heightValue}px</span>
              <input
                type="number"
                value={heightValue}
                onChange={(e) => updateProperty('height', `${e.target.value}px`)}
                className="dimension-input"
                min="50"
                max="600"
              />
            </div>
          </div>
        </div>

        <div className="property-group">
          <label>Min Height</label>
          <div className="slider-group">
            <input
              type="range"
              min="50"
              max="300"
              value={minHeightValue}
              onChange={(e) => updateProperty('minHeight', `${e.target.value}px`)}
              className="slider"
            />
            <div className="slider-value">
              <span>{minHeightValue}px</span>
            </div>
          </div>
        </div>
      </div>

      <div className="property-section">
        <h4>Appearance</h4>
        
        <div className="property-group">
          <label>Background Color</label>
          <div className="color-input-group">
            <input
              type="color"
              value={component.properties.backgroundColor || '#f8f9fa'}
              onChange={(e) => updateProperty('backgroundColor', e.target.value)}
              className="color-picker"
            />
            <input
              type="text"
              value={component.properties.backgroundColor || '#f8f9fa'}
              onChange={(e) => updateProperty('backgroundColor', e.target.value)}
              className="color-text"
              placeholder="#f8f9fa"
            />
          </div>
        </div>

        <div className="property-group">
          <label>Padding</label>
          <div className="slider-group">
            <input
              type="range"
              min="0"
              max="50"
              value={paddingValue}
              onChange={(e) => updateProperty('padding', `${e.target.value}px`)}
              className="slider"
            />
            <div className="slider-value">
              <span>{paddingValue}px</span>
            </div>
          </div>
        </div>

        <div className="property-group">
          <label>Border Radius</label>
          <div className="slider-group">
            <input
              type="range"
              min="0"
              max="20"
              value={borderRadiusValue}
              onChange={(e) => updateProperty('borderRadius', `${e.target.value}px`)}
              className="slider"
            />
            <div className="slider-value">
              <span>{borderRadiusValue}px</span>
            </div>
          </div>
        </div>
      </div>

      <div className="property-section">
        <h4>Border</h4>
        
        <div className="property-group">
          <label>Border Width</label>
          <div className="slider-group">
            <input
              type="range"
              min="0"
              max="10"
              value={borderProps.width}
              onChange={(e) => handleBorderChange('width', e.target.value)}
              className="slider"
            />
            <span className="slider-value">{borderProps.width}px</span>
          </div>
        </div>

        <div className="property-group">
          <label>Border Style</label>
          <select
            value={borderProps.style}
            onChange={(e) => handleBorderChange('style', e.target.value)}
            className="select-input"
          >
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
            <option value="double">Double</option>
            <option value="groove">Groove</option>
            <option value="ridge">Ridge</option>
            <option value="inset">Inset</option>
            <option value="outset">Outset</option>
            <option value="none">None</option>
          </select>
        </div>

        <div className="property-group">
          <label>Border Color</label>
          <div className="color-input-group">
            <input
              type="color"
              value={borderProps.color}
              onChange={(e) => handleBorderChange('color', e.target.value)}
              className="color-picker"
            />
            <input
              type="text"
              value={borderProps.color}
              onChange={(e) => handleBorderChange('color', e.target.value)}
              className="color-text"
            />
          </div>
        </div>
      </div>

      <div className="property-section">
        <h4>Layout & Flexbox</h4>
        
        <div className="property-group">
          <label>Display</label>
          <select
            value={component.properties.display || 'flex'}
            onChange={(e) => updateProperty('display', e.target.value)}
            className="select-input"
          >
            <option value="flex">Flex</option>
            <option value="block">Block</option>
            <option value="inline-block">Inline Block</option>
            <option value="grid">Grid</option>
          </select>
        </div>

        {component.properties.display === 'flex' && (
          <>
            <div className="property-group">
              <label>Flex Direction</label>
              <select
                value={component.properties.flexDirection || 'column'}
                onChange={(e) => updateProperty('flexDirection', e.target.value)}
                className="select-input"
              >
                <option value="row">Row</option>
                <option value="column">Column</option>
                <option value="row-reverse">Row Reverse</option>
                <option value="column-reverse">Column Reverse</option>
              </select>
            </div>

            <div className="property-group">
              <label>Align Items</label>
              <select
                value={component.properties.alignItems || 'flex-start'}
                onChange={(e) => updateProperty('alignItems', e.target.value)}
                className="select-input"
              >
                <option value="flex-start">Flex Start</option>
                <option value="flex-end">Flex End</option>
                <option value="center">Center</option>
                <option value="stretch">Stretch</option>
                <option value="baseline">Baseline</option>
              </select>
            </div>

            <div className="property-group">
              <label>Justify Content</label>
              <select
                value={component.properties.justifyContent || 'flex-start'}
                onChange={(e) => updateProperty('justifyContent', e.target.value)}
                className="select-input"
              >
                <option value="flex-start">Flex Start</option>
                <option value="flex-end">Flex End</option>
                <option value="center">Center</option>
                <option value="space-between">Space Between</option>
                <option value="space-around">Space Around</option>
                <option value="space-evenly">Space Evenly</option>
              </select>
            </div>

            <div className="property-group">
              <label>Flex Wrap</label>
              <select
                value={component.properties.flexWrap || 'nowrap'}
                onChange={(e) => updateProperty('flexWrap', e.target.value)}
                className="select-input"
              >
                <option value="nowrap">No Wrap</option>
                <option value="wrap">Wrap</option>
                <option value="wrap-reverse">Wrap Reverse</option>
              </select>
            </div>

            <div className="property-group">
              <label>Gap</label>
              <div className="slider-group">
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={parseInt(component.properties.gap) || 0}
                  onChange={(e) => updateProperty('gap', `${e.target.value}px`)}
                  className="slider"
                />
                <div className="slider-value">
                  <span>{parseInt(component.properties.gap) || 0}px</span>
                </div>
              </div>
            </div>
          </>
        )}

        {component.properties.display === 'grid' && (
          <>
            <div className="property-group">
              <label>Grid Template Columns</label>
              <input
                type="text"
                value={component.properties.gridTemplateColumns || '1fr'}
                onChange={(e) => updateProperty('gridTemplateColumns', e.target.value)}
                placeholder="e.g., 1fr 1fr 1fr"
                className="text-input"
              />
            </div>

            <div className="property-group">
              <label>Grid Template Rows</label>
              <input
                type="text"
                value={component.properties.gridTemplateRows || '1fr'}
                onChange={(e) => updateProperty('gridTemplateRows', e.target.value)}
                placeholder="e.g., 1fr 1fr"
                className="text-input"
              />
            </div>

            <div className="property-group">
              <label>Grid Gap</label>
              <div className="slider-group">
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={parseInt(component.properties.gap) || 0}
                  onChange={(e) => updateProperty('gap', `${e.target.value}px`)}
                  className="slider"
                />
                <div className="slider-value">
                  <span>{parseInt(component.properties.gap) || 0}px</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="property-section">
        <h4>Preview</h4>
        <div className="property-group">
          <div 
            className="container-preview"
            style={{
              width: `${widthValue}px`,
              height: `${heightValue}px`,
              border: borderValue,
              borderRadius: `${borderRadiusValue}px`,
              backgroundColor: component.properties.backgroundColor || '#f8f9fa',
              padding: `${paddingValue}px`,
              minHeight: `${minHeightValue}px`,
              display: component.properties.display || 'flex',
              flexDirection: component.properties.flexDirection || 'column',
              alignItems: component.properties.alignItems || 'flex-start',
              justifyContent: component.properties.justifyContent || 'flex-start',
              flexWrap: component.properties.flexWrap || 'nowrap',
              gap: component.properties.gap ? `${component.properties.gap}px` : '0px',
              gridTemplateColumns: component.properties.gridTemplateColumns || '1fr',
              gridTemplateRows: component.properties.gridTemplateRows || '1fr'
            }}
          >
            <div className="preview-item">Item 1</div>
            <div className="preview-item">Item 2</div>
            <div className="preview-item">Item 3</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerProperties;