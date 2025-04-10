import { apiGetCustomersList } from '@/services/CustomersService'
import useSWR from 'swr'
import type { TableQueries } from '@/@types/common'
import { useProofSubmissionListStore } from '../store/proofSubmissionStore'
import { GetProofSubmissionListResponse } from '../types'
import { apiGetProofSubmissionList } from '@/services/TaxExemptionProofSubmissionService'

export default function useProofSubmissionList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedProofSubmission,
        setSelectedProofSubmission,
        setSelectAllProofSubmission,
        setFilterData,
    } = useProofSubmissionListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/Employee Tax Exemption Proof Submission', { ...tableData, ...filterData }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetProofSubmissionList<GetProofSubmissionListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const proofSubmissionList = data?.data || []
    const proofSubmissionListTotal = data?.total || 0

    return {
        proofSubmissionList,
        proofSubmissionListTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        selectedProofSubmission,
        setSelectedProofSubmission,
        setSelectAllProofSubmission,
        setFilterData,
    }
}