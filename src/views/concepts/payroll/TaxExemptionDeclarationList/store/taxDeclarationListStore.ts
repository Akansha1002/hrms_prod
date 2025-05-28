import { create } from 'zustand'
import { TableQueries } from '@/@types/common'
import { EmployeeTaxExemptionDeclaration, Filter } from '../types'

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

export type TaxDeclarationListState = {
    tableData: TableQueries
    filterData: Filter
    selectedDeclarations: Partial<EmployeeTaxExemptionDeclaration>[]
}

type TaxDeclarationListAction = {
    setFilterData: (payload: Filter) => void
    setTableData: (payload: TableQueries) => void
    setSelectedDeclarations: (
        checked: boolean,
        declaration: EmployeeTaxExemptionDeclaration,
    ) => void
    setSelectAllDeclarations: (declarations: EmployeeTaxExemptionDeclaration[]) => void
}

const initialState: TaxDeclarationListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedDeclarations: [],
}

export const useTaxDeclarationListStore = create<
    TaxDeclarationListState & TaxDeclarationListAction
>((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedDeclarations: (checked, declaration) =>
        set((state) => {
            const prevData = state.selectedDeclarations
            if (checked) {
                return { selectedDeclarations: [...prevData, declaration] }
            } else {
                return {
                    selectedDeclarations: prevData.filter(
                        (prev) => prev.name !== declaration.name,
                    ),
                }
            }
        }),
    setSelectAllDeclarations: (rows) =>
        set(() => ({ selectedDeclarations: rows })),
}))
