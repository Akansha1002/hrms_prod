import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import Select from '@/components/ui/Select'

const actionTypeOption = [
    { value: 'dataChange', label: 'Data Change' },
    { value: 'promotion', label: 'Promotion' },
    { value: 'transfer', label: 'Transfer' },
]

const MovementDetailsSection = () => {
    return (
        <Card>
            <h4 className="mb-6">Movement Details</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Employee ID"
                >
                    <Input
                        placeholder="123"
                        disabled
                    />
                </FormItem>
                <FormItem
                    label="Employee Name"
                >
                    <Input
                        type="text"
                        autoComplete="off"
                        placeholder="Name"
                        disabled
                    />
                </FormItem>
                <FormItem
                    label="Recent Effective Date"
                >
                    <Input
                        type="date"
                        autoComplete="off"
                        disabled
                    />
                </FormItem>
                <FormItem
                    label="Employee Status"
                >
                    <Input
                        type="text"
                        autoComplete="off"
                        placeholder="Active"
                        disabled
                    />
                </FormItem>
                <FormItem
                    label="Transaction Date"
                >
                    <Input
                        type="date"
                        autoComplete="off"
                    />
                </FormItem>
                <FormItem
                    label="Effective Date"
                >
                    <Input
                        type="date"
                        autoComplete="off"
                    />
                </FormItem>
                <FormItem
                    label="Action Type"
                >
                    <Select
                        placeholder="Please Select"
                        options={actionTypeOption}
                    />
                </FormItem>
                <FormItem
                    label="Action"
                >
                    <Select
                        placeholder="Please Select"
                        options={actionTypeOption}
                    />
                </FormItem>
                <FormItem
                    label="Action Reason"
                >
                    <Select
                        placeholder="Please Select"
                        options={actionTypeOption}
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default MovementDetailsSection