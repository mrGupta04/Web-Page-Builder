import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const ToolbarItem = ({ type, label, icon, category, onSave }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: { type },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    onSave({ type, label, icon, category });
  };

  return (
    <div
      ref={drag}
      className={`toolbar-item ${isDragging ? 'dragging' : ''} ${isFavorite ? 'favorite' : ''}`}
      title={`${label} (Drag to canvas or click save)`}
      data-category={category}
    >
      <div className="toolbar-item-header">
        <span className="item-category-badge">{category}</span>
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavorite}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '⭐' : '☆'}
        </button>
      </div>

      <div className="toolbar-item-content">
        <div className="toolbar-item-icon">{icon}</div>
        <div className="toolbar-item-label">{label}</div>
      </div>

      <div className="toolbar-item-actions">
        <button
          className="save-btn"
          onClick={handleSave}
          title="Save as block"
        >
          💾
        </button>
        <span className="item-type">{type}</span>
      </div>

      {isDragging && <div className="drag-overlay">Dragging...</div>}
    </div>
  );
};

export default ToolbarItem;