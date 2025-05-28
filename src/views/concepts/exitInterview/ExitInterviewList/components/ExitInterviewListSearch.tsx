import DebouceInput from '@/components/shared/DebouceInput'
import { TbSearch } from 'react-icons/tb'

const ExitInterviewListSearch = () => {
    // const { tableData, setTableData } = useEmployeeTransferList()

    // const handleInputChange = (query: string) => {
    //   setTableData({ ...tableData, query })
    // }

    return (
        <>
            <DebouceInput
                className="max-w-[400px]"
                placeholder="Full Name"
                type="text"
                size="sm"
                suffix={<TbSearch className="text-lg" />}
                // onChange={(e) => handleInputChange(e.target.value)}
            />
        </>
    )
}

export default ExitInterviewListSearch
