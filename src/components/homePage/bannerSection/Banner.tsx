"use client";

import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
import Container from "@/utils/container/Container";
import Image from "next/image";

const Banner = () => {
  return (
    <section className="p-10">
      <Container>
        <div className="grid grid-cols-2 items-center gap-10">
          {/* Left section */}
          <div className="mb-6">
            <h1 className="text-5xl font-bold text-blue-500 italic mb-6">
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
              <Button className="bg-blue-500 hover:bg-white hover:border hover:border-blue-500 hover:text-blue-500">
                Get Started
              </Button>

              {/* Secondary Button with Glassmorphism Effect */}
              <Button className="bg-black hover:bg-white hover:border hover:border-black hover:text-black">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full">
            <Image
              width={604}
              height={401}
              src="https://img.freepik.com/premium-photo/gourmet-dish-being-prepared-highend-restaurant-kitchen_941600-12208.jpg"
              alt=""
              className="w-[50vw] h-[60vh] rounded-md object-contain"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Banner;
