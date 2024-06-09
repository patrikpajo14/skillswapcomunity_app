"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Input from "/components/forms/Input";
import Button from "/components/Button";
import { toast } from "react-hot-toast";
import PageLoader from "./PageLoader/PageLoader";
import publicRequest from "../src/auth/utils/app-public-request";
import { useAuthContext } from "@/src/auth/context/auth/authContext";

const AuthForm = () => {
  const { session, setLoginUserSuccess } = useAuthContext();
  const router = useRouter();
  const [variant, setVariant] = useState("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

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
    watch,
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
      const response = await publicRequest.post(`signup`, {
        email,
        password,
        fullName,
      });
      console.log(response.data);
      if (response.data?.code === 200) {
        /* const { user, session, permissions } = response?.data?.data; */

        /* setLoginUserSuccess(user, session, permissions);

        router.push(returnTo || PATH_AFTER_LOGIN);

        enqueueSnackbar("Uspješna prijava!", {
          variant: "success",
        }); */
        toast.success("User has been registered");
      } else {
        toast.error("Invalid credentials!");
      }
      setIsLoading(false);
      /* axios
        .post("/api/register", data)
        .then(() =>
          signIn("credentials", {
            ...data,
            redirect: false,
          })
        )
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }
          if (callback?.ok) {
            toast.success("User has been registered");
            router.push("/dashboard");
          }
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false)); */
    }

    if (variant === "LOGIN") {
      const response = await publicRequest.post(
        `login`,
        JSON.stringify({
          email,
          password,
        })
      );
      console.log(response.data);
      if (response.data?.code === 200) {
        /* const { user, session, permissions } = response?.data?.data; */

        /* setLoginUserSuccess(user, session, permissions);
  
          router.push(returnTo || PATH_AFTER_LOGIN);
  
          enqueueSnackbar("Uspješna prijava!", {
            variant: "success",
          }); */
        toast.success("Logged in successfully!");
      } else {
        toast.error("Invalid credentials!");
      }
    }
  };

  return (
    <>
      {session?.token ? (
        <PageLoader />
      ) : (
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
      )}
    </>
  );
};

export default AuthForm;
