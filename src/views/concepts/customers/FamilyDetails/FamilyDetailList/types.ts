export type FamilyDetail = {
    name: string;
    id: string;
    relationship: string;
    relationship_dob?: string;
    relationship_dependant?: string;
    relationship_minor?: string;
    relationship_guardian_address?: string;
    relationship_contact_number?: string;
    relationship_passport_number?: string;
    relationship_insured?: string;
    relationship_other_insurance?: string;
    relationship_graduation_date?: string;
    relationship_ssn?: string;
    relationship_comments?: string;
    relation_name: string;
    relation_gender?: string;
    relation_address?: string;
    relation_guardian_name?: string;
    relation_guardians_relation_with_nominee?: string;
    relation_name_as_in_passport?: string;
    relation_place_of_issue?: string;
    relation_smoker?: string;
    relation_student?: string;
    relation_nationality?: string;
    relation_passport_issue_date?: string;
    relation_passport_expiry_date?: string;
    relation_place_of_birth?: string;
    relation_ecnr_required?: string;
    employee_number?: string;
    relationship_occupation?: string;
};

export type GetFamilyDetailFormResponse = {
    data: FamilyDetail;
};