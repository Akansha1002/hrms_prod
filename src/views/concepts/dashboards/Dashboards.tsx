import useSWR from "swr"
import AwardSection from "./components/AwardSection"
import CompanyAnnouncements from "./components/CompanyAnnouncements"
import CompanyHighlights from "./components/CompanyHighlights"
import GallerySection from "./components/GallerySection"
import OverviewSection from "./components/OverviewSection"
import ProfileSection from "./components/ProfileSection"
import { getAllChairmanMessages } from "@/services/ChairmanMessageService"
import { ChairmanMessage, Notice } from "./types"
import { getNotices } from "@/services/NoticeService"

const Dashboards = () => {

  // const { data: response, isLoading: isChairmanMessageLoading } = useSWR(
  //   ['api/chairman message'],
  //   () => getAllChairmanMessages<{ data: ChairmanMessage[] }>(),
  //   {
  //     revalidateOnFocus: false,
  //     revalidateIfStale: false,
  //     revalidateOnReconnect: false,
  //   }
  // )

  // const chairmanMessage = response?.data ?? []

  const { data, isLoading } = useSWR(
    'fetch-all-data',
    async () => {
      const [messageRes, noticeRes] = await Promise.all([
        getAllChairmanMessages<{ data: ChairmanMessage[] }>(),
        getNotices<{ data: Notice[] }>(),
      ]);

      return {
        chairmanMessage: messageRes?.data ?? [],
        notices: noticeRes?.data ?? [],
      };
    },
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    },
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1 xl:max-w-[calc(100%-350px)]">
          <OverviewSection />
          <CompanyAnnouncements
            chairmanMessage={data?.chairmanMessage || []}
          />
        </div>
        <div className="flex flex-col gap-4 2xl:min-w-[360px] w-[280px]">
          <ProfileSection data={{
            img: 'https://images.unsplash.com/photo-1502685104226-1c2f8b0d3e4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
            name: 'Administrator',
            email: ''
          }} />
          <CompanyHighlights 
            notices={data?.notices || []}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-1 xl:col-span-1 order-1">
          <GallerySection />
        </div>
        <div className="md:col-span-1 xl:col-span-1 order-2 xl:order-3">
          <AwardSection />
        </div>
      </div>
    </div>
  )
}

export default Dashboards