import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import { ChairmanMessage } from '../types'

type CompanyAnnouncementsProps = {
    chairmanMessage: ChairmanMessage[]
}

const { TabNav, TabList, TabContent } = Tabs

const CompanyAnnouncements = ({ chairmanMessage }: CompanyAnnouncementsProps) => {
    return (
        <Card>
            <div>
                <Tabs defaultValue="tab1">
                    <TabList>
                        <TabNav value="tab1">CEO's Desk</TabNav>
                        <TabNav value="tab2">HR Announcements</TabNav>
                    </TabList>
                    <div className="p-4">
                        <TabContent value="tab1">
                            {chairmanMessage.length > 0 ? (
                                chairmanMessage.map((message, idx) => (
                                    <div key={idx}>
                                        <h4>{message.title}</h4>
                                        <p>{message.message}</p>
                                        <p className='text-xss'>By {message.chairman_name} on {new Date(message.published_date).toLocaleDateString()}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">No Chairman Messages available.</p>
                            )}
                        </TabContent>
                        <TabContent value="tab2">
                            <p>
                                A computer lets you make more mistakes faster than
                                any invention in human history with the possible
                                exceptions of handguns and tequila. (Mitch
                                Radcliffe).
                                If builders built buildings the way programmers
                                wrote programs, then the first woodpecker that came
                                along would destroy civilization. (Gerald Weinberg)
                                If builders built buildings the way programmers
                                wrote programs, then the first woodpecker that came
                                along would destroy civilization. (Gerald Weinberg)
                                If builders built buildings the way programmers
                                wrote programs, then the first woodpecker that came
                                along would destroy civilization. (Gerald Weinberg)
                            </p>
                        </TabContent>
                    </div>
                </Tabs>
            </div>
        </Card>
    )
}

export default CompanyAnnouncements