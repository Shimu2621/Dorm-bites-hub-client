"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IRequestMeal } from "@/types/meal/requestedMeal";
// import { toast } from "sonner";
import axios from "axios";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 10;

const RequestedMealsTable = () => {
  const [meals, setMeals] = useState<IRequestMeal[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);

  const fetchMeals = async () => {
    try {
      const res = await axios.get(`/api/request-meals?page=${page}`);
      setMeals(res.data.data);
      setCount(res.data.count);
    } catch {
      toast.error("Failed to load meals.");
    }
  };

  useEffect(() => {
    fetchMeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await axios.patch(`/api/request-meals/${id}`, { status });
      toast.success(`Status updated to ${status}`);
      fetchMeals();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to update status.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/request-meals/${id}`);
      toast.success("Meal deleted");
      fetchMeals();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to delete meal.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Requested Meals</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Meal Title</TableHead>
            <TableHead>Likes</TableHead>
            <TableHead>Reviews</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meals.map((meal, i) => (
            <TableRow key={meal._id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{meal.mealTitle}</TableCell>
              <TableCell>{meal.likes}</TableCell>
              <TableCell>{meal.reviews}</TableCell>
              <TableCell className="capitalize">{meal.status}</TableCell>
              <TableCell className="flex gap-2 justify-end">
                {meal.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleStatusUpdate(meal._id, "approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleStatusUpdate(meal._id, "cancelled")}
                    >
                      Cancel
                    </Button>
                  </>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(meal._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <Button
          variant="outline"
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>
        <span>
          Page {page + 1} of {Math.ceil(count / ITEMS_PER_PAGE)}
        </span>
        <Button
          variant="outline"
          disabled={(page + 1) * ITEMS_PER_PAGE >= count}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default RequestedMealsTable;
