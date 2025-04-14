
import React from 'react';

interface HurdleProps {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'rock' | 'seaweed';
}

const Hurdle: React.FC<HurdleProps> = ({ id, x, y, size, type }) => {
  return (
    <div 
      className="hurdle absolute"
      style={{ 
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        zIndex: type === 'rock' ? 5 : 3,
        imageRendering: 'pixelated'
      }}
    >
      {type === 'rock' ? (
        <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges">
          <g>
            {/* Rock - pixel art style */}
            <rect x="2" y="2" width="4" height="4" fill="#8B7E74" />
            <rect x="3" y="1" width="2" height="1" fill="#8B7E74" />
            <rect x="1" y="3" width="1" height="2" fill="#8B7E74" />
            <rect x="6" y="3" width="1" height="2" fill="#8B7E74" />
            <rect x="3" y="6" width="2" height="1" fill="#8B7E74" />
            {/* Rock highlight */}
            <rect x="3" y="3" width="2" height="2" fill="#A1887F" fillOpacity="0.6" />
          </g>
        </svg>
      ) : (
        <svg width={size} height={size * 1.5} viewBox="0 0 8 12" shapeRendering="crispEdges">
          <g>
            {/* Seaweed - pixel art style */}
            <rect x="2" y="2" width="1" height="10" fill="#2E7D32" className="animate-float" />
            <rect x="4" y="1" width="1" height="11" fill="#388E3C" className="animate-float" style={{ animationDelay: "0.2s" }} />
            <rect x="6" y="3" width="1" height="9" fill="#43A047" className="animate-float" style={{ animationDelay: "0.4s" }} />
          </g>
        </svg>
      )}
    </div>
  );
};

export default Hurdle;
