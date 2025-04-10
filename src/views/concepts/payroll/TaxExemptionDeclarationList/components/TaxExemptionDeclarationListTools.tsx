import TaxExemptionDeclarationListFilter from "./TaxExemptionDeclarationListFilter"
import TaxExemptionDeclarationListSearch from "./TaxExemptionDeclarationListSearch"


const TaxExemptionDeclarationListTools = () => {

  return (
    <div className="flex items-center justify-between">
      <TaxExemptionDeclarationListSearch />
      <TaxExemptionDeclarationListFilter />
    </div>
  )
}

export default TaxExemptionDeclarationListTools