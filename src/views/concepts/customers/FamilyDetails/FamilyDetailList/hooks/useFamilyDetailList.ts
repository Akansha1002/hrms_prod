import useSWR from 'swr'
import type { TableQueries } from '@/@types/common'
import { useParams } from 'react-router-dom'
import { useFamilyDetailListStore } from '../store/familyDetailListStore'
import { apiGetFamilyDetailsList } from '@/services/FamilyDetailService'
import { GetFamilyDetailFormResponse } from '../types'

export default function useFamilyDetailList() {
    const {
        tableData,
        setTableData,
        selectedFamilyDetail,
        setSelectedFamilyDetail,
        setSelectAllFamilyDetail,
    } = useFamilyDetailListStore((state) => state)

    const { name } = useParams()

    const { data, error, isLoading, mutate } = useSWR(
        name ? ['/api/FamilyDetails', { name }] : null,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetFamilyDetailsList<GetFamilyDetailFormResponse, { name: string }>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const familyDetailList = data?.data || []

    return {
        familyDetailList,
        error,
        isLoading,
        tableData,
        mutate,
        setTableData,
        selectedFamilyDetail,
        setSelectedFamilyDetail,
        setSelectAllFamilyDetail,
    }
}