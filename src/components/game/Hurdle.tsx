
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
      }}
    >
      {type === 'rock' ? (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <path 
            d="M30,80 Q10,65 15,40 Q25,20 45,25 Q65,15 80,35 Q90,55 75,75 Q60,90 30,80 Z" 
            fill="#8B7E74" 
            stroke="#5D4037" 
            strokeWidth="2"
          />
          <path 
            d="M35,60 Q25,50 30,35 Q40,25 50,30 Q65,25 70,45 Q75,60 65,70 Q50,75 35,60 Z" 
            fill="#A1887F" 
            fillOpacity="0.6"
          />
        </svg>
      ) : (
        <svg width={size} height={size * 1.5} viewBox="0 0 100 150">
          <g transform="translate(0,10)">
            {/* Multiple swaying seaweed strands */}
            <path 
              d="M20,150 Q10,120 25,90 Q35,60 25,30 Q15,0 25,-10" 
              fill="none" 
              stroke="#2E7D32" 
              strokeWidth="8" 
              strokeLinecap="round"
              className="animate-float"
            />
            <path 
              d="M40,150 Q30,110 45,80 Q55,50 45,20 Q35,-10 45,-20" 
              fill="none" 
              stroke="#388E3C" 
              strokeWidth="8" 
              strokeLinecap="round"
              className="animate-float"
              style={{ animationDelay: "0.2s" }}
            />
            <path 
              d="M60,150 Q50,120 65,90 Q75,60 65,30 Q55,0 65,-10" 
              fill="none" 
              stroke="#43A047" 
              strokeWidth="8" 
              strokeLinecap="round"
              className="animate-float"
              style={{ animationDelay: "0.4s" }}
            />
            <path 
              d="M80,150 Q70,110 85,80 Q95,50 85,20 Q75,-10 85,-20" 
              fill="none" 
              stroke="#4CAF50" 
              strokeWidth="8" 
              strokeLinecap="round"
              className="animate-float"
              style={{ animationDelay: "0.6s" }}
            />
          </g>
        </svg>
      )}
    </div>
  );
};

export default Hurdle;
