import axios from "axios";
import useAuth from "./useAuth";
import { useEffect, useState } from "react";

interface UserType {
  _id: string;
  name: string;
  email: string;
  role?: string;
  badge?: string;
  badge_image?: string;
  // Add more fields as needed
}

const useUser = (): [{ data: UserType[] }, boolean] => {
  const { user } = useAuth();
  const [data, setData] = useState<{ data: UserType[] }>({ data: [] });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (user?.email) {
        try {
          const res = await axios.get(
            `https://dorm-dine-hub-server.vercel.app/users?email=${user.email}`
          );
          setData({ data: res.data });
        } catch (error) {
          console.error("Error fetching user:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUser();
  }, [user?.email]);

  return [data, isLoading];
};

export default useUser;
