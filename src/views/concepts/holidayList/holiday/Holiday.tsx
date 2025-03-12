import { HolidayTableData } from '../../holidayList/holiday/types';
import HolidayTable from './components/HolidayTable';

const holidayTableData: HolidayTableData[] = [
    { date: "01-Jan-2025", description: "New Year", reason: "New Year" },
    { date: "14-Jan-2025", description: "Pongal", reason: "Pongal" },
    { date: "26-Feb-2025", description: "Maha Shivaratri", reason: "Maha Shivaratri" },
    { date: "31-Mar-2025", description: "Ramzan", reason: "Ramzan" },
    { date: "01-May-2025", description: "May Day", reason: "May Day" },
    { date: "15-Aug-2025", description: "Independence Day", reason: "Independence Day" },
];

const Holiday = () => {
  return (
    <>
    <HolidayTable data={holidayTableData} />
    </>
  )
}

export default Holiday