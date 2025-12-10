import React, { useState, useEffect } from 'react';
import { WORD_LIST } from '../../constants';
import { EggyButton } from '../../components/EggyButton';
import { Timer, CheckCircle2, XCircle } from 'lucide-react';

interface Props {
  onExit: () => void;
  addCoins: (n: number) => void;
  updateProgress: (n: number) => void;
}

export const RollingQuiz: React.FC<Props> = ({ onExit, addCoins, updateProgress }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameState, setGameState] = useState<'PLAYING' | 'RESULT'>('PLAYING');
  const [feedback, setFeedback] = useState<'CORRECT' | 'WRONG' | null>(null);

  // Shuffle questions (simplified to 5 random for demo)
  const [questions] = useState(() => [...WORD_LIST].sort(() => 0.5 - Math.random()).slice(0, 5));
  
  const currentWord = questions[currentIndex];

  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleAnswer(false);
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState, currentIndex]);

  const handleAnswer = (isCorrect: boolean) => {
    setFeedback(isCorrect ? 'CORRECT' : 'WRONG');
    if (isCorrect) {
      setScore(s => s + 10);
      addCoins(5);
    }
    
    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setTimeLeft(10);
      } else {
        setGameState('RESULT');
        updateProgress(25);
      }
    }, 1000);
  };

  const generateOptions = () => {
    const wrong = WORD_LIST
      .filter(w => w.id !== currentWord.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
      .map(w => w.chinese);
    return [currentWord.chinese, ...wrong].sort(() => 0.5 - Math.random());
  };

  const [options, setOptions] = useState<string[]>([]);
  useEffect(() => {
    if (gameState === 'PLAYING') setOptions(generateOptions());
  }, [currentIndex, gameState]);

  if (gameState === 'RESULT') {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-6">
        <h2 className="text-4xl font-black text-yellow-500 text-outline">GAME OVER!</h2>
        <div className="bg-white border-4 border-black rounded-3xl p-8 text-center shadow-lg w-full">
           <p className="text-gray-500 font-bold mb-2">Total Score</p>
           <p className="text-6xl font-black mb-6">{score}</p>
           <EggyButton onClick={onExit} color="green" className="w-full">Back to Party</EggyButton>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex justify-between items-center mb-6">
        <EggyButton size="sm" color="white" onClick={onExit}>Exit</EggyButton>
        <div className="flex items-center gap-2 font-black text-xl">
          <Timer /> {timeLeft}s
        </div>
        <div className="font-black text-xl">Score: {score}</div>
      </div>

      {/* The "Egg" Rolling Animation Container */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* Track */}
        <div className="absolute top-1/2 left-0 right-0 h-4 bg-gray-300 rounded-full -z-10"></div>
        
        {/* Moving Egg */}
        <div className="animate-bounce mb-8">
           <div className={`w-32 h-32 bg-yellow-400 rounded-full border-4 border-black flex items-center justify-center shadow-xl ${feedback === 'CORRECT' ? 'bg-green-400' : feedback === 'WRONG' ? 'bg-red-400' : ''}`}>
              <span className="font-black text-2xl text-center leading-none px-2">{currentWord.english}</span>
           </div>
        </div>

        {feedback && (
          <div className="absolute top-10 animate-ping text-4xl">
            {feedback === 'CORRECT' ? <CheckCircle2 className="text-green-500" /> : <XCircle className="text-red-500" />}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 w-full px-4">
          {options.map((opt, i) => (
            <EggyButton 
              key={i} 
              onClick={() => handleAnswer(opt === currentWord.chinese)}
              color="white"
            >
              {opt}
            </EggyButton>
          ))}
        </div>
      </div>
    </div>
  );
};