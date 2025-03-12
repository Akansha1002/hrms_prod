import Card from '@/components/ui/Card'
import { Link } from 'react-router-dom'
import classNames from '@/utils/classNames'
import type { ReactNode } from 'react'

type StatisticCardProps = {
    title: string
    className: string
    link?: string
}

// const StatisticCard = ({
//     title,
//     className,
// }: StatisticCardProps) => {
//     return (
//         <div
//             className={classNames(
//                 'border rounded-2xl p-4 flex flex-col justify-center',
//                 className,
//             )}
//         >
//             <div className="flex items-center gap-6">
//                 <div className="mb-3 text-gray-900 text-lg font-bold">
//                     {title}
//                 </div>
//             </div>
//         </div>
//     )
// }

const StatisticCard = ({ title, className, link }: StatisticCardProps) => {
    const cardContent = (
        <div
            className={classNames(
                'border rounded-2xl p-4 flex flex-col justify-center transition-all hover:shadow-md',
                className,
            )}
        >
            <div className="flex items-center gap-6">
                <div className="mb-3 text-gray-900 text-lg font-bold">
                    {title}
                </div>
            </div>
        </div>
    )

    return link ? <Link to={link}>{cardContent}</Link> : cardContent
}

const OverviewSection = () => {
    return (
        <Card>
            <div className="flex items-center justify-between">
                <h4>Overview</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl mt-4">
                <StatisticCard
                    title="Employee"
                    className="bg-sky-100 dark:bg-opacity-75"
                    link="/concepts/customers/employee-list"
                />
                {/* <StatisticCard
                    title="Project completed"
                    className="bg-emerald-100 dark:bg-opacity-75"
                />
                <StatisticCard
                    title="Upcoming project"
                    className="bg-purple-100 dark:bg-opacity-75"
                /> */}
            </div>
        </Card>
    )
}

export default OverviewSection