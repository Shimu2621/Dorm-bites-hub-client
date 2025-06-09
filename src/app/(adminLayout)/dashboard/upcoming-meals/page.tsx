"use client";

import { useEffect, useState, useCallback } from "react";
import { IUpcomingMeal } from "@/types/meal/upcomingMeal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import axios from "axios";
import toast from "react-hot-toast";

const UpcomingMealsTable = () => {
  const [meals, setMeals] = useState<IUpcomingMeal[]>([]);

  const fetchUpcomingMeals = useCallback(async () => {
    try {
      const res = await axios.get("/api/upcoming-meals");
      setMeals(res.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to fetch meals.");
    }
  }, []);

  useEffect(() => {
    fetchUpcomingMeals();
  }, [fetchUpcomingMeals]);

  const handlePublish = async (meal: IUpcomingMeal) => {
    try {
      // You can customize what 'publish' does — like move it to another collection
      toast.success(`${meal.mealTitle} has been published.`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to publish meal.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Upcoming Meals</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Meal Title</TableHead>
            <TableHead>Likes</TableHead>
            <TableHead>Admin</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meals.map((meal) => (
            <TableRow key={meal._id}>
              <TableCell>{meal.mealTitle}</TableCell>
              <TableCell>{meal.likes}</TableCell>
              <TableCell>{meal.adminName}</TableCell>
              <TableCell>{meal.mealType}</TableCell>
              <TableCell className="text-right">
                <Button variant="default" onClick={() => handlePublish(meal)}>
                  Publish
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UpcomingMealsTable;
