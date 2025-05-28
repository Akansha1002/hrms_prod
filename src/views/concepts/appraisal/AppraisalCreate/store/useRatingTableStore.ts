import { create } from 'zustand'

export interface RatingRow {
    id: string
    criteria: string
    weightage: number
    rating?: number
}

interface RatingTableState {
    ratingTable: RatingRow[]
    setRatingTable: (data: RatingRow[]) => void
}

export const useRatingTableStore = create<RatingTableState>((set) => ({
    ratingTable: [],
    setRatingTable: (data) => set({ ratingTable: data }),
}))
