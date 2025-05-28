import { create } from 'zustand'
import { TableQueries } from "@/@types/common"
import { EmployeeResignationData, Filter } from '../types'

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
    status: ''
}

export type EmployeeResignationState = {
    tableData: TableQueries
    filterData: Filter
    selectedEmployeeResignation: Partial<EmployeeResignationData>[]
}

type EmployeeResignationAction = {
    setFilterData: (payload: Filter) => void
    setTableData: (payload: TableQueries) => void
    setSelectedEmployeeResignation: (checked: boolean, employeeResignation: EmployeeResignationData) => void
    setSelectAllEmployeeResignation: (employeeResignation: EmployeeResignationData[]) => void
}

const initialState: EmployeeResignationState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedEmployeeResignation: [],
}

export const useEmployeeResignationStore = create<
    EmployeeResignationState & EmployeeResignationAction
>((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedEmployeeResignation: (checked, row) =>
        set((state) => {
            const prevData = state.selectedEmployeeResignation
            if (checked) {
                return { selectedEmployeeResignation: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some((prevEmployee) => row.id === prevEmployee.id)
                ) {
                    return {
                        selectedEmployeeResignation: prevData.filter(
                            (prevEmployee) => prevEmployee.id !== row.id,
                        ),
                    }
                }
                return { selectedEmployeeResignation: prevData }
            }
        }),
    setSelectAllEmployeeResignation: (row) => set(() => ({ selectedEmployeeResignation: row }))
}))
