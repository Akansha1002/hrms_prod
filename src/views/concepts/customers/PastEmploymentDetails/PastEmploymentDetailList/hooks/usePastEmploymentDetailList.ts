import useSWR from 'swr'
import type { TableQueries } from '@/@types/common'
import { useParams } from 'react-router-dom'
import { usePastEmploymentDetailListStore } from '../store/pastEmploymentDetailListStore'
import { apiGetPastEmploymentDetailsList } from '@/services/PastEmploymentDetailService'
import { GetPastEmploymentDetailFormResponse } from '../types'
export default function usePastEmploymentDetailList() {
    const {
        tableData,
        setTableData,
        selectedPastEmploymentDetail,
        setSelectedPastEmploymentDetail,
        setSelectAllPastEmploymentDetail,
    } = usePastEmploymentDetailListStore((state) => state)

    const { name } = useParams()

    const { data, error, isLoading, mutate } = useSWR(
        name ? ['/api/PastEmploymentDetails', { name }] : null,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetPastEmploymentDetailsList<GetPastEmploymentDetailFormResponse, { name: string }>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const pastEmploymentDetailList = data?.data || []

    return {
        pastEmploymentDetailList,
        error,
        isLoading,
        tableData,
        mutate,
        setTableData,
        selectedPastEmploymentDetail,
        setSelectedPastEmploymentDetail,
        setSelectAllPastEmploymentDetail,
    }
}