"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import loginAnimation from "../../../../public/signupanimation.json";
import { UserCredential } from "firebase/auth";
import axios from "axios";

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface LoginForm {
  email: string;
  password: string;
}

// rest of your component stays the same...
const LoginPage: React.FC = () => {
  const router = useRouter();
  const { signIn, googleSignIn } = useAuth();

  const [loginData, setLoginData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      await signIn(loginData.email, loginData.password).then((result) => {
        const user = result.user;
        console.log("User:", user);
        toast.success("Login Successful");
        router.push("/");
      });
    } catch (error) {
      console.log(error);
      toast.error("Invalid Credentials"); // Show error message
    }
  };

  const handleSocial = async (media: () => Promise<UserCredential>) => {
    try {
      const result = await media();
      const user = result.user;

      if (!user.email) {
        throw new Error("No email found for this user");
      }

      console.log("User:", user);
      const newUser = {
        name: result.user.displayName,
        email: result.user.email,
        image: result.user.photoURL,
        badge: "Bronze",
        badge_image:
          "https://i.ibb.co/TrN8dFr/bronze-badge-removebg-preview.png",
      };
      axios
        .get(
          `https://dorm-dine-hub-server.vercel.app/users?email=${result.user.email}`
        )
        .then((response) => {
          if (response.data.data.length === 0) {
            return axios
              .post("https://dorm-dine-hub-server.vercel.app/users", newUser)
              .then(() => {
                toast.success("User Created Successfully");
              });
          }
        })
        .then(() => {
          toast.success("Login Successful");
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Invalid Credentials");
        });
    } catch (error) {
      console.log(error);
      toast.error("Invalid Credentials"); // Show error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden"
      >
        {/* Left Side - Lottie Animation */}
        <div className="w-full md:w-1/2 p-4 flex items-center justify-center bg-gray-200">
          <Lottie animationData={loginAnimation} loop />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-6">
          <Card className="shadow-none border-none">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-semibold">
                Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full"
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <Input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="w-full"
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full cursor-pointer bg-pink-500 hover:bg-pink-600 text-white"
                >
                  Login
                </Button>
              </form>

              <Button
                onClick={() => handleSocial(googleSignIn)}
                className="w-full mt-6 cursor-pointer bg-white text-black border border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="110"
                  height="110"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>

                <p className="text-gray-800 hover:text-white font-semibold">
                  Sign in with Google
                </p>
              </Button>

              {/* Footer or Links */}
              <div className="mt-4 text-center">
                <p className="text-sm">
                  Don&rsquo;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-blue-500 hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
