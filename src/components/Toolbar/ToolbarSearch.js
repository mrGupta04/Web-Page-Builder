import React from 'react';

const ToolbarSearch = ({ searchQuery, onSearchChange }) => { // Fixed prop name
  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <div className="toolbar-search">
      <div className="search-input-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search components..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)} // Fixed here
          className="search-input"
        />
        {searchQuery && (
          <button className="clear-search-btn" onClick={handleClear} title="Clear search">
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default ToolbarSearch;