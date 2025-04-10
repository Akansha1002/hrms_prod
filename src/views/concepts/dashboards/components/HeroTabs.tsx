import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import Tabs from "@/components/ui/Tabs";
import TabContent from "@/components/ui/Tabs/TabContent";
import TabList from "@/components/ui/Tabs/TabList";
import TabNav from "@/components/ui/Tabs/TabNav";

import { getChairmanMessages } from "@/services/ChairmanMessageService";
import { getNews } from "@/services/NewsService";

interface ChairmanMessage {
  name: string;
  title: string;
  chairman_name: string;
  message: string;
  published_date: string;
}

interface News {
  employee_name: string;
  name: string;
  title: string;
  author: string;
  published_date: string;
  content: string;
  category: string;
}

export const HeroTabs = () => {
  const [messages, setMessages] = useState<ChairmanMessage[]>([]);
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      const response = await getChairmanMessages<{ data: ChairmanMessage[] }>();
      if (response) {
        setMessages(response.data);
      }
    }
    async function fetchNews() {
      const response = await getNews<{ data: News[] }>();
      if (response) {
        setNews(response.data);
      }
    }
    fetchMessages();
    fetchNews();
  }, []);

  return (
    <div className="mt-4">
      <Tabs defaultValue="tab1">
        <TabList>
          <TabNav value="tab1">CEO's Desk</TabNav>
          <TabNav value="tab2">HR Announcement</TabNav>
          <TabNav value="tab3">Things to do</TabNav>
          <TabNav value="tab4">Share Information</TabNav>
        </TabList>
        <div className="p-4">
          {/* CEO's Desk */}
          <TabContent value="tab1">
            {messages.length > 0 ? (
              <Swiper
                modules={[Autoplay, Pagination]}
                pagination={{ dynamicBullets: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="w-full"
              >
                {messages.map((msg) => (
                  <SwiperSlide key={msg.name} className="p-5">
                    <div className="p-4 bg-white shadow-md rounded-lg">
                      <h2 className="text-xl font-bold">{msg.title}</h2>
                      <p className="text-sm text-gray-500">
                        By {msg.chairman_name} on{" "}
                        {new Date(msg.published_date).toLocaleDateString()}
                      </p>
                      <p className="mt-2">{msg.message}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p>No Chairman Messages available.</p>
            )}
          </TabContent>

          {/* HR Announcements */}
          <TabContent value="tab2">
            {news.length > 0 ? (
              <Swiper
                modules={[Autoplay, Pagination]}
                pagination={{ dynamicBullets: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="w-full"
              >
                {news.map((item) => (
                  <SwiperSlide key={item.name} className="p-5">
                    <div className="p-4 bg-white shadow-md rounded-lg">
                      <h2 className="text-xl font-bold">{item.title}</h2>
                      <p className="text-sm text-gray-500">
                        By {item.employee_name} on{" "}
                        {new Date(item.published_date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="mt-2">{item.content}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p>No HR Announcements available.</p>
            )}
          </TabContent>

          {/* Other Tabs */}
          <TabContent value="tab3">
            <p>Things to do content goes here...</p>
          </TabContent>
          <TabContent value="tab4">
            <p>Share Information content goes here...</p>
          </TabContent>
        </div>
      </Tabs>
    </div>
  );
};
