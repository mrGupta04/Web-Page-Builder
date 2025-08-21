import React from 'react';
import TextProperties from './TextProperties';
import ImageProperties from './ImageProperties';
import ButtonProperties from './ButtonProperties';
import ContainerProperties from './ContainerProperties';
import DividerProperties from './DividerProperties';
import VideoProperties from './VideoProperties';
import './PropertiesPanel.css';

const PropertiesPanel = ({
  selectedComponent,
  onUpdateComponent,
  canvasBackground,
  onCanvasBackgroundChange,
  onDeleteComponent
}) => {
  if (!selectedComponent) {
    return (
      <div className="properties-panel">
        <h3>Canvas Properties</h3>
        <div className="property-group">
          <label>Background Color</label>
          <input
            type="color"
            value={canvasBackground}
            onChange={(e) => onCanvasBackgroundChange(e.target.value)}
          />
        </div>
        <div className="no-selection">
          <p>Select a component to edit its properties</p>
        </div>
      </div>
    );
  }

  const renderProperties = () => {
    switch (selectedComponent.type) {
      case 'text':
        return (
          <TextProperties
            component={selectedComponent}
            onUpdate={onUpdateComponent}
          />
        );
      case 'image':
        return (
          <ImageProperties
            component={selectedComponent}
            onUpdate={onUpdateComponent}
          />
        );
      case 'button':
        return (
          <ButtonProperties
            component={selectedComponent}
            onUpdate={onUpdateComponent}
          />
        );
      case 'container':
        return (
          <ContainerProperties
            component={selectedComponent}
            onUpdate={onUpdateComponent}
          />
        );
      case 'divider':
        return (
          <DividerProperties
            component={selectedComponent}
            onUpdate={onUpdateComponent}
          />
        );
      case 'video':
        return (
          <VideoProperties
            component={selectedComponent}
            onUpdate={onUpdateComponent}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="properties-panel">
      <div className="panel-header">
        <h3>
          {selectedComponent.type.charAt(0).toUpperCase() + selectedComponent.type.slice(1)} Properties
        </h3>
        <button
          className="delete-component-btn"
          onClick={() => onDeleteComponent(selectedComponent.id)}
          title="Delete component"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/9790/9790368.png"
            alt="Delete"
            className="delete-icon"
          />
        </button>
      </div>

      <div className="property-group">
        <label>Position</label>
        <div className="position-controls">
          <div>
            <label>X</label>
            <input
              type="number"
              value={selectedComponent.position.x}
              onChange={(e) => onUpdateComponent({
                ...selectedComponent,
                position: {
                  ...selectedComponent.position,
                  x: parseInt(e.target.value) || 0
                }
              })}
            />
          </div>
          <div>
            <label>Y</label>
            <input
              type="number"
              value={selectedComponent.position.y}
              onChange={(e) => onUpdateComponent({
                ...selectedComponent,
                position: {
                  ...selectedComponent.position,
                  y: parseInt(e.target.value) || 0
                }
              })}
            />
          </div>
        </div>
      </div>

      {renderProperties()}
    </div>
  );
};

export default PropertiesPanel; 