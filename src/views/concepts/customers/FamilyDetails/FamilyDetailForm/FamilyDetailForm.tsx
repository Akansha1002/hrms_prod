import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import { FamilyDetailsSchema } from './types'
import DetailSection from './components/DetailSection'

type FamilyDetailsProps = {
    onFormSubmit: (values: FamilyDetailsSchema) => void
    defaultValues?: FamilyDetailsSchema
} & CommonProps

const validationSchema: ZodType<FamilyDetailsSchema> = z.object({
    relationship: z.string().min(1, { message: 'Relationship is required' }),
    relationship_dob: z.string().optional(),
    relationship_dependant: z.string().optional(),
    relationship_minor: z.string().optional(),
    relationship_guardian_address: z.string().optional(),
    relationship_contact_number: z.string().optional(),
    relationship_passport_number: z.string().optional(),
    relationship_insured: z.string().optional(),
    relationship_other_insurance: z.string().optional(),
    relationship_graduation_date: z.string().optional(),
    relationship_ssn: z.string().optional(),
    relationship_comments: z.string().optional(),

    relation_name: z.string().min(1, { message: 'Relation name is required' }),
    relation_gender: z.string().optional(),
    relation_address: z.string().optional(),
    relation_guardian_name: z.string().optional(),
    relation_guardians_relation_with_nominee: z.string().optional(),
    relation_name_as_in_passport: z.string().optional(),
    relation_place_of_issue: z.string().optional(),
    relation_smoker: z.string().optional(),
    relation_student: z.string().optional(),
    relation_nationality: z.string().optional(),
    relation_passport_issue_date: z.string().optional(),
    relation_passport_expiry_date: z.string().optional(),
    relation_place_of_birth: z.string().optional(),
    relation_ecnr_required: z.string().optional(),
    relationship_occupation: z.string().optional(),
})

const FamilyDetailForm = (props: FamilyDetailsProps) => {
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
    } = useForm<FamilyDetailsSchema>({
        defaultValues,
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: FamilyDetailsSchema) => {
        onFormSubmit?.(values)
    }

    return (
        <Form
            // id='familyDetailForm'
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container>
                <div className="flex items-center justify-between">
                    <div className="gap-4 flex flex-col flex-auto">
                        <DetailSection control={control} errors={errors} data={defaultValues} />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default FamilyDetailForm
