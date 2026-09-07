import { create } from "zustand";

type CounterStore = {
  counter: number;
  increment: () => void;
  decrement: () => void;
};

export const useCounterStore = create<CounterStore>()((set) => ({
  counter: 0,

  increment: () => {
    set((state) => ({
        counter: Math.min(10 , state.counter + 1),
    }));
  },

  decrement: () => {
    set((state) => ({
      counter: Math.max(0, state.counter - 1),
    }));
  },
}));
