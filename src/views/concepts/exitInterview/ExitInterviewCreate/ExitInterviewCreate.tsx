import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import ExitInterview from './components/ExitInterview'
import { Card } from '@/components/ui/Card'
import { createExitInterview } from '@/services/ExitInterviewService'

const schema = z.object({
    employee: z.string().min(1, 'Employee is required'),
    employee_name: z.string(),
    company: z.string(),
    status: z.string(),
    date: z.string().optional(),
    reference_document_type: z.string().optional(),
    reference_document_name: z.string().optional(),
    questionnaire_email_sent: z.boolean().optional(),
    interviewers: z.array(z.string()).optional(),
    interview_summary: z.string().optional(),
    final_decision: z.string().optional(),
})

export type ExitInterviewSchema = z.infer<typeof schema>

const ExitInterviewCreate = () => {
    const navigate = useNavigate()
    const form = useForm<ExitInterviewSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            employee: '',
            company: '',
            status: 'Pending',
            questionnaire_email_sent: false,
        },
    })

    const onSubmit = async (values: ExitInterviewSchema) => {
        const payload = {
            docstatus: 0,
            naming_series: '',
            employee: values.employee,
            employee_name: values.employee_name,
            company: values.company,
            status: values.status,
            date: values.date?.split('T')[0],
            reference_document_type: values.reference_document_type,
            reference_document_name: values.reference_document_name,
            questionnaire_email_sent: values.questionnaire_email_sent ? 1 : 0,
            interview_summary: values.interview_summary,
            interviewers: values.interviewers
                ? values.interviewers.map((user) => ({ user }))
                : [],
            final_decision: values.final_decision,
        }

        console.log('Exit Interview Payload:', payload)

        try {
            const response = await createExitInterview(payload)
            console.log('Exit Interview Created:', response)
        } catch (error) {
            console.error('Failed to create exit interview:', error)
        }
    }

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">New Exit Interview</h2>
                <div className="flex gap-2">
                    <Button
                        variant="solid"
                        onClick={() => navigate('/concepts/exitInterview/list')}
                    >
                        Back
                    </Button>
                    <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
                </div>
            </div>

            <Card className="p-6 space-y-4">
                <ExitInterview form={form} />
            </Card>
        </div>
    )
}

export default ExitInterviewCreate
