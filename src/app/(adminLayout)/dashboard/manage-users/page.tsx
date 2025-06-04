"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  badge: string;
  badge_image: string;
  role?: string;
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const perPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `https://dorm-dine-hub-server.vercel.app/users?page=${page}`
        );
        setUsers(res.data.data);
        setCount(res.data.count);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, [page]);

  // Handle pagination
  const totalPages = Math.ceil(count / perPage);

  // Handle Make Admin button clickable
  const handleMakeAdmin = async (id: string) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    try {
      const res = await fetch(`http://localhost:5000/users/admin/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ role: "admin" }),
      });

      const data = await res.json();
      console.log("Make Admin Response:", data);

      if (data.modifiedCount === 1 && data.result) {
        alert("User promoted to admin!");
        // Reload users after update
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role: "admin" } : u))
        );
      } else {
        alert("Failed to update user role.");
      }
    } catch (error) {
      console.error("Error making user admin:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl text-center font-bold mb-4">Manage Users</h1>
      <p className="text-lg italic font-bold text-center my-2">
        Please for email search atleast put (@)
      </p>
      <div className="max-w-2xl mx-auto flex justify-center mb-10">
        <div className="flex rounded-full overflow-hidden shadow-lg border border-gray-300 w-full max-w-md">
          <input
            type="text"
            className="flex-grow px-5 py-3 focus:outline-none text-gray-700"
            placeholder="Enter email or username"
          />
          <button
            // onClick={handleSearch}
            className="bg-[#cc7a00] hover:bg-[#b36900] text-white font-semibold px-6 py-3 transition-all duration-300"
          >
            Search
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 border">No.</th>
              <th className="p-3 border">User Name</th>
              <th className="p-3 border">User Email</th>
              <th className="p-3 border">Badge</th>
              <th className="p-3 border">Badge Image</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="p-3 border text-center">{index + 1}</td>
                <td className="p-3 border">{user.name}</td>
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border">{user.badge}</td>
                <td className="p-3 border text-center">
                  <Image
                    src={user.badge_image}
                    alt={user.badge}
                    width={40}
                    height={40}
                    className="w-10 h-10 mx-auto"
                  />
                </td>
                <td className="p-3 border text-center">
                  {user.role === "admin" ? (
                    <span className="px-3 py-1 pb-2 rounded-full bg-green-200 text-green-800 text-sm font-medium">
                      Admin
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="px-3 py-1 pb-2 rounded-full bg-blue-200 text-blue-800 hover:bg-blue-700 hover:text-white text-sm font-medium transition"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center gap-2">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx)}
            className={`px-3 py-1 rounded border ${
              idx === page
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
