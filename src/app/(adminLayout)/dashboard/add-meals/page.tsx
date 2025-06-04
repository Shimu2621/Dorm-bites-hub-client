"use client";

import { useState } from "react";

export default function AddMeal() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
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
    const { name, value } = e.target;
    if (name === "image") {
      const files = (e.target as HTMLInputElement).files;
      if (files && files[0]) {
        setMeal({ ...meal, image: files[0] });
      }
    } else {
      setMeal({ ...meal, [name]: value });
    }
  };

  const sendMealToAPI = async (url: string) => {
    try {
      const formData = new FormData();
      formData.append("mealTitle", meal.mealTitle);
      formData.append("price", meal.price);
      formData.append("description", meal.description);
      formData.append("timeDate", meal.date);
      formData.append("rating", meal.rating);
      formData.append("admin_Email", meal.email);
      formData.append("likes", meal.likes);
      formData.append("reviews", meal.reviews);
      formData.append("adminName", meal.adminName);
      formData.append("mealType", meal.category);
      formData.append("ingredients", meal.ingredients);
      if (meal.image) {
        formData.append("mealImage", meal.image);
      }

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Meal added successfully!");
      } else {
        alert("Failed to add meal: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting meal:", error);
      alert("Something went wrong while adding the meal.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!meal.mealTitle) newErrors.mealTitle = "Meal title is required.";
    if (!meal.price) newErrors.price = "Price is required.";
    if (!meal.description) newErrors.description = "Description is required.";
    if (!meal.date) newErrors.date = "Date is required.";
    if (!meal.rating) newErrors.rating = "Rating is required.";
    if (!meal.likes) newErrors.likes = "Likes count is required.";
    if (!meal.reviews) newErrors.reviews = "Reviews count is required.";
    if (!meal.category) newErrors.category = "Category is required.";
    if (!meal.ingredients) newErrors.ingredients = "Ingredients are required.";
    if (!meal.image) newErrors.image = "Image is required.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    sendMealToAPI("http://localhost:5000/users/admin/meals");
  };

  const handleAddToUpcoming = () => {
    if (
      !meal.mealTitle ||
      !meal.price ||
      !meal.description ||
      !meal.date ||
      !meal.rating ||
      !meal.likes ||
      !meal.reviews ||
      !meal.category ||
      !meal.ingredients ||
      !meal.image
    ) {
      //   setErrors("Please fill in all fields before submitting.");
      return;
    }

    // setError("");
    sendMealToAPI("http://localhost:5000/users/admin/upcoming-meals");
  };

  return (
    <div className="min-h-screen w-full  py-12 px-12">
      <div>
        <h1 className="text-3xl text-center font-bold mb-10">
          Add A New Meal Or Upcoming Meal
        </h1>
      </div>

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
            className="w-full p-3 rounded-md text-gray-800 border border-gray-300 focus:ring-2 focus:ring-gray-400"
          />
          {errors.mealTitle && (
            <p className="text-red-500 font-semibold mb-2">
              {errors.mealTitle}
            </p>
          )}
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Price</label>
          <input
            name="price"
            onChange={handleChange}
            type="number"
            placeholder="Price"
            className="w-full p-3 rounded-md text-gray-800 border border-gray-300 focus:ring-2 focus:ring-gray-400"
          />
          {errors.price && (
            <p className="text-red-500 font-semibold mb-2">{errors.price}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Date</label>
          <input
            name="date"
            onChange={handleChange}
            type="date"
            className="w-full p-3 rounded-md  text-gray-800 border border-gray-300 focus:ring-2 focus:ring-gray-400"
          />
          {errors.date && (
            <p className="text-red-500 font-semibold mb-2">{errors.date}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Description</label>
          <input
            name="description"
            onChange={handleChange}
            type="text"
            placeholder="Description"
            className="w-full p-3 rounded-md text-gray-800 border border-gray-300 focus:ring-2 focus:ring-gray-400"
          />
          {errors.description && (
            <p className="text-red-500 font-semibold mb-2">
              {errors.description}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Rating</label>
          <input
            name="rating"
            onChange={handleChange}
            type="number"
            step="0.1"
            placeholder="Rating"
            className="w-full p-3 rounded-md text-gray-800 border border-gray-300 focus:ring-2 focus:ring-gray-400"
          />
          {errors.rating && (
            <p className="text-red-500 font-semibold mb-2">{errors.rating}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={meal.email}
            disabled
            className="w-full p-3 rounded-md text-gray-800 border border-gray-300 focus:ring-2 focus:ring-gray-400"
          />
          {errors.email && (
            <p className="text-red-500 font-semibold mb-2">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Likes</label>
          <input
            name="likes"
            onChange={handleChange}
            type="number"
            placeholder="Likes"
            className="w-full p-3 rounded-md text-gray-800 border border-gray-300 focus:ring-2 focus:ring-gray-400"
          />
          {errors.likes && (
            <p className="text-red-500 font-semibold mb-2">{errors.likes}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Reviews Count</label>
          <input
            name="reviews"
            onChange={handleChange}
            type="number"
            placeholder="Reviews"
            className="w-full p-3 rounded-md text-gray-800 border border-gray-300 focus:ring-2 focus:ring-gray-400"
          />
          {errors.reviews && (
            <p className="text-red-500 font-semibold mb-2">{errors.reviews}</p>
          )}
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
            className="w-full p-3 rounded-md text-gray-800 border border-gray-300 focus:ring-2 focus:ring-gray-400"
          />
          {errors.ingredients && (
            <p className="text-red-500 font-semibold mb-2">
              {errors.ingredients}
            </p>
          )}
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Choose a Category</label>
          <select
            name="category"
            onChange={handleChange}
            className="w-full p-3 rounded-md text-gray-800 border border-gray-300 focus:ring-2 focus:ring-gray-400"
          >
            <option value="">Category</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
          {errors.category && (
            <p className="text-red-500 font-semibold mb-2">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Admin Name</label>
          <input
            name="adminName"
            type="text"
            value={meal.adminName}
            disabled
            className="w-full p-3 rounded-md text-gray-800 border border-gray-300 focus:ring-2 focus:ring-gray-400"
          />
          {errors.adminName && (
            <p className="text-red-500 font-semibold mb-2">
              {errors.adminName}
            </p>
          )}
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Upload an Image</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-3 rounded-md  text-gray-400 border border-gray-300 file:bg-gray-700 file:border-0 file:rounded file:px-3 file:py-2"
          />
          {errors.image && (
            <p className="text-red-500 font-semibold mb-2">{errors.image}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="col-span-1 md:col-span-2 flex flex-wrap gap-4 mt-4">
          <button
            type="submit"
            className="bg-[#cc7a00] hover:bg-[#b36900] transition text-white px-6 py-3 rounded-md w-full md:w-auto"
          >
            Add Meal
          </button>
          <button
            type="button"
            onClick={handleAddToUpcoming}
            className="bg-pink-900 hover:bg-pink-950 transition text-white px-6 py-3 rounded-md w-full md:w-auto"
          >
            Add To Upcoming
          </button>
        </div>
      </form>
    </div>
  );
}
