import React, { useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Form } from '@/components/ui/Form'
import { FormItem } from '@/components/ui/Form'
import { AppraisalFormProps } from './Appraisal'
import { Controller } from 'react-hook-form'
import { Select } from '@/components/ui/Select'
import Checkbox from '@/components/ui/Checkbox'
import KRAGoalsTable from './KRAGoalsTable'
import Input from '@/components/ui/Input' // assuming this exists
import {
    apiGetAppraisalTemplateByName,
    apiGetAppraisalTemplateList,
} from '@/services/AppraisalService'
import useSWR from 'swr'
export const KRAs = ({
    control,
    errors,
    data,
    watch,
    setValue,
    table,
    setTable,
    ratingTable,
    setRatingTable,
}: AppraisalFormProps) => {
    const selectedTemplate = watch('appraisalTemplate')

    const {
        data: appraisalTemplateData,
        isLoading: isAppraisalTemplateLoading,
    } = useSWR(
        '/api/resource/Appraisal Template',
        () => apiGetAppraisalTemplateList(),
        { revalidateOnFocus: false },
    )

    console.log('appraisalTemplateData', appraisalTemplateData)
    const appraisalTemplateOption =
        appraisalTemplateData?.data?.map((data) => ({
            value: data.name,
            label: data.template_title,
        })) || []
    console.log('appraisalTemplateOption', appraisalTemplateOption)

    const { data: selectedTemplateData, isLoading: isSelectedTemplateLoading } =
        useSWR(
            selectedTemplate
                ? `/api/resource/Appraisal Template/${selectedTemplate}`
                : null,
            () => apiGetAppraisalTemplateByName(selectedTemplate),
            { revalidateOnFocus: false },
        )

    console.log('selectedTemplateData', selectedTemplateData)

    useEffect(() => {
        if (selectedTemplateData?.data) {
            // Update KRA Table
            if (selectedTemplateData.data.goals?.length) {
                const goalsFromTemplate = selectedTemplateData.data.goals.map(
                    (goal) => ({
                        id: goal.name,
                        no: goal.no,
                        kra: goal.key_result_area,
                        weightage: goal.per_weightage,
                        goal_completion: 0,
                        goal_score: 0,
                    }),
                )
                setTable(goalsFromTemplate)
            }

            // Update Ratings Table
            if (selectedTemplateData.data.rating_criteria?.length) {
                const ratingsFromTemplate =
                    selectedTemplateData.data.rating_criteria.map((item) => ({
                        id: item.name,
                        no: item.no,
                        criteria: item.criteria,
                        weightage: item.per_weightage,
                        rating: item.rating ?? 0,
                    }))
                setRatingTable([...ratingsFromTemplate])
            }
        }
    }, [selectedTemplateData])

    return (
        <>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    invalid={Boolean(errors.reports_to)}
                    errorMessage={errors.reports_to?.message}
                    label="Appraisal Template"
                >
                    <Controller
                        name="appraisalTemplate"
                        control={control}
                        render={({ field }) => (
                            <Select
                                options={
                                    isAppraisalTemplateLoading
                                        ? [{ value: '', label: 'Loading...' }]
                                        : appraisalTemplateOption
                                }
                                value={
                                    appraisalTemplateOption.find(
                                        (opt) => opt.value === field.value,
                                    ) || null
                                }
                                onChange={(option) =>
                                    field.onChange(option ? option.value : '')
                                }
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    invalid={Boolean(errors.reports_to)}
                    errorMessage={errors.reports_to?.message}
                    label="Rate Goals Manually"
                >
                    <Controller
                        name="rateGoalsManually"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                checked={!!field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </FormItem>
            </div>

            <div>
                <KRAGoalsTable data={table} setData={setTable} />
            </div>

            <div>
                {selectedTemplate && (
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <FormItem label="Goal Score">
                            <Controller
                                name="goalScore"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="number"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </FormItem>

                        <FormItem label="Total Goal Score">
                            <Controller
                                name="totalGoalScore"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="number"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </FormItem>
                    </div>
                )}
            </div>
        </>
    )
}
