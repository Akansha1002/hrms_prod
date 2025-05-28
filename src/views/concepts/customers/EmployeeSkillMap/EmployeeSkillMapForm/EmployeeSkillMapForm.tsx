import { useEffect, useState } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import useSWR from 'swr'
import EmployeeInfoSection from './components/EmployeeInfoSection'
import SkillDetailsTable from './components/SkillDetailsTable'
import TrainingDetailsTable from './components/TrainingDetailsTable'
import { EmployeeSkillMapFormSchema, SkillDetailsTableData, TrainingDetailsTableData } from './types'
import { apiGetEmployeeNameList } from '@/services/HolidayService'
import { apiGetSkillList, apiGetTrainingEventList } from '@/services/EmployeeSkillMapService'

type EmployeeSkillMapFormProps = {
    onFormSubmit: (values: EmployeeSkillMapFormSchema) => void
    defaultValues?: EmployeeSkillMapFormSchema
} & CommonProps

const validationSchema: ZodType<EmployeeSkillMapFormSchema> = z.object({
    // Employee Info
    employee: z.string().min(1, { message: 'Employee is required' }),

    // Skill Details Table
    employee_skills: z.array(
        z.object({
            skill: z.string().min(1, { message: 'Skill is required' }),
            proficiency: z.number().min(1, { message: 'Proficiency is required' }),
            evaluation_date: z.string().optional(),
        })
    ),

    // Training Details Table
    trainings: z.array(
        z.object({
            training: z.string().optional(),
            training_date: z.string().optional(),
        })
    )
})

const EmployeeSkillMapForm = (props: EmployeeSkillMapFormProps) => {

    const {
        onFormSubmit,
        defaultValues = {},
        children,
    } = props

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<EmployeeSkillMapFormSchema>({
        defaultValues: {
            employee_skills: [],
            trainings: [],
            ...defaultValues,
        },
        resolver: zodResolver(validationSchema),
    })

    const [employeeSkills, setEmployeeSkills] = useState<SkillDetailsTableData[]>([])
    const [trainings, setTrainings] = useState<TrainingDetailsTableData[]>([])


    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    // const { fields, append, remove } = useFieldArray({
    //     control,
    //     name: 'employee_skills , trainings',
    // })

    // Employee skills field array
    const {
        fields: employeeSkillFields,
        append: appendEmployeeSkill,
        remove: removeEmployeeSkill
    } = useFieldArray({
        control,
        name: 'employee_skills'
    })

    // Trainings field array
    const {
        fields: trainingFields,
        append: appendTraining,
        remove: removeTraining
    } = useFieldArray({
        control,
        name: 'trainings'
    })


    const { data, isLoading } = useSWR(
        'fetch-all-data',
        async () => {
            const [employeeRes, skillRes, trainingRes] = await Promise.all([
                apiGetEmployeeNameList<{ data: { name: string; employee_name: string }[] }, Record<string, unknown>>({}),
                apiGetSkillList<{ data: { name: string }[] }, Record<string, unknown>>({}),
                apiGetTrainingEventList<{ data: { name: string; end_time: string }[] }, Record<string, unknown>>({}),
            ]);

            return {
                employeeNameList: employeeRes?.data || [],
                skillNameList: skillRes?.data || [],
                trainingNameList: trainingRes?.data || [],
            };
        },
        { revalidateOnFocus: false },
    )

    const employeeNameList =
    data?.employeeNameList?.map((emp) => ({
        value: emp.name,
        label: `${emp.employee_name} (${emp.name})`,
        name: emp.employee_name,
    })) || []
    
    const skillNameList =
        data?.skillNameList?.map((shift) => ({
            value: shift.name,
            label: shift.name,
        })) || []
        
        const trainingNameList =
        data?.trainingNameList?.map((train) => ({
            value: train.name,
            label: train.name,
            end_time: train.end_time,
        })) || []

    const onSubmit = (values: EmployeeSkillMapFormSchema) => {
        onFormSubmit?.({
            ...values,
        })
    }

    return (
        <Form
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container>
                <div className="flex items-center justify-between">
                    <div className="gap-4 flex flex-col flex-auto">
                        <EmployeeInfoSection
                            control={control}
                            errors={errors}
                            employeeData={employeeNameList}
                            isLoading={isLoading}
                        />
                        <SkillDetailsTable
                            control={control}
                            fields={employeeSkillFields}
                            append={appendEmployeeSkill}
                            remove={removeEmployeeSkill}
                            skillNameList={skillNameList}
                            isLoading={isLoading}
                        // data={employeeSkills}
                        />
                        <TrainingDetailsTable
                            control={control}
                            fields={trainingFields}
                            append={appendTraining}
                            remove={removeTraining}
                            trainingNameList={trainingNameList}
                            isLoading={isLoading}
                            // data={trainings}
                            // setData={setTrainings}
                        />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default EmployeeSkillMapForm