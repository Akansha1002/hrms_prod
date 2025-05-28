import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

import TransferDetailsTable from './components/TransferDetailsTable'
import EmployeeTransfer from './components/EmployeeTransfer'
import { apiCreateEmployeeTransfer } from '@/services/EmployeeTransferService'
import useSWR from 'swr'
import { apiGetPropertyListByEmployeeId } from '@/services/EmployeePromotionService'
import { GetPropertyListResponse } from '../../EmployeePromotion/EmployeePromotionForm/types'
import { apiGetEmployeeNameList } from '@/services/HolidayService'

const validationSchema = z.object({
    employee: z.string().min(1, 'Employee number is required'),
    employee_name: z.string().nullable(),
    company: z.string().nullable(),
    new_company: z.string().nullable(),
    transfer: z.string(),
    create_new_employee_id: z.boolean().nullable(),
})

export type EmployeeTransferSchema = z.infer<typeof validationSchema>

const EmployeeTransferCreate = () => {
    const navigate = useNavigate()
    const [tableRows, setTableRows] = useState<any[]>([])

    const initialForm = {
        employee: '',
        company: '',
        new_company: '',
        transfer_date: '',
        create_new_employee_id: false,
    }

    const form = useForm<EmployeeTransferSchema>({
        defaultValues: initialForm,
        resolver: zodResolver(validationSchema),
    })

    const selectedEmployeeId = form.watch('employee')

    const { data: propertyList, isLoading: isLoadingPropertyList } = useSWR(
        selectedEmployeeId
            ? ['fetch-property-list', { name: selectedEmployeeId }]
            : null,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetPropertyListByEmployeeId<
                GetPropertyListResponse,
                { name: string }
            >(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    const propertyListData =
        propertyList?.message?.map((list) => ({
            value: list.property,
            label: list.property,
            current: list.current,
        })) || []

    console.log('propertyListData', propertyListData)
    console.log('propertyList', propertyList)

    const handleSubmit = async (values: EmployeeTransferSchema) => {
        console.log('inside handleSubmit')
        console.log('values', values)
        console.log('tableRows', tableRows)
        const formattedTransfer = tableRows.map((row) => ({
            property: row.property,
            new: row.new,
        }))

        let formattedDate = values.transfer
        if (formattedDate && formattedDate.includes('T')) {
            formattedDate = formattedDate.split('T')[0]
        }

        const payload = {
            data: {
                employee: values.employee,
                employee_name: values.employee_name,
                company: values.company,
                new_company: values.new_company,
                transfer_date: formattedDate,
                reallocate_leaves: 0,
                create_new_employee_id: values.create_new_employee_id ? 1 : 0,
                transfer_details: formattedTransfer,
            },
        }

        console.log('Submitting Transfer payload', payload)

        try {
            const res = await apiCreateEmployeeTransfer(payload)
            console.log('Submission successful:', res)
            if (res) {
                form.reset()
                setTableRows([])
            }
        } catch (err) {
            console.error('Submission failed:', err)
        }
        navigate('/concepts/customers/employee-transfer-list')
    }

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">New Employee Transfer</h2>
                <div className="flex gap-2">
                    <Button
                        variant="solid"
                        onClick={() =>
                            navigate(
                                '/concepts/customers/employee-transfer-list',
                            )
                        }
                    >
                        Back
                    </Button>
                    <Button
                        onClick={form.handleSubmit(handleSubmit)}
                        className=""
                    >
                        Save
                    </Button>
                </div>
            </div>

            <div className="p-6 flex flex-col gap-4">
                <EmployeeTransfer form={form} />

                <TransferDetailsTable
                    data={tableRows}
                    setData={setTableRows}
                    propertyListData={propertyListData}
                />
            </div>
        </div>
    )
}

export default EmployeeTransferCreate
