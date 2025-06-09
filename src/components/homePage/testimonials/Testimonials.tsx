"use client";

import Container from "@/utils/container/Container";
import TestimonialCard from "./TestimonialCard";
import testimonials from "@/staticData/testimonials";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Testimonials: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Container>
      <section className="mx-auto pt-20 pb-20">
        <div className="text-center" data-aos="fade-up" data-aos-delay="100">
          <h1 className="text-2xl lg:text-4xl font-bold italic text-primary">
            Testimonials
          </h1>
          <p className="text-gray-color mb-20">
            Discover what our valued clients have to say about us. Their
            testimonials showcase the impact of
            <br className="hidden md:block" /> our work and our commitment to
            excellence.
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
          data-aos="zoom-in"
          data-aos-delay="100"
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
