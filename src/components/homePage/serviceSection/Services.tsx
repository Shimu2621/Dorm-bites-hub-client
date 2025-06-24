"use client";

import services from "@/staticData/services";
import Container from "@/utils/container/Container";
import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Services = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-background pt-20 pb-12">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service?.id}
              className="bg-accent px-6 py-10 shadow-chart-1 rounded-md flex flex-col items-center justify-center hover:scale-105 transition duration-300 text-center"
              data-aos={index < 2 ? "fade-right" : "fade-left"}
            >
              <Image
                src={service?.icon}
                alt="services icon"
                width={80}
                height={80}
                className="w-20 h-20 object-cover"
              />
              <h4 className="text-light-gray text-lg font-bold mt-4">
                {service?.title}
              </h4>
              <p className="text-gray-color text-sm">{service?.status}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Services;
