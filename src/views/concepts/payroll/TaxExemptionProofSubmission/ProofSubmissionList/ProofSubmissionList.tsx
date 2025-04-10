import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import ProofSubmissionListTable from './components/ProofSubmissionListTable'
import ProofSubmissionListActionTools from './components/ProofSubmissionListActionTools'

const ProofSubmissionList = () => {
  return (
    <>
    <Container>
        <AdaptiveCard>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3>Employee Tax Exemption Proof Submission</h3>
                    <ProofSubmissionListActionTools/>
                </div>
                <ProofSubmissionListTable />
            </div>
        </AdaptiveCard>
    </Container>
</>
  )
}

export default ProofSubmissionList