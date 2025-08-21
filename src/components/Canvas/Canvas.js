import React from 'react';
import { useDrop } from 'react-dnd';
import CanvasComponent from './CanvasComponent';
import './Canvas.css';

const Canvas = ({
  components,
  onDrop,
  onUpdateComponent,
  onSelectComponent,
  selectedComponent,
  canvasBackground,
  isPreviewMode,
  setComponents // Add this prop
}) => {
  const handleUpdateContainerChild = (containerId, updatedChild) => {
    const newComponents = components.map(comp => {
      if (comp.id === containerId && comp.children) {
        return {
          ...comp,
          children: comp.children.map(child =>
            child.id === updatedChild.id ? updatedChild : child
          )
        };
      }
      return comp;
    });
    setComponents(newComponents);
  };

  const renderContainerChildren = (container) => {
    if (!container.children || container.children.length === 0) {
      return null;
    }

    return container.children.map(childComponent => (
      <CanvasComponent
        key={childComponent.id}
        component={childComponent}
        isSelected={selectedComponent?.id === childComponent.id}
        onUpdate={(updatedChild) => handleUpdateContainerChild(container.id, updatedChild)}
        onSelect={onSelectComponent}
        isPreviewMode={isPreviewMode}
      />
    ));
  };

  const [, drop] = useDrop({
    accept: 'component',
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      const canvasRect = document.querySelector('.canvas').getBoundingClientRect();
      
      if (offset && canvasRect) {
        const x = offset.x - canvasRect.left;
        const y = offset.y - canvasRect.top;
        
        // Check if dropped inside a container
        const containers = document.querySelectorAll('.canvas-container');
        let droppedInContainer = null;
        
        containers.forEach(container => {
          const rect = container.getBoundingClientRect();
          const containerX = rect.left - canvasRect.left;
          const containerY = rect.top - canvasRect.top;
          
          if (
            x >= containerX &&
            x <= containerX + rect.width &&
            y >= containerY &&
            y <= containerY + rect.height
          ) {
            // Get the container component ID from the parent element
            const containerElement = container.closest('.canvas-component');
            if (containerElement) {
              droppedInContainer = containerElement.dataset.componentId;
            }
          }
        });
        
        if (droppedInContainer) {
          onDrop(item.type, { x: 20, y: 20 }, droppedInContainer);
        } else {
          onDrop(item.type, { x, y });
        }
      } else {
        onDrop(item.type);
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  return (
    <div
      ref={drop}
      className="canvas"
      style={{ backgroundColor: canvasBackground }}
      onClick={(e) => {
        // Only deselect if clicking directly on canvas, not on a component
        if (e.target === e.currentTarget) {
          onSelectComponent(null);
        }
      }}
    >
      {components.map(component => (
        <React.Fragment key={component.id}>
          <CanvasComponent
            component={component}
            isSelected={selectedComponent?.id === component.id}
            onUpdate={onUpdateComponent}
            onSelect={onSelectComponent}
            isPreviewMode={isPreviewMode}
          />
          {component.type === 'container' && renderContainerChildren(component)}
        </React.Fragment>
      ))}
      
      {components.length === 0 && (
        <div className="canvas-empty">
          <div className="canvas-empty-content">
            <h3>Your canvas is empty</h3>
            <p>Drag components from the toolbar to get started</p>
            <div className="canvas-empty-arrow">
              <span>⇦</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Canvas;