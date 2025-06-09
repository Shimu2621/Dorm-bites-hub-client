"use client";

import Container from "@/utils/container/Container";
import Image from "next/image";
import LeftChooseSec from "./LeftChooseSec";
import RightChooseSec from "./RightChooseSec";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Choose = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-background py-20 pt-32">
      <div className="text-center mx-auto" data-aos="zoom-in">
        <h1 className="text-blue-500 font-bold italic text-2xl lg:text-4xl">
          Why Choose Us
        </h1>
        <p className="text-gray-color">
          From healthy bowls to comfort food, we have something for everyone.
        </p>
      </div>

      <Container>
        {/* Choose Us section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto items-center gap-8 pt-10">
          {/* Left section */}
          <div data-aos="fade-right" data-aos-delay="400">
            <LeftChooseSec />
          </div>
          {/* Middle section */}
          <div
            className="flex justify-center w-auto  "
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <Image
              src="https://img.freepik.com/premium-photo/chef-standing-full-lunch-service-station-with-assortment-food-trays-isolated-with_660230-38662.jpg"
              alt="Choose-icon"
              width={320}
              height={320}
              className="w-90 h-90 object-contain rounded-2xl"
            />
          </div>
          {/* Right section */}
          <div data-aos="fade-left" data-aos-delay="400">
            <RightChooseSec />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Choose;
