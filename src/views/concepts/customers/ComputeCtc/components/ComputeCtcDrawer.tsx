import { Container } from "@/components/shared";
import { ComputeCtcSchema, SalaryData } from "../types";
import SalaryTable from "./SalaryTableSection"
import { Form, FormItem } from '@/components/ui/Form'
import { Button, Drawer, Input } from "@/components/ui";
import { z } from 'zod'
import type { ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import JoiningBonusSection from "./JoiningBonusSection";

const salaryData: SalaryData[] = [
    { id: "", component: "Basic", previousEmployer: "0.00", period: "Monthly", proposedSalary: "", increasedAmount: "0", currency: "INR", exchangeRate: "1.0000000000", monthlyAmount: "0.00", baseCurrency: "0" },
    { id: "", component: "House Rent Allowance", previousEmployer: "0.00", period: "Monthly", proposedSalary: "", increasedAmount: "0", currency: "INR", exchangeRate: "1.0000000000", monthlyAmount: "0.00", baseCurrency: "0" },
    { id: "", component: "Medical Allowance", previousEmployer: "0.00", period: "Monthly", proposedSalary: "", increasedAmount: "0", currency: "INR", exchangeRate: "1.0000000000", monthlyAmount: "0.00", baseCurrency: "0" },
    { id: "", component: "Conveyance Allowance", previousEmployer: "0.00", period: "Monthly", proposedSalary: "", increasedAmount: "0", currency: "INR", exchangeRate: "1.0000000000", monthlyAmount: "0.00", baseCurrency: "0" },
    { id: "", component: "Flexible Allowance Flag", previousEmployer: "0.00", period: "Monthly", proposedSalary: "", increasedAmount: "0", currency: "INR", exchangeRate: "1.0000000000", monthlyAmount: "0.00", baseCurrency: "0" },
    { id: "", component: "Flexible Allowance", previousEmployer: "0.00", period: "Monthly", proposedSalary: "", increasedAmount: "0", currency: "INR", exchangeRate: "1.0000000000", monthlyAmount: "0.00", baseCurrency: "0" },
    { id: "", component: "Bonus", previousEmployer: "0.00", period: "Monthly", proposedSalary: "", increasedAmount: "0", currency: "INR", exchangeRate: "1.0000000000", monthlyAmount: "0.00", baseCurrency: "0" },
    { id: "", component: "Monthly PLI", previousEmployer: "0.00", period: "Monthly", proposedSalary: "", increasedAmount: "0", currency: "INR", exchangeRate: "1.0000000000", monthlyAmount: "0.00", baseCurrency: "0" },
    { id: "", component: "Special Allowance", previousEmployer: "0.00", period: "Monthly", proposedSalary: "", increasedAmount: "0", currency: "INR", exchangeRate: "1.0000000000", monthlyAmount: "0.00", baseCurrency: "0" },
    { id: "", component: "Annual PLI", previousEmployer: "0.00", period: "Monthly", proposedSalary: "", increasedAmount: "0", currency: "INR", exchangeRate: "1.0000000000", monthlyAmount: "0.00", baseCurrency: "0" },
    { id: "", component: "Employer Contribution PF", previousEmployer: "0.00", period: "Monthly", proposedSalary: "", increasedAmount: "0", currency: "INR", exchangeRate: "1.0000000000", monthlyAmount: "0.00", baseCurrency: "0" },
    { id: "", component: "Employer Contribution ESI", previousEmployer: "0.00", period: "Monthly", proposedSalary: "", increasedAmount: "0", currency: "INR", exchangeRate: "1.0000000000", monthlyAmount: "0.00", baseCurrency: "0" },
    { id: "", component: "PF Flag", previousEmployer: "0.00", period: "Monthly", proposedSalary: "", increasedAmount: "0", currency: "INR", exchangeRate: "1.0000000000", monthlyAmount: "0.00", baseCurrency: "0" },
];

type ComputeCtcDrawerProps = {
    open: boolean
    onDrawerOpen: (open: boolean) => void
    // onFormSubmit: (values: ComputeCtcSchema) => void
}

const validationSchema: ZodType<ComputeCtcSchema> = z.object({
    joiningBonus: z.string().optional(),
})
const ComputeCtcDrawer = ({ open, onDrawerOpen }: ComputeCtcDrawerProps) => {
    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<ComputeCtcSchema>({

        resolver: zodResolver(validationSchema),
    })

    const handleDrawerClose = () => {
        onDrawerOpen(false)
    }

    return (
        <Drawer
            title="Compute CTC"
            width={1500}
            isOpen={open}
            onClose={handleDrawerClose}
            onRequestClose={handleDrawerClose}
        >
            <Form
                className="flex w-full h-full"
                containerClassName="flex flex-col w-full justify-between"
            >
                <Container>
                    <div className="flex items-center justify-between">
                        <div className="gap-4 flex flex-col flex-auto">
                            <Form
                                className="grid grid-cols-2 overflow-y-auto"
                            >
                                <h6>CTC</h6>
                                <Input
                                    placeholder="0.00"
                                    type="text"
                                />
                                INR Yeraly
                            </Form>
                            <SalaryTable data={salaryData} />
                            <FormItem className="inline-flex flex-wrap xl:flex gap-2">
                                <Button variant="solid" >
                                    Compute CTC
                                </Button>
                            </FormItem>
                            <JoiningBonusSection control={control} errors={errors} />
                        </div>
                    </div>
                </Container>
            </Form>
        </Drawer>
    )
}

export default ComputeCtcDrawer