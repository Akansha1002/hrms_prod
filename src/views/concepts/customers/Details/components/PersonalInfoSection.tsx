import { useMemo } from 'react'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import NumericInput from '@/components/shared/NumericInput'
import { Employee } from '../../EmployeeList/types'

interface PersonalInfoSectionProps {
    data: Employee
    onChange: () => void;
    setUpdatedValues: (callback: (prev: Partial<Employee>) => Partial<Employee>) => void;
}

const salutationOptions = [
    { value: 'Mr', label: 'Mr' },
    { value: 'Ms', label: 'Ms' },
    { value: 'Dr', label: 'Dr' }
]

const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
]

const PersonalInfoSection = ({ data, onChange, setUpdatedValues }: PersonalInfoSectionProps) => {

    // const handleInputChange = (field: string, value: string | number) => {
    //     setUpdatedValues((prev) => ({
    //         ...prev,
    //         [field]: value,
    //     }));
    //     onChange();
    // };

    const handleInputChange = (field: keyof Employee, value: string | number) => {
        setUpdatedValues((prev) => ({
            ...prev,
            [field]: value,
        }));
        onChange();
    };

    return (
        <Card>
            <h4 className="mb-6">Personal</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Employee No."
                >
                    <NumericInput
                        placeholder="Employee Number"
                        autoComplete="off"
                        defaultValue={data?.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                </FormItem>
                {/* <FormItem
                    label="Login ID"
                >
                    <NumericInput
                        autoComplete="off"
                        placeholder="Login ID"
                        defaultValue={data?.login_id}
                    />
                </FormItem> */}
                <FormItem
                    label="Salutation"
                >
                    <Select
                        options={salutationOptions}
                        defaultValue={salutationOptions.find(option => option.value === data?.salutation)}
                        onChange={(option) => handleInputChange("salutation", option?.value || '')}
                    />
                </FormItem>
                <FormItem
                    label="First Name"
                >
                    <Input
                        type="text"
                        autoComplete="off"
                        placeholder="First Name"
                        defaultValue={data?.first_name}
                        onChange={(e) => handleInputChange("first_name", e.target.value)}
                    />
                </FormItem>
                <FormItem
                    label="Middle Name"
                >
                    <Input
                        type="text"
                        autoComplete="off"
                        placeholder="Middle Name"
                        defaultValue={data?.middle_name}
                        onChange={(e) => handleInputChange("middle_name", e.target.value)}
                    />
                </FormItem>
                <FormItem
                    label="Last Name"
                >
                    <Input
                        type="text"
                        autoComplete="off"
                        placeholder="Last Name"
                        defaultValue={data?.last_name}
                        onChange={(e) => handleInputChange("last_name", e.target.value)}
                    />
                </FormItem>
                <FormItem
                    label="Date of Birth"
                >
                    <Input
                        type="date"
                        defaultValue={data?.date_of_birth}
                        onChange={(e) => handleInputChange("date_of_birth", e.target.value)}
                    />
                </FormItem>
                <FormItem
                    label="Gender"
                >
                    <Select
                        options={genderOptions}
                        defaultValue={genderOptions.find(option => option.value === data?.gender)}
                        onChange={(option) => handleInputChange("gender", option?.value || '')}
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default PersonalInfoSection
