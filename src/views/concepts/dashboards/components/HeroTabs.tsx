import { useEffect, useState } from "react";
import Tabs from "@/components/ui/Tabs";
import TabContent from "@/components/ui/Tabs/TabContent";
import TabList from "@/components/ui/Tabs/TabList";
import TabNav from "@/components/ui/Tabs/TabNav";
import { Carousel } from "@/components/shared/Carousel";

import { getChairmanMessages } from "@/services/ChairmanMessageService";
import { getCelebrations } from "@/services/CelebrationService";

interface ChairmanMessage {
  name: string;
  title: string;
  chairman_name: string;
  message: string;
  published_date: string;
}

interface Celebration {
  employee_name: string;
  name: string;
  employee: string;
  type: string;
  date: string;
  message: string;
  status: string;
}

export const HeroTabs = () => {
  const [messages, setMessages] = useState<ChairmanMessage[]>([]);
  const [celebrations, setCelebrations] = useState<Celebration[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      const response = await getChairmanMessages<{ data: ChairmanMessage[] }>();
      if (response) setMessages(response.data);
    }

    async function fetchCelebrations() {
      const response = await getCelebrations<{ data: Celebration[] }>();
      if (response) setCelebrations(response.data);
    }

    fetchMessages();
    fetchCelebrations();
  }, []);

  return (
    <div className="mt-4">
      <Tabs defaultValue="tab1">
        <TabList>
          <TabNav value="tab1">CEO's Desk</TabNav>
          <TabNav value="tab2">Celebrations</TabNav>
        </TabList>

        <div className="">
          {/* CEO's Desk Tab */}
          <TabContent value="tab1">
            {messages.length > 0 ? (
              <Carousel>
                {messages.map((msg) => (
                  <div key={msg.name} className="p-4 bg-white shadow rounded-xl border mx-2 min-w-[300px] max-w-[400px]">
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">{msg.title}</h2>
                    <p className="text-xs text-gray-500 mb-2">
                      By {msg.chairman_name} on {new Date(msg.published_date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-700">{msg.message}</p>
                  </div>
                ))}
              </Carousel>
            ) : (
              <p className="text-sm text-gray-500">No Chairman Messages available.</p>
            )}
          </TabContent>

          {/* Celebrations Tab */}
          <TabContent value="tab2">
            {celebrations.length > 0 ? (
              <Carousel>
                {celebrations.map((event) => (
                  <div key={event.name} className="p-4 bg-white shadow rounded-xl border mx-2 min-w-[300px] max-w-[400px]">
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">{event.type}</h2>
                    <p className="text-xs text-gray-500 mb-2">
                      {event.employee_name} - {event.status} on {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-700">{event.message}</p>
                  </div>
                ))}
              </Carousel>
            ) : (
              <p className="text-sm text-gray-500">No upcoming celebrations.</p>
            )}
          </TabContent>
        </div>
      </Tabs>
    </div>
  );
};
