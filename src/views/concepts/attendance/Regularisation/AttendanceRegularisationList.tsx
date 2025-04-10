import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import DataTable from "@/components/shared/DataTable";
import { Link, useNavigate } from "react-router-dom";
import { FaPlusCircle, FaEdit, FaSpinner } from "react-icons/fa";
import { getAttendances, updateAttendance } from "@/services/AttendanceRegularisationService";
import { AttendanceData } from "./type";
import AttendanceRegularisation, { type AttendanceSchema } from "./components/AttendanceRegularisation";
import Container from "@/components/shared/Container";
import { TbArrowNarrowLeft } from "react-icons/tb";
import AttendanceRegularisationListTable from "./components/AttendanceRegularisationListTable";
import AttendanceRegularisationTableTools from "./components/AttendanceRegularisationTableTools";

export default function AttendancePage() {
  const [selectedAttendance, setSelectedAttendance] = useState<AttendanceData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const handleEdit = (attendance: AttendanceData) => {
    setSelectedAttendance(attendance);
    setIsEditing(true);
  };

  const handleUpdate = async (values: AttendanceSchema) => {
    if (!selectedAttendance?.name) return;
    try {
      await updateAttendance(selectedAttendance.name, values);
      setIsEditing(false);
      setSelectedAttendance(null);

    } catch (error) {
      console.error("Failed to update attendance:", error);
    }
  };


  const handleCancel = () => {
    setIsEditing(false);
    setSelectedAttendance(null);
  };

  if (isEditing && selectedAttendance) {
    return (
      <AttendanceRegularisation
        onFormSubmit={handleUpdate}
        defaultValues={{
          employee_number: selectedAttendance.employee_number || "",
          reason: selectedAttendance.reason,

          date: selectedAttendance.date || "",
          status: selectedAttendance.status || "pending",
        }}
      >
        <Container>
          <div className="flex items-center justify-between px-8">
            <Button
              className="ltr:mr-3 rtl:ml-3"
              type="button"
              variant="plain"
              icon={<TbArrowNarrowLeft />}
              onClick={handleCancel}
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
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="solid"
                type="submit"
              >
                Update
              </Button>
            </div>
          </div>
        </Container>
        {/* <div className="flex justify-end gap-2 mr-10">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="submit">Update</Button>
        </div> */}
      </AttendanceRegularisation>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <div className="flex flex-row items-center justify-between">
          <h3>Attendance Regularization</h3>
          <Button variant="solid" icon={<FaPlusCircle className="text-xl" />} onClick={() => navigate("/concepts/attendance/regularization-create")}>
            Add New
          </Button>
        </div>
        <div className="mt-10">
          <AttendanceRegularisationTableTools />
          <AttendanceRegularisationListTable handleEdit={handleEdit} />
        </div>
      </Card>
    </div>
  );
}
