import { create } from 'zustand'
import { TableQueries } from "@/@types/common"
import { EmployeePromotionData, Filter } from '../types'

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

export type EmployeePromotionState = {
    tableData: TableQueries
    filterData: Filter
    selectedEmployeePromotion: Partial<EmployeePromotionData>[]
}

type EmployeePromotionAction = {
    setFilterData: (payload: Filter) => void
    setTableData: (payload: TableQueries) => void
    setSelectedEmployeePromotion: (checked: boolean, employeePromotion: EmployeePromotionData) => void
    setSelectAllEmployeePromotion: (employeePromotion: EmployeePromotionData[]) => void
}

const initialState: EmployeePromotionState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedEmployeePromotion: [],
}

export const useEmployeePromotionStore = create<
    EmployeePromotionState & EmployeePromotionAction
>((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedEmployeePromotion: (checked, row) =>
        set((state) => {
            const prevData = state.selectedEmployeePromotion
            if (checked) {
                return { selectedEmployeePromotion: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some((prevEmployee) => row.id === prevEmployee.id)
                ) {
                    return {
                        selectedEmployeePromotion: prevData.filter(
                            (prevEmployee) => prevEmployee.id !== row.id,
                        ),
                    }
                }
                return { selectedEmployeePromotion: prevData }
            }
        }),
    setSelectAllEmployeePromotion: (row) => set(() => ({ selectedEmployeePromotion: row }))
}))
