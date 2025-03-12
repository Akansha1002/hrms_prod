export type PayRollfields = {
    pan: string
    pfApplicable?: boolean
    pfNumber: string
    esiApplicable?: boolean
    esiNumber: string
    ptApplicable?: boolean
    ptLocation: string
    glCode: string
    payMode: string
    appliedFrom: string
    payGroup: string
}

export type EmployeeMovementSchema = PayRollfields