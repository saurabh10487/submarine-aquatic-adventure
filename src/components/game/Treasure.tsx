
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
        imageRendering: 'pixelated'
      }}
    >
      <svg width="30" height="30" viewBox="0 0 8 8" shapeRendering="crispEdges">
        <g>
          {/* Treasure chest - pixel art style */}
          <rect x="1" y="3" width="6" height="4" fill="#8D6E63" />
          <rect x="1" y="3" width="6" height="2" fill="#A1887F" />
          
          {/* Chest lid */}
          <rect x="2" y="2" width="4" height="1" fill="#5D4037" />
          
          {/* Gold coins */}
          <rect x="2" y="4" width="1" height="1" fill="#FFD700" />
          <rect x="4" y="4" width="1" height="1" fill="#FFD700" />
          <rect x="3" y="5" width="1" height="1" fill="#FFD700" />
          
          {/* Chest lock */}
          <rect x="3" y="3" width="2" height="1" fill="#CFD8DC" />
        </g>
      </svg>
    </div>
  );
};

export default Treasure;
