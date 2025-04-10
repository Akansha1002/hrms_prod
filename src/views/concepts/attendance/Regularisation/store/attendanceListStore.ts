import { create } from 'zustand'
import { TableQueries } from '@/@types/common'
import { AttendanceData, Filter } from '../type'

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData = {
    status: '',
}

export type AttendanceListState = {
    tableData: TableQueries
    filterData: Filter
    selectedAttendance: Partial<AttendanceData>[]
}

type AttendanceListAction = {
    setFilterData: (payload: Filter) => void
    setTableData: (payload: TableQueries) => void
    setSelectedAttendance: (
        checked: boolean,
        attendance: AttendanceData,
    ) => void
    setSelectAllAttendance: (attendances: AttendanceData[]) => void
}

const initialState: AttendanceListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedAttendance: [],
}

export const useAttendanceListStore = create<
    AttendanceListState & AttendanceListAction
>((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedAttendance: (checked, row) =>
        set((state) => {
            const prevData = state.selectedAttendance
            if (checked) {
                return { selectedAttendance: [...prevData, row] }
            } else {
                return {
                    selectedAttendance: prevData.filter(
                        (prev) => prev.name !== row.name,
                    ),
                }
            }
        }),
    setSelectAllAttendance: (rows) => set(() => ({ selectedAttendance: rows })),
}))
