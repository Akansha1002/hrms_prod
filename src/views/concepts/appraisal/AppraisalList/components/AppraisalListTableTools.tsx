import AppraisalListFilter from './AppraisalListFilter'
import AppraisalListSearch from './AppraisalListSearch'

const AppraisalListTableTools = () => {
    return (
        <div className="flex items-center justify-between">
            <AppraisalListSearch />
            <AppraisalListFilter />
        </div>
    )
}

export default AppraisalListTableTools
