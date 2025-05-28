import { useEffect, useState } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import type { EmployeeFormSchema } from './types'
import Steps from '@/components/ui/Steps'
import Button from '@/components/ui/Button'
import PersonalInfoSection from './components/PersonalInfoSection'
import OrganizationSection from './components/OrganizationSection'
import AdditionalInformation from './components/AdditionalInformation'
import PayRollSection from './components/PayrollSection'
import ProfileImageSection from './components/ProfileImageSection'
import useSWR from 'swr'
import { apiGetEmployeeNameList, apiGetHolidayList } from '@/services/HolidayService'
import { apiGetEmploymentTypeList } from '@/services/EmployementTypeService'
import { apiGetShiftTypeList } from '@/services/ShiftTypeService'
import { apiGetDepartmentList } from '@/services/DepartmentService'
import { apiGetDesignationList } from '@/services/DesignationService'
import { apiGetSalaryStructureList } from '@/services/SalaryStructureService'
import { apiGetCostCenterList } from '@/services/CostCenterService'
import { apiGetGradeList } from '@/services/EmployeeGradeService'

function addMonthsExact(date: Date, months: number): Date {
    const newDate = new Date(date)
    const day = newDate.getDate()

    newDate.setMonth(newDate.getMonth() + months)

    if (newDate.getDate() < day) {
        newDate.setDate(0)
    }

    return newDate
}

type EmployeeFormProps = {
    onFormSubmit: (values: EmployeeFormSchema) => void
    defaultValues?: EmployeeFormSchema
    newEmployee?: boolean
} & CommonProps

const validationSchema: ZodType<EmployeeFormSchema> = z.object({
    //  PersonalInfoFields
    salutation: z.string().optional().nullable(),
    first_name: z.string().min(1, { message: 'First name required' }),
    middle_name: z.string().optional().nullable(),
    last_name: z.string().min(1, { message: 'Last name required' }),
    date_of_birth: z.string().min(1, { message: 'Date of Birth required' }),
    gender: z.string().optional().nullable(),
    // personal_email: z
    //     .string()
    //     .min(1, { message: 'Email required' })
    //     .email({ message: 'Invalid email' }),

    //  ProfileImageFields
    image: z.string().optional().nullable(),
    user_email: z
        .string()
        .min(1, { message: 'Email required' })
        .email({ message: 'Invalid email' }),
    // dialCode: z.string().min(1, { message: 'Please select your country code' }),
    // phoneNumber: z
    //     .string()
    //     .min(1, { message: 'Please input your mobile number' }),

    //  OrganizationFields
    date_of_joining: z.string().min(1, { message: 'Date of Joining required' }),
    effectiveFrom: z.string().optional().nullable(),
    position: z.string().min(1, { message: 'Position required' }),
    orgStructure: z.string().min(1, { message: 'Organization Structure required' }),
    custom_location: z.string().min(1, { message: 'Location required' }),
    department: z.string().optional().nullable(),
    designation: z.string().min(1, { message: 'Designation required' }),
    grade: z.string().min(1, { message: 'Grade required' }),
    payroll_cost_center: z.string().optional().nullable(),
    // officialEmail: z.string().optional().nullable(),
    reports_to: z.string().min(1, { message: 'Reporting Manager required' }),
    custom_functional_manager: z.string().min(1, { message: 'Functional Manager required' }),
    custom_peoples_manager: z.string().min(1, { message: 'People Manager required' }),

    // AdditionalInformationFields
    calendar: z.string().optional().nullable(),
    custom_attendance: z.string().optional().nullable(),
    custom_shift_type: z.string().optional().nullable(),
    custom_shift_group: z.string().optional().nullable(),
    custom_employment_status: z.string().optional().nullable(),
    final_confirmation_date: z.string().optional().nullable(),
    custom_full_part_time: z.string().optional().nullable(),
    custom_contract_type: z.string().optional().nullable(),
    contract_end_date: z.string().optional().nullable(),
    custom_contractor: z.string().optional().nullable(),
    custom_experience_in_category: z.string().optional().nullable(),
    custom_experience_in_months: z.string().optional().nullable(),
    notice_number_of_days: z.string().optional().nullable(),
    custom_secretary: z.string().optional().nullable(),
    custom_old_employee_number: z.string().optional().nullable(),
    originalHireDate: z.string().optional().nullable(),

    //  PayRollfields`
    pan_number: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN number").optional().nullable(),
    custom_pf_number: z.string().optional().nullable(),
    custom_esi_number: z.string().optional().nullable(),
    custom_pt_location: z.string().optional().nullable(),
    custom_gl_code: z.string().optional().nullable(),
    salary_mode: z.string().optional().nullable(),
    custom_applied_from: z.string().optional().nullable(),
    custom_pay_group: z.string().min(1, { message: 'Pay Group required' }),
    custom_salary_structure: z.string().min(1, { message: 'Salary Structure required' }),
})

