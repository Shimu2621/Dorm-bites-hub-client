"use client";

import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
import Container from "@/utils/container/Container";
import Image from "next/image";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Mousewheel, Pagination } from "swiper/modules";

const images = [
  "https://img.freepik.com/premium-photo/gourmet-dish-being-prepared-highend-restaurant-kitchen_941600-12208.jpg",
  "https://t3.ftcdn.net/jpg/06/04/32/88/360_F_604328836_NkM6jP1mom76l4Ja88NVyVV6MGG6ai8B.jpg",
  "https://img.freepik.com/premium-photo/beautiful-young-smiling-waitress-restaurant-with-plate-food-luxury-restaurant_652240-3966.jpg",
  "https://cdn.arabsstock.com/uploads/images/230153/image-230153-plate-gelatin-dessert-orange-pistachios-foods-rich-sugar-thumbnail.webp",
  "https://img.freepik.com/premium-photo/buffet-catering_926199-2012562.jpg",
  "https://chacepeople.com/storage/images/contents/blog/27/1667898337_o-resizer-1-.jpeg",
];

const Banner = () => {
  return (
    <section className="p-10 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Left section */}
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-500 italic mb-6">
              Enhance Your University Life with Luxurious Hostel Living and
              Exquisite Dining!
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Discover a seamless blend of comfort and taste at DormBitesHub.
              Elevate your stay with an environment designed for both relaxation
              and productivity. Experience premium student living with modern
              dorms, delectable dining, and top-notch amenities that make every
              moment feel like home.
            </p>
            {/* Buttons */}
            <div className="flex justify-start space-x-4">
              <Button className="bg-blue-500 font-bold hover:bg-white hover:border-2 hover:border-blue-500 hover:text-blue-500">
                Get Started
              </Button>

              {/* Secondary Button with Glassmorphism Effect */}
              <Button className="bg-pink-600 font-bold hover:bg-white hover:border-2 hover:border-pink-600 hover:text-pink-600">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full max-w-[800px] ">
            {/* <Image
              width={604}
              height={280}
              src="https://img.freepik.com/premium-photo/gourmet-dish-being-prepared-highend-restaurant-kitchen_941600-12208.jpg"
              alt=""
              className="w-[50vw] h-[70vh] rounded-md object-contain"
            /> */}
            <Swiper
              direction={"vertical"}
              slidesPerView={1}
              spaceBetween={30}
              mousewheel={true}
              pagination={{
                clickable: true,
              }}
              autoplay={{ delay: 3000, disableOnInteraction: false }} // Auto-slide every 3 seconds
              modules={[Autoplay, Mousewheel, Pagination]}
              className="mySwiper h-[70vh]"
            >
              {images.map((src, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={src}
                    alt={`Banner Image ${index + 1}`}
                    width={400}
                    height={500}
                    className="w-full h-[70vh] rounded-md object-cover"
                    unoptimized
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Banner;
