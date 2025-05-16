import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { codeExamples } from '../data/codeExamples';

export type ArrayElement = {
  value: number;
  state: 'default' | 'active' | 'comparing' | 'sorted' | 'found' | 'current';
};

export type ExecutionMode = 'instant' | 'stepByStep';
export type OperationType = 'basic' | 'linearSearch' | 'binarySearch' | 'bubbleSort';

interface AppContextType {
  array: ArrayElement[];
  setArray: React.Dispatch<React.SetStateAction<ArrayElement[]>>;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  executionMode: ExecutionMode;
  setExecutionMode: React.Dispatch<React.SetStateAction<ExecutionMode>>;
  currentOperation: OperationType;
  setCurrentOperation: React.Dispatch<React.SetStateAction<OperationType>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  totalSteps: number;
  setTotalSteps: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  animationSpeed: number;
  setAnimationSpeed: React.Dispatch<React.SetStateAction<number>>;
  executeOperation: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  resetVisualization: () => void;
  createNewArray: (size: number, randomize?: boolean) => void;
  highlightedLine: number;
  setHighlightedLine: React.Dispatch<React.SetStateAction<number>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [code, setCode] = useState(codeExamples.basic);
  const [executionMode, setExecutionMode] = useState<ExecutionMode>('instant');
  const [currentOperation, setCurrentOperation] = useState<OperationType>('basic');
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [highlightedLine, setHighlightedLine] = useState<number>(-1);

  // Initialize with a default array
  useEffect(() => {
    createNewArray(10, true);
  }, []);

  // Update code when operation changes
  useEffect(() => {
    setCode(codeExamples[currentOperation]);
    resetVisualization();
  }, [currentOperation]);

  // Auto-play steps when isPlaying is true
  useEffect(() => {
    let timer: number;
    
    if (isPlaying && currentStep < totalSteps) {
      timer = window.setTimeout(() => {
        stepForward();
      }, 1000 / animationSpeed);
    } else if (currentStep >= totalSteps) {
      setIsPlaying(false);
    }
    
    return () => {
      clearTimeout(timer);
    };
  }, [isPlaying, currentStep, totalSteps, animationSpeed]);

  const createNewArray = (size: number, randomize = false) => {
    const newArray: ArrayElement[] = [];
    
    for (let i = 0; i < size; i++) {
      newArray.push({
        value: randomize ? Math.floor(Math.random() * 100) : 0,
        state: 'default'
      });
    }
    
    setArray(newArray);
    resetVisualization();
  };

  const executeOperation = () => {
    // In instant mode, just show the final result
    if (executionMode === 'instant') {
      switch (currentOperation) {
        case 'linearSearch':
          simulateLinearSearch();
          break;
        case 'binarySearch':
          simulateBinarySearch();
          break;
        case 'bubbleSort':
          simulateBubbleSort();
          break;
        default:
          break;
      }
    } else {
      // In step-by-step mode, prepare the visualization steps
      setCurrentStep(0);
      setIsPlaying(true);
      
      switch (currentOperation) {
        case 'linearSearch':
          setTotalSteps(array.length);
          break;
        case 'binarySearch':
          setTotalSteps(Math.ceil(Math.log2(array.length)) * 2);
          break;
        case 'bubbleSort':
          setTotalSteps(array.length * array.length);
          break;
        default:
          setTotalSteps(0);
          break;
      }
    }
  };

