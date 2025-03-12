import HolidayListTable from './components/HolidayListTable';
import { HolidayListTableData } from './types';

const holidayListTableData: HolidayListTableData[] = [
    { id: "Hyderabad", from_date: "01-Jan-2025", to_date: "01-Jan-2026", total_holidays: "20" },

];

const HolidayList = () => {
    return (
        <>
            <HolidayListTable data={holidayListTableData} />
        </>
    )
}

export default HolidayList