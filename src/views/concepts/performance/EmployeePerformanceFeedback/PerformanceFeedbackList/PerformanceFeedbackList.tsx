import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import PerformanceFeedbackListTable from './components/PerformanceFeedbackListTable'
import PerformanceFeedbackListActionTools from './components/PerformanceFeedbackListActionTools'

const PerformanceFeedbackList = () => {
  return (
    <Container>
      <AdaptiveCard>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h3>Employee Performance Feedback</h3>
            <PerformanceFeedbackListActionTools />
          </div>
          <PerformanceFeedbackListTable />
        </div>
      </AdaptiveCard>
    </Container>
  )
}

export default PerformanceFeedbackList