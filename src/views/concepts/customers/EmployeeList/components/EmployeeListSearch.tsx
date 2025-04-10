import DebouceInput from '@/components/shared/DebouceInput'
import { TbSearch } from 'react-icons/tb'
import { Ref } from 'react'
import useEmployeeList from '../hooks/useEmployeeList'

const EmployeeListSearch = () => {
    const { tableData, setTableData } = useEmployeeList()

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

export default EmployeeListSearch