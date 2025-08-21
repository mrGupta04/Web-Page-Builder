import React from 'react';

const ToolbarCategory = ({ category, isActive, onClick }) => {
  return (
    <button
      className={`toolbar-category ${isActive ? 'active' : ''}`}
      onClick={onClick}
      title={category.name}
    >
      <span className="category-icon">{category.icon}</span>
      <span className="category-name">{category.name}</span>
    </button>
  );
};

export default ToolbarCategory;