const CustomerForm = (props: EmployeeFormProps) => {
    const {
        onFormSubmit,
        defaultValues = {} as EmployeeFormSchema,
        newEmployee = false,
        children,
    } = props

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
        setValue,
        setError,
        watch
    } = useForm<EmployeeFormSchema>({
        defaultValues,
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)

            // const hasCustomJoiningDate = Boolean(defaultValues.date_of_joining)
            // const joiningDate = hasCustomJoiningDate
            //     ? new Date(defaultValues.date_of_joining)
            //     : new Date()

            // const confirmationDate = new Date(joiningDate)
            // confirmationDate.setMonth(confirmationDate.getMonth() + 3)

            const joiningDate = defaultValues.date_of_joining
                ? new Date(defaultValues.date_of_joining)
                : new Date()

            const confirmationDate = addMonthsExact(joiningDate, 3)
            const formatted = confirmationDate.toISOString().split('T')[0]

            setValue('final_confirmation_date', formatted)

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues), reset, setValue])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'date_of_joining' && value?.date_of_joining) {
                const joiningDate = new Date(value.date_of_joining)
                // const confirmationDate = new Date(joiningDate)
                const confirmationDate = addMonthsExact(joiningDate, 3)
                confirmationDate.setMonth(confirmationDate.getMonth() + 3)
                const formattedDate = confirmationDate.toISOString().split('T')[0]
                setValue('final_confirmation_date', formattedDate)
            }
        })
        return () => subscription.unsubscribe()
    }, [watch, setValue])

    const onSubmit = (values: EmployeeFormSchema) => {
        onFormSubmit?.(values)
    }

    const employee = useSWR(
        ['/api/resource/Employee/custom_reporting_manager', {}],
        ([_, params]) =>
            apiGetEmployeeNameList<
                { data: { name: string; employee_name: string }[] },
                Record<string, unknown>
            >(params),
        {
            revalidateOnFocus: false,
        },
    )

    const managerList =
        employee.data?.data?.map((holiday) => ({
            value: holiday.name || 'N/A',
            label: `${holiday.employee_name || 'N/A'} (${holiday.name || 'N/A'})`,
        })) || []

    // const { data, error, isLoading, mutate } = useSWR(
    //     ['/api/resource/Holiday List', {}],
    //     ([_, params]) => apiGetHolidayList<{ data: { name: string }[] }, Record<string, unknown>>(params),
    //     {
    //         revalidateOnFocus: false,
    //     }
    // );

    // // const holidayList = data?.data?.map((holiday) => holiday.name) || [];
    // const holidayList = data?.data?.map((holiday) => ({
    //     value: holiday.name,
    //     label: holiday.name,
    // })) || [];

    const { data, error, isLoading, mutate } = useSWR(
        'fetch-all-data',
        async () => {
            const [holidayRes, employmentRes, shiftRes, departmentRes, designationRes, gradeRes, salaryStructureRes, costCenterRes] = await Promise.all([
                apiGetHolidayList<{ data: { name: string }[] }, Record<string, unknown>>({}),
                apiGetEmploymentTypeList<{ data: { name: string }[] }, Record<string, unknown>>({}),
                apiGetShiftTypeList<{ data: { name: string }[] }, Record<string, unknown>>({}),
                apiGetDepartmentList<{ data: { name: string }[] }, Record<string, unknown>>({}),
                apiGetDesignationList<{ data: { name: string }[] }, Record<string, unknown>>({}),
                apiGetGradeList<{ data: { name: string }[] }, Record<string, unknown>>({}),
                apiGetSalaryStructureList<{ data: { name: string }[] }, Record<string, unknown>>({}),
                apiGetCostCenterList<{ data: { name: string }[] }, Record<string, unknown>>({}),
            ]);

            return {
                holidayList: holidayRes?.data || [],
                employmentTypeList: employmentRes?.data || [],
                shiftTypeList: shiftRes?.data || [],
                departmentList: departmentRes?.data || [],
                designationList: designationRes?.data || [],
                gradeList: gradeRes?.data || [],
                salaryStructureList: salaryStructureRes?.data || [],
                costCenterList: costCenterRes?.data || [],
            };
        },
        { revalidateOnFocus: false },
    )

    // Extracting and formatting data
    const holidayList =
        data?.holidayList.map((holiday) => ({
            value: holiday.name,
            label: holiday.name,
        })) || []

    const employmentTypeList =
        data?.employmentTypeList.map((employment) => ({
            value: employment.name,
            label: employment.name,
        })) || []

    const departmentList = data?.departmentList.map((department) => ({
        value: department.name,
        label: department.name,
    })) || [];

    const designationList = data?.designationList.map((designation) => ({
        value: designation.name,
        label: designation.name,
    })) || [];

    const gradeList = data?.gradeList.map((grade) => ({
        value: grade.name,
        label: grade.name,
    })) || [];

    const shiftTypeList = data?.shiftTypeList.map((shift) => ({
        value: shift.name,
        label: shift.name,
    })) || [];

    const salaryStructureList = data?.salaryStructureList.map((salary) => ({
        value: salary.name,
        label: salary.name,
    })) || [];

    const costCenterList = data?.costCenterList.map((costCenter) => ({
        value: costCenter.name,
        label: costCenter.name,
    })) || [];

    const [step, setStep] = useState(0)

    const steps = [
        { component: <PersonalInfoSection control={control} errors={errors} setValue={setValue} /> },
        {
            component:
                <OrganizationSection
                    control={control}
                    errors={errors}
                    setValue={setValue}
                    departmentList={departmentList}
                    designationList={designationList}
                    gradeList={gradeList}
                    isLoading={isLoading}
                    managerList={managerList}
                    costCenterList={costCenterList}
                />
        },
        {
            component: (
                <AdditionalInformation
                    control={control}
                    errors={errors}
                    setValue={setValue}
                    holidayList={holidayList}
                    isLoading={isLoading || employee.isLoading}
                    employmentTypeList={employmentTypeList}
                    shiftTypeList={shiftTypeList}
                />
            ),
        },
        {
            component:
                <PayRollSection
                    control={control}
                    errors={errors}
                    setValue={setValue}
                    salaryStructureList={salaryStructureList}
                    isLoading={isLoading}
                />
        }
    ]

    const onChange = (nextStep: number) => {
        if (nextStep < 0) {
            setStep(0)
        } else if (nextStep > 3) {
            setStep(3)
        } else {
            setStep(nextStep)
        }
    }

    const onNext = () => onChange(step + 1)

    const onPrevious = () => onChange(step - 1)

    return (
        <Form
            id="employeeForm"
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div>
                <Steps current={step}>
                    <Steps.Item title="Personal" />
                    <Steps.Item title="Organization" />
                    <Steps.Item title="additional Information" />
                    <Steps.Item title="Payroll" />
                </Steps>
                <Container>
                    <div className="flex flex-col md:flex-row gap-4 mt-10">
                        <div className="gap-4 flex flex-col flex-auto">
                            {steps[step].component}
                        </div>
                        <div className="md:w-[370px] gap-4 flex flex-col">
                            <ProfileImageSection
                                control={control}
                                errors={errors}
                                setValue={setValue}
                            />
                        </div>
                    </div>
                </Container>
                <div className="my-4 text-right">
                    <Button
                        className="mx-2"
                        disabled={step === 0}
                        onClick={onPrevious}
                        type="button"
                    >
                        Previous
                    </Button>
                    {step < 3 && (
                        <Button variant="solid" onClick={onNext} type="button">
                            Next
                        </Button>
                    )}
                </div>
            </div>
            {step === 3 && <BottomStickyBar>{children}</BottomStickyBar>}
        </Form>
    )
}

export default CustomerForm
