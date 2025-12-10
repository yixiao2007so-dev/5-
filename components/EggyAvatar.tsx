import React from 'react';
import { UserState } from '../types';
import { ACCESSORIES } from '../constants';

interface EggyAvatarProps {
  user: UserState;
  emotion?: 'happy' | 'thinking' | 'shocked';
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export const EggyAvatar: React.FC<EggyAvatarProps> = ({ 
  user, 
  emotion = 'happy', 
  size = 'md',
  animate = true
}) => {
  const sizeClass = size === 'sm' ? 'w-16 h-20' : size === 'md' ? 'w-32 h-40' : 'w-48 h-60';
  const eyeSize = size === 'sm' ? 'w-1.5 h-2.5' : size === 'md' ? 'w-3 h-5' : 'w-5 h-8';
  
  const getAccessoryIcon = (id?: string) => {
    if (!id) return null;
    return ACCESSORIES.find(a => a.id === id)?.icon;
  };

  return (
    <div className={`relative ${sizeClass} mx-auto ${animate ? 'animate-bounce' : ''} transition-all`}>
      {/* Body */}
      <div className="absolute inset-0 bg-yellow-400 rounded-full border-4 border-black shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.1)] overflow-hidden">
        {/* Blush */}
        <div className="absolute top-1/2 left-2 w-4 h-2 bg-pink-300 rounded-full opacity-60"></div>
        <div className="absolute top-1/2 right-2 w-4 h-2 bg-pink-300 rounded-full opacity-60"></div>
      </div>

      {/* Face Container */}
      <div className="absolute top-1/3 left-0 right-0 flex justify-center items-center gap-4 z-10">
        {/* Left Eye */}
        <div className={`${eyeSize} bg-black rounded-full relative`}>
          <div className="absolute top-1 right-1 w-[30%] h-[30%] bg-white rounded-full"></div>
        </div>
        {/* Right Eye */}
        <div className={`${eyeSize} bg-black rounded-full relative`}>
           <div className="absolute top-1 right-1 w-[30%] h-[30%] bg-white rounded-full"></div>
        </div>
      </div>

      {/* Mouth */}
      <div className="absolute top-[45%] left-0 right-0 flex justify-center z-10">
        {emotion === 'happy' && (
           <div className="w-4 h-2 border-b-4 border-black rounded-full mt-2"></div>
        )}
        {emotion === 'shocked' && (
           <div className="w-4 h-4 border-4 border-black rounded-full mt-2 bg-red-400"></div>
        )}
        {emotion === 'thinking' && (
           <div className="w-3 h-1 bg-black rounded-full mt-3 translate-x-2"></div>
        )}
      </div>

      {/* Accessories Layer */}
      {/* Hat */}
      {user.equipped.hat && (
        <div className="absolute -top-6 left-0 right-0 text-center text-4xl z-20 drop-shadow-md">
          {getAccessoryIcon(user.equipped.hat)}
        </div>
      )}
      
      {/* Glasses */}
      {user.equipped.glasses && (
        <div className="absolute top-[30%] left-0 right-0 text-center text-4xl z-20 opacity-90">
          {getAccessoryIcon(user.equipped.glasses)}
        </div>
      )}

      {/* Item (Hand) - Positioning simplified for CSS egg */}
      {user.equipped.item && (
        <div className="absolute bottom-2 -right-4 text-3xl z-30 animate-pulse">
          {getAccessoryIcon(user.equipped.item)}
        </div>
      )}
      
      {/* Simple Legs */}
      <div className="absolute -bottom-2 left-1/4 w-3 h-4 bg-black rounded-full -z-10"></div>
      <div className="absolute -bottom-2 right-1/4 w-3 h-4 bg-black rounded-full -z-10"></div>
    </div>
  );
};