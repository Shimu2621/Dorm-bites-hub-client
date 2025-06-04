"use client";

import { Button } from "@/components/ui/button";
import Container from "@/utils/container/Container";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Mousewheel, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Image Data
const images = [
  "https://img.freepik.com/premium-photo/gourmet-dish-being-prepared-highend-restaurant-kitchen_941600-12208.jpg",
  "https://t3.ftcdn.net/jpg/06/04/32/88/360_F_604328836_NkM6jP1mom76l4Ja88NVyVV6MGG6ai8B.jpg",
  "https://img.freepik.com/premium-photo/beautiful-young-smiling-waitress-restaurant-with-plate-food-luxury-restaurant_652240-3966.jpg",
  "https://img.freepik.com/premium-photo/stack-food-black-plate-appetizing-meal-display-unveil-culinary-artistry-with-macro-food-photography-capturing-mouthwatering-details-inviting-appreciation-ai-generated_538213-45095.jpg",
  "https://img.freepik.com/premium-photo/buffet-catering_926199-2012562.jpg",
  "https://img.freepik.com/premium-photo/skilled-chef-effortlessly-prepares-delicious-meal-plate-kitchen-ensuring-visually-appealing-presentation-gourmet-dish-being-prepared-highend-restaurant-kitchen-ai-generated_538213-23732.jpg",
];

// Titles for Animation
const titles = [
  "Enhance Your University Life with Luxurious Hostel Living!",
  "Experience Premium Student Living with Modern Dorms!",
  "Enjoy Delectable Dining and Top-Notch Amenities!",
];

const Banner = () => {
  const [text, setText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const speed = 100; // Typing speed
  const eraseSpeed = 50; // Deleting speed
  const delay = 1500; // Delay before erasing

  useEffect(() => {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      if (text.length > 0) {
        setTimeout(() => setText(text.slice(0, -1)), eraseSpeed);
      } else {
        setIsDeleting(false);
        setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
      }
    } else {
      if (text.length < currentTitle.length) {
        setTimeout(
          () => setText(currentTitle.slice(0, text.length + 1)),
          speed
        );
      } else {
        setTimeout(() => setIsDeleting(true), delay);
      }
    }
  }, [text, isDeleting, titleIndex]);

  return (
    <section className="p-10 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Left Section */}
          <div className="mb-6">
            {/* Animated Title */}
            <motion.h1
              key={titleIndex} // Ensures animation restarts with each new title
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-primary italic mb-6"
            >
              {text}
            </motion.h1>

            {/* Description */}
            <p className="text-lg text-gray-color mb-6">
              Discover a seamless blend of comfort and taste at DormBitesHub.
              Elevate your stay with an environment designed for both relaxation
              and productivity. Experience premium student living with modern
              dorms, delectable dining, and top-notch amenities that make every
              moment feel like home.
            </p>

            {/* Buttons */}
            <div className="flex justify-start space-x-4">
              <Button className="bg-primary text-default-white font-bold hover:bg-background hover:border-2 hover:border-primary hover:text-primary">
                Get Started
              </Button>

              <Button className="bg-pink-600 text-default-white font-bold hover:bg-background hover:border-2 hover:border-pink-600 hover:text-pink-600">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Section - Image Carousel */}
          <div className="w-full max-w-[800px]">
            <Swiper
              direction="vertical"
              slidesPerView={1}
              spaceBetween={30}
              mousewheel
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
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
