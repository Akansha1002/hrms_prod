import Button from '@/components/ui/Button'

import { TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import ExitInterviewListTableTools from './components/ExitInterviewListTableTools'
import ExitInterviewListTable from './components/ExitInterviewListTable'

const ExitInterviewList = () => {
    const navigate = useNavigate()
    return (
        <Container>
            <AdaptiveCard>
                <div className="flex flex-row items-center justify-between">
                    <h3>Exit Interview</h3>
                    <div>
                        {' '}
                        <Button
                            variant="solid"
                            icon={<TbUserPlus className="text-xl" />}
                            onClick={() =>
                                navigate('/concepts/exitInterview/create')
                            }
                        >
                            Add new
                        </Button>
                    </div>
                </div>
                <div className="mt-5">
                    <ExitInterviewListTableTools />
                    <ExitInterviewListTable />
                </div>
            </AdaptiveCard>
        </Container>
    )
}

export default ExitInterviewList
