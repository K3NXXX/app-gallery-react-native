import { create } from 'zustand'

interface ImageStore {
  image: string | null
  setImage: (image: string) => void
}

export const useImageStore = create<ImageStore>((set) => ({
  image: null,
  setImage: (image) => set({ image }),
}))