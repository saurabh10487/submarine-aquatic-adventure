
import React from 'react';
import Game from '../components/game/Game';
import SocialLinksDialog from '../components/SocialLinksDialog';

const Index = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-b from-blue-400 to-blue-900">
      <Game />
      <div className="fixed bottom-4 right-4">
        <SocialLinksDialog />
      </div>
    </div>
  );
};

export default Index;
