import { create } from 'zustand'
import { TableQueries } from "@/@types/common"
import { Employee, Filter } from '../types'

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

export type EmployeeListState = {
    tableData: TableQueries
    filterData: Filter
    selectedEmployee: Partial<Employee>[]
}

type EmployeeListAction = {
    setFilterData: (payload: Filter) => void
    setTableData: (payload: TableQueries) => void
    setSelectedEmployee: (checked: boolean, employee: Employee) => void
    setSelectAllEmployee: (employee: Employee[]) => void
}

const initialState: EmployeeListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedEmployee: [],
}

export const useEmployeeListStore = create<
    EmployeeListState & EmployeeListAction
>((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedEmployee: (checked, row) =>
        set((state) => {
            const prevData = state.selectedEmployee
            if (checked) {
                return { selectedEmployee: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some((prevEmployee) => row.id === prevEmployee.id)
                ) {
                    return {
                        selectedEmployee: prevData.filter(
                            (prevEmployee) => prevEmployee.id !== row.id,
                        ),
                    }
                }
                return { selectedEmployee: prevData }
            }
        }),
    setSelectAllEmployee: (row) => set(() => ({ selectedEmployee: row }))
}))
