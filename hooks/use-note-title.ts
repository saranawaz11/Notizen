import { create } from 'zustand'

type NoteTitleStore = {
    title: string
    icon: string
    setTitle: (title: string) => void
    setIcon: (icon: string) => void
}

export const useNoteTitle = create<NoteTitleStore>((set) => ({
    title: '',
    icon: '',
    setTitle: (title) => set({ title }),
    setIcon: (icon) => set({ icon }),
}))