
import React from 'react';

interface FishProps {
  id: number;
  x: number;
  y: number;
  color: string;
  direction: 'left' | 'right';
  size: number;
  speed: number;
}

const Fish: React.FC<FishProps> = ({ id, x, y, color, direction, size, speed }) => {
  const colors = {
    red: '#EF5350',
    blue: '#42A5F5',
    green: '#66BB6A',
    purple: '#AB47BC',
    yellow: '#FFEE58'
  };
  
  const fishColor = colors[color as keyof typeof colors] || colors.blue;
  
  return (
    <div 
      className={`fish ${direction === 'left' ? 'animate-swim-left' : 'animate-swim-right'}`}
      style={{ 
        position: 'absolute',
        top: `${y}px`,
        left: direction === 'left' ? `${x}px` : 'auto',
        right: direction === 'right' ? `${x}px` : 'auto',
        animationDuration: `${speed}s`,
        transform: direction === 'left' ? 'scaleX(1)' : 'scaleX(-1)',
        imageRendering: 'pixelated'
      }}
    >
      <svg width={size} height={size * 0.6} viewBox="0 0 8 6" shapeRendering="crispEdges">
        <g>
          {/* Fish body - pixel art style */}
          <rect x="1" y="2" width="6" height="2" fill={fishColor} />
          <rect x="2" y="1" width="4" height="4" fill={fishColor} />
          
          {/* Fish tail */}
          <rect x="0" y="2" width="1" height="2" fill={fishColor} />
          
          {/* Fish eye */}
          <rect x="6" y="2" width="1" height="1" fill="white" />
          <rect x="6" y="2" width="1" height="1" fill="black" fillOpacity="0.5" />
          
          {/* Fish fin */}
          <rect x="3" y="0" width="2" height="1" fill={fishColor} fillOpacity="0.8" />
          <rect x="3" y="5" width="2" height="1" fill={fishColor} fillOpacity="0.8" />
        </g>
      </svg>
    </div>
  );
};

export default Fish;
