import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import { Notice } from '../types'

type CompanyHighlightsProps = {
    notices: Notice[]
}

const { TabNav, TabList, TabContent } = Tabs
const CompanyHighlights = ({ notices }: CompanyHighlightsProps) => {
    return (
        <Card>
            <div>
                <Tabs defaultValue="tab1">
                    <TabList>
                        <TabNav value="tab1">Notification</TabNav>
                        <TabNav value="tab2">Celebration</TabNav>
                    </TabList>
                    <div className="p-4">
                        <TabContent value="tab1">
                            {notices.map((item, idx) => (
                                <div key={idx} className="mb-4">
                                    <h4 className="font-semibold">{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
                            ))}
                        </TabContent>
                        <TabContent value="tab2">
                            <p>
                                A computer lets you make more mistakes faster than
                                any invention in human history with the possible
                                exceptions of handguns and tequila. (Mitch
                                Radcliffe).
                            </p>
                        </TabContent>
                    </div>
                </Tabs>
            </div>
        </Card>
    )
}

export default CompanyHighlights