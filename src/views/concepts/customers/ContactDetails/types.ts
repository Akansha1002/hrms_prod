import type { Control, FieldErrors } from 'react-hook-form'

export type ContactDetailsFields = {
    permanent_address_1: string;
    permanent_address_2?: string;
    permanent_address_country?: string;
    permanent_address_region?: string;
    permanent_address_state?: string;
    permanent_address_state_name?: string;
    permanent_address_city?: string;
    permanent_address_zip_code?: string;
    permanent_address_contact_number?: string;

    current_address_1?: string;
    current_address_2?: string;
    current_address_country?: string;
    current_address_region?: string;
    current_address_state?: string;
    current_address_state_name?: string;
    current_address_city?: string;
    current_address_zip_code?: string;
    current_address_contact_number?: string;

    home_telephone?: string;
    extension_number?: string;
    personal_email?: string;
    work_mobile_number?: string;
    preferred_email_language?: string;
    personal_mobile_number?: string;
    work_telephone?: string;
    work_email?: string;
    fax_number?: string;
}

export type GetContactDetailsResponse = {
    data: ContactDetailsFields
}

export type ContactDetailsSchema = ContactDetailsFields

export type FormSectionBaseProps = {
    control: Control<ContactDetailsSchema>
    errors: FieldErrors<ContactDetailsSchema>
}
