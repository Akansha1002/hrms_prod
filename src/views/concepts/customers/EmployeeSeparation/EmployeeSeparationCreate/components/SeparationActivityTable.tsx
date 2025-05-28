import { useMemo } from 'react'
import DraggableTable from '@/components/shared/DndDataTable'
import useSWR from 'swr'
import { apiGetEmployeeNameList } from '@/services/EmployeeSeparationService'
import type { ColumnDef } from '@tanstack/react-table'
import Card from '@/components/ui/Card'

// Define the interface for our table data
interface SeparationActivity {
    activityName: string
    user: string
    beginOn: string
    duration: string
    _isSelected?: boolean
}

function SeparationActivityTable(props) {
    const { data, setData } = props

    const {
        data: employeeData,
        error,
        isLoading: isEmployeeLoading,
    } = useSWR(
        ['/api/resource/Employee?fields=["name","employee_name", "user_id"]', {}],
        ([_, params]) =>
            apiGetEmployeeNameList<
                { data: { name: string; employee_name: string ; user_id: string }[] },
                Record<string, unknown>
            >(params),
        { revalidateOnFocus: false },
    )

    // Transform Data for Dropdown
    const employeeOptions =
        employeeData?.data?.map((emp) => ({
            value: emp.name,
            label: emp.user_id,
            employee_name: emp.employee_name,
        })) || []

        console.log("empoloyeeData",employeeData)
    // Define columns for the table
    const columns: ColumnDef<SeparationActivity>[] = useMemo(
        () => [
            {
                header: () => (
                    <span>
                        Activity Name <span className="text-red-500">*</span>
                    </span>
                ),
                accessorKey: 'activityName',
            },
            {
                header: () => <span>User</span>,
                accessorKey: 'user',
                cell: ({ row }) => {
                    const value = row.getValue('user')
                    return (
                        <select
                            value={value as string}
                            onChange={(e) => {
                                // Update the table data directly
                                const newData = [...data]
                                newData[row.index].user = e.target.value
                                setData(newData)
                            }}
                        >
                            <option value="">Select User</option>
                            {isEmployeeLoading ? (
                                <option value="">Loading...</option>
                            ) : (
                                employeeOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))
                            )}
                        </select>
                    )
                },
            },
            {
                header: () => <span>Begin On (Days)</span>,
                accessorKey: 'beginOn',
            },
            {
                header: () => <span>Duration (Days)</span>,
                accessorKey: 'duration',
            },
        ],
        [data, employeeOptions, isEmployeeLoading, setData],
    )

    // Define default row object
    const defaultRowObject = {
        activityName: '',
        user: '',
        beginOn: '',
        duration: '',
    }

    if (!data) return <div>Loading...</div>

    return (
        <>
            <div className="mb-4">
                <h6>Separation</h6>
                <p>Separation Activity</p>
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
        </>
    )
}

export default SeparationActivityTable
