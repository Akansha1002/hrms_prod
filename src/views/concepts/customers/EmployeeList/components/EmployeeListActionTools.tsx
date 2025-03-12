import Button from '@/components/ui/Button'
import { TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import useEmployeeList from '../hooks/useEmployeeList'

const EmployeeListActionTools = () => {
    const navigate = useNavigate()

    const { employeeList } = useEmployeeList()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <Button
                variant="solid"
                icon={<TbUserPlus className="text-xl" />}
                onClick={() => navigate('/concepts/customers/customer-create')}
            >
                Add new
            </Button>
        </div>
    )
}

export default EmployeeListActionTools