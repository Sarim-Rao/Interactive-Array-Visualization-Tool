import React, { useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { gsap } from 'gsap';
import ArrayVisualizer from './visualizers/ArrayVisualizer';

const Visualization: React.FC = () => {
  const { 
    array, 
    currentOperation,
    executionMode,
    currentStep,
    totalSteps,
    isPlaying
  } = useAppContext();
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Initialize GSAP animations
  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        duration: 0.5, 
        opacity: 0, 
        y: 20,
        ease: "power2.out"
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col h-full">
      <div className="bg-slate-100 px-4 py-2 border-b border-slate-300 flex justify-between items-center">
        <h2 className="font-medium text-slate-800">Visualization</h2>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500">
            {executionMode === 'stepByStep' && (
              <span>Step: {currentStep}/{totalSteps} {isPlaying ? '▶️' : '⏸️'}</span>
            )}
          </span>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 h-full flex flex-col">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-slate-700">
              {currentOperation === 'basic' && 'Basic Array Operations'}
              {currentOperation === 'linearSearch' && 'Linear Search Visualization'}
              {currentOperation === 'binarySearch' && 'Binary Search Visualization'}
              {currentOperation === 'bubbleSort' && 'Bubble Sort Visualization'}
            </h3>
          </div>
          
          <div className="flex-1 flex items-center justify-center">
            <ArrayVisualizer />
          </div>
          
          <div className="mt-4 text-sm text-slate-500">
            <div className="flex justify-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                <span>Default</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                <span>Comparing</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
                <span>Active</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                <span>Found/Sorted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualization;