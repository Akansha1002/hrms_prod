import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { getGallery } from "@/services/GalleryService";

interface GalleryItem {
  name: string;
  title: string;
  description: string;
  category: string;
  images: string[]; // Array of image URLs
}

export const Gallery = () => {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGalleries() {
      try {
        const response = await getGallery<{ data: GalleryItem[] }>();
        console.log("Gallery API Response:", response); // Debugging
        if (response?.data && Array.isArray(response.data)) {
          setGalleries(response.data);
        } else {
          setGalleries([]);
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
        setGalleries([]);
      } finally {
        setLoading(false);
      }
    }
    fetchGalleries();
  }, []);

  if (loading) return <p>Loading gallery...</p>;
  if (galleries.length === 0) return <p>No galleries available.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Gallery</h2>
      {galleries.map((gallery) => (
        <div key={gallery.name} className="mb-6">
          <h3 className="text-xl font-semibold">{gallery.title}</h3>
          <p className="text-gray-600">{gallery.description}</p>

          {gallery.images && gallery.images.length > 0 ? (
            <Swiper
              modules={[Autoplay, Pagination]}
              pagination={{ dynamicBullets: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop={true}
              className="w-full mt-4"
            >
              {gallery.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`Gallery ${gallery.title} - Image ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-gray-400 mt-2">No images available.</p>
          )}
        </div>
      ))}
    </div>
  );
};
