import Button from "@/components/ui/Button"
import TaxExemptionDeclarationListTable from "./components/TaxExemptionDeclarationListTable"
import TaxExemptionDeclarationListTools from "./components/TaxExemptionDeclarationListTools"
import { TbUserPlus } from "react-icons/tb"
import { useNavigate } from "react-router-dom"

const TaxExemptionDeclarationList = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <h3>

          Employee Tax Exemption Declaration
        </h3>
        <div> <Button
          variant="solid"
          icon={<TbUserPlus className="text-xl" />}
          onClick={() => navigate('/concepts/payroll/create')}
        >
          Add new
        </Button></div>
      </div>
      <div className="mt-5">

        <TaxExemptionDeclarationListTools />
        <TaxExemptionDeclarationListTable />
      </div>
    </div>
  )
}

export default TaxExemptionDeclarationList