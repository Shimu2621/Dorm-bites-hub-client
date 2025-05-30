"use client";

import useAuth from "@/hooks/useAuth";
import Image from "next/image";

import Link from "next/link";

const AdminProfile = () => {
  const { user } = useAuth();
  const email = user?.email || "Not Available"; // Define email from user object
  // Temporary mock data for mealCount
  const mealCount = []; // Replace with actual data fetching logic
  const role = "Admin"; // Replace with actual role fetching logic
  const upcomingNumber = []; // Replace with actual data fetching logic
  const badge_image = "/default-badge.png"; // Replace with actual badge image URL
  const badge = "Gold Member"; // Replace with actual badge name

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 bg-blue-700 text-white flex flex-col">
        <div className="p-4 font-bold text-gray-300 text-2xl">
          DORM DINE HUB
        </div>

        <div className="flex flex-col mt-8">
          <div className="bg-blue-800 text-gray-300 py-2 px-4 ">
            <Link href="/admin-profile">Admin Profile</Link>
          </div>
          <div className="py-2 px-4 hover:bg-blue-800 text-gray-300 cursor-pointer">
            <Link href="/dashboard/manage-users" className="block w-full">
              Manage Users
            </Link>
          </div>
          <div className="py-2 px-4 text-gray-300 hover:bg-blue-800 cursor-pointer">
            <Link href="/add-meal" className="block w-full">
              Add Meal
            </Link>
          </div>
          <div className="py-2 px-4 text-gray-300 hover:bg-blue-800 cursor-pointer">
            <Link href="/all-meals" className="block w-full">
              All Meals
            </Link>
          </div>
          <div className="py-2 px-4 text-gray-300 hover:bg-blue-800 cursor-pointer">
            <Link href="/all-reviews" className="block w-full">
              All Reviews
            </Link>
          </div>
          <div className="py-2 px-4 text-gray-300 hover:bg-blue-800 cursor-pointer">
            <Link href="/serve-meal" className="block w-full">
              Serve Meal
            </Link>
          </div>
          <div className="py-2 px-4 text-gray-300 hover:bg-blue-800 cursor-pointer">
            <Link href="/up-coming-meals" className="block w-full">
              Up Coming Meals
            </Link>
          </div>
        </div>

        <div className="border-t border-blue-100 mt-8 pt-4">
          <div className="py-2 px-4 text-gray-300 hover:bg-blue-800 cursor-pointer">
            <Link href="/" className="block w-full">
              Home
            </Link>
          </div>
          <div className="py-2 px-4 text-gray-300 hover:bg-blue-800 cursor-pointer">
            <Link href="/meals" className="block w-full">
              Meals
            </Link>
          </div>
          <div className="py-2 px-4 text-gray-300 hover:bg-blue-800 cursor-pointer">
            <Link href="/up-coming-meals" className="block w-full">
              Up Coming Meals
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-blue-300 text-white flex flex-col items-center overflow-y-auto p-6">
        {/* Admin Profile Title */}
        <h1 className="text-5xl italic text-blue-700 font-bold mt-6 mb-8">
          Admin profile
        </h1>

        {/* Stats */}
        <div className="text-center mb-8">
          <p className="text-2xl font-bold text-gray-700">
            Number of Meals you added: {mealCount.length}
          </p>
          <p className="text-xl font-bold text-gray-700">
            Number of Upcoming Meals you added: {upcomingNumber.length}
          </p>
          <p className="mt-2 font-bold text-gray-700">ROLE: {role}</p>
        </div>

        {/* Profile Content */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-20 px-4 w-full max-w-3xl">
          {/* Profile Image */}
          <div className="border-2 border-white p-2 bg-[#1e2a38]">
            <div className="relative">
              <Image
                src={user?.photoURL || "/default-avatar.png"}
                alt="Profile Image"
                width={227}
                height={227}
                className="w-100 h-70 object-cover rounded-fusm"
              />
              <div className="absolute bottom-0 right-4">
                <div className="w-12 h-12 bg-[#3b82f6] rounded-full border-4 border-[#cd7f32] flex items-center justify-center">
                  <Image
                    src={badge_image}
                    alt="Profile Image"
                    width={48}
                    height={48}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-[#1e2a38] text-xl font-bold">$</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="w-full space-y-4">
            <div className="bg-gray-300 p-4 rounded">
              <div className="flex">
                <span className="w-32 font-semibold text-gray-700">Name:</span>
                <span className="text-gray-600">
                  {user?.displayName || "Not Available"}
                </span>
              </div>
            </div>

            <div className="bg-gray-300 p-4 rounded">
              <div className="flex">
                <span className="w-32 font-semibold text-gray-700">Email:</span>
                <span className="text-gray-600">{email}</span>
              </div>
            </div>

            <div className="bg-gray-300 p-4 rounded">
              <div className="flex">
                <span className="w-32 font-semibold text-gray-700">
                  Membership:
                </span>
                <span className="text-gray-600">{badge}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
