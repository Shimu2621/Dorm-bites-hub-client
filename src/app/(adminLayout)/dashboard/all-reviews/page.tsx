/* eslint-disable @typescript-eslint/no-explicit-any */
// File: src/app/(adminLayout)/dashboard/all-reviews/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Trash2, Star, Eye, User, MessageSquare } from "lucide-react";
import Image from "next/image";

// Review interface
export interface IReview {
  _id: string;
  email: string;
  name: string;
  mealTitle: string;
  likes: number;
  reviews: number;
  comment: string;
  user_rating: number;
  food_id: string;
  image: string;
}

// Props interface for the page component
interface PageProps {
  params?: Promise<Record<string, string | string[] | undefined>>;
  searchParams?: Promise<Record<string, any>>;
}

const AllReviewsPage: React.FC<PageProps> = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<"date" | "rating" | "likes">("date");

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        // Replace this with your actual API call
        // const response = await fetch('/api/reviews');
        // const data = await response.json();

        // Mock data for demonstration
        const mockReviews: IReview[] = [
          {
            _id: "1",
            email: "john@example.com",
            name: "John Doe",
            mealTitle: "Chicken Curry",
            likes: 25,
            reviews: 5,
            comment: "Amazing taste and great portion size!",
            user_rating: 5,
            food_id: "food_1",
            image: "/images/chicken-curry.jpg",
          },
          {
            _id: "2",
            email: "jane@example.com",
            name: "Jane Smith",
            mealTitle: "Vegetable Biryani",
            likes: 18,
            reviews: 3,
            comment: "Good flavor but could use more vegetables.",
            user_rating: 4,
            food_id: "food_2",
            image: "/images/veg-biryani.jpg",
          },
        ];

        setReviews(mockReviews);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch reviews"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleDeleteReview = async (reviewId: string) => {
    try {
      // Replace with actual API call
      // await fetch(`/api/reviews/${reviewId}`, { method: 'DELETE' });

      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== reviewId)
      );
    } catch (err) {
      console.error("Failed to delete review:", err);
      setError("Failed to delete review");
    }
  };

  const filteredReviews = reviews.filter(
    (review) =>
      review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.mealTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.user_rating - a.user_rating;
      case "likes":
        return b.likes - a.likes;
      default:
        return 0; // For date sorting, you'd compare actual dates
    }
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Reviews</h1>
          <p className="text-gray-600">
            Manage and monitor all customer reviews
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search reviews, meals, or customers..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "date" | "rating" | "likes")
                }
              >
                <option value="date">Sort by Date</option>
                <option value="rating">Sort by Rating</option>
                <option value="likes">Sort by Likes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {reviews.length}
                </h3>
                <p className="text-gray-600">Total Reviews</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Star className="w-8 h-8 text-yellow-500" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {reviews.length > 0
                    ? (
                        reviews.reduce((sum, r) => sum + r.user_rating, 0) /
                        reviews.length
                      ).toFixed(1)
                    : "0.0"}
                </h3>
                <p className="text-gray-600">Average Rating</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Eye className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {reviews.reduce((sum, r) => sum + r.likes, 0)}
                </h3>
                <p className="text-gray-600">Total Likes</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <User className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {new Set(reviews.map((r) => r.email)).size}
                </h3>
                <p className="text-gray-600">Unique Reviewers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {sortedReviews.length === 0 ? (
            <div className="p-8 text-center">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Reviews Found
              </h3>
              <p className="text-gray-600">
                {searchTerm
                  ? "Try adjusting your search criteria."
                  : "No reviews have been submitted yet."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reviewer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Meal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Comment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Likes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedReviews.map((review) => (
                    <tr key={review._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {review.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {review.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Image
                            className="h-12 w-12 rounded-lg object-cover mr-3"
                            src={review.image || "/placeholder-meal.jpg"}
                            alt={review.mealTitle}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/placeholder-meal.jpg";
                            }}
                          />
                          <div className="text-sm font-medium text-gray-900">
                            {review.mealTitle}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {renderStars(review.user_rating)}
                          <span className="ml-2 text-sm text-gray-600">
                            ({review.user_rating})
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className="text-sm text-gray-900 max-w-xs truncate"
                          title={review.comment}
                        >
                          {review.comment}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-900">
                            {review.likes}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDeleteReview(review._id)}
                          className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors"
                          title="Delete Review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllReviewsPage;
