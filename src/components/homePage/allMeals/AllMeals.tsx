"use client";

import { IMealTypes } from "@/types";
import Container from "@/utils/container/Container";
import MealsCard from "../mealsByCategory/MealsCard";
import Image from "next/image";
import { Input } from "@/components/ui/input"; // Search input
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Filter category and price
//Pagination
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState, useCallback } from "react";

const AllMeals = ({ initialMeals }: { initialMeals: IMealTypes[] }) => {
  const [meals, setMeals] = useState<IMealTypes[]>(initialMeals || []);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 8; // Adjust based on your preference

  // Fetch meals from API based on filters - wrapped with useCallback
  const fetchMeals = useCallback(async () => {
    setLoading(true);
    try {
      let apiUrl = "https://dorm-dine-hub-server.vercel.app/meals";

      // Build query parameters based on filter selections
      const queryParams: string[] = [];

      if (search) {
        queryParams.push(`search=${search}`);
      }

      if (category) {
        queryParams.push(`category=${category}`);
      }

      if (sort) {
        // Map UI sort values to API parameters
        let sortParam: string;
        switch (sort) {
          case "ascending":
            sortParam = "asc";
            break;
          case "descending":
            sortParam = "desc";
            break;
          case "less than $10":
            sortParam = "lt10";
            break;
          case "greater than $10":
            sortParam = "gt10";
            break;
          default:
            sortParam = sort;
        }
        queryParams.push(`sort=${sortParam}`);
      }

      // Add query parameters to URL if any exist
      if (queryParams.length > 0) {
        apiUrl += `?${queryParams.join("&")}`;
      }

      console.log("Fetching from:", apiUrl);

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch meals");
      }

      const data = await response.json();
      setMeals(data);
      setCurrentPage(1); // Reset to first page when filters change
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false);
    }
  }, [search, category, sort]); // Dependencies that fetchMeals relies on

  // Handle search button click
  const handleSearch = () => {
    fetchMeals();
  };

  // Fetch meals when category or sort changes
  useEffect(() => {
    if (category || sort) {
      fetchMeals();
    }
  }, [category, sort, fetchMeals]); // Now fetchMeals won't cause unnecessary re-renders

  // Calculate pagination
  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);
  const totalPages = Math.ceil(meals.length / mealsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-background mb-20">
      {/* Banner Section */}
      <div className="relative w-full h-[30vh] md:h-[40vh] ">
        <Image
          src="https://media.istockphoto.com/id/666908954/photo/handsome-chef-pouring-olive-oil-on-meal.jpg?s=612x612&w=0&k=20&c=2dU_sMyn3GM2N81m-tMWQ4y5frBp87GQCflUtauJM4k="
          alt="Banner Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className="w-full h-full"
        />

        {/* opacity for shade */}
        <div className="absolute inset-0 bg-black/70">
          {/* text */}
          <div className="relative mt-20 text-white flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-7xl font-bold mb-4">
              {" "}
              Explore Delicious Meals!
            </h2>
            <p className="md:text-2xl text-lg text-center font-bold px-4">
              Discover a variety of mouth-watering meals with fresh ingredients
              and rich flavors. Whether you&apos;re craving <br /> a hearty
              breakfast, a nutritious lunch, or a delightful dinner, explore our
              collection of meals!
            </p>
          </div>
        </div>
      </div>

      <Container>
        {/* Search & Filter Section */}
        <div className="flex flex-col md:flex-row items-center bg-gray-800 p-7 max-w-4xl mx-auto rounded-sm join shadow-md mb-2 mt-20">
          <div className="flex w-full mx-auto gap-0">
            {/* Search Input */}
            <Input
              placeholder="Search meals..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-input border border-gray-color focus:ring-2 p-5 focus:ring-primary rounded-l-sm rounded-r-none"
            />

            {/* Category Dropdown */}
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[50%] p-5 bg-input border border-gray-color rounded-none cursor-pointer">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Price Range Dropdown */}
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[50%] p-5 bg-input border border-gray-color rounded-none cursor-pointer">
                <SelectValue placeholder="Filter in Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Filter in price</SelectLabel>
                  <SelectItem value="ascending">Ascending</SelectItem>
                  <SelectItem value="descending">Descending</SelectItem>
                  <SelectItem value="less than $10">Less Than $10</SelectItem>
                  <SelectItem value="greater than $10">
                    Greater Than $10
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="btn bg-primary text-white px-4 rounded-r-md cursor-pointer hover:bg-blue-800"
            >
              Search
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Meals Grid */}
            {currentMeals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-10">
                {currentMeals.map((meal: IMealTypes, index: number) => (
                  <MealsCard key={meal._id || index} meal={meal} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-xl font-semibold">No meals found</h3>
                <p>Try adjusting your search or filters</p>
              </div>
            )}
          </>
        )}

        {/* Pagination - only show if we have meals */}
        {meals.length > 0 && !loading && (
          <div className="mt-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {[...Array(totalPages)]
                  .map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => paginate(i + 1)}
                        isActive={currentPage === i + 1}
                        className="cursor-pointer"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))
                  .slice(0, 3)}

                {totalPages > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      currentPage < totalPages && paginate(currentPage + 1)
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </Container>
    </div>
  );
};

export default AllMeals;
