import { create } from 'zustand'
import { TableQueries } from "@/@types/common"
import { EmployeeSkillMapData, Filter } from '../types'

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

export type EmployeeSkillMapState = {
    tableData: TableQueries
    filterData: Filter
    selectedEmployeeSkillMap: Partial<EmployeeSkillMapData>[]
}

type EmployeeSkillMapAction = {
    setFilterData: (payload: Filter) => void
    setTableData: (payload: TableQueries) => void
    setSelectedEmployeeSkillMap: (checked: boolean, employeeSkillMap: EmployeeSkillMapData) => void
    setSelectAllEmployeeSkillMap: (employeeSkillMap: EmployeeSkillMapData[]) => void
}

const initialState: EmployeeSkillMapState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedEmployeeSkillMap: [],
}

export const useEmployeeSkillMapStore = create<
    EmployeeSkillMapState & EmployeeSkillMapAction
>((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedEmployeeSkillMap: (checked, row) =>
        set((state) => {
            const prevData = state.selectedEmployeeSkillMap
            if (checked) {
                return { selectedEmployeeSkillMap: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some((prevEmployee) => row.id === prevEmployee.id)
                ) {
                    return {
                        selectedEmployeeSkillMap: prevData.filter(
                            (prevEmployee) => prevEmployee.id !== row.id,
                        ),
                    }
                }
                return { selectedEmployeeSkillMap: prevData }
            }
        }),
    setSelectAllEmployeeSkillMap: (row) => set(() => ({ selectedEmployeeSkillMap: row }))
}))
