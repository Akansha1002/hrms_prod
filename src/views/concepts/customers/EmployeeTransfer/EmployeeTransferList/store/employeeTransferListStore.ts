import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { EmployeeTransferData, Filter } from '../types'

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

type EmployeeTransferListState = {
  tableData: TableQueries
  filterData: Filter
  selectedTransfers: Partial<EmployeeTransferData>[]
}

type EmployeeTransferListAction = {
  setTableData: (payload: TableQueries) => void
  setFilterData: (payload: Filter) => void
  setSelectedTransfers: (
    checked: boolean,
    row: EmployeeTransferData,
  ) => void
  setSelectAllTransfers: (rows: EmployeeTransferData[]) => void
}

const initialState: EmployeeTransferListState = {
  tableData: initialTableData,
  filterData: initialFilterData,
  selectedTransfers: [],
}

export const useEmployeeTransferListStore = create<
  EmployeeTransferListState & EmployeeTransferListAction
>((set) => ({
  ...initialState,
  setTableData: (payload) => set(() => ({ tableData: payload })),
  setFilterData: (payload) => set(() => ({ filterData: payload })),
  setSelectedTransfers: (checked, row) =>
    set((state) => {
      const prev = state.selectedTransfers
      return {
        selectedTransfers: checked
          ? [...prev, row]
          : prev.filter((t) => t.name !== row.name),
      }
    }),
  setSelectAllTransfers: (rows) =>
    set(() => ({ selectedTransfers: rows })),
}))
