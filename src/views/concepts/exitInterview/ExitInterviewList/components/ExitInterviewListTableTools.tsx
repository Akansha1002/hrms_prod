import ExitInterviewListFilter from './ExitInterviewListFilter'
import ExitInterviewListSearch from './ExitInterviewListSearch'

const ExitInterviewListTableTools = () => {
    return (
        <div className="flex items-center justify-between">
            <ExitInterviewListSearch />
            <ExitInterviewListFilter />
        </div>
    )
}

export default ExitInterviewListTableTools
