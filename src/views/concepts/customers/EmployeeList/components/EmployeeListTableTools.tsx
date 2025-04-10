import useEmployeeList from "../hooks/useEmployeeList"
import EmployeeListSearch from "./EmployeeListSearch"
import EmployeeListTableFilter from "./EmployeeListTableFilter"
import cloneDeep from 'lodash/cloneDeep'

const EmployeeListTableTools = () => {

    return (
        <div className="flex items-center justify-between">
            <EmployeeListSearch />
            <EmployeeListTableFilter />
        </div>
    )
}

export default EmployeeListTableTools