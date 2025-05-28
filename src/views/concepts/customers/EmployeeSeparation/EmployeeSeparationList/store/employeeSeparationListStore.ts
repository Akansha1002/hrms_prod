import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { EmployeeSeparationData, Filter } from '../types'

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

type EmployeeSeparationListState = {
  tableData: TableQueries
  filterData: Filter
  selectedSeparations: Partial<EmployeeSeparationData>[]
}

type EmployeeSeparationListAction = {
  setFilterData: (payload: Filter) => void
  setTableData: (payload: TableQueries) => void
  setSelectedSeparations: (
    checked: boolean,
    row: EmployeeSeparationData,
  ) => void
  setSelectAllSeparations: (rows: EmployeeSeparationData[]) => void
}

const initialState: EmployeeSeparationListState = {
  tableData: initialTableData,
  filterData: initialFilterData,
  selectedSeparations: [],
}

export const useEmployeeSeparationListStore = create<
  EmployeeSeparationListState & EmployeeSeparationListAction
>((set) => ({
  ...initialState,
  setFilterData: (payload) => set(() => ({ filterData: payload })),
  setTableData: (payload) => set(() => ({ tableData: payload })),
  setSelectedSeparations: (checked, row) =>
    set((state) => {
      const prev = state.selectedSeparations
      return {
        selectedSeparations: checked
          ? [...prev, row]
          : prev.filter((s) => s.name !== row.name),
      }
    }),
  setSelectAllSeparations: (rows) =>
    set(() => ({ selectedSeparations: rows })),
}))
