import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import LeaveApplicationListTable from './components/LeaveApplicationListTable'
import LeaveListTableTools from './components/LeaveListTableTools'

const LeaveApplicationList = () => {

    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <LeaveListTableTools />
                        <LeaveApplicationListTable />
                    </div>
                </AdaptiveCard>
            </Container>
        </>
    )
}

export default LeaveApplicationList