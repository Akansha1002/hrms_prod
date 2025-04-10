
import LeaveListFilter from "./LeaveListFilter"
import LeaveListSearch from "./LeaveListSearch"

const LeaveListTableTools = () => {

  return (
    <div className="flex items-center justify-between">
      <LeaveListSearch />
      <LeaveListFilter />
    </div>
  )
}

export default LeaveListTableTools