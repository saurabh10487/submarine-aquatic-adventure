
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface TutorialStep {
  title: string;
  content: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    title: "Welcome!",
    content: "Control the submarine with your mouse or touch to explore the ocean depths."
  },
  {
    title: "Collect Treasures",
    content: "Find and collect treasure chests to earn points. Each chest is worth 10 points!"
  },
  {
    title: "Watch Out!",
    content: "Avoid rocks, seaweed, and fish. Collisions will cost you one life."
  },
  {
    title: "Clean the Ocean",
    content: "Press SPACE to clean pollution. Clean all pollution items for bonus points!"
  },
  {
    title: "Time Challenge",
    content: "Complete objectives before time runs out. Good luck!"
  }
];

const Tutorial: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 backdrop-blur p-4 rounded-lg border border-white border-opacity-20 max-w-md w-11/12 z-50">
      <div className="text-center space-y-3">
        <h3 className="text-lg font-pixel text-white">
          {tutorialSteps[currentStep].title}
        </h3>
        <p className="text-sm font-pixel text-gray-300">
          {tutorialSteps[currentStep].content}
        </p>
        <div className="flex justify-between items-center pt-2">
          <button
            onClick={prevStep}
            className={`p-2 rounded-full ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:bg-opacity-10'}`}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <span className="text-xs text-gray-400 font-pixel">
            {currentStep + 1} / {tutorialSteps.length}
          </span>
          <button
            onClick={nextStep}
            className="p-2 rounded-full hover:bg-white hover:bg-opacity-10"
          >
            {currentStep === tutorialSteps.length - 1 ? (
              <span className="text-sm text-white font-pixel px-2">Start</span>
            ) : (
              <ChevronRight className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
