import React, { useState, useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ToolbarItem from './ToolbarItem';
import ToolbarSearch from './ToolbarSearch';
import ToolbarCategory from './ToolbarCategory';
import { DEFAULT_COMPONENTS, COMPONENT_CATEGORIES } from '../../constants';
import './Toolbar.css';

const Toolbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [savedBlocks, setSavedBlocks] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // Filter components based on search and category
  const filteredComponents = DEFAULT_COMPONENTS.filter(comp => {
    const matchesSearch = comp.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comp.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || comp.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSaveBlock = useCallback((block) => {
    // Check if block already exists to avoid duplicates
    if (!savedBlocks.some(saved => saved.type === block.type && saved.label === block.label)) {
      setSavedBlocks(prev => [...prev, { ...block, id: Date.now() }]);
    }
  }, [savedBlocks]);

  const handleRemoveSavedBlock = useCallback((id) => {
    setSavedBlocks(prev => prev.filter(block => block.id !== id));
  }, []);

  // Drop target for saving components
  const [{ isOver }, drop] = useDrop({
    accept: 'component',
    drop: (item) => {
      // Find the component that was dropped
      const droppedComponent = DEFAULT_COMPONENTS.find(comp => comp.type === item.type);
      if (droppedComponent) {
        handleSaveBlock(droppedComponent);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleExportBlocks = () => {
    if (savedBlocks.length === 0) return;
    
    const dataStr = JSON.stringify(savedBlocks, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'saved-blocks.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImportBlocks = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedBlocks = JSON.parse(e.target.result);
          setSavedBlocks(importedBlocks);
        } catch (error) {
          console.error('Error parsing imported file:', error);
          alert('Invalid file format. Please import a valid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="toolbar">
      {/* Toolbar Header */}
      <div className="toolbar-header">
        <h2 className="toolbar-title">
          <span className="toolbar-icon">🧩</span>
          Components
        </h2>
        <button 
          className={`favorites-toggle ${showFavorites ? 'active' : ''}`}
          onClick={() => setShowFavorites(!showFavorites)}
          title={showFavorites ? 'Show all components' : 'Show favorites'}
        >
          ⭐
        </button>
      </div>

      {/* Search Bar */}
      <ToolbarSearch 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Categories */}
      <div className="toolbar-categories">
        {COMPONENT_CATEGORIES.map(category => (
          <ToolbarCategory
            key={category.id}
            category={category}
            isActive={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
          />
        ))}
      </div>

      {/* Components Grid */}
      <div className="toolbar-components-section">
        <h4 className="toolbar-section-title">
          {showFavorites ? 'Favorite Components' : 'All Components'}
          <span className="components-count">({filteredComponents.length})</span>
        </h4>
        
        <div className="toolbar-components-grid">
          {filteredComponents.map(comp => (
            <ToolbarItem
              key={comp.type}
              type={comp.type}
              label={comp.label}
              icon={comp.icon}
              category={comp.category}
              onSave={handleSaveBlock}
            />
          ))}
        </div>

        {filteredComponents.length === 0 && (
          <div className="toolbar-empty">
            <p>No components found</p>
            <small>Try a different search or category</small>
          </div>
        )}
      </div>

      {/* Saved Blocks Section with Drop Target */}
      <div 
        ref={drop}
        className={`toolbar-section ${isOver ? 'drop-active' : ''}`}
      >
        <div className="toolbar-section-header">
          <h3>Saved Blocks</h3>
          <button 
            className="clear-saved-btn"
            onClick={() => setSavedBlocks([])}
            disabled={savedBlocks.length === 0}
            title="Clear all saved blocks"
          >
            🗑️
          </button>
        </div>
        
        <div className="toolbar-saved">
          {savedBlocks.length > 0 ? (
            <div className="saved-blocks-grid">
              {savedBlocks.map((block) => (
                <SavedBlockItem
                  key={block.id}
                  block={block}
                  onRemove={handleRemoveSavedBlock}
                />
              ))}
            </div>
          ) : (
            <div className="toolbar-empty">
              <p>No saved blocks yet</p>
              <small>Drag components here to save them</small>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="toolbar-actions">
        <label className="toolbar-action-btn" title="Import components">
          📥 Import
          <input
            type="file"
            accept=".json"
            onChange={handleImportBlocks}
            style={{ display: 'none' }}
          />
        </label>
        <button 
          className="toolbar-action-btn" 
          onClick={handleExportBlocks}
          disabled={savedBlocks.length === 0}
          title="Export components"
        >
          📤 Export
        </button>
      </div>
    </div>
  );
};

// Separate component for saved block items
const SavedBlockItem = ({ block, onRemove }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: { type: block.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`saved-block-item ${isDragging ? 'dragging' : ''}`}
      title={`Drag to use ${block.label}`}
    >
      <div className="saved-block-content">
        <span className="saved-block-icon">{block.icon}</span>
        <span className="saved-block-label">{block.label}</span>
      </div>
      <button
        className="remove-saved-btn"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(block.id);
        }}
        title="Remove saved block"
      >
        ×
      </button>
    </div>
  );
};

export default Toolbar;