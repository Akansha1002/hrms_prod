import Card from '@/components/ui/Card'
import { Link } from 'react-router-dom'
import classNames from '@/utils/classNames'
import type { ReactNode } from 'react'
import { FaLink, FaRegCalendarCheck, FaRegClock } from 'react-icons/fa'
import { TbCurrencyDollar } from 'react-icons/tb'
import { RiAdminLine } from "react-icons/ri";

type StatisticCardProps = {
    title: string
    icon: ReactNode
    className: string
    link?: string
}

// const StatisticCard = ({
//     title,
//     icon,
//     className,
// }: StatisticCardProps) => {
//     return (
//         <div
//             className={classNames(
//                 'rounded-2xl p-4 flex flex-col justify-center',
//                 className,
//             )}
//         >
//             <div className="flex items-center gap-4">
//                 <div
//                     className={
//                         'flex items-center justify-center min-h-12 min-w-12 max-h-12 max-w-12 bg-gray-900 text-white rounded-full text-2xl'
//                     }
//                 >
//                     {icon}
//                 </div>
//                 <div className="mb-3 text-gray-900 font-bold">
//                     {title}
//                 </div>
//             </div>
//         </div>
//     )
// }

const StatisticCard = ({ title, icon, className, link }: StatisticCardProps) => {
    const cardContent = (
        <div
            className={classNames(
                'rounded-2xl p-3 flex flex-col justify-center',
                className,
            )}
        >
            <div className="flex items-center gap-3">
                <div
                    className={
                        'flex items-center justify-center min-h-10 min-w-10 max-h-10 max-w-10 bg-gray-700 text-white rounded-full text-xl'
                    }
                >
                    {icon}
                </div>
                <div className="mb-3 text-gray-900 font-bold">
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
                {/* <h4>Overview</h4> */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl mt-4">
                <StatisticCard
                    title="HR Foundation"
                    icon={<FaRegClock />}
                    className="bg-sky-100 dark:bg-opacity-75"
                    link="/concepts/customers/employee-list"
                />
                <StatisticCard
                    title="Workforce Management"
                    icon={<FaRegCalendarCheck />}
                    className="bg-emerald-100 dark:bg-opacity-75"
                />
                <StatisticCard
                    title="Compensation for Payroll"
                    icon={<TbCurrencyDollar />}
                    className="bg-purple-100 dark:bg-opacity-75"
                />
                <StatisticCard
                    title="Employee Engagement"
                    icon={<FaLink />}
                    className="bg-amber-100 dark:bg-opacity-75"
                />
                <StatisticCard
                    title="Admin"
                    icon={<RiAdminLine />}
                    className="bg-red-100 dark:bg-opacity-75"
                />
            </div>
        </Card>
    )
}

export default OverviewSection