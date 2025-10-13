import { create } from "zustand";

export type JournalProps = {
  id: string;
  title: string;
  content: string;
  mood: string;
  createdAt: Date;
  wordsCount: number;
};

type UserStore = {
  journals: JournalProps[];
  setJournals: (journals: JournalProps[]) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  journals: [],
  setJournals: (journals) => set({ journals }),
}));
