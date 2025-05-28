import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { ExitInterviewData, Filter } from '../types'

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        key: '',
        order: '',
    },
}

export const initialFilterData: Filter = {
    status: '',
}

type ExitInterviewListState = {
    tableData: TableQueries
    filterData: Filter
    selectedInterviews: Partial<ExitInterviewData>[]
}

type ExitInterviewListAction = {
    setTableData: (payload: TableQueries) => void
    setFilterData: (payload: Filter) => void
    setSelectedInterviews: (checked: boolean, row: ExitInterviewData) => void
    setSelectAllInterviews: (rows: ExitInterviewData[]) => void
}

const initialState: ExitInterviewListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedInterviews: [],
}

export const useExitInterviewListStore = create<
    ExitInterviewListState & ExitInterviewListAction
>((set) => ({
    ...initialState,
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setSelectedInterviews: (checked, row) =>
        set((state) => {
            const prev = state.selectedInterviews
            return {
                selectedInterviews: checked
                    ? [...prev, row]
                    : prev.filter((t) => t.name !== row.name),
            }
        }),
    setSelectAllInterviews: (rows) => set(() => ({ selectedInterviews: rows })),
}))
