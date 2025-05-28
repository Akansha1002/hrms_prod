import { useMemo } from 'react'
import DraggableTable from '@/components/shared/DndDataTable'
import type { ColumnDef } from '@tanstack/react-table'
import { Card } from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import useSWR from 'swr'
import { apiGetEmployeeNameList } from '@/services/HolidayService'
import Select from '@/components/ui/Select'

interface TransferDetails {
    property: string
    current: string
    new: string
    _isSelected?: boolean
}

function getOptions(
    property: string,
    employeeData: { value: string; label: string; name: string }[],
): { value: string; label: string }[] {
    switch (property) {
        case 'Functional Manager':
        case 'Reporting Manager':
        case 'Peoples Manager':
        case 'Reports to':
        case 'Expense Approver':
        case 'Leave Approver':
            return employeeData.map((emp) => ({
                value: emp.value,
                label: emp.label,
            }))
        default:
            return []
    }
}

function TransferDetailsTable(props: {
    data: TransferDetails[]
    setData: (updated: TransferDetails[]) => void
    propertyListData: { value: string; label: string; current: string }[]
}) {
    const { data, setData, propertyListData } = props

    const { data: employeeNameData, isLoading } = useSWR(
        'fetch-all-data',
        async () => {
            const [employeeRes] = await Promise.all([
                apiGetEmployeeNameList<
                    { data: { name: string; employee_name: string }[] },
                    Record<string, unknown>
                >({}),
            ])

            return {
                employeeNameList: employeeRes?.data || [],
            }
        },
        { revalidateOnFocus: false },
    )

    const employeeNameList =
        employeeNameData?.employeeNameList?.map((emp) => ({
            value: emp.name,
            label: `${emp.employee_name} (${emp.name})`,
            name: emp.employee_name,
        })) || []

    const columns: ColumnDef<TransferDetails>[] = useMemo(
        () => [
            {
                header: () => (
                    <span>
                        Property <span className="text-red-500">*</span>
                    </span>
                ),
                accessorKey: 'property',
                cell: ({ row }) => {
                    const value = row.original.property
                    return (
                        <select
                            value={value || ''}
                            onChange={(e) => {
                                const updated = [...data]
                                const selectedValue = e.target.value
                                updated[row.index].property = selectedValue

                                const matched = propertyListData.find(
                                    (item) => item.value === selectedValue,
                                )
                                updated[row.index].current =
                                    matched?.current || ''
                                updated[row.index].new = ''
                                setData(updated)
                            }}
                            className="w-full px-2 py-1 border rounded"
                        >
                            <option value="" disabled>
                                {isLoading ? 'Loading...' : 'Select Property'}
                            </option>
                            {propertyListData.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    )
                },
            },
            {
                header: () => <span>Current</span>,
                accessorKey: 'current',
                cell: ({ row }) => {
                    return (
                        <Input
                            value={row.original.current}
                            readOnly
                            className="w-full"
                            placeholder="Current"
                        />
                    )
                },
            },
            {
                header: () => <span>New</span>,
                accessorKey: 'new',
                cell: ({ row }) => {
                    const selectedProperty = row.original.property
                    const options = getOptions(
                        selectedProperty,
                        employeeNameList,
                    )

                    if (options.length > 0) {
                        return (
                            <select
                                value={row.original.new || ''}
                                onChange={(e) => {
                                    const updated = [...data]
                                    updated[row.index].new = e.target.value
                                    setData(updated)
                                }}
                                className="w-full px-2 py-1 border rounded"
                            >
                                <option value="" disabled>
                                    Select option
                                </option>
                                {options.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        )
                    } else {
                        return (
                            <Input
                                value={row.original.new}
                                onChange={(e) => {
                                    const updated = [...data]
                                    updated[row.index].new = e.target.value
                                    setData(updated)
                                }}
                                placeholder="New"
                                className="w-full"
                                readOnly
                            />
                        )
                    }
                },
            },
        ],
        [data, setData, employeeNameList, propertyListData],
    )

    const defaultRowObject = {
        property: '',
        current: '',
        new: '',
    }

    if (!data) return <div>Loading...</div>

    return (
        <Card>
            <div className="mb-4">
                <h6>Transfer</h6>
                <p>Transfer Details</p>
            </div>

            <DraggableTable
                data={data}
                setData={setData}
                columns={columns}
                defaultRowObject={defaultRowObject}
                addButtonText="Add Row"
                emptyStateMessage={
                    <div className="flex flex-col items-center gap-4">
                        <span className="font-semibold">No data</span>
                    </div>
                }
            />
        </Card>
    )
}

export default TransferDetailsTable
