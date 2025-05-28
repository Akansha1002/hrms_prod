import { useEffect, useState } from 'react'
import { Form } from '@/components/ui/Form'
import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import { ProofSubmissionFormSchema } from './types'
import EmployeeSection from './components/EmployeeSection'
import ExemptionProofs from './components/ExemptionProofs'
import HRAExemption from './components/HRAExemption'
import useSWR from 'swr'
import { apiGetEmployeeNameList } from '@/services/HolidayService'
import { apiGetCompany, apiGetEmployeeTaxExemptionSubCategories, apiGetPayrollPeriod } from '@/services/TaxExemptionDeclarationService'

const { TabNav, TabList, TabContent } = Tabs

type ProofSubmissionFormProps = {
    onFormSubmit: (values: ProofSubmissionFormSchema) => void
    defaultValues?: ProofSubmissionFormSchema
} & CommonProps

const validationSchema: ZodType<ProofSubmissionFormSchema> = z.object({
    //employee
    employee: z.string().min(1, 'Employee is required'),
    currency: z.string().min(1, 'Currency is required'),
    payroll_period: z.string().min(1, 'Payroll Period is required'),
    company: z.string().min(1, 'Company is required'),
    submission_date: z.string().min(1, 'Submission date is required'),

    //House Rent Allowance
    house_rent_payment_amount: z.string().optional(),
    rented_in_metro_city: z.boolean().optional(),
    rented_from_date: z.string().optional(),
    rented_to_date: z.string().optional(),

    //Exemption Proofs
    tax_exemption_proofs: z.array(
        z.object({
            // exemption_sub_category: z.string().min(1, 'Sub category is required'),
            // exemption_category: z.string().min(1, 'Category is required'),
            // max_amount: z.string().min(1, 'Max amount must be >= 0'),
            // type_of_proof: z.string().min(1, 'Proof type is required'),
            exemption_sub_category: z.string().optional(),
            exemption_category: z.string().optional(),
            max_amount: z.string().optional(),
            amount: z.string().optional(),
            type_of_proof: z.string().optional(),
            attach_proof: z.string().optional(),
        })).optional()
})


const ProofSubmissionForm = (props: ProofSubmissionFormProps) => {
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
    } = useForm<ProofSubmissionFormSchema>({
        defaultValues: {
            currency: 'INR',
            tax_exemption_proofs: [],
            ...defaultValues,
        },
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'tax_exemption_proofs',
    })

    const { data, isLoading } = useSWR(
        'fetch-all-data',
        async () => {
            const [employeeRes, payrollPeriodRes, companyRes, currencyRes, subCategoryRes] = await Promise.all([
                apiGetEmployeeNameList<{ data: { name: string; employee_name: string }[] }, Record<string, unknown>>({}),
                apiGetPayrollPeriod<{ data: { name: string }[] }>(),
                apiGetCompany<{ data: { name: string }[] }>(),
                apiGetEmployeeTaxExemptionSubCategories<{ data: { name: string }[] }>(),
                apiGetEmployeeTaxExemptionSubCategories<{ data: { name: string; exemption_category: string; max_amount: string }[] }>(),
            ]);

            return {
                employeeNameList: employeeRes?.data || [],
                payrollPeriodList: payrollPeriodRes?.data || [],
                companyList: companyRes?.data || [],
                currencyList: currencyRes?.data || [],
                subCategoryList: subCategoryRes?.data || [],
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

    const payrollPeriodList =
        data?.payrollPeriodList?.map((period) => ({
            value: period.name,
            label: period.name,
        })) || []

    const companyList =
        data?.companyList?.map((company) => ({
            value: company.name,
            label: company.name,
        })) || []

    const subCategoryList =
        data?.subCategoryList?.map((subCategory) => ({
            value: subCategory.name,
            label: subCategory.name,
            category: subCategory.exemption_category,
            max_amount: subCategory.max_amount,
        })) || []

    const onSubmit = (values: ProofSubmissionFormSchema) => {
        onFormSubmit?.(values)
    }

    const [employeeName, setEmployeeName] = useState<string>('')

    return (
        <Form
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container>
                <Card className="w-full">
                    <Tabs defaultValue="employee" >
                        <TabList>
                            <TabNav value="employee">Employee</TabNav>
                            <TabNav value="exemptionProofs">Exemption Proofs</TabNav>

                        </TabList>
                        <div className="p-4">
                            <TabContent value="employee">
                                {<EmployeeSection
                                    control={control}
                                    errors={errors}
                                    employeeData={employeeNameList}
                                    employeeName={employeeName}
                                    setEmployeeName={setEmployeeName}
                                    payrollPeriodList={payrollPeriodList}
                                    companyList={companyList}
                                    isLoading={isLoading}
                                // setValue={setValue}
                                />}
                            </TabContent>
                            <TabContent value="exemptionProofs">
                                <div className="gap-4 flex flex-col flex-auto">
                                    {<ExemptionProofs
                                        control={control}
                                        fields={fields}
                                        append={append}
                                        remove={remove}
                                        subCategoryList={subCategoryList}
                                        isLoading={isLoading}
                                    />}
                                    {<HRAExemption
                                        control={control}
                                        errors={errors}
                                    />}
                                </div>
                            </TabContent>
                        </div>
                    </Tabs>
                </Card>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default ProofSubmissionForm