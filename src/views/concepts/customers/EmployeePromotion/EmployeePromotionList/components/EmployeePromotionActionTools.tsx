import Button from '@/components/ui/Button'
import { TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

const EmployeePromotionActionTools = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col md:flex-row gap-3">
            <Button
                variant="solid"
                icon={<TbUserPlus className="text-xl" />}
                onClick={() => navigate('/concepts/customers/employee-promotion/create')}
            >
                Add new
            </Button>
        </div>
    )
}

export default EmployeePromotionActionTools