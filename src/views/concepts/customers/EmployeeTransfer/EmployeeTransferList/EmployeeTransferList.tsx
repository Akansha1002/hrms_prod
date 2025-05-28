import Button from '@/components/ui/Button'

import { TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

import EmployeeTransferListTableTools from './components/EmployeeTransferListTableTools'
import EmployeeTransferListTable from './components/EmployeeTransferListTable'
import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'

const EmployeeTransferList = () => {
    const navigate = useNavigate()
    return (
        <Container>
            <AdaptiveCard>
                <div className="flex flex-row items-center justify-between">
                    <h3>Employee Transfer</h3>
                    <div>
                        {' '}
                        <Button
                            variant="solid"
                            icon={<TbUserPlus className="text-xl" />}
                            onClick={() =>
                                navigate(
                                    '/concepts/customers/employee-transfer-create',
                                )
                            }
                        >
                            Add new
                        </Button>
                    </div>
                </div>
                <div className="mt-5">
                    <EmployeeTransferListTableTools />
                    <EmployeeTransferListTable />
                </div>
            </AdaptiveCard>
        </Container>
    )
}

export default EmployeeTransferList
