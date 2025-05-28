// stores/useKRATableStore.ts
import { create } from 'zustand'

export interface KRARow {
    id: string
    no: number
    kra: string
    weightage: number
    goal_completion: number
    goal_score: number
    _isSelected?: boolean
}

interface KRATableState {
    kraTable: KRARow[]
    setKRATable: (data: KRARow[]) => void
}

export const useKRATableStore = create<KRATableState>((set) => ({
    kraTable: [],
    setKRATable: (data) => set({ kraTable: data }),
}))
