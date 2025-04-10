import AttendanceRegularisationListSearch from "./AttendanceRegularisationListSearch"
import AttendanceRegularisationListTableFilter from "./AttendanceRegularisationListTableFilter"


const AttendanceRegularisationTableTools = () => {

  return (
    <div className="flex items-center justify-between">
      <AttendanceRegularisationListSearch />
      <AttendanceRegularisationListTableFilter />
    </div>
  )
}

export default AttendanceRegularisationTableTools