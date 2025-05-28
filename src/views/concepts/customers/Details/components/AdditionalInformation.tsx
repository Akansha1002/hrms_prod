import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Switcher from '@/components/ui/Switcher'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import { Select } from '@/components/ui/Select'
import { Employee } from '../../EmployeeList/types'

interface AdditionalInfoSectionProps {
    data: Employee
    onChange: () => void;
    setUpdatedValues: (callback: (prev: Partial<Employee>) => Partial<Employee>) => void;
}

const calendarOptions = [
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'optionalHoliday', label: 'OP-Optional Holiday' },
    { value: 'us', label: 'US' },
    { value: 'victoria', label: 'Victoria' },
    { value: 'visakhapatnam', label: 'Visakhapatnam' }
];

const attendanceOptions = [
    { value: 'securityCard', label: 'Security Card' },
    { value: 'deskHomeMobile', label: 'Desk/Home/Mobile' },
    { value: 'tracker', label: 'Tracker' }
];

const shiftTypeOptions = [
    { value: 'custom', label: 'Custom' },
    { value: 'general', label: 'General' },
    { value: 'evening', label: 'Evening' },
    { value: 'generalAus', label: 'General-Aus' }
];

const shiftGroupOptions = [
    { value: 'telecomWireless', label: 'Telecom Wireless' },
    { value: 'telecomWireline', label: 'Telecom Wireline' },
    { value: 'robotics', label: 'Robotics' },
    { value: 'it', label: 'IT' },
    { value: 'accounts', label: 'Accounts' }
];

const employmentStatusOptions = [
    { value: 'probationer', label: 'Probationer' },
    { value: 'traineeTelecomEngineer', label: 'Trainee Telecom Engineer' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'consultant', label: 'Consultant' }
];

const employmentTypeOptions = [
    { value: 'fullTime', label: 'Full Time' },
    { value: 'partTime', label: 'Part Time' },
    { value: 'partTimerEvening', label: 'Part Timer Evening' },
    { value: 'partTimerMorning', label: 'Part Timer Morning' }
];



