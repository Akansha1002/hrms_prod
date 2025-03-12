import { create } from 'zustand'
import { TableQueries } from "@/@types/common"
import { PastEmploymentDetail } from '../types'

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export type PastEmploymentDetailListState = {
    tableData: TableQueries
    selectedPastEmploymentDetail: Partial<PastEmploymentDetail>[]
}

type PastEmploymentDetailListAction = {
    setTableData: (payload: TableQueries) => void
    setSelectedPastEmploymentDetail: (checked: boolean, pastEmploymentDetail: PastEmploymentDetail) => void
    setSelectAllPastEmploymentDetail: (pastEmploymentDetail: PastEmploymentDetail[]) => void
}

const initialState: PastEmploymentDetailListState = {
    tableData: initialTableData,
    selectedPastEmploymentDetail: [],
}

export const usePastEmploymentDetailListStore = create<
    PastEmploymentDetailListState & PastEmploymentDetailListAction
>((set) => ({
    ...initialState,
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedPastEmploymentDetail: (checked, row) =>
        set((state) => {
            const prevData = state.selectedPastEmploymentDetail
            if (checked) {
                return { selectedPastEmploymentDetail: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some((prevPastEmploymentDetail) => row.id === prevPastEmploymentDetail.id)
                ) {
                    return {
                        selectedPastEmploymentDetail: prevData.filter(
                            (prevPastEmploymentDetail) => prevPastEmploymentDetail.id !== row.id,
                        ),
                    }
                }
                return { selectedPastEmploymentDetail: prevData }
            }
        }),
    setSelectAllPastEmploymentDetail: (row) => set(() => ({ selectedPastEmploymentDetail: row }))
}))
