import EmployeeSeparationListSearch from "./EmployeeSeparationListSearch"
import EmployeeSeparationListFilter from "./EmployeeSeparatoinListFilter"


const EmployeeSeparationListTableTools = () => {

  return (
    <div className="flex items-center justify-between">
      <EmployeeSeparationListSearch />
      <EmployeeSeparationListFilter />
    </div>
  )
}

export default EmployeeSeparationListTableTools