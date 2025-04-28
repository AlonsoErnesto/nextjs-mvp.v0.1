import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AppState {
  // Example state
  count: number;
  user: {
    id: string | null;
    name: string | null;
    email: string | null;
  };

  // Example actions
  increment: () => void;
  decrement: () => void;
  setUser: (user: AppState["user"]) => void;
  clearUser: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        user: {
          id: null,
          name: null,
          email: null,
        },

        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
        setUser: (user) => set({ user }),
        clearUser: () =>
          set({
            user: {
              id: null,
              name: null,
              email: null,
            },
          }),
      }),
      {
        name: "app-storage",
        // Optional: specify which parts of the state to persist
        partialize: (state) => ({ user: state.user }),
      }
    )
  )
);
