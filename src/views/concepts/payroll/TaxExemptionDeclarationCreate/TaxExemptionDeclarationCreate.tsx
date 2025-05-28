import Tabs from '@/components/ui/Tabs'

import Details from './components/Details'
import DeclarationTable from './components/DeclarationTable'
import HRAExemption from './components/HRAExemption'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { apiCreateEmployeeTaxDeclarations } from '@/services/TaxExemptionDeclarationService'
const { TabNav, TabList, TabContent } = Tabs

const validationSchema = z.object({
    employee: z.string().min(1, 'Employee number is required'),
    employee_name: z.string(),
    company: z.string().nullable(),
    payroll_period: z.string(),
    currency: z.string(),
    monthly_house_rent: z.number().nullable(),
    rented_in_metro_city: z.boolean().nullable(),
    salary_structure_hra: z.number().nullable(),
    annual_hra_exemption: z.number().nullable(),
    monthly_hra_exemption: z.number().nullable(),
    total_declared_amount: z.number().nullable(),
    total_exemption_amount: z.number().nullable(),
})

export type DetailsSchema = z.infer<typeof validationSchema>

const TaxExemptionDeclarationCreate = () => {
    const navigate = useNavigate()
    const [tableRows, setTableRows] = useState<any[]>([])

    const initialForm = {
        employee: '',
        company: '',
        payroll_period: '',
        currency: 'INR',
        monthly_house_rent: 0,
        rented_in_metro_city: false,
        salary_structure_hra: 0,
        annual_hra_exemption: 0,
        monthly_hra_exemption: 0,
        total_declared_amount: 0,
        total_exemption_amount: 0,
        declarations: [],
    }
    const form = useForm<DetailsSchema>({
        defaultValues: initialForm,
        resolver: zodResolver(validationSchema),
    })

    const handleSubmit = async (values: DetailsSchema) => {
        // Transform table rows into expected API format
        const formattedDeclarations = tableRows.map((row) => ({
            exemption_sub_category: row.exemptionSubCategory,
            exemption_category: row.exemptionCategory,
            max_amount: Number(row.maxExemptedAmount) || 0,
            amount: Number(row.declaredAmount) || 0,
        }))

        const payload = {
            data: {
                employee: values.employee,
                employee_name: values.employee_name,
                company: values.company,
                payroll_period: values.payroll_period,
                currency: values.currency,
                monthly_house_rent: values.monthly_house_rent,
                rented_in_metro_city: values.rented_in_metro_city ? 1 : 0,
                salary_structure_hra: 0,
                annual_hra_exemption: 0,
                monthly_hra_exemption: 0,
                total_declared_amount: formattedDeclarations.reduce(
                    (sum, d) => sum + d.amount,
                    0,
                ),
                total_exemption_amount: formattedDeclarations.reduce(
                    (sum, d) => sum + d.max_amount,
                    0,
                ),
                declarations: formattedDeclarations,
            },
        }

        console.log('Submitting payload', payload)

        try {
            const res = await apiCreateEmployeeTaxDeclarations(payload)
            console.log('Submission successful:', res)
            if (res) {
                form.reset()
                setTableRows([])
            }
        } catch (err) {
            console.error('Submission failed:', err)
        }
        navigate(`/concepts/payroll/listTaxExemptionDeclaration`)
    }

    return (
        <div>
            <div>
                <div className="flex flex-row items-center justify-between">
                    <h3>New Employee Tax Exemption Declaration</h3>
                    <div className="flex gap-2 ">
                        <Button
                            variant="solid"
                            onClick={() =>
                                navigate(
                                    '/concepts/payroll/listTaxExemptionDeclaration',
                                )
                            }
                        >
                            Back
                        </Button>
                        <Button onClick={form.handleSubmit(handleSubmit)}>
                            Save
                        </Button>
                    </div>
                </div>
            </div>

            <Card className="mt-5">
                <Tabs defaultValue="tab1">
                    <TabList>
                        <TabNav value="tab1">Details</TabNav>

                        <TabNav value="tab2">Tax Exemption Declaration</TabNav>
                    </TabList>

                    <div className="p-4">
                        <TabContent value="tab1">
                            <Details form={form} />
                        </TabContent>

                        <TabContent
                            value="tab2"
                            className="flex flex-col gap-4"
                        >
                            <Card>
                                <DeclarationTable
                                    data={tableRows}
                                    setData={setTableRows}
                                />
                            </Card>
                            <Card>
                                <HRAExemption
                                    control={form.control}
                                    errors={form.formState.errors}
                                />
                            </Card>
                        </TabContent>
                    </div>
                </Tabs>
            </Card>
        </div>
    )
}

export default TaxExemptionDeclarationCreate
