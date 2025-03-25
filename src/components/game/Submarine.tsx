
import React, { useRef, useEffect } from 'react';

interface SubmarineProps {
  position: { x: number; y: number };
  rotation: number;
  onPositionChange: (position: { x: number; y: number }) => void;
}

const Submarine: React.FC<SubmarineProps> = ({ position, rotation, onPositionChange }) => {
  const submarineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create bubbles at intervals
    const bubbleInterval = setInterval(() => {
      if (submarineRef.current && submarineRef.current.parentElement) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble animate-bubble';
        const size = Math.random() * 10 + 5;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${position.x + 30 + Math.random() * 20}px`;
        bubble.style.top = `${position.y + 10 + Math.random() * 10}px`;
        
        if (submarineRef.current?.parentElement) {
          submarineRef.current.parentElement.appendChild(bubble);
        }
        
        // Remove bubble after animation completes
        setTimeout(() => {
          if (bubble.parentElement) {
            bubble.parentElement.removeChild(bubble);
          }
        }, 3000);
      }
    }, 500);

    return () => clearInterval(bubbleInterval);
  }, [position]);

  return (
    <div 
      ref={submarineRef}
      className="submarine"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.3s ease-out, left 0.3s ease-out, top 0.3s ease-out',
      }}
    >
      <svg width="90" height="50" viewBox="0 0 90 50">
        <g>
          {/* Submarine body */}
          <ellipse cx="45" cy="25" rx="40" ry="20" fill="#FFCA28" stroke="#F57F17" strokeWidth="2" />
          
          {/* Submarine viewport */}
          <circle cx="65" cy="25" r="8" fill="#81D4FA" stroke="#0288D1" strokeWidth="1.5" />
          <circle cx="65" cy="25" r="4" fill="#E1F5FE" fillOpacity="0.6" />
          
          {/* Submarine top */}
          <rect x="30" y="5" width="20" height="8" rx="4" fill="#F57F17" />
          
          {/* Submarine periscope */}
          <rect x="35" y="0" width="3" height="5" fill="#F57F17" />
          <circle cx="36.5" cy="0" r="2" fill="#F57F17" />
          
          {/* Submarine propeller */}
          <rect x="5" y="20" width="5" height="10" rx="2.5" fill="#F57F17" />
          <ellipse cx="5" cy="25" rx="2" ry="8" fill="#FFB300" />
        </g>
      </svg>
    </div>
  );
};

export default Submarine;
