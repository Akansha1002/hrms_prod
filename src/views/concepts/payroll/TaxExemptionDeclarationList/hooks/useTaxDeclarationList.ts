import useSWR from 'swr'
import { apiGetEmployeeTaxDeclarations } from '@/services/TaxExemptionDeclarationService'
import { useTaxDeclarationListStore } from '../store/taxDeclarationListStore'
import type { TableQueries } from '@/@types/common'
import type {
    EmployeeTaxExemptionDeclaration,
    GetEmployeeTaxExemptionDeclarationListResponse,
} from '../types'

export default function useTaxDeclarationList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedDeclarations,
        setSelectedDeclarations,
        setSelectAllDeclarations,
        setFilterData,
    } = useTaxDeclarationListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/resource/Employee Tax Exemption Declaration', { ...tableData, ...filterData }],
        ([_, params]) =>
            apiGetEmployeeTaxDeclarations<
        GetEmployeeTaxExemptionDeclarationListResponse,
                TableQueries
            >(params),
        {
            revalidateOnFocus: false,
        },
    )

    const declarationList = data?.data || []
    const declarationTotal = data?.total || 0

    return {
        declarationList,
        declarationTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        selectedDeclarations,
        setSelectedDeclarations,
        setSelectAllDeclarations,
        setFilterData,
    }
}
