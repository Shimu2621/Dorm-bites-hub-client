import services from "@/staticData/services";
import Container from "@/utils/container/Container";
import Image from "next/image";
import React from "react";

const Services = () => {
  return (
    <div className="bg-gray-100 h-[55vh] pt-28">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center gap-4">
          {services.map((service) => (
            <div
              key={service?.id}
              className="bg-white px-10 py-12 shadow-chart-1 rounded-sm  flex flex-col items-center justify-center hover:scale-105 transition duration-300"
            >
              <Image
                src={service?.icon}
                alt="services icon"
                width={80}
                height={80}
                className="w-20 h-20 object-cover "
              />
              <h4 className="text-gray-700 text-lg font-bold mt-4">
                {service?.title}
              </h4>
              <p className="text-gray-500">{service?.status}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Services;
