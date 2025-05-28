import Button from "@/components/ui/Button"

import { TbUserPlus } from "react-icons/tb"
import { useNavigate } from "react-router-dom"
import EmployeeSeparationListTableTools from "./components/EmployeeSeparationListTableTools";
import EmployeeSeparationListTable from "./components/EmployeeSeparationListTable";
import Container from "@/components/shared/Container";
import AdaptiveCard from "@/components/shared/AdaptiveCard";

const EmployeeSeparationList = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <AdaptiveCard>
      <div className="flex flex-row items-center justify-between">
        <h3>
          Employee Separation 
        </h3>
        <div> <Button
          variant="solid"
          icon={<TbUserPlus className="text-xl" />}
          onClick={() => navigate('/concepts/customers/employee-separation-create')}
        >
          Add new
        </Button></div>
      </div>
      <div className="mt-5">
        <EmployeeSeparationListTableTools />
        <EmployeeSeparationListTable />
      </div>
      </AdaptiveCard>
    </Container>
  )
}

export default EmployeeSeparationList

