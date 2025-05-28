import { create } from 'zustand'
import { TableQueries } from "@/@types/common"
import { Filter, PerformanceFeedbackListData } from '../types'

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

export type PerformanceFeedbackListState = {
    tableData: TableQueries
    filterData: Filter
    selectedPerformanceFeedback: Partial<PerformanceFeedbackListData>[]
}

type PerformanceFeedbackListAction = {
    setFilterData: (payload: Filter) => void
    setTableData: (payload: TableQueries) => void
    setSelectedPerformanceFeedback: (checked: boolean, performanceFeedback: PerformanceFeedbackListData) => void
    setSelectAllPerformanceFeedback: (performanceFeedback: PerformanceFeedbackListData[]) => void
}

const initialState: PerformanceFeedbackListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedPerformanceFeedback: [],
}

export const usePerformanceFeedbackListStore = create<
    PerformanceFeedbackListState & PerformanceFeedbackListAction
>((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedPerformanceFeedback: (checked, row) =>
        set((state) => {
            const prevData = state.selectedPerformanceFeedback
            if (checked) {
                return { selectedPerformanceFeedback: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some((prevPerformanceFeedback) => row.id === prevPerformanceFeedback.id)
                ) {
                    return {
                        selectedPerformanceFeedback: prevData.filter(
                            (prevPerformanceFeedback) => prevPerformanceFeedback.id !== row.id,
                        ),
                    }
                }
                return { selectedPerformanceFeedback: prevData }
            }
        }),
    setSelectAllPerformanceFeedback: (row) => set(() => ({ selectedPerformanceFeedback: row }))
}))
