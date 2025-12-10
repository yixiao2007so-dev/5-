import React, { useState } from 'react';
import { WORD_LIST } from '../../constants';
import { EggyButton } from '../../components/EggyButton';

interface Props {
  onExit: () => void;
  addCoins: (n: number) => void;
  updateProgress: (n: number) => void;
}

export const SlingshotMatch: React.FC<Props> = ({ onExit, addCoins, updateProgress }) => {
  // Select 4 pairs
  const [pairs] = useState(() => WORD_LIST.sort(() => 0.5 - Math.random()).slice(0, 4));
  const [leftSide] = useState(() => [...pairs].sort(() => 0.5 - Math.random()));
  const [rightSide] = useState(() => [...pairs].sort(() => 0.5 - Math.random()));
  
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);

  const handleLeftClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    setSelectedLeft(id);
  };

  const handleRightClick = (word: typeof WORD_LIST[0]) => {
    if (matchedIds.includes(word.id)) return;
    
    if (selectedLeft) {
      if (selectedLeft === word.id) {
        // Match!
        setMatchedIds([...matchedIds, word.id]);
        addCoins(5);
        if (matchedIds.length + 1 === pairs.length) {
          updateProgress(20);
          setTimeout(onExit, 1500);
        }
      }
      setSelectedLeft(null);
    }
  };

  return (
    <div className="h-full flex flex-col">
       <div className="flex justify-between items-center mb-4">
        <EggyButton size="sm" color="white" onClick={onExit}>Exit</EggyButton>
        <h2 className="font-black text-xl">Slingshot Match</h2>
      </div>
      
      <div className="flex-1 flex justify-between items-center relative">
        {/* SVG Lines could go here for "Slingshot" visual, keeping simple for code limit */}
        
        <div className="flex flex-col gap-4 w-1/3">
          {leftSide.map(word => (
            <button
              key={word.id}
              onClick={() => handleLeftClick(word.id)}
              disabled={matchedIds.includes(word.id)}
              className={`
                h-16 rounded-2xl border-4 font-bold transition-all
                ${matchedIds.includes(word.id) ? 'bg-gray-200 border-gray-400 opacity-50' : 
                  selectedLeft === word.id ? 'bg-yellow-400 border-black scale-110 shadow-lg translate-x-4' : 'bg-white border-black'}
              `}
            >
              {word.english}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4 w-1/3">
           {rightSide.map(word => (
            <button
              key={word.id}
              onClick={() => handleRightClick(word)}
              disabled={matchedIds.includes(word.id)}
              className={`
                h-16 rounded-2xl border-4 font-bold transition-all
                ${matchedIds.includes(word.id) ? 'bg-green-200 border-green-500 opacity-50' : 'bg-pink-100 border-pink-400 hover:bg-pink-200'}
              `}
            >
              {word.chinese}
            </button>
          ))}
        </div>
      </div>
      <p className="text-center text-gray-500 font-bold mt-4">Select left, then shoot right!</p>
    </div>
  );
};