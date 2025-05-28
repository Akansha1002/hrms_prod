import Button from '@/components/ui/Button'

import { TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import EmployeeAttendanceListTableTools from './components/EmployeeAttendanceListTableTools'
import EmployeeSeparationListTable from './components/EmployeeAttendanceListTable'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'

const EmployeeAttendanceList = () => {
    const navigate = useNavigate()
    return (
        <Container>
            <AdaptiveCard>
                <div className="flex flex-row items-center justify-between">
                    <h3>Employee Attendance</h3>
                    <div>
                        {' '}
                        <Button
                            variant="solid"
                            icon={<TbUserPlus className="text-xl" />}
                            onClick={() =>
                                navigate(
                                    '/concepts/customers/employee-attendance-create',
                                )
                            }
                        >
                            Add new
                        </Button>
                    </div>
                </div>
                <div className="mt-5">
                    <EmployeeAttendanceListTableTools />
                    <EmployeeSeparationListTable />
                </div>
            </AdaptiveCard>
        </Container>
    )
}

export default EmployeeAttendanceList
