import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from './components/Header/Header';
import Toolbar from './components/Toolbar/Toolbar';
import Canvas from './components/Canvas/Canvas';
import PropertiesPanel from './components/PropertiesPanel/PropertiesPanel';
import { createComponent } from './utils/componentFactory';
import { useLocalStorage } from './hooks/useLocalStorage';
import { INITIAL_CANVAS_BACKGROUND } from './constants';
import './App.css';

function App() {
  const [components, setComponents] = useLocalStorage('webpage-components', []);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [canvasBackground, setCanvasBackground] = useLocalStorage('canvas-background', INITIAL_CANVAS_BACKGROUND);
  const [history, setHistory] = useLocalStorage('webpage-history', []);
  const [historyIndex, setHistoryIndex] = useLocalStorage('history-index', -1);

  const addToHistory = useCallback((newComponents) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newComponents);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex, setHistory, setHistoryIndex]); // Added missing dependencies

  const handleDrop = useCallback((type, position = { x: 50, y: 50 }, containerId = null) => {
    const newComponent = createComponent(type, position);
    
    if (containerId) {
      // Add to specific container
      const updatedComponents = components.map(comp => {
        if (comp.id === containerId && comp.type === 'container') {
          return {
            ...comp,
            children: [...(comp.children || []), newComponent]
          };
        }
        return comp;
      });
      setComponents(updatedComponents);
      addToHistory(updatedComponents);
    } else {
      // Add to canvas
      const updatedComponents = [...components, newComponent];
      setComponents(updatedComponents);
      addToHistory(updatedComponents);
    }
    
    setSelectedComponent(newComponent);
  }, [components, setComponents, addToHistory]); // Fixed dependency array

  const handleUpdateComponent = useCallback((updatedComponent) => {
    const updatedComponents = components.map(comp => 
      comp.id === updatedComponent.id ? updatedComponent : comp
    );
    setComponents(updatedComponents);
    setSelectedComponent(updatedComponent);
    addToHistory(updatedComponents);
  }, [components, setComponents, addToHistory]); // Fixed dependency array

  const handleDeleteComponent = useCallback((id) => {
    const updatedComponents = components.filter(comp => comp.id !== id);
    setComponents(updatedComponents);
    setSelectedComponent(null);
    addToHistory(updatedComponents);
  }, [components, setComponents, addToHistory]); // Fixed dependency array

  const handleCanvasBackgroundChange = useCallback((color) => {
    setCanvasBackground(color);
  }, [setCanvasBackground]); // Fixed dependency array

  const togglePreviewMode = useCallback(() => {
    setIsPreviewMode(!isPreviewMode);
    setSelectedComponent(null);
  }, [isPreviewMode]); // Fixed dependency array

  const handleSave = useCallback(() => {
    const pageData = {
      components,
      canvasBackground,
      savedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(pageData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'webpage-design.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Page design saved successfully!');
  }, [components, canvasBackground]); // Fixed dependency array

  const handleClear = useCallback(() => {
    if (window.confirm('Are you sure you want to clear the canvas? This action cannot be undone.')) {
      setComponents([]);
      setSelectedComponent(null);
      addToHistory([]);
    }
  }, [setComponents, addToHistory]); // Fixed dependency array

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setComponents(history[newIndex]);
      setSelectedComponent(null);
    }
  }, [history, historyIndex, setComponents, setHistoryIndex]); // Fixed dependency array

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setComponents(history[newIndex]);
      setSelectedComponent(null);
    }
  }, [history, historyIndex, setComponents, setHistoryIndex]); // Fixed dependency array

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="web-page-builder">
        <Header
          isPreviewMode={isPreviewMode}
          onTogglePreview={togglePreviewMode}
          onSave={handleSave}
          onClear={handleClear}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
        />
        
        <div className="builder-content">
          {!isPreviewMode && <Toolbar />}
          
          <div className="canvas-container">
            <Canvas
              components={components}
              onDrop={handleDrop}
              onUpdateComponent={handleUpdateComponent}
              onSelectComponent={setSelectedComponent}
              selectedComponent={selectedComponent}
              canvasBackground={canvasBackground}
              isPreviewMode={isPreviewMode}
              setComponents={setComponents}
            />
          </div>

          {!isPreviewMode && (
            <PropertiesPanel
              selectedComponent={selectedComponent}
              onUpdateComponent={handleUpdateComponent}
              canvasBackground={canvasBackground}
              onCanvasBackgroundChange={handleCanvasBackgroundChange}
              onDeleteComponent={handleDeleteComponent}
            />
          )}
        </div>
      </div>
    </DndProvider>
  );
}

export default App;