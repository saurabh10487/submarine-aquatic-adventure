
import React from 'react';

interface TreasureProps {
  id: number;
  x: number;
  y: number;
  collected: boolean;
  onCollect: (id: number) => void;
}

const Treasure: React.FC<TreasureProps> = ({ id, x, y, collected, onCollect }) => {
  if (collected) return null;
  
  return (
    <div 
      className="treasure animate-float absolute"
      style={{ 
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      <svg width="30" height="30" viewBox="0 0 100 100">
        <g>
          {/* Treasure chest */}
          <rect x="20" y="40" width="60" height="40" rx="5" fill="#8D6E63" stroke="#5D4037" strokeWidth="2" />
          <rect x="20" y="40" width="60" height="20" rx="5" fill="#A1887F" stroke="#5D4037" strokeWidth="2" />
          
          {/* Chest lid */}
          <path 
            d="M20,40 Q50,20 80,40" 
            fill="none" 
            stroke="#5D4037" 
            strokeWidth="2" 
          />
          
          {/* Gold coins */}
          <circle cx="35" cy="50" r="5" fill="#FFD700" stroke="#F57F17" strokeWidth="1" />
          <circle cx="45" cy="48" r="5" fill="#FFD700" stroke="#F57F17" strokeWidth="1" />
          <circle cx="55" cy="52" r="5" fill="#FFD700" stroke="#F57F17" strokeWidth="1" />
          
          {/* Chest lock */}
          <rect x="45" y="35" width="10" height="10" rx="2" fill="#CFD8DC" stroke="#90A4AE" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
};

export default Treasure;
