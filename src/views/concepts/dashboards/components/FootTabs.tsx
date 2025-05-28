import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import Tabs from "@/components/ui/Tabs";
import TabContent from "@/components/ui/Tabs/TabContent";
import TabList from "@/components/ui/Tabs/TabList";
import TabNav from "@/components/ui/Tabs/TabNav";
import { getCelebrations } from "@/services/CelebrationService";
import { getNotices } from "@/services/NoticeService";



interface Notice {
  name: string;
  title: string;
  description: string;
  notice_date: string;
  expiry_date: string;
  status: string;
}

export const FootTabs = () => {

  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {

    async function fetchNotices() {
      const response = await getNotices<{ data: Notice[] }>();
      if (response) {
        setNotices(response.data);
      }
    }

    fetchNotices();
  }, []);

  return (
    <div className="mt-4">
      <Tabs defaultValue="tab1">
        <TabList>
          <TabNav value="tab1">Celebration</TabNav>
          <TabNav value="tab2">Touch Points</TabNav>
          <TabNav value="tab3">Notices</TabNav>
        </TabList>
        <div className="p-4">
          {/* \U0001f389 Celebrations Tab with Swiper */}


          {/* \U0001f4e2 Notices Tab with Swiper */}
          <TabContent value="tab3">
            {notices.length > 0 ? (
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                pagination={{ dynamicBullets: true }}
                navigation
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="w-full"
              >
                {notices.map((notice) => (
                  <SwiperSlide key={notice.name} className="p-5">
                    <div className="p-4  shadow-md rounded-lg">
                      <h2 className="text-xl font-bold">{notice.title}</h2>
                      <p className="text-sm text-gray-600">
                        Notice Date: {new Date(notice.notice_date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        Expiry Date: {new Date(notice.expiry_date).toLocaleDateString()}
                      </p>
                      <p className="mt-2">{notice.description}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p>No notices available.</p>
            )}
          </TabContent>

          {/* Touch Points Tab */}
          <TabContent value="tab2">
            <p>
              A computer lets you make more mistakes faster than any invention
              in human history with the possible exceptions of handguns and
              tequila. (Mitch Radcliffe)
            </p>
          </TabContent>
        </div>
      </Tabs>
    </div>
  );
};
