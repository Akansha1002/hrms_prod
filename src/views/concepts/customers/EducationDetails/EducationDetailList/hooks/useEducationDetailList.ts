import useSWR from 'swr'
import type { TableQueries } from '@/@types/common'
import { useEducationDetailListStore } from '../store/educationDetailListStore'
import { GetEducationDetailFormResponse } from '../types'
import { apiGetEducationDetailsList } from '@/services/EducationDetailServices'
import { useParams } from 'react-router-dom'

export default function useEducationDetailList() {
    const {
        tableData,
        setTableData,
        selectedEducationDetail,
        setSelectedEducationDetail,
        setSelectAllEducationDetail,
    } = useEducationDetailListStore((state) => state)

    const { name } = useParams()

    const { data, error, isLoading, mutate } = useSWR(
        name ? ['/api/EducationDetails', { name }] : null,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetEducationDetailsList<GetEducationDetailFormResponse, { name: string }>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const educationDetailList = data?.data || []

    return {
        educationDetailList,
        error,
        isLoading,
        tableData,
        mutate,
        setTableData,
        selectedEducationDetail,
        setSelectedEducationDetail,
        setSelectAllEducationDetail,
    }
}