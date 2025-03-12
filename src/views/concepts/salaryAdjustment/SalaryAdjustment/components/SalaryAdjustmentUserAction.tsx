import { FormItem } from '@/components/ui/Form'
import { Card } from '@/components/ui/Card'
import { Link } from 'react-router-dom'
import { Select } from '@/components/ui/Select'
import { Input } from '@/components/ui/Input'
import { useState } from 'react'
import { DeductionAdjustment, EarningFixed } from "../types";
import EarningFixedTable from './EarningFixedTable'
import DeductionAdjustmentTable from './DeductionAdjustmentTable'

interface Option {
    value: string;
    label: string;
}

const componentsOptions: Option[] = [
    { value: 'earningsFixed', label: 'Earning-Fixed' },
    { value: 'deductionAdjustment', label: 'Deduction-Adjustment' },
]

const earningsFixed: EarningFixed[] = [
    { component: "Basic", amount: "", currency: "INR", fromDate: "", toDate: "" },
    { component: "House Rent Allowance", amount: "", currency: "INR", fromDate: "", toDate: "" },
    { component: "Medical Allowance", amount: "", currency: "INR", fromDate: "", toDate: "" },
];

const deductionAdjustment: DeductionAdjustment[] = [
    { component: "Basic", amount: "", currency: "INR", remarks: "" },
    { component: "House Rent Allowance", amount: "", currency: "INR", remarks: "" },
    { component: "Medical Allowance", amount: "", currency: "INR", remarks: "" },
]
const SalaryAdjustmentUserAction = () => {
    const [selectedComponent, setSelectedComponent] = useState<Option | null>(componentsOptions[0]);

    return (
        <Card>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Component Type"
                >
                    <Select
                        placeholder="Please Select"
                        options={componentsOptions}
                        value={selectedComponent}
                        onChange={(option) => setSelectedComponent(option)}
                        getOptionLabel={(e) => e.label}
                        getOptionValue={(e) => e.value}
                    />
                </FormItem>
                <FormItem
                    label="Pay Date"
                >
                    <Input type="date" />
                </FormItem>
            </div>
            <div className="mt-4">
                {selectedComponent?.value === "earningsFixed" && <EarningFixedTable data={earningsFixed} />}
                {selectedComponent?.value === "deductionAdjustment" && <DeductionAdjustmentTable data={deductionAdjustment} />}
            </div>
        </Card>
    )
}

export default SalaryAdjustmentUserAction