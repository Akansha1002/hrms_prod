import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";

import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Tabs from "@/components/ui/Tabs";
import TabList from "@/components/ui/Tabs/TabList";
import TabNav from "@/components/ui/Tabs/TabNav";
import TabContent from "@/components/ui/Tabs/TabContent";
import { HeroTabs } from "./HeroTabs";
import { getNews } from "@/services/NewsService";
import { Carousel } from "@/components/shared/Carousel";
import { getNotifications } from "@/services/NotificationService";

interface News {
  employee_name: string;
  name: string;
  title: string;
  author: string;
  published_date: string;
  content: string;
  category: string;
}

interface Notification {
  name: string;
  message: string;
  type: string;
}

export const Profile = () => {
  const [news, setNews] = useState<News[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    async function fetchNews() {
      const response = await getNews<{ data: News[] }>();
      if (response) {
        setNews(response.data);
      }
    }

    async function fetchNotifications() {
      const response = await getNotifications<{ data: Notification[] }>();
      if (response) {
        setNotifications(response.data);
      }
    }

    fetchNews();
    fetchNotifications();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 mt-6">
      {/* Profile Card */}
      <div className="w-full sm:w-1/2 lg:w-1/4 min-w-[250px]">
        <Card>
          <div className="p-6 flex flex-col items-center">
            <div className="relative mb-4">
              <Avatar size={100} className="shadow-md" />
              <Button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white shadow">
                <FiEdit />
              </Button>
            </div>
            <h3 className="text-lg font-semibold mb-1">User Name</h3>
            <p className="text-sm text-gray-500 mb-1">Role</p>
            <p className="text-sm text-gray-500">Reporting to</p>
          </div>
        </Card>
      </div>

      {/* Frequently Used Section */}
      <div className="w-full sm:w-1/2 lg:w-1/3 min-w-[300px] flex flex-col gap-4">
        <Card className="h-full">
          <HeroTabs />
        </Card>
      </div>

      {/* Notification & News Tabs */}
      <div className="w-full lg:w-1/3 min-w-[300px]">
        <Card className="h-full">
          <Tabs defaultValue="tab1">
            <TabList>
              <TabNav value="tab1">Notification</TabNav>
              <TabNav value="tab2">HR Announcement</TabNav>
            </TabList>

            <div className="">
              <TabContent value="tab1">
                {notifications.length > 0 ? (
                  <div className="space-y-4">
                    {notifications.map((note) => (
                      <div
                        key={note.name}
                        className="bg-gray-100 border-l-4 p-3 rounded shadow-sm"
                        style={{
                          borderColor:
                            note.type === "Info"
                              ? "#3b82f6"
                              : note.type === "Warning"
                                ? "#f59e0b"
                                : "#6b7280",
                        }}
                      >
                        <p className="text-sm text-gray-800">{note.message}</p>
                        <span className="text-xs text-gray-500 italic">{note.type}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No notifications available.</p>
                )}
              </TabContent>

              <TabContent value="tab2">
                {news.length > 0 ? (
                  <Carousel>
                    {news.map((item) => (
                      <div
                        key={item.name}
                        className="bg-white shadow rounded-lg p-4 mx-2 min-w-[300px] max-w-[400px]"
                      >
                        <h2 className="text-lg font-bold mb-1">{item.title}</h2>
                        <p className="text-xs text-gray-500">
                          By {item.employee_name} on{" "}
                          {new Date(item.published_date).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-blue-500">{item.category}</p>
                        <p className="mt-2 text-sm text-gray-700">{item.content}</p>
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <p className="text-sm text-gray-500">No HR Announcements available.</p>
                )}
              </TabContent>
            </div>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};
