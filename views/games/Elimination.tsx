import React, { useState, useEffect, useRef } from 'react';
import { WORD_LIST } from '../../constants';
import { EggyButton } from '../../components/EggyButton';

interface Props {
  onExit: () => void;
  addCoins: (n: number) => void;
  updateProgress: (n: number) => void;
}

interface FallingWord {
  id: string;
  wordId: string;
  x: number;
  y: number;
  speed: number;
}

export const Elimination: React.FC<Props> = ({ onExit, addCoins, updateProgress }) => {
  const [fallingWords, setFallingWords] = useState<FallingWord[]>([]);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const lastSpawnTime = useRef<number>(0);

  // Game Loop
  const animate = (time: number) => {
    if (gameOver) return;

    // Spawn
    if (time - lastSpawnTime.current > 2000) {
      const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
      const newWord: FallingWord = {
        id: Math.random().toString(),
        wordId: randomWord.id,
        x: Math.random() * 70, // Keep within bounds
        y: 0,
        speed: 0.5 + Math.random() * 0.5
      };
      setFallingWords(prev => [...prev, newWord]);
      lastSpawnTime.current = time;
    }

    // Move & Check Hit
    setFallingWords(prev => {
      const next = prev.map(w => ({ ...w, y: w.y + w.speed }));
      // Check if any hit bottom
      if (next.some(w => w.y > 90)) {
        setGameOver(true);
      }
      return next;
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);

    // Check exact match against any falling word english text
    const matchIndex = fallingWords.findIndex(fw => {
       const originalWord = WORD_LIST.find(w => w.id === fw.wordId);
       return originalWord?.english.toLowerCase() === val.toLowerCase();
    });

    if (matchIndex !== -1) {
      // Eliminated!
      const fw = fallingWords[matchIndex];
      setFallingWords(prev => prev.filter(w => w.id !== fw.id));
      setScore(s => s + 10);
      addCoins(2);
      setInput('');
    }
  };

  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-4xl font-black mb-4">Too Many Words!</h2>
        <p className="text-2xl mb-8">Score: {score}</p>
        <EggyButton onClick={onExit} color="pink">Try Again</EggyButton>
      </div>
    );
  }

  return (
    <div className="h-full relative overflow-hidden bg-sky-100 rounded-xl border-4 border-sky-300" ref={containerRef}>
      <div className="absolute top-2 right-2 font-black bg-white px-3 rounded-full border-2 border-black z-10">
        Score: {score}
      </div>
      
      {/* Input Area */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
         <input 
            type="text" 
            value={input}
            onChange={handleInput}
            placeholder="Type word to eliminate!"
            className="w-full p-4 rounded-full border-4 border-black font-bold text-center text-xl shadow-lg focus:outline-none focus:border-yellow-400 uppercase"
            autoFocus
         />
      </div>

      {fallingWords.map(fw => {
        const text = WORD_LIST.find(w => w.id === fw.wordId)?.english;
        return (
          <div 
            key={fw.id}
            className="absolute bg-white px-3 py-1 rounded-xl border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]"
            style={{ 
              left: `${fw.x}%`, 
              top: `${fw.y}%` 
            }}
          >
            {text}
          </div>
        );
      })}
    </div>
  );
};