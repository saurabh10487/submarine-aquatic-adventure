
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
        zIndex: 4,
        imageRendering: 'pixelated'
      }}
    >
      {type === 'plastic' && (
        <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges">
          <g>
            {/* Plastic bottle - pixel art style */}
            <rect x="2" y="1" width="4" height="6" fill="#A5D6E7" fillOpacity="0.8" />
            <rect x="3" y="2" width="2" height="1" fill="#0EA5E9" />
            <rect x="3" y="4" width="2" height="1" fill="#0EA5E9" />
          </g>
        </svg>
      )}
      
      {type === 'oil' && (
        <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges">
          <g>
            {/* Oil spill - pixel art style */}
            <rect x="2" y="3" width="4" height="2" fill="#333" fillOpacity="0.7" className="animate-pulse-slow" />
            <rect x="3" y="2" width="2" height="4" fill="#222" fillOpacity="0.8" />
            <rect x="4" y="3" width="1" height="1" fill="#555" fillOpacity="0.6" />
          </g>
        </svg>
      )}
      
      {type === 'trash' && (
        <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges">
          <g>
            {/* Trash bag - pixel art style */}
            <rect x="2" y="2" width="4" height="5" fill="#F9A8D4" fillOpacity="0.9" />
            <rect x="3" y="1" width="2" height="1" fill="#F9A8D4" />
            <rect x="3" y="3" width="1" height="3" fill="#EC4899" fillOpacity="0.5" />
            <rect x="5" y="3" width="1" height="3" fill="#EC4899" fillOpacity="0.5" />
          </g>
        </svg>
      )}
    </div>
  );
};

export default PollutionItem;
