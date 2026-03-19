import { create } from 'zustand'
// ← named import, not default
type RefreshStore = {
    count: number
    refresh: () => void
}

export const useRefresh = create<RefreshStore>((set, get) => ({
    count: 0,
    refresh: () => set({ count: get().count + 1 })
}))