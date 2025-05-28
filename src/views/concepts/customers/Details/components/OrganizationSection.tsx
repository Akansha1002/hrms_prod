import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Select } from '@/components/ui/Select'
import { Employee } from '../../EmployeeList/types'

interface OrganizationSectionProps {
    data: Employee
    onChange: () => void
    setUpdatedValues: (
        callback: (prev: Partial<Employee>) => Partial<Employee>,
    ) => void
}

const positionOptions = [
    {
        value: 'Assistant Project Manager - Telecom Wireline',
        label: 'Assistant Project Manager - Telecom Wireline',
    },
    {
        value: 'Assistant Team Lead - Telecom Wireline',
        label: 'Assistant Team Lead - Telecom Wireline',
    },
    {
        value: 'Assistant Project Manager - Robotics',
        label: 'Assistant Project Manager - Robotics',
    },
]

const organizationStructureOptions = [
    {
        value: 'Centillion Networks Pvt Ltd',
        label: 'Centillion Networks Pvt Ltd',
    },
    { value: 'Centillion Solution B V', label: 'Centillion Solution B V' },
    { value: 'Centillion Solution INC', label: 'Centillion Solution INC' },
    {
        value: 'Centillion Solution Pty Ltd',
        label: 'Centillion Solution Pty Ltd',
    },
]

const OrganizationSection = ({
    data,
    onChange,
    setUpdatedValues,
}: OrganizationSectionProps) => {
    const handleInputChange = (
        field: keyof Employee,
        value: string | number,
    ) => {
        setUpdatedValues((prev) => ({
            ...prev,
            [field]: value,
        }))
        onChange()
    }

    console.log(data)

    return (
        <Card>
            <h4 className="mb-6">Organization</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem label="Date of Join">
                    <Input
                        type="date"
                        defaultValue={data?.date_of_joining}
                        onChange={(e) =>
                            handleInputChange('date_of_joining', e.target.value)
                        }
                    />
                </FormItem>
                <FormItem label="Effective From">
                    <Input type="date" />
                </FormItem>
                <FormItem label="Position">
                    <Input
                        type='text'
                        defaultValue={data?.custom_position}
                        onChange={(e) =>
                            handleInputChange('custom_position', e.target.value)
                        }
                    />
                    {/* <Select
                        options={positionOptions}
                        defaultValue={positionOptions.find(option => option.value === data?.custom_position)}
                    /> */}
                </FormItem>
                <FormItem label="Organization Structure">
                    <Input
                        type='text'
                        defaultValue={data?.orgStructure}
                        onChange={(e) =>
                            handleInputChange('orgStructure', e.target.value)
                        }
                    />
                    {/* <Select
                        options={organizationStructureOptions}
                        defaultValue={organizationStructureOptions.find(option => option.value === data?.orgStructure)}
                    /> */}
                </FormItem>
                <FormItem label="Location">
                    <Input
                        type='text'
                        defaultValue={data?.custom_location}
                        onChange={(e) =>
                            handleInputChange('custom_location', e.target.value)
                        }
                    />
                    {/* <Select
                        options={locationOptions}
                        defaultValue={locationOptions.find(
                            (option) => option.value === data?.custom_location,
                        )}
                        onChange={(option) =>
                            handleInputChange(
                                'custom_location',
                                option?.value || '',
                            )
                        }
                    /> */}
                </FormItem>
                <FormItem label="Department">
                    <Input
                        type='text'
                        defaultValue={data?.department}
                        onChange={(e) =>
                            handleInputChange('department', e.target.value)
                        }
                    />
                    {/* <Select
                        options={departmentOptions}
                        defaultValue={departmentOptions.find(
                            (option) => option.value === data?.department,
                        )}
                        onChange={(option) =>
                            handleInputChange('department', option?.value || '')
                        }
                    /> */}
                </FormItem>
                <FormItem label="Designation">
                    <Input
                        type='text'
                        defaultValue={data?.designation}
                        onChange={(e) =>
                            handleInputChange('designation', e.target.value)
                        }
                    />
                    {/* <Select
                        options={designationOptions}
                        defaultValue={designationOptions.find(
                            (option) => option.value === data?.designation,
                        )}
                        onChange={(option) =>
                            handleInputChange(
                                'designation',
                                option?.value || '',
                            )
                        }
                    /> */}
                </FormItem>
                <FormItem label="Grade">
                    <Input
                        type='text'
                        defaultValue={data?.grade}
                        onChange={(e) =>
                            handleInputChange('grade', e.target.value)
                        }
                    />
                    {/* <Select
                        options={gradeOptions}
                        defaultValue={gradeOptions.find(
                            (option) => option.value === data?.grade,
                        )}
                        onChange={(option) =>
                            handleInputChange('grade', option?.value || '')
                        }
                    /> */}
                </FormItem>
                <FormItem label="Cost Center">
                    <Input
                        type="text"
                        defaultValue={data?.payroll_cost_center || ''}
                        onChange={(e) =>
                            handleInputChange(
                                'payroll_cost_center',
                                e.target.value,
                            )
                        }
                    />
                </FormItem>
                <FormItem
                    label="Official Email"
                >
                    <Input
                        type="email"
                        defaultValue={data?.user_id || ''}
                        onChange={(e) => handleInputChange("user_id", e.target.value)}
                    />
                </FormItem>
                <FormItem label="Reporting Manager">
                    <Input
                        type="text"
                        defaultValue={data?.reports_to || ''}
                        onChange={(e) =>
                            handleInputChange(
                                'custom_reporting_manager',
                                e.target.value,
                            )
                        }
                    />
                </FormItem>
                <FormItem label="Functional Manager">
                    <Input
                        type="text"
                        defaultValue={data?.custom_functional_manager || ''}
                        onChange={(e) =>
                            handleInputChange(
                                'custom_functional_manager',
                                e.target.value,
                            )
                        }
                    />
                </FormItem>
                <FormItem label="People Manager">
                    <Input
                        type="text"
                        defaultValue={data?.custom_peoples_manager || ''}
                        onChange={(e) =>
                            handleInputChange(
                                'custom_peoples_manager',
                                e.target.value,
                            )
                        }
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default OrganizationSection
