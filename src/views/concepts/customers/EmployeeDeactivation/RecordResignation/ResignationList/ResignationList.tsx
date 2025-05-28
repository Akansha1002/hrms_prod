import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import ResignationListTable from './components/ResignationListTable'
import ResignationActionTools from './components/ResignationActionTools'

const ResignationList = () => {
    return (
        <Container>
            <AdaptiveCard>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h3>Record Resignation</h3>
                        <ResignationActionTools />
                    </div>
                    <ResignationListTable />
                </div>
            </AdaptiveCard>
        </Container>
    )
}

export default ResignationList