import { useState } from "react"
import { Button } from "@/components/ui/Button"
import Container from '@/components/shared/Container'
import { TbArrowNarrowLeft } from 'react-icons/tb'
import { useNavigate, useSearchParams } from "react-router-dom";
import { createAttendance } from "@/services/AttendanceRegularisationService"
import AttendanceRegularisation, { type AttendanceSchema } from "./components/AttendanceRegularisation"

export default function NewAttendancePage() {
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()

  const urlDate = searchParams.get("date")
  const defaultDate = urlDate ?? new Date().toISOString().split("T")[0]

  const handleSubmit = async (values: AttendanceSchema) => {
    setSubmitting(true)
    try {
      const response = await createAttendance(values)
      if (response) {
        navigate("/concepts/attendance/regularization")
      }
    } catch (error) {
      console.error("Failed to create attendance:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleBack = () => {
    history.back()
  }

  return (
    // <div className="container mx-auto py-6">
    //   {/* <h2 className="text-2xl font-bold mb-6">New Attendance Regularization</h2> */}
    //   <AttendanceRegularisation
    //     onFormSubmit={handleSubmit}
    //     defaultValues={{
    //       employee_number: "",
    //       reason: null,
    //       approved_by: "",
    //       // date: new Date().toISOString().split("T")[0],
    //       date: defaultDate,
    //       status: "pending",
    //     }}
    //   >
    //     <div className="flex justify-end mr-10 gap-2">
    //       <Button onClick={() => navigate("/concepts/attendance/regularization")}>
    //         Cancel
    //       </Button>
    //       <Button type="submit" disabled={submitting}>
    //         {submitting ? "Submitting..." : "Submit"}
    //       </Button>
    //     </div>
    //   </AttendanceRegularisation>
    // </div>
    <>
      <AttendanceRegularisation
        onFormSubmit={handleSubmit}
        defaultValues={{
          employee_number: "",
          reason: null,
          // approved_by: "",
          // date: new Date().toISOString().split("T")[0],
          date: defaultDate,
          status: "pending",
        }}
      >
        <Container>
          <div className="flex items-center justify-between px-8">
            <Button
              className="ltr:mr-3 rtl:ml-3"
              type="button"
              variant="plain"
              icon={<TbArrowNarrowLeft />}
              onClick={handleBack}
            >
              Back
            </Button>
            <div className="flex items-center">
              <Button
                className="ltr:mr-3 rtl:ml-3"
                type="button"
                customColorClass={() =>
                  'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                }
                onClick={() => navigate("/concepts/attendance/regularization")}
              >
                Cancel
              </Button>
              <Button
                variant="solid"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>

        </Container>
      </AttendanceRegularisation >
    </>
  )
}

