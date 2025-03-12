import { create } from 'zustand'
import { TableQueries } from "@/@types/common"
import { Employee } from '../types'

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export type EmployeeListState = {
    tableData: TableQueries
    selectedEmployee: Partial<Employee>[]
}

type EmployeeListAction = {
    setTableData: (payload: TableQueries) => void
    setSelectedEmployee: (checked: boolean, employee: Employee) => void
    setSelectAllEmployee: (employee: Employee[]) => void
}

const initialState: EmployeeListState = {
    tableData: initialTableData,
    selectedEmployee: [],
}

export const useEmployeeListStore = create<
    EmployeeListState & EmployeeListAction
>((set) => ({
    ...initialState,
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
