import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import EmployeeSkillMapListTable from './components/EmployeeSkillMapListTable'
import EmployeeSkillMapActionTools from './components/EmployeeSkillMapActionTools'

const EmployeeSkillMapList = () => {
  return (
    <>
      <Container>
        <AdaptiveCard>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <h3>Employee Skill Map</h3>
              <EmployeeSkillMapActionTools />
            </div>
            <EmployeeSkillMapListTable />
          </div>
        </AdaptiveCard>
      </Container>
    </>
  )
}

export default EmployeeSkillMapList