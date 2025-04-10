import DebouceInput from '@/components/shared/DebouceInput'
import { TbSearch } from 'react-icons/tb'



const TaxExemptionDeclarationListSearch = () => {


  return (
    <>
      <DebouceInput
        className="max-w-[400px]"
        placeholder="Full Name"
        type="text"
        size="sm"
        suffix={<TbSearch className="text-lg" />}

      />
    </>
  )
}

export default TaxExemptionDeclarationListSearch