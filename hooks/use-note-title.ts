import { create } from 'zustand'

type TitleStore = {
    title: string
    setTitle: (title: string) => void
}

const useTitleStore = create<TitleStore>((set) => ({
    title: '',
    setTitle: (title) => set({ title })
}))

export const useNoteTitle = () => useTitleStore()