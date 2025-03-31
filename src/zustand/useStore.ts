import { create } from 'zustand'


export const useImageStore = create((set) => ({
  albumImageUrl: '',
  setAlbumImageUrl: (url: string) => set({ albumImageUrl: url }),
}));