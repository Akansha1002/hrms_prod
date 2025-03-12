import type { Control, FieldErrors } from 'react-hook-form'

export type PermanentAddressFields = {
    // permanentAddress1: string
}

export type LeaveFormSchema = PermanentAddressFields

export type FormSectionBaseProps = {
    control: Control<LeaveFormSchema>
    errors: FieldErrors<LeaveFormSchema>
}
