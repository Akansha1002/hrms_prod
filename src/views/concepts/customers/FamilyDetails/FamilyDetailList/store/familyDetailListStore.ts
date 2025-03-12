import { create } from 'zustand'
import { TableQueries } from "@/@types/common"
import { FamilyDetail } from '../types'
export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export type FamilyDetailListState = {
    tableData: TableQueries
    selectedFamilyDetail: Partial<FamilyDetail>[]
}

type FamilyDetailListAction = {
    setTableData: (payload: TableQueries) => void
    setSelectedFamilyDetail: (checked: boolean, familyDetail: FamilyDetail) => void
    setSelectAllFamilyDetail: (familyDetail: FamilyDetail[]) => void
}

const initialState: FamilyDetailListState = {
    tableData: initialTableData,
    selectedFamilyDetail: [],
}

export const useFamilyDetailListStore = create<
    FamilyDetailListState & FamilyDetailListAction
>((set) => ({
    ...initialState,
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedFamilyDetail: (checked, row) =>
        set((state) => {
            const prevData = state.selectedFamilyDetail
            if (checked) {
                return { selectedFamilyDetail: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some((prevFamilyDetail) => row.id === prevFamilyDetail.id)
                ) {
                    return {
                        selectedFamilyDetail: prevData.filter(
                            (prevFamilyDetail) => prevFamilyDetail.id !== row.id,
                        ),
                    }
                }
                return { selectedFamilyDetail: prevData }
            }
        }),
    setSelectAllFamilyDetail: (row) => set(() => ({ selectedFamilyDetail: row }))
}))
