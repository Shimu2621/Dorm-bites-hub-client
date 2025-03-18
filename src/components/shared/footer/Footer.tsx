import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white">
      {/* Banner section */}
      <div className="relative w-full h-[60vh] md:h-[70vh]">
        <Image
          src="https://static.vecteezy.com/system/resources/thumbnails/024/569/565/small_2x/food-ingredients-for-italian-pasta-illustration-ai-generative-free-photo.jpg"
          alt="Banner image"
          //   width={626}
          //   height={351}
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className="w-full h-full"
        />
        {/* opacity for shade */}
        <div className="absolute inset-0 bg-black/70"></div>
        {/* Content inside the footer */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="container mx-auto px-10 py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Logo Container */}
              <div className="flex justify-between items-center relative top-2">
                <Image
                  src="/logo/dormlogo.png"
                  alt="Dorm Bites Hub Logo"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full  object-cover"
                />
                <span className="absolute left-16 text-3xl italic font-bold text-white">
                  ormBites Hub
                </span>
              </div>

              {/* Important Links */}
              <div className=" flex flex-col">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Important Pages
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="hover:underline">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/meals" className="hover:underline">
                      Meals
                    </Link>
                  </li>
                  <li>
                    <Link href="/upcomingMeals" className="hover:underline">
                      Upcoming Meals
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:underline">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:underline">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/login" className="hover:underline">
                      Login
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:bg-blue-800 bg-blue-600 rounded-full p-2"
                  >
                    <FaFacebook size={24} />
                  </a>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:bg-pink-800 bg-pink-600 rounded-full p-2"
                  >
                    <FaInstagram size={24} />
                  </a>
                  <a
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:bg-blue-800 bg-blue-600 rounded-full p-2"
                  >
                    <AiFillTwitterCircle size={24} />
                  </a>

                  <a
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:bg-red-800 bg-red-600 rounded-full p-2"
                  >
                    <FaYoutube size={24} />
                  </a>
                </div>
              </div>

              {/* Contact Details */}
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Contact Us
                </h3>
                <p>Email: contact@website.com</p>
                <p>Phone: +123-456-7890</p>
                <p>Address: 123 Main St, Orlando, FL, USA</p>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div>
              <h3 className="ml-72 mb-2 text-white font-bold text-3xl pt-10">
                Subscribe to Our Newsletter
              </h3>
              <div className="flex flex-col md:flex-row items-center bg-primary p-7 max-w-4xl mx-auto rounded-sm join shadow-md mb-2 ">
                <div className="flex w-full  mx-auto gap-0">
                  {/* Search Input */}
                  <Input
                    placeholder="Search meals..."
                    type="text"
                    className=" bg-white border border-gray-color focus:ring-2 p-5 focus:ring-primary rounded-l-sm rounded-r-none"
                  />

                  {/* Search Button */}
                  <button className="btn bg-pink-500 text-white px-4 rounded-r-md cursor-pointer hover:bg-blue-800">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 text-center border-t border-gray-700">
              <p>
                &copy; {new Date().getFullYear()} OurWebsite. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
