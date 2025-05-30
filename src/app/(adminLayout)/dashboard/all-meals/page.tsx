"use client";

import { useState } from "react";

export default function AddMeal() {
  const [meal, setMeal] = useState({
    mealTitle: "",
    price: "",
    description: "",
    date: "",
    rating: "",
    email: "shimu@gmail.com",
    likes: "",
    reviews: "",
    adminName: "Shimu",
    category: "",
    ingredients: "",
    image: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "image") {
      const files = (e.target as HTMLInputElement).files;
      if (files && files[0]) {
        setMeal({ ...meal, image: files[0] });
      }
    } else {
      setMeal({ ...meal, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(meal);
    // you can add your API call here
  };

  return (
    <div className="min-h-screen bg-blue-100 text-white py-12 px-6">
      <h1 className="text-4xl text-blue-700 font-bold text-center mb-10">
        Add A Meal
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
      >
        <div>
          <label className="block text-gray-600 mb-1">Meal title</label>
          <input
            name="mealTitle"
            onChange={handleChange}
            type="text"
            placeholder="Meal Title"
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Price</label>
          <input
            name="price"
            onChange={handleChange}
            type="number"
            placeholder="Price"
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Date</label>
          <input
            name="date"
            onChange={handleChange}
            type="date"
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Description</label>
          <input
            name="description"
            onChange={handleChange}
            type="text"
            placeholder="Description"
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Rating</label>
          <input
            name="rating"
            onChange={handleChange}
            type="number"
            step="0.1"
            placeholder="Rating"
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={meal.email}
            disabled
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Likes</label>
          <input
            name="likes"
            onChange={handleChange}
            type="number"
            placeholder="Likes"
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Reviews Count</label>
          <input
            name="reviews"
            onChange={handleChange}
            type="number"
            placeholder="Reviews"
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">
            Ingredients (comma separated)
          </label>
          <input
            name="ingredients"
            onChange={handleChange}
            type="text"
            placeholder="please put comma after each ingredient.."
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Choose a Category</label>
          <select
            name="category"
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700"
          >
            <option value="">Category</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Admin Name</label>
          <input
            name="adminName"
            type="text"
            value={meal.adminName}
            disabled
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Upload an Image</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 file:bg-gray-700 file:border-0 file:rounded file:px-3 file:py-2"
          />
        </div>

        {/* Buttons */}
        <div className="col-span-1 md:col-span-2 flex flex-wrap gap-4 mt-4">
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 transition text-white px-6 py-3 rounded-md w-full md:w-auto"
          >
            Add Meal
          </button>
          <button
            type="button"
            onClick={() => alert("Added to upcoming meals")}
            className="bg-pink-500 hover:bg-pink-600 transition text-white px-6 py-3 rounded-md w-full md:w-auto"
          >
            Add To Upcoming
          </button>
        </div>
      </form>
    </div>
  );
}
