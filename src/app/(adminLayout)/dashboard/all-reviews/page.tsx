"use client";

import { useEffect, useState } from "react";
import { IReview } from "@/types";

interface ReviewTableProps {
  initialData: IReview[];
  count: number;
}

const ReviewTable: React.FC<ReviewTableProps> = ({ initialData, count }) => {
  const [reviews, setReviews] = useState<IReview[]>(initialData);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(Math.ceil(count / 10));
  const [sortBy, setSortBy] = useState<"likes" | "reviews">("likes");

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch(
        `https://dorm-dine-hub-server.vercel.app/reviews?page=${page}&sortBy=${sortBy}`
      );
      const data = await res.json();
      setReviews(data?.data || []);
      setTotalPages(Math.ceil((data?.count || 0) / 10));
    };
    fetchReviews();
  }, [page, sortBy]);

  return (
    <div className="p-6 w-full">
      <div className="mb-4">
        <h1 className="text-3xl text-center  font-bold">All Reviews</h1>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "likes" | "reviews")}
          className="border  px-3 py-1 rounded"
        >
          <option value="likes">Sort by Likes</option>
          <option value="reviews">Sort by Reviews</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-sm border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">No.</th>
              <th className="p-2 border">Meal Title</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Comment</th>
              <th className="p-2 border">Rating</th>
              <th className="p-2 border">Likes</th>
              <th className="p-2 border">Reviews</th>
            </tr>
          </thead>
          <tbody>
            {reviews?.map((review, index) => (
              <tr key={review._id} className="text-center">
                <td className="p-3 border text-center">{index + 1}</td>
                <td className="p-2 border">{review.mealTitle}</td>
                <td className="p-2 border">{review.name}</td>
                <td className="p-2 border">{review.email}</td>
                <td className="p-2 border">{review.comment}</td>
                <td className="p-2 border">{review.user_rating}</td>
                <td className="p-2 border">{review.likes}</td>
                <td className="p-2 border">{review.reviews}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {Number.isFinite(totalPages) && totalPages > 0 && (
        <div className="flex justify-center mt-6 space-x-4">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`px-3 py-1 rounded border ${
                page === i ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewTable;
