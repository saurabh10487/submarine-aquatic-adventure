
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
        top: `${y}px`,
        left: direction === 'left' ? `${x}px` : 'auto',
        right: direction === 'right' ? `${x}px` : 'auto',
        animationDuration: `${speed}s`,
        transform: direction === 'left' ? 'scaleX(1)' : 'scaleX(-1)',
      }}
    >
      <svg width={size} height={size * 0.6} viewBox="0 0 100 60">
        <g>
          {/* Fish body */}
          <path 
            d="M20,30 Q40,10 70,30 Q40,50 20,30 Z" 
            fill={fishColor} 
            stroke={`${fishColor}88`}
            strokeWidth="1"
          />
          
          {/* Fish tail */}
          <path 
            d="M20,30 L5,15 L15,30 L5,45 Z" 
            fill={fishColor} 
            stroke={`${fishColor}88`}
            strokeWidth="1"
          />
          
          {/* Fish eye */}
          <circle cx="60" cy="25" r="4" fill="white" />
          <circle cx="60" cy="25" r="2" fill="black" />
          
          {/* Fish fin */}
          <path 
            d="M50,10 Q55,20 45,25" 
            fill="none" 
            stroke={`${fishColor}88`}
            strokeWidth="2"
          />
          <path 
            d="M50,50 Q55,40 45,35" 
            fill="none" 
            stroke={`${fishColor}88`}
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
};

export default Fish;
