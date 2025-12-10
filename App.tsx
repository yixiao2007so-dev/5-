import React, { useState, useEffect } from 'react';
import { UserState, ViewState, Word, GameType } from './types';
import { ACCESSORIES } from './constants';
import { EggyButton } from './components/EggyButton';
import { EggyAvatar } from './components/EggyAvatar';
import { Home } from './views/Home';
import { WordFactory } from './views/WordFactory';
import { GameHub } from './views/GameHub';
import { Wardrobe } from './views/Wardrobe';
import { RollingQuiz } from './views/games/RollingQuiz';
import { SlingshotMatch } from './views/games/SlingshotMatch';
import { Elimination } from './views/games/Elimination';
import { HomeIcon, BookOpen, Gamepad2, Shirt } from 'lucide-react';

const INITIAL_USER: UserState = {
  coins: 100,
  unlockedAccessories: [],
  equipped: {},
  dailyProgress: 0,
  learnedWords: [],
};

export default function App() {
  const [view, setView] = useState<ViewState>('HOME');
  const [activeGame, setActiveGame] = useState<GameType>('NONE');
  const [user, setUser] = useState<UserState>(() => {
    const saved = localStorage.getItem('eggy_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  useEffect(() => {
    localStorage.setItem('eggy_user', JSON.stringify(user));
  }, [user]);

  const addCoins = (amount: number) => {
    setUser(prev => ({ ...prev, coins: prev.coins + amount }));
  };

  const updateProgress = (amount: number) => {
    setUser(prev => ({ ...prev, dailyProgress: Math.min(100, prev.dailyProgress + amount) }));
  };

  const unlockItem = (itemId: string, cost: number) => {
    if (user.coins >= cost && !user.unlockedAccessories.includes(itemId)) {
      setUser(prev => ({
        ...prev,
        coins: prev.coins - cost,
        unlockedAccessories: [...prev.unlockedAccessories, itemId]
      }));
    }
  };

  const equipItem = (item: typeof ACCESSORIES[0]) => {
    setUser(prev => ({
      ...prev,
      equipped: { ...prev.equipped, [item.type]: item.id }
    }));
  };

  const renderContent = () => {
    if (activeGame !== 'NONE') {
      const onGameExit = () => setActiveGame('NONE');
      switch (activeGame) {
        case 'ROLLING_QUIZ': 
          return <RollingQuiz onExit={onGameExit} addCoins={addCoins} updateProgress={updateProgress} />;
        case 'SLINGSHOT':
          return <SlingshotMatch onExit={onGameExit} addCoins={addCoins} updateProgress={updateProgress} />;
        case 'ELIMINATION':
          return <Elimination onExit={onGameExit} addCoins={addCoins} updateProgress={updateProgress} />;
        default: return null;
      }
    }

    switch (view) {
      case 'HOME': return <Home user={user} />;
      case 'FACTORY': return <WordFactory />;
      case 'GAMES': return <GameHub onSelectGame={setActiveGame} />;
      case 'WARDROBE': return <Wardrobe user={user} onUnlock={unlockItem} onEquip={equipItem} />;
      default: return <Home user={user} />;
    }
  };

  return (
    <div className="min-h-screen pattern-bg text-gray-800 flex flex-col max-w-md mx-auto relative shadow-2xl overflow-hidden border-x-4 border-yellow-500">
      
      {/* Top Bar (Coins) - Sticky */}
      <div className="sticky top-0 z-50 p-4 flex justify-between items-center pointer-events-none">
        <div className="bg-white/90 backdrop-blur border-4 border-black rounded-full px-4 py-1 flex items-center gap-2 shadow-lg pointer-events-auto">
          <span className="text-2xl">🪙</span>
          <span className="font-black text-xl">{user.coins}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 pb-24 overflow-y-auto">
        {renderContent()}
      </main>

      {/* Bottom Navigation (Only visible if not in game) */}
      {activeGame === 'NONE' && (
        <nav className="fixed bottom-6 left-0 right-0 max-w-md mx-auto px-4 z-50">
          <div className="bg-white border-4 border-black rounded-3xl shadow-[0px_4px_0px_0px_#000] p-2 flex justify-around items-center h-20">
            <NavButton active={view === 'HOME'} onClick={() => setView('HOME')} icon={<HomeIcon size={24} />} label="Home" color="yellow" />
            <NavButton active={view === 'FACTORY'} onClick={() => setView('FACTORY')} icon={<BookOpen size={24} />} label="Words" color="blue" />
            <NavButton active={view === 'GAMES'} onClick={() => setView('GAMES')} icon={<Gamepad2 size={24} />} label="Party" color="pink" />
            <NavButton active={view === 'WARDROBE'} onClick={() => setView('WARDROBE')} icon={<Shirt size={24} />} label="Style" color="purple" />
          </div>
        </nav>
      )}
    </div>
  );
}

const NavButton = ({ active, onClick, icon, label, color }: any) => {
  const activeClass = active ? `bg-${color}-400 -translate-y-4 shadow-[4px_4px_0px_0px_#000] scale-110` : 'hover:bg-gray-100 text-gray-400';
  
  return (
    <button 
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300 border-2 
        ${active ? 'border-black opacity-100' : 'border-transparent opacity-80'}
        ${activeClass}
      `}
    >
      <div className={`${active ? 'text-black' : ''}`}>{icon}</div>
      {active && <span className="text-[10px] font-black uppercase mt-1">{label}</span>}
    </button>
  );
};