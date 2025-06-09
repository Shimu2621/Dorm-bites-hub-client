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
          spaceBetween={30}
          pagination={{ clickable: true }}
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Pagination, Navigation, Autoplay]}
          className="mt-10"
          breakpoints={{
            0: {
              slidesPerView: 1, // ✅ Small screens
            },
            768: {
              slidesPerView: 2, // ✅ Medium screens (md)
            },
            1024: {
              slidesPerView: 3, // ✅ Large screens (lg and up)
            },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </Container>
  );
};

export default Testimonials;
