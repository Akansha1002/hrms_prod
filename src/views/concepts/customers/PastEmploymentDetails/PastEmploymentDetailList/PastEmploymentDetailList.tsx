import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import PastEmploymentDetailListActionTools from './components/PastEmploymentDetailListActionTools'
import PastEmploymentDetailListTable from './components/PastEmploymentDetailListTable'
const PastEmploymentDetailList = () => {
  return (
    <>
    <Container>
        <AdaptiveCard>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3>Past Employment Details</h3>
                    <PastEmploymentDetailListActionTools />
                </div>
                <PastEmploymentDetailListTable />
            </div>
        </AdaptiveCard>
    </Container>
</>
  )
}

export default PastEmploymentDetailList