  const stepForward = () => {
    if (currentStep < totalSteps) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      
      // Update array visualization based on current operation and step
      switch (currentOperation) {
        case 'linearSearch':
          stepLinearSearch(nextStep);
          break;
        case 'binarySearch':
          stepBinarySearch(nextStep);
          break;
        case 'bubbleSort':
          stepBubbleSort(nextStep);
          break;
        default:
          break;
      }
    } else {
      setIsPlaying(false);
    }
  };

  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Implement backward step for each algorithm
      // This would require storing the state at each step
    }
  };

  const resetVisualization = () => {
    setCurrentStep(0);
    setTotalSteps(0);
    setIsPlaying(false);
    setHighlightedLine(-1);
    
    // Reset array states to default
    setArray(prev => 
      prev.map(item => ({
        ...item,
        state: 'default'
      }))
    );
  };

  // Algorithm implementations
  const simulateLinearSearch = () => {
    // Find a random value to search for
    const targetIndex = Math.floor(Math.random() * array.length);
    const targetValue = array[targetIndex].value;
    
    const newArray = [...array];
    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i].value === targetValue) {
        newArray[i].state = 'found';
      }
    }
    
    setArray(newArray);
  };

  const stepLinearSearch = (step: number) => {
    // For simplicity, we'll search for the first element
    const targetValue = array[0].value;
    setHighlightedLine(3 + step); // Adjust based on your code example
    
    const newArray = [...array];
    
    // Reset all elements to default state
    newArray.forEach((el, idx) => {
      newArray[idx].state = 'default';
    });
    
    // Mark elements as checked up to the current step
    for (let i = 0; i < step; i++) {
      if (i < newArray.length) {
        if (newArray[i].value === targetValue) {
          newArray[i].state = 'found';
        } else {
          newArray[i].state = 'comparing';
        }
      }
    }
    
    setArray(newArray);
  };

  const simulateBinarySearch = () => {
    // For simplicity, just mark a random element as found
    const sorted = [...array].sort((a, b) => a.value - b.value);
    const targetIndex = Math.floor(Math.random() * sorted.length);
    
    const newArray = sorted.map((item, index) => ({
      ...item,
      state: index === targetIndex ? 'found' : 'default'
    }));
    
    setArray(newArray);
  };

  const stepBinarySearch = (step: number) => {
    // Assuming array is sorted
    setHighlightedLine(3 + step % 8); // Simulate line changes
    
    const newArray = [...array];
    const n = newArray.length;
    
    // Simplified demonstration
    const low = 0;
    const high = n - 1;
    const mid = Math.floor((low + high) / 2);
    
    if (step % 3 === 0) {
      // First phase: highlight low and high
      newArray.forEach((el, idx) => {
        if (idx === low || idx === high) {
          newArray[idx].state = 'comparing';
        } else {
          newArray[idx].state = 'default';
        }
      });
    } else if (step % 3 === 1) {
      // Second phase: highlight mid
      newArray.forEach((el, idx) => {
        if (idx === mid) {
          newArray[idx].state = 'active';
        } else if (idx === low || idx === high) {
          newArray[idx].state = 'comparing';
        } else {
          newArray[idx].state = 'default';
        }
      });
    } else {
      // Third phase: narrow search
      const targetIdx = Math.min(mid + Math.floor(step / 3), n - 1);
      newArray.forEach((el, idx) => {
        if (idx === targetIdx) {
          newArray[idx].state = 'found';
        } else if (idx >= low && idx <= high) {
          newArray[idx].state = 'active';
        } else {
          newArray[idx].state = 'default';
        }
      });
    }
    
    setArray(newArray);
  };

  const simulateBubbleSort = () => {
    // Create a sorted array
    const newArray = [...array].sort((a, b) => a.value - b.value).map(item => ({
      ...item,
      state: 'sorted'
    }));
    
    setArray(newArray);
  };

  const stepBubbleSort = (step: number) => {
    setHighlightedLine(3 + (step % 10)); // Simulate code line changes
    
    const newArray = [...array];
    const n = newArray.length;
    
    // Calculate how many complete passes we've made
    const pass = Math.floor(step / n);
    // Calculate the current position in the current pass
    const position = step % n;
    
    // Reset states
    newArray.forEach((el, idx) => {
      // Elements at the end are already sorted based on completed passes
      if (idx >= n - pass) {
        newArray[idx].state = 'sorted';
      } else {
        newArray[idx].state = 'default';
      }
    });
    
    // Highlight current comparison elements
    if (position < n - 1 - pass) {
      newArray[position].state = 'active';
      newArray[position + 1].state = 'comparing';
      
      // Simulate a swap if needed
      if (newArray[position].value > newArray[position + 1].value) {
        const temp = newArray[position].value;
        newArray[position].value = newArray[position + 1].value;
        newArray[position + 1].value = temp;
      }
    }
    
    setArray(newArray);
  };

  const value = {
    array,
    setArray,
    code,
    setCode,
    executionMode,
    setExecutionMode,
    currentOperation,
    setCurrentOperation,
    currentStep,
    setCurrentStep,
    totalSteps,
    setTotalSteps,
    isPlaying,
    setIsPlaying,
    animationSpeed,
    setAnimationSpeed,
    executeOperation,
    stepForward,
    stepBackward,
    resetVisualization,
    createNewArray,
    highlightedLine,
    setHighlightedLine,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};