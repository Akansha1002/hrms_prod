import DebouceInput from '@/components/shared/DebouceInput'
import { TbSearch } from 'react-icons/tb'
import { Ref } from 'react'
import useAttendanceList from '../hooks/useAttendanceList'


const AttendanceRegularisationListSearch = () => {
  const { tableData, setTableData } = useAttendanceList()

  const handleInputChange = (query: string) => {
    setTableData({ ...tableData, query })
  }

  return (
    <>
      <DebouceInput
        className="max-w-[400px]"
        placeholder="Full Name"
        type="text"
        size="sm"
        suffix={<TbSearch className="text-lg" />}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </>
  )
}

export default AttendanceRegularisationListSearch