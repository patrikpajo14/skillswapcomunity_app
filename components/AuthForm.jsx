"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Input from "/components/forms/Input";
import Button from "/components/Button";
import { toast } from "react-hot-toast";
import publicRequest from "../src/auth/utils/app-public-request";
import { useAuthContext } from "@/src/auth/context/auth/authContext";

const AuthForm = () => {
  const router = useRouter();
  const [variant, setVariant] = useState("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const { setLoginUserSuccess } = useAuthContext();

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    const fullName = data.name;

    setIsLoading(true);
    if (variant === "REGISTER") {
      try {
        publicRequest
          .post(`/auth/signup`, {
            email,
            password,
            fullName,
          })
          .then((response) => {
            if (response?.status === 200) {
              setVariant("LOGIN");
              toast.success("User has been registered");
            } else {
              toast.error("Something went wrong!");
            }
          })
          .catch(() => toast.error("Something went wrong!"))
          .finally(() => setIsLoading(false));
      } catch (e) {
        console.log(e);
      }
    }

    if (variant === "LOGIN") {
      try {
        publicRequest
          .post(`/auth/login`, {
            email,
            password,
          })
          .then((response) => {
            if (response?.status === 200) {
              const session = response?.data;
              const user = response?.data?.user;

              setLoginUserSuccess(user, session);
              router.push("/dashboard");

              toast.success("Logged in successfully!");
            } else {
              toast.error("Invalid credentials!");
            }
          })
          .catch(() => toast.error("Wrong credentials!"))
          .finally(() => setIsLoading(false));
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-5">
        {variant === "LOGIN"
          ? "Login with your Account"
          : "Create your account"}
      </h1>
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        {variant === "REGISTER" && (
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="name"
            label="Name"
          />
        )}
        <Input
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          id="email"
          label="Email"
          type="email"
        />
        <Input
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          id="password"
          label="Password"
          type="password"
        />
        <div className="pt-4">
          <Button disabled={isLoading} fullWidth type="submit">
            {variant === "LOGIN" ? "Sign in" : "Register"}
          </Button>
        </div>
      </form>

      <div className="text-sm mt-6 px-2 text-gray-500">
        <p>
          {variant === "LOGIN"
            ? "You don't have account? "
            : "Already have an account? "}
          <button
            onClick={toggleVariant}
            className="cursor-pointer text-primary-red hover:underline"
          >
            {variant === "LOGIN" ? " Create account" : " Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
