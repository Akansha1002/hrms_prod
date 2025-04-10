import Chart from "react-apexcharts"
import type { ApexOptions } from "apexcharts"
import Card from "@/components/ui/Card"
import { COLORS, GRAY_COLORS } from "@/constants/chart.constant"
import { FaRegCircleUser } from "react-icons/fa6";
import { BsStopwatch } from "react-icons/bs";
import { FaClock } from "react-icons/fa";


const AttendanceCard = () => {
  // Sample attendance hours: Mon to Sun
  const weeklyShifts = [9.00, 7.55, 9.05, 5.53, 9.03, null, null] // null = holiday, 0 = leave, -1 = absent

  // Sample data for the attendance chart
  const attendanceData = [
    {
      name: "Hours",
      // data: [9.00, 7, 0, 0, 0, 0, 0], // Only Monday has hours logged
      data: weeklyShifts.map(h => h === null ? 0 : h),
    },
  ]

  // Tooltip messages
  const tooltipLabels = weeklyShifts.map(hour => {
    if (hour === null) return "Holiday"
    if (hour === -1) return "Absent"
    if (hour === 0) return "On Leave"
    if (hour >= 9) return `Present: ${hour}h`
    return `Attendance Regularisation: ${hour}h`
  })

  // Bar colors based on shift logic
  const barColors = weeklyShifts.map(hour => {
    if (hour === null) return "transparent" // weekend/holiday
    if (hour === -1) return COLORS[2] // Absent
    if (hour === 0) return COLORS[4] // leave
    if (hour >= 9) return COLORS[1] // Present
    return COLORS[3] // partial shift
  })

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      background: "transparent",
    },
    plotOptions: {
      bar: {
        columnWidth: "30%",
        borderRadius: 20,
        distributed: true,
      },
    },
    // colors: [COLORS[1]],
    colors: barColors,
    dataLabels: {
      enabled: true,
      offsetX: 0,
      style: {
        fontSize: '12px',
        colors: ['#fff']
      }
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: Array(7).fill(GRAY_COLORS[4]),
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
    },
    // tooltip: {
    //   enabled: false,
    // },
    tooltip: {
      enabled: true,
      custom: function ({ dataPointIndex }) {
        return `<div style="padding: 8px; font-size: 13px;">
                  ${tooltipLabels[dataPointIndex]}
                </div>`;
      },
    },

    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
      active: {
        filter: {
          type: "none",
        },
      },
    },
    legend: {
      show: false,
    },
    fill: {
      opacity: 1,
    },
  }

  // Header content with Time at Work title
  const headerContent = (
    <div className="flex items-center">
      <span className="mr-2">
        <FaClock className="h-6 w-6" />
      </span>
      <h4>Time at Work</h4>
    </div>
  )

  // Total hours (exclude null, 0, and -1)
  const totalHours = weeklyShifts.reduce((total, hour) => {
    if (typeof hour === 'number' && hour > 0) {
      return total + hour
    }
    return total
  }, 0)

  return (
    <Card
      header={{
        content: headerContent,
        bordered: true,
      }}
      bordered={true}
      bodyClass="p-0"
    >
      <div className="p-4">

        <div className="flex items-center mb-6">
          <div className="h-16 w-16 rounded-full  border-2  flex items-center justify-center mr-4">
            <FaRegCircleUser className="text-blue-400 w-full h-full" />
          </div>
          <div>
            <h3 className="text-blue-400 text-lg font-medium">Punched Out</h3>
            <p className="text-gray-500 text-sm">Punched Out: Mar 17th at 07:35 PM (GMT 5.5)</p>
          </div>
        </div>

        {/* Today's Time */}
        <div className="w-full flex items-center ml-4 relative">

          <div className="text-gray-600 w-11/12 bg-gray-200 px-4 py-2 rounded-full flex items-center justify-center gap-2  pr-12">
            <span className="font-medium">0h 0m</span> Today
          </div>


          <div className="bg-blue-400 p-2 rounded-full border-4 border-white absolute right-20 translate-x-1/2">
            <BsStopwatch className="text-white w-6 h-6" />
          </div>
        </div>

        <hr className="border-gray-300 my-4" />


        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-gray-600 font-medium">This Week</h3>
            <p className="text-gray-500 text-sm">Mar 17 - Mar 23</p>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-full bg-gray-300">
            <BsStopwatch className="text-gray-600 w-6 h-6" />
            <span className="font-medium text-gray-600">
              {`${Math.floor(totalHours)}h ${Math.round((totalHours % 1) * 60)}m`}
            </span>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="h-80">
          <Chart options={chartOptions} series={attendanceData} type="bar" height="100%" />
        </div>
      </div>
    </Card>
  )
}

export default AttendanceCard

