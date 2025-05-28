import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

import EmployeeSeparation from './components/EmployeeSeparation'
import SeparationActivityTable from './components/SeparationActivityTable'
import { apiCreateEmployeeSeparation } from '@/services/EmployeeSeparationService'

const validationSchema = z.object({
    employee: z.string().min(1, 'Employee number is required'),
    employee_name: z.string(),
    company: z.string().min(1, 'Company name is required'),
    status: z.string().nullable(),
    separation: z.string(),
    notify_users_by_email: z.boolean(),
})

export type EmployeeSeparationSchema = z.infer<typeof validationSchema>

const EmployeeSeparationCreate = () => {
    const navigate = useNavigate()
    const [tableRows, setTableRows] = useState<any[]>([])

    const initialForm = {
        employee: '',
        company: '',
        status: '',
        separation: '',
        notify_users_by_email: false,
    }

    const form = useForm<EmployeeSeparationSchema>({
        defaultValues: initialForm,
        resolver: zodResolver(validationSchema),
    })

    const handleSubmit = async (values: EmployeeSeparationSchema) => {
        const formattedActivities = tableRows.map((row) => ({
            activity_name: row.activityName,
            user: row.user,
            begin_on: Number(row.beginOn),
            duration: Number(row.duration),
        }))

        let formattedDate = values.separation
        if (formattedDate && formattedDate.includes('T')) {
            formattedDate = formattedDate.split('T')[0]
        }

        const payload = {
            employee: values.employee,
            company: values.company,
            boarding_begins_on: formattedDate,
            notify_users_by_email: values.notify_users_by_email ? 1 : 0,
            exit_interview: '',
            activities: formattedActivities,
        }

        console.log('Submitting payload', payload)

        try {
            const res = await apiCreateEmployeeSeparation(payload)
            console.log('Submission successful:', res)
            if (res) {
                form.reset()
                setTableRows([])
            }
        } catch (err) {
            console.error('Submission failed:', err)
        }
        navigate('/concepts/customers/employee-separation-list')
    }

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                    New Employee Separation
                </h2>
                <div className="flex gap-2">
                    <Button
                        variant="solid"
                        onClick={() =>
                            navigate(
                                '/concepts/customers/employee-separation-list',
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
                <Card>
                    <EmployeeSeparation form={form} />
                </Card>
                <Card>
                    <SeparationActivityTable
                        data={tableRows}
                        setData={setTableRows}
                    />
                </Card>
            </div>
        </div>
    )
}

export default EmployeeSeparationCreate