const AdditionalInformation = ({ data, onChange, setUpdatedValues }: AdditionalInfoSectionProps) => {

    const handleInputChange = (field: keyof Employee, value: string | number) => {
        setUpdatedValues((prev) => ({
            ...prev,
            [field]: value,
        }));
        onChange();
    };

    return (
        <Card>
            <h4 className="mb-6">Additional Information </h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Calendar"
                >
                    <Input
                        type='text'
                        defaultValue={data?.calendar}
                        onChange={(e) =>
                            handleInputChange('calendar', e.target.value)
                        }
                    />
                    {/* <Select
                        options={calendarOptions}
                    /> */}
                </FormItem>
                <FormItem
                    label="Attendance"
                >
                    <Select
                        options={attendanceOptions}
                        defaultValue={attendanceOptions.find(option => option.value === data?.custom_attendance)}
                        onChange={(option) => handleInputChange("custom_attendance", option?.value || '')}
                    />
                </FormItem>
                <FormItem
                    label="Shift Type"
                >
                    <Select
                        options={shiftTypeOptions}
                        defaultValue={shiftTypeOptions.find(option => option.value === data?.custom_shift_type)}
                        onChange={(option) => handleInputChange("custom_shift_type", option?.value || '')}
                    />
                </FormItem>
                {/* <FormItem
                    label="Shift Group"
                >
                    <Select
                        options={shiftGroupOptions}
                        defaultValue={shiftGroupOptions.find(option => option.value === data?.custom_shift_group)}
                        onChange={(option) => handleInputChange("custom_shift_group", option?.value || '')}
                    />
                </FormItem> */}
                <FormItem
                    label="Employment Status"
                >
                    <Select
                        options={employmentStatusOptions}
                        defaultValue={employmentStatusOptions.find(option => option.value === data?.custom_employment_status)}
                        onChange={(option) => handleInputChange("custom_employment_status", option?.value || '')}
                    />
                </FormItem>
                <FormItem
                    label="Confirmation Due Date"
                >
                    <Input
                        type="date"
                        defaultValue={data?.final_confirmation_date || ''}
                        onChange={(e) => handleInputChange("final_confirmation_date", e.target.value)}
                    />
                </FormItem>
                <FormItem
                    label="Full/Part Time"
                >
                    <Select
                        options={employmentTypeOptions}
                        defaultValue={employmentTypeOptions.find(option => option.value === data?.custom_full_part_time)}
                        onChange={(option) => handleInputChange("custom_full_part_time", option?.value || '')}
                    />
                </FormItem>
                <FormItem
                    label="Contract Type"
                >
                    <Input
                        type="text"
                        defaultValue={data?.custom_contract_type || ''}
                        onChange={(e) => handleInputChange("custom_contract_type", e.target.value)}
                    />
                </FormItem>
                <FormItem
                    label="Contract End Date"
                >
                    <Input
                        type="date"
                        defaultValue={data?.contract_end_date || ''}
                        onChange={(e) => handleInputChange("contract_end_date", e.target.value)}
                    />
                </FormItem>
                <FormItem
                    label="Contractor"
                >
                    <Input
                        type="text"
                        defaultValue={data?.custom_contractor || ''}
                        onChange={(e) => handleInputChange("custom_contractor", e.target.value)}
                    />
                </FormItem>
                <FormItem
                    label="Experience Category"
                >
                    <Input
                        type="text"
                        defaultValue={data?.custom_experience_in_category || ''}
                        onChange={(e) => handleInputChange("custom_experience_in_category", e.target.value)}
                    />
                </FormItem>
                <FormItem
                    label="Experience in Months"
                >
                    <Input
                        type="number"
                        defaultValue={data?.custom_experience_in_months || ''}
                        onChange={(e) => handleInputChange("custom_experience_in_months", e.target.value)}
                    />
                </FormItem>
                <FormItem
                    label="Notice Period (Days)"
                >
                    <Input
                        type="number"
                        defaultValue={data?.notice_number_of_days || ''}
                        onChange={(e) => handleInputChange("notice_number_of_days", e.target.value)}
                    />
                </FormItem>
                {/* <FormItem
                    label="Secretary"
                >
                    <Input
                        type="text"
                        defaultValue={data?.custom_secretary || ''}
                        onChange={(e) => handleInputChange("custom_secretary", e.target.value)}
                    />
                </FormItem> */}
                <div className="flex items-center justify-between gap-8">
                    <FormItem>
                        <div className="flex items-center justify-between gap-8">
                            <div className="flex items-center justify-between gap-1">
                                <Switcher
                                />
                                <p>Re-Employed</p>
                            </div>
                        </div>
                    </FormItem>
                    {/* <FormItem>
                        <Controller
                            name="reEmployed"
                            control={control}
                            render={({ field }) => (
                                <div className="flex items-center justify-between gap-8">
                                    <div className="flex items-center justify-between gap-1">
                                        <Switcher
                                            checked={field.value}
                                            onChange={(checked) => {
                                                field.onChange(checked);
                                            }}
                                        />
                                        <p>Re-Employed</p>
                                    </div>
                                </div>
                            )}
                        />
                    </FormItem> */}
                    <FormItem
                        label="Old Employee No"
                    >
                        <Input
                            type="text"
                            defaultValue={data?.custom_old_employee_number || ''}
                            onChange={(e) => handleInputChange("custom_old_employee_number", e.target.value)}
                        />
                    </FormItem>
                </div>
                {/* <div className="flex items-center justify-between gap-8">
                    <FormItem>
                        <div className="flex items-center justify-between gap-8">
                            <div className="flex items-center justify-between gap-1">
                                <Switcher
                                />
                                <p>System User</p>
                            </div>
                        </div>
                    </FormItem>

                    <FormItem
                        label="Original Hire Date"
                    >
                        <Input
                            type="date"
                        />
                    </FormItem>
                </div> */}
            </div>
        </Card>
    )
}

export default AdditionalInformation
