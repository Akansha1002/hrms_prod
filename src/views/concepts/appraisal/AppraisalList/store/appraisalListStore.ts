import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { AppraisalData, AppraisalFilter } from '../types'

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        key: '',
        order: '',
    },
}

export const initialFilterData: AppraisalFilter = {
    status: '',
}

type AppraisalListState = {
    tableData: TableQueries
    filterData: AppraisalFilter
    selectedAppraisals: Partial<AppraisalData>[]
}

type AppraisalListAction = {
    setTableData: (payload: TableQueries) => void
    setFilterData: (payload: AppraisalFilter) => void
    setSelectedAppraisals: (checked: boolean, row: AppraisalData) => void
    setSelectAllAppraisals: (rows: AppraisalData[]) => void
}

const initialState: AppraisalListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedAppraisals: [],
}

export const useAppraisalListStore = create<
    AppraisalListState & AppraisalListAction
>((set) => ({
    ...initialState,
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setSelectedAppraisals: (checked, row) =>
        set((state) => {
            const prev = state.selectedAppraisals
            return {
                selectedAppraisals: checked
                    ? [...prev, row]
                    : prev.filter((t) => t.name !== row.name),
            }
        }),
    setSelectAllAppraisals: (rows) => set(() => ({ selectedAppraisals: rows })),
}))
