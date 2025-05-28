import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar/Avatar'
import Tooltip from '@/components/ui/Tooltip'
import { HiPencil } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

type ProfileSectionProps = {
    data: Partial<{
        img: string
        name: string
        email: string
    }>
}

const ProfileSection = ({ data = {} }: ProfileSectionProps) => {
    const navigate = useNavigate()

    const handleEdit = () => {

    }

    return (
        <Card>
            <div className="flex flex-col md:flex-row xl:flex-col md:gap-10 xl:gap-0">
                {/* <div className="flex justify-end mx-auto w-[280px]">
                    <Tooltip title="Edit">
                        <button
                            className="close-button button-press-feedback"
                            type="button"
                            onClick={handleEdit}
                        >
                            <HiPencil />
                        </button>
                    </Tooltip>
                </div> */}
                <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                    <div className="flex xl:flex-col items-center mt-3">
                        <Avatar size={70} shape="circle" src={data.img} />
                        <h5>{data.name}</h5>
                        <p>Designation</p>
                        <p>Reporting To-</p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default ProfileSection
