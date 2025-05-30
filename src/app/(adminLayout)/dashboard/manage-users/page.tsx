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

  const totalPages = Math.ceil(count / perPage);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 border">Image</th>
              <th className="p-3 border">User Name</th>
              <th className="p-3 border">User Email</th>
              <th className="p-3 border">Badge</th>
              <th className="p-3 border">Badge Image</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="p-3 border text-center">
                  <Image
                    width={40}
                    height={40}
                    src={user.image}
                    alt={user.name}
                    className="w-10 h-10 rounded-full mx-auto"
                  />
                </td>
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
                <td className="p-3 border">{user.role || "N/A"}</td>
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
