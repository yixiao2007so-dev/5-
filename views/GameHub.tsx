import React from 'react';
import { GameType } from '../types';
import { Zap, Target, Bomb } from 'lucide-react';

interface GameHubProps {
  onSelectGame: (game: GameType) => void;
}

export const GameHub: React.FC<GameHubProps> = ({ onSelectGame }) => {
  return (
    <div className="space-y-6 animate-fade-in mt-4">
      <div className="text-center">
        <h1 className="text-4xl font-black text-outline text-white mb-2">Party Arena</h1>
        <p className="text-gray-600 font-bold">Play games to earn coins!</p>
      </div>

      <div className="grid gap-6">
        <GameCard 
          title="Rolling Quiz"
          description="Answer fast while rolling!"
          icon={<Zap size={32} className="text-yellow-500" />}
          color="bg-yellow-100"
          borderColor="border-yellow-400"
          onClick={() => onSelectGame('ROLLING_QUIZ')}
        />
        
        <GameCard 
          title="Slingshot Match"
          description="Shoot words to meanings!"
          icon={<Target size={32} className="text-pink-500" />}
          color="bg-pink-100"
          borderColor="border-pink-400"
          onClick={() => onSelectGame('SLINGSHOT')}
        />

        <GameCard 
          title="Elimination"
          description="Defeat the falling words!"
          icon={<Bomb size={32} className="text-blue-500" />}
          color="bg-cyan-100"
          borderColor="border-cyan-400"
          onClick={() => onSelectGame('ELIMINATION')}
        />
      </div>
    </div>
  );
};

const GameCard = ({ title, description, icon, color, borderColor, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`
      w-full ${color} border-4 border-black rounded-3xl p-6 flex items-center gap-4 text-left
      shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-y-1 hover:translate-x-1 transition-all
    `}
  >
    <div className="bg-white border-2 border-black rounded-2xl p-3 shadow-sm">
      {icon}
    </div>
    <div>
      <h3 className="text-2xl font-black text-gray-800">{title}</h3>
      <p className="text-sm font-bold text-gray-500">{description}</p>
    </div>
  </button>
);