import React, { useState } from 'react';
import './Header.css';

const Header = ({ isPreviewMode, onTogglePreview, onSave, onClear, onUndo, onRedo, canUndo, canRedo }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="builder-header">
      <div className="header-container">
        {/* Logo/Brand Section */}
        <div className="header-brand">
          <div className="logo">
            <span className="logo-icon">🛠️</span>
            <h1 className="logo-text">Web Page Builder</h1>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {/* Navigation Controls */}
        <nav className={`header-nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
          {/* Preview Toggle */}
          <div className="nav-section">
            <button 
              className={`preview-btn ${isPreviewMode ? 'active' : ''}`}
              onClick={onTogglePreview}
            >
              <span className="btn-icon">
                {isPreviewMode ? '👁️' : '👁️‍🗨️'}
              </span>
              <span className="btn-text">
                {isPreviewMode ? 'Exit Preview' : 'Preview'}
              </span>
            </button>
          </div>

          {/* History Controls */}
          <div className="nav-section">
            <div className="history-controls">
              <button 
                className="control-btn undo-btn" 
                onClick={onUndo}
                disabled={!canUndo}
                title="Undo"
              >
                <span className="btn-icon">↩️</span>
                <span className="btn-text">Undo</span>
              </button>
              <button 
                className="control-btn redo-btn" 
                onClick={onRedo}
                disabled={!canRedo}
                title="Redo"
              >
                <span className="btn-icon">↪️</span>
                <span className="btn-text">Redo</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="nav-section">
            <button className="action-btn clear-btn" onClick={onClear}>
              <span className="btn-icon">🗑️</span>
              <span className="btn-text">Clear</span>
            </button>
            <button className="action-btn save-btn" onClick={onSave}>
              <span className="btn-icon">💾</span>
              <span className="btn-text">Save</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;