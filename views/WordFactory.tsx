import React, { useState } from 'react';
import { WORD_LIST } from '../constants';
import { EggyButton } from '../components/EggyButton';
import { generateWordContext } from '../services/geminiService';
import { Volume2, RefreshCw, Wand2 } from 'lucide-react';
import { Word } from '../types';

export const WordFactory: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const [aiSentence, setAiSentence] = useState<{id: string, text: string} | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const filteredWords = currentCategory === 'all' 
    ? WORD_LIST 
    : WORD_LIST.filter(w => w.category === currentCategory);

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const handleGenerateSentence = async (e: React.MouseEvent, word: Word) => {
    e.stopPropagation();
    setLoadingAi(true);
    const sentence = await generateWordContext(word);
    setAiSentence({ id: word.id, text: sentence });
    setLoadingAi(false);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['all', 'school', 'nature', 'food', 'family'].map(cat => (
          <button
            key={cat}
            onClick={() => setCurrentCategory(cat)}
            className={`
              px-4 py-2 rounded-full font-bold border-2 border-black whitespace-nowrap
              ${currentCategory === cat ? 'bg-black text-white' : 'bg-white text-black'}
            `}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredWords.map(word => (
          <div 
            key={word.id}
            onClick={() => setFlippedId(flippedId === word.id ? null : word.id)}
            className="perspective-1000 cursor-pointer group"
          >
            <div className={`
              relative w-full h-64 transition-all duration-500 transform-style-3d
              ${flippedId === word.id ? 'rotate-y-180' : ''}
            `}>
              
              {/* Front Side */}
              <div className="absolute inset-0 backface-hidden bg-white border-4 border-black rounded-3xl p-6 flex flex-col items-center justify-center shadow-[6px_6px_0px_0px_#3b82f6] group-hover:-translate-y-1 transition-transform">
                <div className="absolute top-4 right-4 bg-blue-100 px-3 py-1 rounded-full text-xs font-bold border-2 border-blue-300 uppercase">
                  {word.category}
                </div>
                <h2 className="text-4xl font-black mb-4 text-blue-500">{word.english}</h2>
                <EggyButton 
                  size="sm" 
                  color="yellow" 
                  onClick={(e) => { e.stopPropagation(); playAudio(word.english); }}
                >
                  <Volume2 size={18} /> Pronounce
                </EggyButton>
                <p className="mt-4 text-gray-400 text-sm font-bold animate-pulse">Tap to flip</p>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-yellow-100 border-4 border-black rounded-3xl p-6 flex flex-col items-center justify-center shadow-[6px_6px_0px_0px_#f59e0b]">
                <h3 className="text-3xl font-black mb-2">{word.chinese}</h3>
                <div className="w-full bg-white/50 p-3 rounded-xl border-2 border-yellow-300 mb-2">
                  <p className="text-sm text-center italic text-gray-700">
                    "{word.exampleSentence || '...'}"
                  </p>
                </div>
                
                {/* AI Section */}
                <div className="w-full mt-2">
                  {aiSentence?.id === word.id ? (
                     <div className="bg-purple-100 p-2 rounded-lg border-2 border-purple-300 text-xs animate-fade-in">
                       <span className="font-bold text-purple-600">AI:</span> {aiSentence.text}
                     </div>
                  ) : (
                    <button 
                      onClick={(e) => handleGenerateSentence(e, word)}
                      disabled={loadingAi}
                      className="w-full flex items-center justify-center gap-1 text-xs font-bold text-purple-600 bg-purple-100 py-2 rounded-lg hover:bg-purple-200 disabled:opacity-50"
                    >
                      {loadingAi ? <RefreshCw className="animate-spin" size={14}/> : <Wand2 size={14}/>}
                      Make Fun Sentence
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};