"use client";

import Lottie from "lottie-react";
import erroranimation from "../../public/erroranimation.json";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className=" flex flex-col items-center justify-center  min-h-screen text-center px-4 p-20">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-red-500 bg-clip-text text-transparent">
        Page Not Found
      </h2>
      <p className="text-sm sm:text-lg md:text-xl italic text-gray-500 font-semibold mt-4">
        <span className="text-3xl sm:text-4xl md:text-5xl font-bold italic bg-gradient-to-r from-blue-400 via-purple-500 to-red-500 bg-clip-text text-transparent">
          O
        </span>
        ops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl pb-20">
        <Lottie animationData={erroranimation} loop={true} />
      </div>
      <div>
        <Link href="/">
          <Button className="mx-auto items-center  left-1/2 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold rounded-md shadow-lg hover:shadow-blue-500/50 transition-shadow">
            Go Back To Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
