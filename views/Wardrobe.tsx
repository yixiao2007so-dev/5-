import React from 'react';
import { UserState, Accessory } from '../types';
import { ACCESSORIES } from '../constants';
import { EggyButton } from '../components/EggyButton';
import { EggyAvatar } from '../components/EggyAvatar';
import { Check, Lock } from 'lucide-react';

interface Props {
  user: UserState;
  onUnlock: (id: string, cost: number) => void;
  onEquip: (item: Accessory) => void;
}

export const Wardrobe: React.FC<Props> = ({ user, onUnlock, onEquip }) => {
  return (
    <div className="space-y-8 pb-20 mt-4">
      <div className="text-center">
        <h1 className="text-4xl font-black text-outline text-white mb-4">Wardrobe</h1>
        <div className="bg-white rounded-full w-40 h-40 mx-auto flex items-center justify-center border-4 border-black relative">
          <div className="scale-75 origin-center">
             <EggyAvatar user={user} animate={false} />
          </div>
        </div>
      </div>

      <div className="bg-white border-4 border-black rounded-3xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-xl font-black mb-4">Shop & Equip</h2>
        <div className="grid grid-cols-2 gap-4">
          {ACCESSORIES.map(item => {
            const isUnlocked = user.unlockedAccessories.includes(item.id);
            const isEquipped = user.equipped[item.type] === item.id;

            return (
              <div key={item.id} className="border-2 border-gray-200 rounded-xl p-3 flex flex-col items-center gap-2 relative bg-gray-50">
                <div className="text-4xl mb-2">{item.icon}</div>
                <div className="font-bold text-sm text-center leading-tight h-8">{item.name}</div>
                
                {isUnlocked ? (
                  <EggyButton 
                    size="sm" 
                    color={isEquipped ? 'green' : 'white'}
                    className="w-full text-xs"
                    onClick={() => onEquip(item)}
                  >
                    {isEquipped ? <><Check size={12}/> On</> : 'Wear'}
                  </EggyButton>
                ) : (
                  <EggyButton 
                    size="sm" 
                    color="yellow"
                    className="w-full text-xs"
                    disabled={user.coins < item.price}
                    onClick={() => onUnlock(item.id, item.price)}
                  >
                    {item.price} 🪙
                  </EggyButton>
                )}
                
                {!isUnlocked && user.coins < item.price && (
                  <div className="absolute inset-0 bg-gray-200/50 flex items-center justify-center rounded-xl">
                    <Lock size={24} className="text-gray-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};