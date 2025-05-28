import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { AttendanceData, Filter } from '../types'

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

type AttendanceListState = {
  tableData: TableQueries
  filterData: Filter
  selectedAttendance: Partial<AttendanceData>[]
}

type AttendanceListActions = {
  setFilterData: (payload: Filter) => void
  setTableData: (payload: TableQueries) => void
  setSelectedAttendance: (
    checked: boolean,
    row: AttendanceData
  ) => void
  setSelectAllAttendance: (rows: AttendanceData[]) => void
}

const initialState: AttendanceListState = {
  tableData: initialTableData,
  filterData: initialFilterData,
  selectedAttendance: [],
}

export const useAttendanceListStore = create<AttendanceListState & AttendanceListActions>(
  (set) => ({
    ...initialState,

    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),

    setSelectedAttendance: (checked, row) =>
      set((state) => {
        const prev = state.selectedAttendance
        return {
          selectedAttendance: checked
            ? [...prev, row]
            : prev.filter((s) => s.name !== row.name),
        }
      }),

    setSelectAllAttendance: (rows) =>
      set(() => ({ selectedAttendance: rows })),
  })
)
