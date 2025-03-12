import type { Control, FieldErrors } from 'react-hook-form'

export type DrivingLicenseFields = {
    name_as_in_driving_license?: string;
    driving_license_number?: string;
    place_of_issue?: string;
    issue_date?: string;
    valid_till?: string;
}

export type GetDrivingLicenseResponse = {
    data: DrivingLicenseFields
}

export type DrivingLicenseSchema = DrivingLicenseFields

export type FormSectionBaseProps = {
    control: Control<DrivingLicenseSchema>
    errors: FieldErrors<DrivingLicenseSchema>
}
