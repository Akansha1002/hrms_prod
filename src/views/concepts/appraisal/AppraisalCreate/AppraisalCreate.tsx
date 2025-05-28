import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'

import { Card } from '@/components/ui/Card'
import { apiCreateAppraisal } from '@/services/AppraisalService'
import Appraisal from './components/Appraisal'
import { useState } from 'react'

const schema = z.object({
    series: z.string().min(1, 'Series is required'),
    company: z.string().min(1, 'Company is required'),
    employee: z.string().min(1, 'Employee is required'),
    employee_name: z.string(),
    status: z.string().min(1, 'Status is required'),
    appraisalCycle: z.string().optional(),
    appraisalTemplate: z.string().optional(),
    rateGoalsManually: z.boolean().optional(),
    goalScore: z.string().optional(),
    totalGoalScore: z.string().optional(),
    totalSelfScore: z.string().optional(),
})

export type AppraisalSchema = z.infer<typeof schema>

const AppraisalCreate = () => {
    const navigate = useNavigate()

    const [kraTableRows, setKraTableRows] = useState<any[]>([])
    const [ratingTableRows, setRatingTableRows] = useState<any[]>([])

    const form = useForm<AppraisalSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            employee: '',
            company: '',
            status: 'Pending',
        },
    })

    const onSubmit = async (values: AppraisalSchema) => {
        console.log('onSubmit called with data:', values)
        const payload = {
            employee: values.employee,
            employee_name: values.employee_name,
            company: values.company,
            appraisal_cycle: values.appraisalCycle ?? '',
            appraisal_template: values.appraisalTemplate,
            rate_goals_manually: values.rateGoalsManually ? 1 : 0,
            reflections: '',

            appraisal_kra: kraTableRows.map((row) => ({
                kra: row.kra || '',
                per_weightage: Number(row.weightage) || 0,
                goal_completion: Number(row.goalCompletion) || 0,
                goal_score: Number(row.goalScore) || 0,
            })),

            self_ratings: ratingTableRows.map((row) => ({
                criteria: row.criteria || '',
                per_weightage: Number(row.per_weightage) || 0,
                rating: Number(row.rating) || 0,
            })),

            goals: [],
        }

        console.log('Appraisal Payload:', payload)

        // try {
        //     const response = await apiCreateAppraisal(payload)
        //     console.log('Appraisal Created:', response)
        // } catch (error) {
        //     console.error('Failed to create appraisal:', error)
        // }
    }

    const handleSave = form.handleSubmit(onSubmit)
    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">New Appraisal</h2>
                <div className="flex gap-2">
                    <Button
                        variant="solid"
                        onClick={() => navigate('/concepts/appraisal/list')}
                    >
                        Back
                    </Button>
                    <Button
                        onClick={() => {
                            form.handleSubmit(onSubmit, (errors) => {
                                console.warn(
                                    '❌ Form validation failed:',
                                    errors,
                                )
                            })()
                        }}
                    >
                        Save
                    </Button>
                </div>
            </div>

            <Card className="p-6 space-y-4">
                <Appraisal
                    form={form}
                    kraTableRows={kraTableRows}
                    setKraTableRows={setKraTableRows}
                    ratingTableRows={ratingTableRows}
                    setRatingTableRows={setRatingTableRows}
                />
            </Card>
        </div>
    )
}

export default AppraisalCreate
