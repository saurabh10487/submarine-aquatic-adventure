
import React from 'react';

interface PollutionItemProps {
  id: number;
  x: number;
  y: number;
  type: 'plastic' | 'oil' | 'trash';
  size: number;
  cleaned: boolean;
}

const PollutionItem: React.FC<PollutionItemProps> = ({ id, x, y, type, size, cleaned }) => {
  if (cleaned) return null;

  return (
    <div 
      className="pollution-item absolute"
      style={{ 
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        opacity: cleaned ? 0 : 1,
        transition: 'opacity 0.5s ease-out',
        zIndex: 4
      }}
    >
      {type === 'plastic' && (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <path 
            d="M25,30 L75,30 L65,70 L35,70 Z" 
            fill="#A5D6E7" 
            fillOpacity="0.8"
            stroke="#0EA5E9" 
            strokeWidth="2"
          />
          <line x1="40" y1="40" x2="60" y2="40" stroke="#0EA5E9" strokeWidth="2" />
          <line x1="38" y1="50" x2="62" y2="50" stroke="#0EA5E9" strokeWidth="2" />
          <line x1="36" y1="60" x2="64" y2="60" stroke="#0EA5E9" strokeWidth="2" />
        </svg>
      )}
      
      {type === 'oil' && (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <ellipse 
            cx="50" 
            cy="50" 
            rx="40" 
            ry="25" 
            fill="#333" 
            fillOpacity="0.7"
            className="animate-pulse-slow"
          />
          <ellipse 
            cx="50" 
            cy="50" 
            rx="30" 
            ry="18" 
            fill="#222" 
            fillOpacity="0.8"
          />
          <ellipse 
            cx="40" 
            cy="45" 
            rx="6" 
            ry="4" 
            fill="#555" 
            fillOpacity="0.6"
          />
          <ellipse 
            cx="60" 
            cy="52" 
            rx="5" 
            ry="3" 
            fill="#555" 
            fillOpacity="0.6"
          />
        </svg>
      )}
      
      {type === 'trash' && (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <rect 
            x="30" 
            y="30" 
            width="40" 
            height="45" 
            fill="#F9A8D4" 
            fillOpacity="0.9" 
            stroke="#EC4899" 
            strokeWidth="2"
          />
          <rect 
            x="35" 
            y="25" 
            width="30" 
            height="5" 
            fill="#F9A8D4" 
            stroke="#EC4899" 
            strokeWidth="1"
          />
          <line x1="40" y1="40" x2="40" y2="65" stroke="#EC4899" strokeWidth="1" />
          <line x1="50" y1="40" x2="50" y2="65" stroke="#EC4899" strokeWidth="1" />
          <line x1="60" y1="40" x2="60" y2="65" stroke="#EC4899" strokeWidth="1" />
        </svg>
      )}
    </div>
  );
};

export default PollutionItem;
