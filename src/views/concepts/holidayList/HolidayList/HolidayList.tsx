import useSWR from 'swr';
import HolidayListTable from './components/HolidayListTable';
import { GetHolidayListResponse, HolidayListTableData } from './types';
import { apiGetHolidayList } from '@/services/HolidayService';

const HolidayList = () => {

    const { data, isLoading, mutate } = useSWR(
        ['/api/resource/Holiday List', {}],
        ([_, params]) => apiGetHolidayList<GetHolidayListResponse, Record<string, unknown>>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    // const holidayListTableData: HolidayListTableData[] = [
    //     { id: "Hyderabad", from_date: "01-Jan-2025", to_date: "01-Jan-2026", total_holidays: "20" },
    // ];

    const holidayListTableData = data?.data || [];

    return (
        <>
            <HolidayListTable data={holidayListTableData} />
        </>
    )
}

export default HolidayList