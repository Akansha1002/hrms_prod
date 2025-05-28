import { Container } from "@/components/shared";
import { ComputeCtcSchema, GetSalaryStructureResponse, SalaryData } from "../types";
import SalaryTable from "./SalaryTableSection"
import { Form, FormItem } from '@/components/ui/Form'
import { Button, Drawer, Input } from "@/components/ui";
import { z } from 'zod'
import type { ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import JoiningBonusSection from "./JoiningBonusSection";
import useSWR from "swr";
import { apiGetSalaryStructureByName } from "@/services/SalaryStructureService";

type ComputeCtcDrawerProps = {
    open: boolean
    onDrawerOpen: (open: boolean) => void
    selectedSalaryStructure: { value: string; label: string }
    // onFormSubmit: (values: ComputeCtcSchema) => void
}

const validationSchema: ZodType<ComputeCtcSchema> = z.object({
    joiningBonus: z.string().optional(),
})
const ComputeCtcDrawer = ({ open, onDrawerOpen, selectedSalaryStructure }: ComputeCtcDrawerProps) => {
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
    const name = selectedSalaryStructure?.value || ''

    const { data, isLoading, mutate } = useSWR(
        name
            ? ['/api/salary Structure', { name: name }] : null,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) => apiGetSalaryStructureByName<GetSalaryStructureResponse, { name: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            evalidateOnFocus: false,
        },
    )
    const salaryStructureDetails = data?.data
    const componentsData = [
        ...(salaryStructureDetails?.earnings || []),
        ...(salaryStructureDetails?.deductions || []),
    ];
    return (
        <Drawer
            title="Compute CTC"
            width={1200}
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
                            <FormItem
                                className="grid grid-cols-2 overflow-y-auto"
                            >
                                <h6>CTC</h6>
                                <Input
                                    placeholder="0.00"
                                    type="text"
                                />
                                INR Yeraly
                            </FormItem>
                            {isLoading ? (
                                <p>Loading salary structure...</p>
                            ) : componentsData ? (
                                <SalaryTable data={componentsData} />
                            ) : (
                                <p>No salary structure details available.</p>
                            )}

                            <div>
                                <Button
                                    variant="solid"
                                >
                                    Compute CTC
                                </Button>
                            </div>
                            <JoiningBonusSection control={control} errors={errors} />
                        </div>
                    </div>
                </Container>
            </Form>
        </Drawer>
    )
}

export default ComputeCtcDrawer