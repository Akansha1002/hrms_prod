import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { z } from 'zod'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

import EmployeeAttendance from './components/EmployeeAttendance'
import { createAttendanceEntry } from '@/services/AttendanceService'

const AttendanceSchema = z.object({
    series: z.string(),
    attendance_date: z.string(),
    employee: z.string(),
    company: z.string(),
    status: z.string(),
    regularization_required: z.boolean().optional(),
    shift: z.string().optional(),
    late_entry: z.boolean().optional(),
    early_exit: z.boolean().optional(),
    employee_name: z.string().optional(),
})

export type AttendanceSchema = z.infer<typeof AttendanceSchema>

const initialFormValues: AttendanceSchema = {
    series: '',
    attendance_date: '',
    employee: '',
    company: '',
    status: 'Present',
    regularization_required: false,
    shift: '',
    late_entry: false,
    early_exit: false,
    employee_name: '',
}

const EmployeeAttendanceCreate = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const form = useForm<AttendanceSchema>({
        defaultValues: initialFormValues,
        resolver: zodResolver(AttendanceSchema),
    })

    const handleSubmit = async (values: AttendanceSchema) => {
        const payload = {
            employee: values.employee,
            status: values.status,
            docstatus: 1,
            attendance_date: values.attendance_date.split('T')[0], // ensure it's in YYYY-MM-DD
            company: values.company,
            custom_regularization_required:
                values.regularization_required || false,
            shift: values.shift || '',
            late_entry: values.late_entry || false,
            early_exit: values.early_exit || false,
            in_time: '',
            out_time: '',
        }

        console.log('Submitting payload', payload)

        try {
            setLoading(true)
            const result = await createAttendanceEntry(payload)
            console.log('Submission successful:', result)
            form.reset()
            navigate('/concepts/customers/employee-attendance-list')
        } catch (err) {
            console.error('Submission error:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">New Attendance Entry</h2>
                <div className="flex gap-2">
                    <Button
                        variant="solid"
                        onClick={() =>
                            navigate(
                                '/concepts/customers/employee-attendance-list',
                            )
                        }
                    >
                        Back
                    </Button>
                    <Button
                        onClick={form.handleSubmit(handleSubmit)}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </div>

            <Card className="p-6">
                <EmployeeAttendance form={form} />
            </Card>
        </div>
    )
}

export default EmployeeAttendanceCreate
