import { create } from 'zustand'

interface ImageStore {
  albumId: number | null
  albumImageUrl: string
  albumUpdated: boolean
  setAlbumImageUrl: (url: string) => void
  setAlbumId: (id: number) => void
  setAlbumUpdated: (value: boolean) => void
}


export const useImageStore = create<ImageStore>((set) => ({
  albumId: null,
  albumImageUrl: '',
  setAlbumImageUrl: (url: string) => set({ albumImageUrl: url }),
  setAlbumId: (id: number) => set({ albumId: id }), 

  albumUpdated: false,
	setAlbumUpdated: (value) => set({ albumUpdated: value }),
}));