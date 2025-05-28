
import EmployeeTransferListFilter from "./EmployeeTransferListFilter"
import EmployeeTransferListSearch from "./EmployeeTransferListSearch"


const EmployeeSeparationListTableTools = () => {

  return (
    <div className="flex items-center justify-between">
      <EmployeeTransferListSearch />
      <EmployeeTransferListFilter />

    </div>
  )
}

export default EmployeeSeparationListTableTools