"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Star, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { IMealTypes } from "@/types";
import MealEditModal from "@/components/admin-meal-modal/MealEditModal";
import toast from "react-hot-toast";
import axios from "axios";
import Image from "next/image";

const ITEMS_PER_PAGE = 10;

const AllMealsTable = () => {
  const [meals, setMeals] = useState<IMealTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(meals.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentMeals = meals.slice(startIndex, endIndex);
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(error);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Breakfast":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "Lunch":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "Dinner":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        <span className="text-sm font-medium">{rating}</span>
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      </div>
    );
  };

  useEffect(() => {
    const fetchMeals = () => {
      axios
        .get("https://dorm-dine-hub-server.vercel.app/meals")
        .then((response) => {
          setMeals(response.data);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchMeals();
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this meal?")) {
      fetch(`https://dorm-dine-hub-server.vercel.app/meals/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete meal");
          }
          setMeals(meals.filter((meal) => meal._id !== id));
        })
        .catch(() => {
          toast.error("Failed to delete meal");
        });
    }
  };

  const handleUpdate = (id: string) => {
    setSelectedMealId(id);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleMealUpdate = (
    mealId: string,
    formData: {
      mealTitle: string;
      mealType: string;
      price: string;
      rating: string;
      likes: string;
      reviews: string;
    }
  ): void => {
    const updatedData: Partial<IMealTypes> = {
      mealTitle: formData.mealTitle,
      mealType: formData.mealType,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating),
      likes: parseInt(formData.likes, 10),
      reviews: parseInt(formData.reviews, 10),
    };

    setMeals((prevMeals) =>
      prevMeals.map((meal) =>
        meal._id === mealId ? { ...meal, ...updatedData } : meal
      )
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center mt-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-10">
        <h1 className="text-3xl text-center font-bold ">All Available Meals</h1>
        <h1 className="text-xl font-bold text-center">
          Total Meal: {meals.length}
        </h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Likes</TableHead>
            <TableHead>Reviews</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentMeals.map((meal) => (
            <TableRow key={meal._id}>
              <TableCell>
                <Image
                  src={meal.mealImage || "/placeholder.svg"}
                  alt={meal.mealTitle}
                  className="w-16 h-16 object-cover rounded"
                  height={64}
                  width={64}
                />
              </TableCell>
              <TableCell className="font-medium">{meal.mealTitle}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={getTypeColor(meal.mealType)}
                >
                  {meal.mealType}
                </Badge>
              </TableCell>
              <TableCell>${meal.price.toFixed(2)}</TableCell>
              <TableCell>{renderStars(meal.rating)}</TableCell>
              <TableCell>{meal.likes}</TableCell>
              <TableCell>{meal.reviews}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleUpdate(meal._id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDelete(meal._id)}
                >
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-6 text-center text-sm text-gray-600 mb-4">
        A list of all available meals
      </div>

      {/* Handle pagination */}
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrentPage(page)}
            className="w-8 h-8 p-0"
          >
            {page}
          </Button>
        ))}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Meal Edit Modal */}
      <MealEditModal
        mealId={selectedMealId || ""}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onUpdate={handleMealUpdate}
      />
    </div>
  );
};

export default AllMealsTable;
