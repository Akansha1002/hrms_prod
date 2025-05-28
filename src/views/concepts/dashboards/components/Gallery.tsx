import { useEffect, useState } from "react";
import Tabs from "@/components/ui/Tabs";
import TabList from "@/components/ui/Tabs/TabList";
import TabNav from "@/components/ui/Tabs/TabNav";
import TabContent from "@/components/ui/Tabs/TabContent";
import { Carousel } from "@/components/shared/Carousel";
import { getGallery } from "@/services/GalleryService";
import { getAwards } from "@/services/AwardService";


interface GalleryItem {
  name: string;
  title: string;
  description: string;
  category: string;
}

interface AwardItem {
  award_name: string;
  description: string;
  employee: string;
  photo: string | null;
  delete_flag: number;
}

export const Gallery = () => {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [awards, setAwards] = useState<AwardItem[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [loadingAwards, setLoadingAwards] = useState(true);

  useEffect(() => {
    async function fetchGalleries() {
      try {
        const response = await getGallery<{ data: GalleryItem[] }>();
        if (response?.data && Array.isArray(response.data)) {
          setGalleries(response.data);
        } else {
          setGalleries([]);
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
        setGalleries([]);
      } finally {
        setLoadingGallery(false);
      }
    }

    async function fetchAwards() {
      try {
        const response = await getAwards<{ data: AwardItem[] }>();
        const fetchedAwards = response?.data || [];
        // console.log(response);
        // const filteredAwards = fetchedAwards.filter((award) => award.delete_flag === 0);
        setAwards(fetchedAwards);
      } catch (error) {
        console.error("Error fetching awards:", error);
        setAwards([]);
      } finally {
        setLoadingAwards(false);
      }
    }

    fetchGalleries();
    fetchAwards();
  }, []);

  return (
    <Tabs defaultValue="gallery" className="mt-4">
      <TabList>
        <TabNav value="gallery">Gallery</TabNav>
        <TabNav value="awards">Awards</TabNav>
      </TabList>

      <div className="p-4">
        {/* Gallery Tab */}
        <TabContent value="gallery">
          {loadingGallery ? (
            <p>Loading gallery...</p>
          ) : galleries.length === 0 ? (
            <p>No galleries available.</p>
          ) : (
            <div className="space-y-6">
              {galleries.map((item) => (
                <div
                  key={item.name}
                  className="p-4 bg-white shadow rounded-lg border border-gray-100"
                >
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <span className="text-sm text-gray-500 italic">Category: {item.category}</span>
                </div>
              ))}
            </div>
          )}
        </TabContent>

        {/* Awards Tab */}
        <TabContent value="awards">
          {loadingAwards ? (
            <p>Loading awards...</p>
          ) : awards.length === 0 ? (
            <p>No awards available.</p>
          ) : (
            <div className="space-y-6">
              {awards.map((award, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white shadow rounded-lg"
                >
                  <img
                    src={
                      award.photo ||
                      "https://via.placeholder.com/100x100?text=No+Image"
                    }
                    alt={award.employee || award.award_name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{award.award_name}</h4>
                    <p className="text-gray-600 text-sm">{award.description}</p>
                    {award.employee && (
                      <p className="text-gray-400 text-xs">
                        Awarded to: {award.employee}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabContent>
      </div>
    </Tabs>
  );
};
