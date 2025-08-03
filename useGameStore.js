import create from 'zustand';
export const useGameStore = create((set) => ({ hp: 100, setHP: (hp) => set({ hp }) }));