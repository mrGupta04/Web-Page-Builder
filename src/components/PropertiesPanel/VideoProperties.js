import React, { useRef } from 'react';

const VideoProperties = ({ component, onUpdate }) => {
  const fileInputRef = useRef(null);
  
  const updateProperty = (property, value) => {
    onUpdate({
      ...component,
      properties: {
        ...component.properties,
        [property]: value
      }
    });
  };

  const handleContentChange = (value) => {
    onUpdate({ 
      ...component, 
      content: value 
    });
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is a video
      if (!file.type.startsWith('video/')) {
        alert('Please select a video file');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpdate({ 
          ...component, 
          content: event.target.result 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const width = parseInt(component.properties.width) || 320;
  const height = parseInt(component.properties.height) || 180;
  const borderRadius = parseInt(component.properties.borderRadius) || 8;
  const controls = component.properties.controls !== false;
  const autoplay = component.properties.autoplay || false;
  const loop = component.properties.loop || false;

  return (
    <>
      <div className="property-group">
        <label>Width</label>
        <input
          type="range"
          min="100"
          max="600"
          value={width}
          onChange={(e) => updateProperty('width', `${e.target.value}px`)}
        />
        <span className="property-value">{width}px</span>
      </div>
      
      <div className="property-group">
        <label>Height</label>
        <input
          type="range"
          min="100"
          max="400"
          value={height}
          onChange={(e) => updateProperty('height', `${e.target.value}px`)}
        />
        <span className="property-value">{height}px</span>
      </div>
      
      <div className="property-group">
        <label>Border Radius</label>
        <input
          type="range"
          min="0"
          max="20"
          value={borderRadius}
          onChange={(e) => updateProperty('borderRadius', `${e.target.value}px`)}
        />
        <span className="property-value">{borderRadius}px</span>
      </div>
      
      <div className="property-group checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={controls}
            onChange={(e) => updateProperty('controls', e.target.checked)}
          />
          Show Controls
        </label>
      </div>
      
      <div className="property-group checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={autoplay}
            onChange={(e) => updateProperty('autoplay', e.target.checked)}
          />
          Autoplay
        </label>
      </div>
      
      <div className="property-group checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={loop}
            onChange={(e) => updateProperty('loop', e.target.checked)}
          />
          Loop
        </label>
      </div>
      
      <div className="property-group">
        <label>Upload Video</label>
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          style={{ display: 'none' }}
        />
        <button 
          className="upload-video-btn"
          onClick={triggerFileInput}
        >
          Choose Video File
        </button>
      </div>
      
      <div className="property-group">
        <label>Or Enter Video URL</label>
        <input
          type="text"
          value={component.content || ''}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder="Enter video URL (YouTube, Vimeo, etc.)"
        />
      </div>

      {component.content && (
        <div className="property-group">
          <label>Preview</label>
          <div className="video-preview">
            <video
              width={width}
              height={height}
              controls={controls}
              autoPlay={autoplay}
              loop={loop}
              style={{ borderRadius: `${borderRadius}px` }}
            >
              <source src={component.content} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoProperties;