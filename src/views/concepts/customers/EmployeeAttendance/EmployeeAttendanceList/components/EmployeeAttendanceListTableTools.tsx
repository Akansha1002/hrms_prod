import AttendanceListSearch from './EmployeeAttendanceListSearch'
import AttendanceListFilter from './EmployeeAttendanceListFilter'

const EmployeeAttendanceListTableTools = () => {
    return (
        <div className="flex items-center justify-between">
            <AttendanceListSearch />
            <AttendanceListFilter />
        </div>
    )
}

export default EmployeeAttendanceListTableTools
