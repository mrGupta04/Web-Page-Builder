import React, { useRef, useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import './CanvasComponent.css';

const CanvasComponent = ({ component, isSelected, onUpdate, onSelect, isPreviewMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(component.content);
  const elementRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  const [, drag] = useDrag({
    type: 'move',
    item: { id: component.id },
  });

  useEffect(() => {
    setEditValue(component.content);
  }, [component.content]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]);

  const style = {
    top: `${component.position.y}px`,
    left: `${component.position.x}px`,
    ...component.properties
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isPreviewMode) {
      onSelect(component);
    }
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    if (!isPreviewMode && (component.type === 'text' || component.type === 'button')) {
      setIsEditing(true);
    }
  };

  const handleTextChange = (e) => setEditValue(e.target.value);

  const handleTextBlur = () => {
    setIsEditing(false);
    if (editValue !== component.content) {
      onUpdate({ ...component, content: editValue });
    }
  };

  const handleTextKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      inputRef.current.blur();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpdate({ ...component, content: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpdate({ ...component, content: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const renderComponent = () => {
    switch (component.type) {
      case 'text':
        return isEditing && !isPreviewMode ? (
          <textarea
            ref={inputRef}
            className="canvas-text-editable"
            value={editValue}
            onChange={handleTextChange}
            onBlur={handleTextBlur}
            onKeyDown={handleTextKeyDown}
            style={{
              fontSize: component.properties.fontSize,
              color: component.properties.color,
              textAlign: component.properties.textAlign,
              fontWeight: component.properties.fontWeight,
              fontStyle: component.properties.fontStyle,
              textDecoration: component.properties.textDecoration,
              fontFamily: component.properties.fontFamily,
              lineHeight: component.properties.lineHeight,
              padding: component.properties.padding,
              backgroundColor: component.properties.backgroundColor,
              borderRadius: component.properties.borderRadius,
              resize: 'none',
              width: '100%',
              minHeight: '60px',
            }}
          />
        ) : (
          <div
            className="canvas-text"
            style={{
              fontSize: component.properties.fontSize,
              color: component.properties.color,
              textAlign: component.properties.textAlign,
              fontWeight: component.properties.fontWeight,
              fontStyle: component.properties.fontStyle,
              textDecoration: component.properties.textDecoration,
              fontFamily: component.properties.fontFamily,
              lineHeight: component.properties.lineHeight,
              padding: component.properties.padding,
              backgroundColor: component.properties.backgroundColor,
              borderRadius: component.properties.borderRadius,
            }}
          >
            {component.content || 'Double click to edit text'}
          </div>
        );

      case 'image':
        return (
          <div className="canvas-image-container">
            <img
              ref={elementRef}
              src={component.content || 'https://cdn1.iconfinder.com/data/icons/essential-ui-lineal-set/512/select-512.png'}
              alt="Uploaded"
              style={{
                width: component.properties.width,
                height: component.properties.height,
                borderRadius: component.properties.borderRadius,
                objectFit: component.properties.objectFit,
                opacity: component.properties.opacity,
                filter: component.properties.filter,
              }}
            />
            {!isPreviewMode && (
              <div className="image-upload-overlay">
                <label className="image-upload-label">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  📁 Upload Image
                </label>
              </div>
            )}
          </div>
        );

      case 'button':
        return (
          <>
            {isEditing && !isPreviewMode ? (
              <input
                ref={inputRef}
                type="text"
                className="canvas-button-editable"
                value={editValue}
                onChange={handleTextChange}
                onBlur={handleTextBlur}
                onKeyDown={handleTextKeyDown}
                style={{
                  backgroundColor: component.properties.backgroundColor,
                  color: component.properties.color,
                  fontSize: component.properties.fontSize,
                  padding: component.properties.padding,
                  borderRadius: component.properties.borderRadius,
                  border: component.properties.border,
                  fontWeight: component.properties.fontWeight,
                  boxShadow: component.properties.boxShadow,
                  textAlign: 'center',
                  width: '100%',
                  height: '100%',
                }}
              />
            ) : (
              <button
                ref={elementRef}
                className="canvas-button"
                style={{
                  backgroundColor: component.properties.backgroundColor,
                  color: component.properties.color,
                  fontSize: component.properties.fontSize,
                  padding: component.properties.padding,
                  borderRadius: component.properties.borderRadius,
                  border: component.properties.border,
                  fontWeight: component.properties.fontWeight,
                  boxShadow: component.properties.boxShadow,
                  cursor: isPreviewMode ? 'pointer' : 'move',
                  width: '100%',
                  height: '100%',
                }}
              >
                {component.content || 'Click Me'}
              </button>
            )}
          </>
        );

      case 'container':
        return (
          <div
            ref={elementRef}
            className="canvas-container"
            style={{
              width: component.properties.width || 'auto',
              height: component.properties.height || 'auto',
              minHeight: component.properties.minHeight || '100px',
              backgroundColor: component.properties.backgroundColor || '#f8f9fa',
              padding: component.properties.padding || '20px',
              borderRadius: component.properties.borderRadius || '8px',
              border: component.properties.border || '1px solid #dee2e6',
              display: component.properties.display || 'flex',
              flexDirection: component.properties.flexDirection || 'column',
              alignItems: component.properties.alignItems || 'flex-start',
              justifyContent: component.properties.justifyContent || 'flex-start',
              flexWrap: component.properties.flexWrap || 'nowrap',
              gap: component.properties.gap || '0px',
              position: 'relative'
            }}
          >
            {!isPreviewMode && (
              <div className="container-placeholder">
                <span>⬜ Container</span>
                <small>Drop components here</small>
              </div>
            )}
          </div>
        );

      case 'divider':
        return (
          <div
            ref={elementRef}
            className="canvas-divider"
            style={{
              height: component.properties.height,
              backgroundColor: component.properties.backgroundColor,
              width: component.properties.width,
              margin: component.properties.margin,
            }}
          />
        );

      case 'video':
        return (
          <div className="canvas-video-container">
            <div
              ref={elementRef}
              className="canvas-video-placeholder"
              style={{
                width: component.properties.width,
                height: component.properties.height,
                borderRadius: component.properties.borderRadius,
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                style={{ display: 'none' }}
              />

              {component.content ? (
                <video
                  controls={component.properties.controls !== false}
                  autoPlay={component.properties.autoplay || false}
                  loop={component.properties.loop || false}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: component.properties.borderRadius,
                  }}
                >
                  <source src={component.content} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="video-placeholder-content">
                  <span className="video-icon">🎬</span>
                  <p>Video Component</p>
                  {!isPreviewMode && (
                    <button
                      className="video-upload-btn"
                      onClick={triggerFileInput}
                    >
                      Upload Video
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={drag}
      className={`canvas-component-container ${component.type} ${isSelected ? 'selected' : ''} ${isPreviewMode ? 'preview-mode' : ''}`}
      style={style}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {renderComponent()}

      {isSelected && !isPreviewMode && (
        <>
          <div className="component-resize-handle"></div>
          <div className="component-type-badge">{component.type}</div>
        </>
      )}
    </div>
  );
};

export default CanvasComponent;