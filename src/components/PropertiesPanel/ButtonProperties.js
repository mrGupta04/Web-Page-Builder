import React, { useState } from 'react';
import './ButtonProperties.css';

const ButtonProperties = ({ component, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('colors');
  
  const updateProperty = (property, value) => {
    onUpdate({
      ...component,
      properties: {
        ...component.properties,
        [property]: value
      }
    });
  };

  const getProperty = (property, defaultValue) => {
    return component.properties[property] || defaultValue;
  };

  const fontSize = parseInt(getProperty('fontSize', '16'));
  const padding = parseInt(getProperty('padding', '10px 20px').split(' ')[0]);
  const borderRadius = parseInt(getProperty('borderRadius', '4'));

  return (
    <div className="button-properties">
      <div className="button-properties__tabs">
        <button 
          className={`button-properties__tab ${activeTab === 'colors' ? 'button-properties__tab--active' : ''}`}
          onClick={() => setActiveTab('colors')}
        >
          🎨 Colors
        </button>
        <button 
          className={`button-properties__tab ${activeTab === 'layout' ? 'button-properties__tab--active' : ''}`}
          onClick={() => setActiveTab('layout')}
        >
          📐 Layout
        </button>
        <button 
          className={`button-properties__tab ${activeTab === 'effects' ? 'button-properties__tab--active' : ''}`}
          onClick={() => setActiveTab('effects')}
        >
          ✨ Effects
        </button>
      </div>

      <div className="button-properties__content">
        {activeTab === 'colors' && (
          <div className="button-properties__tab-panel">
            <div className="button-properties__group">
              <label className="button-properties__label">
                <span>Background Color</span>
                <div className="button-properties__color-group">
                  <input
                    type="color"
                    value={getProperty('backgroundColor', '#007bff')}
                    onChange={(e) => updateProperty('backgroundColor', e.target.value)}
                    className="button-properties__color-picker"
                  />
                  <input
                    type="text"
                    value={getProperty('backgroundColor', '#007bff')}
                    onChange={(e) => updateProperty('backgroundColor', e.target.value)}
                    className="button-properties__color-text"
                  />
                </div>
              </label>
            </div>

            <div className="button-properties__group">
              <label className="button-properties__label">
                <span>Hover Background</span>
                <div className="button-properties__color-group">
                  <input
                    type="color"
                    value={getProperty('hoverBackgroundColor', '#0056b3')}
                    onChange={(e) => updateProperty('hoverBackgroundColor', e.target.value)}
                    className="button-properties__color-picker"
                  />
                  <input
                    type="text"
                    value={getProperty('hoverBackgroundColor', '#0056b3')}
                    onChange={(e) => updateProperty('hoverBackgroundColor', e.target.value)}
                    className="button-properties__color-text"
                  />
                </div>
              </label>
            </div>

            <div className="button-properties__group">
              <label className="button-properties__label">
                <span>Text Color</span>
                <div className="button-properties__color-group">
                  <input
                    type="color"
                    value={getProperty('color', '#ffffff')}
                    onChange={(e) => updateProperty('color', e.target.value)}
                    className="button-properties__color-picker"
                  />
                  <input
                    type="text"
                    value={getProperty('color', '#ffffff')}
                    onChange={(e) => updateProperty('color', e.target.value)}
                    className="button-properties__color-text"
                  />
                </div>
              </label>
            </div>

            <div className="button-properties__group">
              <label className="button-properties__label">
                <span>Hover Text Color</span>
                <div className="button-properties__color-group">
                  <input
                    type="color"
                    value={getProperty('hoverColor', '#ffffff')}
                    onChange={(e) => updateProperty('hoverColor', e.target.value)}
                    className="button-properties__color-picker"
                  />
                  <input
                    type="text"
                    value={getProperty('hoverColor', '#ffffff')}
                    onChange={(e) => updateProperty('hoverColor', e.target.value)}
                    className="button-properties__color-text"
                  />
                </div>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="button-properties__tab-panel">
            <div className="button-properties__group">
              <label className="button-properties__label">
                <span>Font Size: {fontSize}px</span>
                <div className="button-properties__slider-group">
                  <input
                    type="range"
                    min="8"
                    max="32"
                    value={fontSize}
                    onChange={(e) => updateProperty('fontSize', `${e.target.value}px`)}
                    className="button-properties__slider"
                  />
                  <div className="button-properties__slider-values">
                    <span>8px</span>
                    <span>32px</span>
                  </div>
                </div>
              </label>
            </div>

            <div className="button-properties__group">
              <label className="button-properties__label">
                <span>Padding: {padding}px</span>
                <div className="button-properties__slider-group">
                  <input
                    type="range"
                    min="4"
                    max="40"
                    value={padding}
                    onChange={(e) => updateProperty('padding', `${e.target.value}px ${e.target.value * 2}px`)}
                    className="button-properties__slider"
                  />
                  <div className="button-properties__slider-values">
                    <span>4px</span>
                    <span>40px</span>
                  </div>
                </div>
              </label>
            </div>

            <div className="button-properties__group">
              <label className="button-properties__label">
                <span>Border Radius: {borderRadius}px</span>
                <div className="button-properties__slider-group">
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={borderRadius}
                    onChange={(e) => updateProperty('borderRadius', `${e.target.value}px`)}
                    className="button-properties__slider"
                  />
                  <div className="button-properties__slider-values">
                    <span>0px</span>
                    <span>50px</span>
                  </div>
                </div>
              </label>
            </div>

            <div className="button-properties__group">
              <label className="button-properties__label">
                <span>Font Weight</span>
                <select
                  value={getProperty('fontWeight', 'bold')}
                  onChange={(e) => updateProperty('fontWeight', e.target.value)}
                  className="button-properties__select"
                >
                  <option value="normal">Normal</option>
                  <option value="500">Medium</option>
                  <option value="600">Semi Bold</option>
                  <option value="bold">Bold</option>
                  <option value="800">Extra Bold</option>
                </select>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'effects' && (
          <div className="button-properties__tab-panel">
            <div className="button-properties__group">
              <label className="button-properties__label">
                <span>Border</span>
                <input
                  type="text"
                  value={getProperty('border', 'none')}
                  onChange={(e) => updateProperty('border', e.target.value)}
                  className="button-properties__text-input"
                  placeholder="1px solid #ccc"
                />
              </label>
            </div>

            <div className="button-properties__group">
              <label className="button-properties__label">
                <span>Box Shadow</span>
                <input
                  type="text"
                  value={getProperty('boxShadow', '0 2px 4px rgba(0,0,0,0.1)')}
                  onChange={(e) => updateProperty('boxShadow', e.target.value)}
                  className="button-properties__text-input"
                  placeholder="0 2px 8px rgba(0,0,0,0.2)"
                />
              </label>
            </div>

            <div className="button-properties__group">
              <label className="button-properties__label">
                <span>Hover Transition</span>
                <select
                  value={getProperty('transition', 'all 0.2s ease')}
                  onChange={(e) => updateProperty('transition', e.target.value)}
                  className="button-properties__select"
                >
                  <option value="none">No transition</option>
                  <option value="all 0.2s ease">Smooth (0.2s)</option>
                  <option value="all 0.3s ease">Smooth (0.3s)</option>
                  <option value="all 0.1s ease-in-out">Quick (0.1s)</option>
                </select>
              </label>
            </div>

            <div className="button-properties__group">
              <label className="button-properties__label">
                <span>Cursor</span>
                <select
                  value={getProperty('cursor', 'pointer')}
                  onChange={(e) => updateProperty('cursor', e.target.value)}
                  className="button-properties__select"
                >
                  <option value="pointer">Pointer</option>
                  <option value="default">Default</option>
                  <option value="not-allowed">Not Allowed</option>
                  <option value="wait">Wait</option>
                </select>
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="button-properties__preview">
        <h4>Preview</h4>
        <button
          className="button-properties__preview-button"
          style={{
            backgroundColor: getProperty('backgroundColor', '#007bff'),
            color: getProperty('color', '#ffffff'),
            fontSize: getProperty('fontSize', '16px'),
            padding: getProperty('padding', '10px 20px'),
            borderRadius: getProperty('borderRadius', '4px'),
            border: getProperty('border', 'none'),
            fontWeight: getProperty('fontWeight', 'bold'),
            boxShadow: getProperty('boxShadow', '0 2px 4px rgba(0,0,0,0.1)'),
            cursor: getProperty('cursor', 'pointer'),
            transition: getProperty('transition', 'all 0.2s ease'),
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = getProperty('hoverBackgroundColor', '#0056b3');
            e.target.style.color = getProperty('hoverColor', '#ffffff');
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = getProperty('backgroundColor', '#007bff');
            e.target.style.color = getProperty('color', '#ffffff');
          }}
        >
          {component.content || 'Button Preview'}
        </button>
      </div>
    </div>
  );
};

export default ButtonProperties;