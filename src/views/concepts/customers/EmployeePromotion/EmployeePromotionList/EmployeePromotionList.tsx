import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import EmployeePromotionListTable from './components/EmployeePromotionListTable'
import EmployeePromotionActionTools from './components/EmployeePromotionActionTools'

const EmployeePromotionList = () => {
  return (
    <>
      <Container>
        <AdaptiveCard>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <h3>Employee Promotion</h3>
              <EmployeePromotionActionTools />
            </div>

            <EmployeePromotionListTable />
          </div>
        </AdaptiveCard>
      </Container>
    </>
  )
}

export default EmployeePromotionList