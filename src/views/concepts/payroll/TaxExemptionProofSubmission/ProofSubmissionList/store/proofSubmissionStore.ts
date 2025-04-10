import { create } from 'zustand'
import { TableQueries } from "@/@types/common"
import { Filter, ProofSubmissionListData } from '../types'

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

export type ProofSubmissionListState = {
    tableData: TableQueries
    filterData: Filter
    selectedProofSubmission: Partial<ProofSubmissionListData>[]
}

type ProofSubmissionListAction = {
    setFilterData: (payload: Filter) => void
    setTableData: (payload: TableQueries) => void
    setSelectedProofSubmission: (checked: boolean, proofSubmission: ProofSubmissionListData) => void
    setSelectAllProofSubmission: (proofSubmission: ProofSubmissionListData[]) => void
}

const initialState: ProofSubmissionListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedProofSubmission: [],
}

export const useProofSubmissionListStore = create<
    ProofSubmissionListState & ProofSubmissionListAction
>((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedProofSubmission: (checked, row) =>
        set((state) => {
            const prevData = state.selectedProofSubmission
            if (checked) {
                return { selectedProofSubmission: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some((prevProofSubmission) => row.id === prevProofSubmission.id)
                ) {
                    return {
                        selectedProofsubmission: prevData.filter(
                            (prevProofSubmission) => prevProofSubmission.id !== row.id,
                        ),
                    }
                }
                return { selectedProofSubmission: prevData }
            }
        }),
    setSelectAllProofSubmission: (row) => set(() => ({ selectedProofSubmission: row }))
}))
