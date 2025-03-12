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

const AllMeals = ({ meals }: { meals: IMealTypes[] }) => {
  return (
    <div className="bg-background mb-20">
      {/* Banner Section */}
      <div className="relative mb-10">
        <Image
          src="/public/meals/banner.png"
          width={600}
          height={218}
          className="w-full h-[40vh] md:h-[50vh] object-cover rounded-none shadow-lg"
          alt="Banner Image"
        />
        {/* opacity for shade */}
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40 text-white">
          {/* text */}
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Explore Delicious Meals!
          </h2>
          <p className="md:text-xl text-lg text-center font-semibold px-4">
            Discover a variety of mouth-watering meals with fresh ingredients
            and rich flavors. Whether you&apos;re craving <br /> a hearty
            breakfast, a nutritious lunch, or a delightful dinner, explore our
            collection of meals!
          </p>
        </div>
      </div>

      <Container>
        {/* Search & Filter Section */}
        <div className="flex flex-col md:flex-row items-center bg-gray-800 p-7 max-w-4xl mx-auto rounded-sm join shadow-md mb-2">
          <div className="flex w-full  mx-auto gap-0">
            {/* Search Input */}
            <Input
              placeholder="Search meals..."
              type="text"
              className=" bg-input border border-gray-color focus:ring-2 p-5 focus:ring-primary rounded-l-sm rounded-r-none"
            />

            {/* Category Dropdown */}
            <Select>
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
            <Select>
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
            <button className="btn bg-primary text-white px-4 rounded-r-md cursor-pointer hover:bg-blue-800">
              Search
            </button>
          </div>
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-4 gap-4 pt-20">
          {meals?.map((meal: IMealTypes, index: number) => (
            <MealsCard key={index} meal={meal} />
          ))}
        </div>
      </Container>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AllMeals;
