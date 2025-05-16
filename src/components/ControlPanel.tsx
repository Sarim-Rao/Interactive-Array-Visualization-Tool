import React, { useState } from 'react';
import { 
  Play, Pause, SkipForward, SkipBack, RefreshCw, 
  Plus, Minus, FastForward, RotateCcw, RotateCw
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ControlPanel: React.FC = () => {
  const { 
    executionMode, 
    setExecutionMode,
    isPlaying,
    setIsPlaying,
    currentStep,
    totalSteps,
    stepForward,
    stepBackward,
    animationSpeed,
    setAnimationSpeed,
    executeOperation,
    resetVisualization,
    createNewArray
  } = useAppContext();
  
  const [arraySize, setArraySize] = useState(10);

  const handleCreateArray = () => {
    createNewArray(arraySize, true);
  };
  
  const handleSizeChange = (delta: number) => {
    setArraySize(prev => Math.max(1, Math.min(20, prev + delta)));
  };

  return (
    <div className="bg-slate-800 text-white py-3 px-4 shadow-lg">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-y-2">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button 
              className={`px-3 py-1 rounded text-xs ${executionMode === 'instant' ? 'bg-blue-600' : 'bg-slate-700'}`}
              onClick={() => setExecutionMode('instant')}
            >
              Instant
            </button>
            <button 
              className={`px-3 py-1 rounded text-xs ${executionMode === 'stepByStep' ? 'bg-blue-600' : 'bg-slate-700'}`}
              onClick={() => setExecutionMode('stepByStep')}
            >
              Step-by-Step
            </button>
          </div>
          
          {executionMode === 'stepByStep' && (
            <div className="flex items-center space-x-2">
              <button 
                className="p-1 rounded hover:bg-slate-700"
                onClick={stepBackward}
                disabled={currentStep <= 0}
              >
                <SkipBack className="h-4 w-4" />
              </button>
              
              <button 
                className="p-1 rounded hover:bg-slate-700"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </button>
              
              <button 
                className="p-1 rounded hover:bg-slate-700"
                onClick={stepForward}
                disabled={currentStep >= totalSteps}
              >
                <SkipForward className="h-4 w-4" />
              </button>
              
              <div className="text-xs">
                Speed: 
                <button 
                  className="ml-1 p-1 rounded hover:bg-slate-700"
                  onClick={() => setAnimationSpeed(prev => Math.max(0.5, prev - 0.5))}
                >
                  <RotateCcw className="h-3 w-3" />
                </button>
                <span className="mx-1">{animationSpeed}x</span>
                <button 
                  className="p-1 rounded hover:bg-slate-700"
                  onClick={() => setAnimationSpeed(prev => Math.min(3, prev + 0.5))}
                >
                  <RotateCw className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs">Size:</span>
            <button 
              className="p-1 rounded hover:bg-slate-700"
              onClick={() => handleSizeChange(-1)}
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="text-xs w-4 text-center">{arraySize}</span>
            <button 
              className="p-1 rounded hover:bg-slate-700"
              onClick={() => handleSizeChange(1)}
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          
          <button 
            className="px-3 py-1 bg-slate-700 rounded text-xs hover:bg-slate-600"
            onClick={handleCreateArray}
          >
            New Array
          </button>
          
          <button 
            className="px-3 py-1 bg-blue-600 rounded text-xs hover:bg-blue-700"
            onClick={executeOperation}
          >
            {executionMode === 'instant' ? 'Execute' : 'Start Animation'}
          </button>
          
          <button 
            className="p-1 rounded hover:bg-slate-700"
            onClick={resetVisualization}
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;