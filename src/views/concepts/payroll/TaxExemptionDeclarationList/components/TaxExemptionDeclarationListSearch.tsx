import DebouceInput from '@/components/shared/DebouceInput'
import { TbSearch } from 'react-icons/tb'
import useTaxDeclarationList from '../hooks/useTaxDeclarationList'



const TaxExemptionDeclarationListSearch = () => {

    const { tableData, setTableData } = useTaxDeclarationList()
  
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

export default TaxExemptionDeclarationListSearch