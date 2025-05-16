import React, { useRef, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { gsap } from 'gsap';

const ArrayVisualizer: React.FC = () => {
  const { array } = useAppContext();
  const arrayRef = useRef<HTMLDivElement>(null);
  
  // Use GSAP to animate the array elements
  useEffect(() => {
    if (arrayRef.current) {
      const elements = arrayRef.current.querySelectorAll('.array-element');
      
      gsap.to(elements, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.3,
        ease: "back.out(1.7)",
        clearProps: "transform"
      });
    }
  }, [array.length]);
  
  // Map state to colors
  const getStateColor = (state: string) => {
    switch (state) {
      case 'active': return 'bg-purple-500';
      case 'comparing': return 'bg-yellow-500';
      case 'sorted': return 'bg-green-500';
      case 'found': return 'bg-green-500';
      case 'current': return 'bg-blue-700';
      default: return 'bg-blue-500';
    }
  };
  
  // Map state to text colors
  const getTextColor = (state: string) => {
    switch (state) {
      case 'active':
      case 'comparing':
      case 'sorted':
      case 'found':
      case 'current':
        return 'text-white';
      default: return 'text-white';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div 
        ref={arrayRef}
        className="flex flex-wrap justify-center items-end"
      >
        {array.map((item, index) => (
          <div 
            key={index}
            className="relative mx-1 mb-2 opacity-0 array-element"
            style={{ transform: 'translateY(20px)' }}
          >
            <div 
              className={`flex justify-center items-center ${getStateColor(item.state)} ${getTextColor(item.state)} rounded-md shadow-md transition-all duration-300`}
              style={{ 
                width: '50px', 
                height: `${Math.max(40, Math.min(100, item.value + 40))}px`,
              }}
            >
              <span className="font-mono font-medium">{item.value}</span>
            </div>
            <div className="text-center text-xs text-gray-500 mt-1">[{index}]</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArrayVisualizer;