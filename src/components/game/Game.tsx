
import React, { useState, useEffect, useRef } from 'react';
import Submarine from './Submarine';
import Fish from './Fish';
import Treasure from './Treasure';
import Hurdle from './Hurdle';
import GameUI from './GameUI';
import PollutionItem from './PollutionItem';

interface FishType {
  id: number;
  x: number;
  y: number;
  color: string;
  direction: 'left' | 'right';
  size: number;
  speed: number;
}

interface TreasureType {
  id: number;
  x: number;
  y: number;
  collected: boolean;
}

interface HurdleType {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'rock' | 'seaweed';
}

interface PollutionType {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'plastic' | 'oil' | 'trash';
  cleaned: boolean;
}

const Game: React.FC = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [submarinePosition, setSubmarinePosition] = useState({ x: 0, y: 0 });
  const [submarineRotation, setSubmarineRotation] = useState(0);
  const [fishes, setFishes] = useState<FishType[]>([]);
  const [treasures, setTreasures] = useState<TreasureType[]>([]);
  const [hurdles, setHurdles] = useState<HurdleType[]>([]);
  const [pollutionItems, setPollutionItems] = useState<PollutionType[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [time, setTime] = useState(60); // 60 seconds game time
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  
  // Colors for fish
  const fishColors = ['red', 'blue', 'green', 'purple', 'yellow'];
  
  // Initialize game
  useEffect(() => {
    if (gameContainerRef.current) {
      const { width, height } = gameContainerRef.current.getBoundingClientRect();
      setContainerSize({ width, height });
      setSubmarinePosition({ x: width / 2 - 45, y: height / 2 - 25 });
    }
    
    startGame();
    
    // Event listeners for resize
    const handleResize = () => {
      if (gameContainerRef.current) {
        const { width, height } = gameContainerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
        setSubmarinePosition(prev => ({
          x: Math.min(prev.x, width - 90),
          y: Math.min(prev.y, height - 50)
        }));
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Generate random pollution items
  const generatePollution = (count: number): PollutionType[] => {
    const types: ('plastic' | 'oil' | 'trash')[] = ['plastic', 'oil', 'trash'];
    const newPollution = [];
    for (let i = 0; i < count; i++) {
      const pollutionSize = Math.random() * 20 + 40;
      newPollution.push({
        id: Date.now() + i,
        x: Math.random() * (containerSize.width - pollutionSize),
        y: Math.random() * (containerSize.height - pollutionSize),
        size: pollutionSize,
        type: types[Math.floor(Math.random() * types.length)],
        cleaned: false
      });
    }
    return newPollution;
  };
  
  // Game timer
  useEffect(() => {
    if (!isPlaying || gameOver) return;
    
    const timer = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isPlaying, gameOver]);
  
  // Move submarine with mouse or touch
  useEffect(() => {
    if (!isPlaying || gameOver) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (gameContainerRef.current) {
        const rect = gameContainerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate angle for submarine rotation
        const dx = x - (submarinePosition.x + 45);
        const dy = y - (submarinePosition.y + 25);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        
        setSubmarineRotation(angle);
        
        // Move submarine with some lag for smooth effect
        setSubmarinePosition(prev => ({
          x: Math.max(0, Math.min(prev.x + dx * 0.1, containerSize.width - 90)),
          y: Math.max(0, Math.min(prev.y + dy * 0.1, containerSize.height - 50))
        }));
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length && gameContainerRef.current) {
        const rect = gameContainerRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        // Calculate angle for submarine rotation
        const dx = x - (submarinePosition.x + 45);
        const dy = y - (submarinePosition.y + 25);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        
        setSubmarineRotation(angle);
        
        // Move submarine with some lag for smooth effect
        setSubmarinePosition(prev => ({
          x: Math.max(0, Math.min(prev.x + dx * 0.05, containerSize.width - 90)),
          y: Math.max(0, Math.min(prev.y + dy * 0.05, containerSize.height - 50))
        }));
      }
    };
    
    // Handle cleaning action with spacebar
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsCleaning(true);
        checkPollutionClean();
        
        // Stop cleaning after animation duration
        setTimeout(() => {
          setIsCleaning(false);
        }, 500);
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [submarinePosition, isPlaying, gameOver, containerSize, isCleaning]);
  
  // Check if submarine can clean pollution
  const checkPollutionClean = () => {
    const subX = submarinePosition.x;
    const subY = submarinePosition.y;
    const subWidth = 90;
    const subHeight = 50;
    const cleaningRadius = 60; // Slightly bigger than submarine for better UX
    
    setPollutionItems(prev => 
      prev.map(pollutionItem => {
        if (pollutionItem.cleaned) return pollutionItem;
        
        const pollutionX = pollutionItem.x + pollutionItem.size / 2;
        const pollutionY = pollutionItem.y + pollutionItem.size / 2;
        const subCenterX = subX + subWidth / 2;
        const subCenterY = subY + subHeight / 2;
        
        // Calculate distance between submarine center and pollution center
        const dx = subCenterX - pollutionX;
        const dy = subCenterY - pollutionY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If submarine is in cleaning range of pollution
        if (distance < cleaningRadius) {
          // Add points based on pollution type
          const pointValue = pollutionItem.type === 'oil' ? 15 : 10;
          setScore(prev => prev + pointValue);
          return { ...pollutionItem, cleaned: true };
        }
        
        return pollutionItem;
      })
    );
  };
  
  // Collision detection
  useEffect(() => {
    if (!isPlaying || gameOver) return;
    
    const checkCollisions = () => {
      const subX = submarinePosition.x;
      const subY = submarinePosition.y;
      const subWidth = 90;
      const subHeight = 50;
      
      // Check treasure collisions
      setTreasures(prev => 
        prev.map(treasure => {
          if (treasure.collected) return treasure;
          
          const treasureX = treasure.x;
          const treasureY = treasure.y;
          
          // Simple collision detection
          if (
            subX < treasureX + 30 &&
            subX + subWidth > treasureX &&
            subY < treasureY + 30 &&
            subY + subHeight > treasureY
          ) {
            setScore(prev => prev + 10);
            return { ...treasure, collected: true };
          }
          return treasure;
        })
      );
      
      // Check hurdle collisions
      hurdles.forEach(hurdle => {
        const hurdleSize = hurdle.size;
        const hurdleX = hurdle.x;
        const hurdleY = hurdle.y;
        const collisionSize = hurdle.type === 'rock' ? hurdleSize * 0.8 : hurdleSize * 0.5;
        
        // Simple collision detection
        if (
          subX < hurdleX + collisionSize &&
          subX + subWidth > hurdleX &&
          subY < hurdleY + collisionSize &&
          subY + subHeight > hurdleY
        ) {
          setLives(prev => {
            if (prev <= 1) {
              setGameOver(true);
              return 0;
            }
            return prev - 1;
          });
          
          // Reposition the submarine slightly away from the hurdle (bounce effect)
          const centerX = submarinePosition.x + subWidth / 2;
          const centerY = submarinePosition.y + subHeight / 2;
          const hurdleCenterX = hurdleX + hurdleSize / 2;
          const hurdleCenterY = hurdleY + hurdleSize / 2;
          
          const dx = centerX - hurdleCenterX;
          const dy = centerY - hurdleCenterY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 0) {
            const bounceDistance = 50;
            const normalizedDx = (dx / distance) * bounceDistance;
            const normalizedDy = (dy / distance) * bounceDistance;
            
            setSubmarinePosition(prev => ({
              x: Math.max(0, Math.min(prev.x + normalizedDx, containerSize.width - 90)),
              y: Math.max(0, Math.min(prev.y + normalizedDy, containerSize.height - 50))
            }));
          }
        }
      });
      
      // Check fish collisions
      fishes.forEach(fish => {
        const fishSize = fish.size;
        let fishX = 0;
        
        if (fish.direction === 'left') {
          fishX = fish.x - (containerSize.width * (Math.min(1, time / 60)));
        } else {
          fishX = containerSize.width - fish.x * (Math.min(1, time / 60));
        }
        
        const fishY = fish.y;
        
        // Simple collision detection
        if (
          subX < fishX + fishSize &&
          subX + subWidth > fishX &&
          subY < fishY + (fishSize * 0.6) &&
          subY + subHeight > fishY
        ) {
          setLives(prev => {
            if (prev <= 1) {
              setGameOver(true);
              return 0;
            }
            return prev - 1;
          });
          
          // Reset fishes on collision
          setFishes(generateFishes(6 + Math.floor(score / 50)));
        }
      });
    };
    
    const collisionInterval = setInterval(checkCollisions, 100);
    return () => clearInterval(collisionInterval);
  }, [submarinePosition, treasures, fishes, hurdles, isPlaying, gameOver, score, time, containerSize]);
  
  // Generate random fishes
  const generateFishes = (count: number): FishType[] => {
    const newFishes = [];
    for (let i = 0; i < count; i++) {
      const direction = Math.random() > 0.5 ? 'left' : 'right';
      const size = Math.random() * 30 + 20;
      newFishes.push({
        id: Date.now() + i,
        x: Math.random() * containerSize.width,
        y: Math.random() * containerSize.height,
        color: fishColors[Math.floor(Math.random() * fishColors.length)],
        direction,
        size,
        speed: Math.random() * 15 + 10
      });
    }
    return newFishes;
  };
  
  // Generate random treasures
  const generateTreasures = (count: number): TreasureType[] => {
    const newTreasures = [];
    for (let i = 0; i < count; i++) {
      newTreasures.push({
        id: Date.now() + i,
        x: Math.random() * (containerSize.width - 60),
        y: Math.random() * (containerSize.height - 60),
        collected: false
      });
    }
    return newTreasures;
  };
  
  // Generate random hurdles
  const generateHurdles = (count: number): HurdleType[] => {
    const newHurdles = [];
    for (let i = 0; i < count; i++) {
      const hurdleSize = Math.random() * 30 + 40;
      newHurdles.push({
        id: Date.now() + i,
        x: Math.random() * (containerSize.width - hurdleSize),
        y: Math.random() * (containerSize.height - hurdleSize),
        size: hurdleSize,
        type: Math.random() > 0.5 ? 'rock' : 'seaweed'
      });
    }
    return newHurdles;
  };
  
  // Start or restart game
  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setLives(3);
    setTime(60);
    setGameOver(false);
    setFishes(generateFishes(6));
    setTreasures(generateTreasures(5));
    setHurdles(generateHurdles(4));
    setPollutionItems(generatePollution(7));
  };
  
  // Handle treasure collection
  const handleTreasureCollect = (id: number) => {
    setTreasures(prev => 
      prev.map(t => 
        t.id === id ? { ...t, collected: true } : t
      )
    );
    setScore(prev => prev + 10);
  };
  
  // Respawn treasures when all are collected
  useEffect(() => {
    if (!isPlaying || gameOver) return;
    
    const allCollected = treasures.length > 0 && treasures.every(t => t.collected);
    if (allCollected) {
      setTreasures(generateTreasures(5));
    }
  }, [treasures, isPlaying, gameOver]);
  
  // Add more fish as score increases
  useEffect(() => {
    if (!isPlaying || gameOver) return;
    
    // Every 50 points, add more fish
    if (score > 0 && score % 50 === 0) {
      setFishes(generateFishes(6 + Math.floor(score / 50)));
    }
  }, [score, isPlaying, gameOver]);
  
  // Check if all pollution is cleaned
  useEffect(() => {
    if (!isPlaying || gameOver) return;
    
    const allCleaned = pollutionItems.length > 0 && pollutionItems.every(p => p.cleaned);
    if (allCleaned) {
      // Add bonus score for cleaning all pollution
      setScore(prev => prev + 50);
      // Generate new pollution items
      setPollutionItems(generatePollution(7));
    }
  }, [pollutionItems, isPlaying, gameOver]);
  
  // Start screen
  if (!isPlaying && !gameOver) {
    return (
      <div 
        ref={gameContainerRef}
        className="game-container flex items-center justify-center"
      >
        <div className="relative z-10 text-center bg-black bg-opacity-40 backdrop-blur p-10 rounded-lg">
          <h1 className="text-4xl font-light text-white mb-6">Submarine Adventure</h1>
          <p className="text-lg text-white mb-8">Navigate through the ocean, collect treasure, avoid hazards, and clean up pollution!</p>
          <button 
            onClick={startGame}
            className="px-8 py-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 border border-white border-opacity-30 text-white text-lg transition-all duration-300"
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      ref={gameContainerRef}
      className="game-container"
    >
      {/* Background layers with parallax effect */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={`bubble-${i}`}
            className="bubble animate-bubble"
            style={{ 
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 5 + 3}s`
            }}
          />
        ))}
      </div>
      
      {/* Game elements */}
      {hurdles.map(hurdle => (
        <Hurdle
          key={hurdle.id}
          id={hurdle.id}
          x={hurdle.x}
          y={hurdle.y}
          size={hurdle.size}
          type={hurdle.type}
        />
      ))}
      
      {pollutionItems.map(pollution => (
        <PollutionItem
          key={pollution.id}
          id={pollution.id}
          x={pollution.x}
          y={pollution.y}
          size={pollution.size}
          type={pollution.type}
          cleaned={pollution.cleaned}
        />
      ))}
      
      {treasures.map(treasure => (
        <Treasure
          key={treasure.id}
          id={treasure.id}
          x={treasure.x}
          y={treasure.y}
          collected={treasure.collected}
          onCollect={handleTreasureCollect}
        />
      ))}
      
      {fishes.map(fish => (
        <Fish
          key={fish.id}
          id={fish.id}
          x={fish.x}
          y={fish.y}
          color={fish.color}
          direction={fish.direction}
          size={fish.size}
          speed={fish.speed}
        />
      ))}
      
      <Submarine
        position={submarinePosition}
        rotation={submarineRotation}
        onPositionChange={setSubmarinePosition}
        isCleaning={isCleaning}
      />
      
      {/* UI Elements */}
      <GameUI
        score={score}
        lives={lives}
        time={time}
        onRestart={startGame}
        gameOver={gameOver}
      />
      
      {/* Cleaning instructions */}
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-20 backdrop-blur px-4 py-2 rounded-full text-white text-sm">
        Press <span className="px-2 py-1 bg-white bg-opacity-20 rounded mx-1">SPACE</span> to clean pollution
      </div>
    </div>
  );
};

export default Game;
