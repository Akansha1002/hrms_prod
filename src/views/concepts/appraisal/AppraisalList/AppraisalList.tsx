import Button from '@/components/ui/Button'

import { TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import AppraisalListTableTools from './components/AppraisalListTableTools'
import AppraisalListTable from './components/AppraisalListTable'

const AppraisalList = () => {
    const navigate = useNavigate()
    return (
        <Container>
            <AdaptiveCard>
                <div className="flex flex-row items-center justify-between">
                    <h3>Appraisal</h3>
                    <div>
                        {' '}
                        <Button
                            variant="solid"
                            icon={<TbUserPlus className="text-xl" />}
                            onClick={() =>
                                navigate('/concepts/appraisal/create')
                            }
                        >
                            Add new
                        </Button>
                    </div>
                </div>
                <div className="mt-5">
                    <AppraisalListTableTools />
                    <AppraisalListTable />
                </div>
            </AdaptiveCard>
        </Container>
    )
}

export default AppraisalList
