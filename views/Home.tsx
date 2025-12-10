import React from 'react';
import { UserState } from '../types';
import { EggyAvatar } from '../components/EggyAvatar';

export const Home: React.FC<{ user: UserState }> = ({ user }) => {
  return (
    <div className="flex flex-col items-center animate-fade-in space-y-8 mt-4">
      <div className="text-center relative">
        <h1 className="text-4xl font-black text-white text-outline -rotate-2 mb-2">Egg Home</h1>
        <p className="text-yellow-800 font-bold bg-yellow-200 px-4 py-1 rounded-full border-2 border-yellow-400 inline-block">
          Level 5 Student
        </p>
      </div>

      <div className="bg-white border-4 border-black rounded-[40px] p-8 w-full max-w-xs shadow-[8px_8px_0px_0px_#fbbf24] relative">
         <EggyAvatar user={user} size="lg" />
         <div className="absolute -bottom-6 left-0 right-0 text-center">
            <div className="bg-black text-white px-6 py-2 rounded-full inline-block font-bold border-4 border-white transform rotate-1">
              Let's Learn!
            </div>
         </div>
      </div>

      <div className="w-full bg-white border-4 border-black rounded-3xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-xl font-black mb-3 flex items-center gap-2">
          <span>📅</span> Daily Tasks
        </h2>
        <div className="space-y-3">
          <div className="relative h-6 bg-gray-200 rounded-full border-2 border-black overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-green-400 transition-all duration-500"
              style={{ width: `${user.dailyProgress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm font-bold">
            <span>Progress</span>
            <span>{Math.round(user.dailyProgress)}%</span>
          </div>
          <p className="text-gray-500 text-sm">
            Play games in the Party Arena to earn energy and fill the bar!
          </p>
        </div>
      </div>
    </div>
  );
};