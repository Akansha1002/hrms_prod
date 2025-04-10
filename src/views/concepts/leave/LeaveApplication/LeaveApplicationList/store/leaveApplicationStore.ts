import { create } from 'zustand'
import { TableQueries } from '@/@types/common'
import { LeaveApplicationData, Filter } from '../types'

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData: Filter = {
    status: '',
}

export type LeaveApplicationListState = {
    tableData: TableQueries
    filterData: Filter
    selectedLeaveApplication: Partial<LeaveApplicationData>[]
}

type LeaveApplicationListAction = {
    setFilterData: (payload: Filter) => void
    setTableData: (payload: TableQueries) => void
    setSelectedLeaveApplication: (
        checked: boolean,
        leaveApplication: LeaveApplicationData,
    ) => void
    setSelectAllLeaveApplication: (
        leaveApplications: LeaveApplicationData[],
    ) => void
}

const initialState: LeaveApplicationListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedLeaveApplication: [],
}

export const useLeaveApplicationListStore = create<
    LeaveApplicationListState & LeaveApplicationListAction
>((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedLeaveApplication: (checked, row) =>
        set((state) => {
            const prevData = state.selectedLeaveApplication
            if (checked) {
                return { selectedLeaveApplication: [...prevData, row] }
            } else {
                return {
                    selectedLeaveApplication: prevData.filter(
                        (prev) => prev.id !== row.id,
                    ),
                }
            }
        }),
    setSelectAllLeaveApplication: (rows) =>
        set(() => ({ selectedLeaveApplication: rows })),
}))
