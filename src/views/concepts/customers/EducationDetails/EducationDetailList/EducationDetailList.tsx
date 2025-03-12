import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import EducationDetailListActionTools from './components/EducationDetailListActionTools'
import EducationDetailListTable from './components/EducationDetailListTable'

const EducationDetailList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Education Details</h3>
                            <EducationDetailListActionTools />
                        </div>
                        <EducationDetailListTable />
                    </div>
                </AdaptiveCard>
            </Container>
        </>
    )
}

export default EducationDetailList