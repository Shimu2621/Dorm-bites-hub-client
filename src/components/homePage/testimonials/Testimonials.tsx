"use client";

import Container from "@/utils/container/Container";
import TestimonialCard from "./TestimonialCard";
import testimonials from "@/staticData/testimonials";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Testimonials: React.FC = () => {
  return (
    <Container>
      <section className="mx-auto pt-20 pb-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold italic text-primary">
            Testimonials
          </h1>
          <p className="text-gray-color mb-20">
            Discover what our valued clients have to say about us. Their
            testimonials showcase the impact of
            <br /> our work and our commitment to excellence.
          </p>
        </div>

        {/* SwiperJS Integration */}
        <Swiper
          spaceBetween={30} // Gap between slides
          slidesPerView={3} // Show 3 cards at a time
          pagination={{ clickable: true }}
          navigation // Enable arrows for navigation
          autoplay={{
            delay: 3000, // 3-second delay between slides
            disableOnInteraction: false, // Autoplay continues even after user interaction
          }}
          loop={true} // Infinite loop for smooth transition
          modules={[Pagination, Navigation, Autoplay]}
          className="mt-10"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </Container>
  );
};

export default Testimonials;
