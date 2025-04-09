import { create } from 'zustand'

interface ImageStore {
  albumId: number | null
  albumImageUrl: string
  setAlbumImageUrl: (url: string) => void
  setAlbumId: (id: number) => void
}


export const useImageStore = create<ImageStore>((set) => ({
  albumId: null,
  albumImageUrl: '',
  setAlbumImageUrl: (url: string) => set({ albumImageUrl: url }),
  setAlbumId: (id: number) => set({ albumId: id }), 
}));