import { create } from 'zustand'
import { TableQueries } from "@/@types/common"
import { EducationDetail } from '../types'

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export type EducationDetailListState = {
    tableData: TableQueries
    selectedEducationDetail: Partial<EducationDetail>[]
}

type EducationDetailListAction = {
    setTableData: (payload: TableQueries) => void
    setSelectedEducationDetail: (checked: boolean, educationDetail: EducationDetail) => void
    setSelectAllEducationDetail: (educationDetail: EducationDetail[]) => void
}

const initialState: EducationDetailListState = {
    tableData: initialTableData,
    selectedEducationDetail: [],
}

export const useEducationDetailListStore = create<
    EducationDetailListState & EducationDetailListAction
>((set) => ({
    ...initialState,
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedEducationDetail: (checked, row) =>
        set((state) => {
            const prevData = state.selectedEducationDetail
            if (checked) {
                return { selectedEducationDetail: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some((prevEducationDetail) => row.id === prevEducationDetail.id)
                ) {
                    return {
                        selectedEducationDetail: prevData.filter(
                            (prevEducationDetail) => prevEducationDetail.id !== row.id,
                        ),
                    }
                }
                return { selectedEducationDetail: prevData }
            }
        }),
    setSelectAllEducationDetail: (row) => set(() => ({ selectedEducationDetail: row }))
}))
