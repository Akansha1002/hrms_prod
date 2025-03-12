import SalaryAdjustmentUserAction from "./components/SalaryAdjustmentUserAction"
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
const SalaryAdjustment = () => {
  return (
    <div>
      <SalaryAdjustmentUserAction />
      <div>
        <Container>
          <div className="flex items-center justify-between px-8 mt-6">
            <span></span>
            <div className="flex items-center">
              <Button
                className="ltr:mr-3 rtl:ml-3"
                variant="solid"
                type="submit"
              >
                Submit
              </Button>
              <Button
                type="button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default SalaryAdjustment