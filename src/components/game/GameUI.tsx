
import React from 'react';

interface GameUIProps {
  score: number;
  lives: number;
  time: number;
  onRestart?: () => void;
  gameOver?: boolean;
}

const GameUI: React.FC<GameUIProps> = ({ score, lives, time, onRestart, gameOver = false }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  if (gameOver) {
    return (
      <div className="game-over">
        <div className="bg-black bg-opacity-60 backdrop-blur p-10 rounded-lg border border-white border-opacity-20 flex flex-col items-center">
          <h2 className="text-4xl font-light text-white mb-6">Game Over</h2>
          <p className="text-2xl text-white mb-8">Final Score: {score}</p>
          <button 
            onClick={onRestart}
            className="px-8 py-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 border border-white border-opacity-30 text-white text-lg transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="game-ui">
      <div className="flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFD700" stroke="#F57F17" strokeWidth="1" />
        </svg>
        <span className="text-white font-light text-lg">{score}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z" fill="#EF5350" stroke="#C62828" strokeWidth="1" />
        </svg>
        <span className="text-white font-light text-lg">{lives}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
          <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="text-white font-light text-lg">{formatTime(time)}</span>
      </div>
    </div>
  );
};

export default GameUI;
