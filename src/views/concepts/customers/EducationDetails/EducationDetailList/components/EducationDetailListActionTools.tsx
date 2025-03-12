import Button from '@/components/ui/Button'
import { TbUserPlus } from 'react-icons/tb'
import { useNavigate, useParams } from 'react-router-dom'
import useEducationDetailList from '../hooks/useEducationDetailList'

const EducationDetailListActionTools = () => {
    const navigate = useNavigate()
    const { name } = useParams()

    const { educationDetailList } = useEducationDetailList()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <Button
                variant="solid"
                icon={<TbUserPlus className="text-xl" />}
                onClick={() => navigate(`/concepts/customers/education-details/create/${name}`)}

            >
                Add new
            </Button>
        </div>
    )
}

export default EducationDetailListActionTools