import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar/Avatar'

type EmployeeInfoFieldProps = {
    title?: string
    value?: string
}

const EmployeeInfoField = ({ title, value }: EmployeeInfoFieldProps) => {
    return (
        <div className='flex flex-row'>
            <span className="font-semibold">{title}</span> :
            <p className="heading-text font-bold">{value}</p>
        </div>
    )
}
const EmployeeDetailSection = () => {
    return (
        <Card>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div className="mt-4 flex flex-row gap-4">
                    <Avatar size={90} shape="circle" src="/img/avatars/thumb-1.jpg" />
                    <div className='flex flex-col'>
                        <h5 className="font-bold">Employee Name</h5>
                        <p>Employee Id</p>
                    </div>
                </div>
                <div className="mt-4 flex flex-col gap-1 font-semibold">
                    <EmployeeInfoField
                        title='Designation'
                        value=' Trainee'
                    />
                    <EmployeeInfoField
                        title='Grade'
                        value=' Associate'
                    />
                    <EmployeeInfoField
                        title='Department'
                        value=' Telecom'
                    />
                    <EmployeeInfoField
                        title='OU'
                        value='CNPL'
                    />
                    <EmployeeInfoField
                        title='Location'
                        value=' Hyderabad'
                    />
                </div>
                <div className="mt-4 flex flex-col gap-1 font-semibold">
                    <EmployeeInfoField
                        title='Date Of Joining'
                        value='28-Feb-2025'
                    />
                    <EmployeeInfoField
                        title='Confirmation Due Date'
                        value='27-Apr-2025'
                    />
                    <EmployeeInfoField
                        title='Employement Status'
                        value=' Probationer'
                    />
                    <EmployeeInfoField
                        title='Reporting Manager'
                        value='Reporting Manager Name'
                    />
                    <EmployeeInfoField
                        title='Email Id'
                        value=' abc@gmail.com'
                    />
                </div>
                <div className="mt-4 flex flex-col gap-1 font-semibold">
                    <EmployeeInfoField
                        title='Shift Type'
                        value='General'
                    />
                    <EmployeeInfoField
                        title='Employment Type'
                        value='Regular'
                    />
                    <EmployeeInfoField
                        title='Attendance Percentage'
                        value=' 0.00%'
                    />
                </div>
            </div>
        </Card>
    )
}

export default EmployeeDetailSection