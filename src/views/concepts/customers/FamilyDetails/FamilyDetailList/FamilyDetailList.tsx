import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import FamilyDetailListActionTools from './components/FamilyDetailListActionTools'
import FamilyDetailListTable from './components/FamilyDetailListTable'

const FamilyDetailList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Family Details</h3>
                        <FamilyDetailListActionTools />
                        </div>
                        <FamilyDetailListTable />
                    </div>
                </AdaptiveCard>
            </Container>
        </>
    )
}

export default FamilyDetailList