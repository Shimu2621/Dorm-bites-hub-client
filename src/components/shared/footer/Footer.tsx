import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <div className="relative w-full bg-gray-900 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://static.vecteezy.com/system/resources/thumbnails/024/569/565/small_2x/food-ingredients-for-italian-pasta-illustration-ai-generative-free-photo.jpg"
          alt="Footer Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Footer Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12">
        {/* Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo + Title */}
          <div className="flex items-center">
            <Image
              src="/logo/dormlogo.png"
              alt="Dorm Bites Hub Logo"
              width={64}
              height={64}
              className="w-16 h-16 bg-black rounded-full object-cover"
            />
            <span className="text-2xl md:text-3xl italic font-bold text-default-white">
              ormBites Hub
            </span>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">
              Important Pages
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "Meals", path: "/meals" },
                { name: "Upcoming Meals", path: "/upcomingMeals" },
                { name: "About Us", path: "/about" },
                { name: "Contact Us", path: "/contact" },
                { name: "Login", path: "/login" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className=" text-default-white hover:underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">Follow Us</h3>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-800 rounded-full p-2"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-600 hover:bg-pink-800 rounded-full p-2"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-800 rounded-full p-2"
              >
                <AiFillTwitterCircle size={24} />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-800 rounded-full p-2"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">Contact Us</h3>
            <p className="text-default-white">Email: contact@website.com</p>
            <p className="text-default-white">Phone: +123-456-7890</p>
            <p className="text-default-white">
              Address: 123 Main St, Orlando, FL, USA
            </p>
          </div>
        </div>

        {/* Newsletter */}
        {/* Newsletter */}
        <div className="mt-10 ">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-left text-default-white font-bold text-2xl mb-4">
              Subscribe to Our Newsletter
            </h3>
            <div className="flex flex-col sm:flex-row items-stretch bg-primary p-6 rounded-md shadow-md ">
              <Input
                placeholder="Enter your email..."
                type="email"
                className="w-full sm:flex-1 bg-white border border-gray-color focus:ring-2 focus:ring-primary px-4 py-4 rounded-md sm:rounded-l-md sm:rounded-r-none"
              />
              <button className="w-full sm:w-auto bg-pink-500 hover:bg-blue-800 text-default-white px-5 py-1 rounded-md sm:rounded-l-none sm:rounded-r-md transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-center text-default-white border-t border-gray-700 pt-4">
          <p>
            &copy; {new Date().getFullYear()} OurWebsite. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
