import { useParams } from 'react-router-dom';
import { HolidayListDetailResponse, HolidayTableData } from '../../holidayList/holiday/types';
import HolidayTable from './components/HolidayTable';
import useSWR from 'swr';
import { apiGetHolidayListDetails } from '@/services/HolidayService';

// const holidayTableData: HolidayTableData[] = [
//   { date: "01-Jan-2025", description: "New Year", reason: "New Year" },
//   { date: "14-Jan-2025", description: "Pongal", reason: "Pongal" },
//   { date: "26-Feb-2025", description: "Maha Shivaratri", reason: "Maha Shivaratri" },
//   { date: "31-Mar-2025", description: "Ramzan", reason: "Ramzan" },
//   { date: "01-May-2025", description: "May Day", reason: "May Day" },
//   { date: "15-Aug-2025", description: "Independence Day", reason: "Independence Day" },
// ];

const Holiday = () => {
  const { id } = useParams()

  const { data, isLoading, mutate } = useSWR(
    id ? ['/api/resource/EmployeeDetail', { id }] : null,
    ([_, params]) => apiGetHolidayListDetails<HolidayListDetailResponse, { id: string }>(params),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    },
  )

  const holidayTableData = data?.data.holidays || []
  console.log(holidayTableData)

  return (
    <>
      <HolidayTable data={holidayTableData} />
    </>
  )
}

export default Holiday