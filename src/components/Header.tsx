import React from 'react';
import { Code2, GitBranch } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Header: React.FC = () => {
  const { currentOperation, setCurrentOperation } = useAppContext();

  return (
    <header className="bg-slate-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Code2 className="h-8 w-8 text-blue-400" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">Array Visualizer</h1>
            <p className="text-xs text-slate-300">Interactive Learning Tool</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="hidden md:flex space-x-4 mr-4">
            <button 
              className={`px-3 py-1 rounded text-sm ${currentOperation === 'basic' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
              onClick={() => setCurrentOperation('basic')}
            >
              Basic Operations
            </button>
            <button 
              className={`px-3 py-1 rounded text-sm ${currentOperation === 'linearSearch' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
              onClick={() => setCurrentOperation('linearSearch')}
            >
              Linear Search
            </button>
            <button 
              className={`px-3 py-1 rounded text-sm ${currentOperation === 'binarySearch' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
              onClick={() => setCurrentOperation('binarySearch')}
            >
              Binary Search
            </button>
            <button 
              className={`px-3 py-1 rounded text-sm ${currentOperation === 'bubbleSort' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
              onClick={() => setCurrentOperation('bubbleSort')}
            >
              Bubble Sort
            </button>
          </div>
          
          <select 
            className="md:hidden bg-slate-700 text-white text-sm rounded px-2 py-1"
            value={currentOperation}
            onChange={(e) => setCurrentOperation(e.target.value as any)}
          >
            <option value="basic">Basic Operations</option>
            <option value="linearSearch">Linear Search</option>
            <option value="binarySearch">Binary Search</option>
            <option value="bubbleSort">Bubble Sort</option>
          </select>
          
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="ml-4 text-gray-300 hover:text-white">
            <GitBranch className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;