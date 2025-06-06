
import React, { useRef, useEffect } from 'react';

interface SubmarineProps {
  position: { x: number; y: number };
  rotation: number;
  onPositionChange: (position: { x: number; y: number }) => void;
  isCleaning?: boolean;
  isDestroying?: boolean;
}

const Submarine: React.FC<SubmarineProps> = ({ 
  position, 
  rotation, 
  onPositionChange, 
  isCleaning = false,
  isDestroying = false
}) => {
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

  // Create cleaning effect when isCleaning is true
  useEffect(() => {
    if (isCleaning && submarineRef.current && submarineRef.current.parentElement) {
      // Create multiple cleaning bubbles in a circle around the submarine
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const distance = 40; // Distance from submarine center
        
        const cleanBubble = document.createElement('div');
        cleanBubble.className = 'cleaning-bubble';
        
        const size = Math.random() * 8 + 12;
        cleanBubble.style.width = `${size}px`;
        cleanBubble.style.height = `${size}px`;
        
        // Position bubbles in a circle around submarine
        const centerX = position.x + 45;
        const centerY = position.y + 25;
        cleanBubble.style.left = `${centerX + Math.cos(angle) * distance}px`;
        cleanBubble.style.top = `${centerY + Math.sin(angle) * distance}px`;
        
        if (submarineRef.current?.parentElement) {
          submarineRef.current.parentElement.appendChild(cleanBubble);
        }
        
        // Animate bubble outward and then remove
        setTimeout(() => {
          if (cleanBubble.parentElement) {
            cleanBubble.style.transform = `translate(${Math.cos(angle) * 50}px, ${Math.sin(angle) * 50}px) scale(0.5)`;
            cleanBubble.style.opacity = '0';
          }
        }, 50);
        
        // Remove cleaning bubble after animation
        setTimeout(() => {
          if (cleanBubble.parentElement) {
            cleanBubble.parentElement.removeChild(cleanBubble);
          }
        }, 500);
      }
    }
  }, [isCleaning, position]);

  // Create destruction effect when isDestroying is true
  useEffect(() => {
    if (isDestroying && submarineRef.current && submarineRef.current.parentElement) {
      // Create explosion particles
      const particleCount = 30;
      const colors = ['#FFD700', '#FF6347', '#FF4500', '#FF8C00', '#FFA500'];
      
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 5;
        const distance = Math.random() * 100 + 50;
        const size = Math.random() * 12 + 5;
        const duration = Math.random() * 1000 + 800;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const particle = document.createElement('div');
        particle.className = 'explosion-particle';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        
        // Starting position at submarine center
        const centerX = position.x + 45;
        const centerY = position.y + 25;
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        
        if (submarineRef.current?.parentElement) {
          submarineRef.current.parentElement.appendChild(particle);
        }
        
        // Animate particle outward
        setTimeout(() => {
          if (particle.parentElement) {
            particle.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
            particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.5)`;
            particle.style.opacity = '0';
          }
        }, 0);
        
        // Remove particle after animation
        setTimeout(() => {
          if (particle.parentElement) {
            particle.parentElement.removeChild(particle);
          }
        }, duration);
      }
      
      // Add smoke effect
      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          if (submarineRef.current && submarineRef.current.parentElement) {
            const smoke = document.createElement('div');
            smoke.className = 'smoke-particle';
            
            const smokeSizeBase = 30;
            const smokeSize = smokeSizeBase + Math.random() * 20;
            smoke.style.width = `${smokeSize}px`;
            smoke.style.height = `${smokeSize}px`;
            
            const offsetX = (Math.random() - 0.5) * 40;
            const offsetY = (Math.random() - 0.5) * 40;
            
            // Position around submarine
            smoke.style.left = `${position.x + 45 + offsetX}px`;
            smoke.style.top = `${position.y + 25 + offsetY}px`;
            
            if (submarineRef.current?.parentElement) {
              submarineRef.current.parentElement.appendChild(smoke);
            }
            
            // Remove smoke after animation
            setTimeout(() => {
              if (smoke.parentElement) {
                smoke.parentElement.removeChild(smoke);
              }
            }, 2000);
          }
        }, i * 100);
      }
    }
  }, [isDestroying, position]);

  return (
    <div 
      ref={submarineRef}
      className={`submarine ${isCleaning ? 'cleaning' : ''} ${isDestroying ? 'destroying' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `rotate(${rotation}deg)`,
        imageRendering: 'pixelated',
        transition: 'transform 0.3s ease-out, left 0.3s ease-out, top 0.3s ease-out',
        opacity: isDestroying ? '0.7' : '1',
      }}
    >
      <svg width="90" height="50" viewBox="0 0 16 9" shapeRendering="crispEdges">
        <g>
          {/* Submarine body - pixel art style */}
          <rect x="2" y="3" width="12" height="5" fill="#FFCA28" />
          <rect x="1" y="4" width="1" height="3" fill="#FFCA28" />
          <rect x="14" y="4" width="1" height="3" fill="#FFCA28" />
          
          {/* Submarine viewport */}
          <rect x="11" y="4" width="2" height="2" fill="#81D4FA" />
          <rect x="11" y="4" width="1" height="1" fill="#E1F5FE" fillOpacity="0.6" />
          
          {/* Submarine top */}
          <rect x="6" y="2" width="4" height="1" fill="#F57F17" />
          
          {/* Submarine periscope */}
          <rect x="7" y="0" width="1" height="2" fill="#F57F17" />
          
          {/* Submarine propeller */}
          <rect x="0" y="4" width="1" height="3" fill="#FFB300" />
          
          {/* Cleaning tool - only visible when cleaning */}
          {isCleaning && (
            <>
              <rect x="3" y="8" width="5" height="1" fill="#E0E0E0" />
              <rect x="6" y="7" width="1" height="2" fill="#E0E0E0" />
              <rect x="5" y="6" width="2" height="2" fill="#81D4FA" fillOpacity="0.8" />
            </>
          )}
        </g>
      </svg>
    </div>
  );
};

export default Submarine;
