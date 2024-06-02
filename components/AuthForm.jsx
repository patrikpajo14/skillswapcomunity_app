"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Input from "/components/forms/Input";
import AuthSocialButton from "/components/AuthSocialButton";
import Button from "/components/Button";
import { toast } from "react-hot-toast";
import PageLoader from "./PageLoader/PageLoader";

const AuthForm = () => {
  /* const session = useSession(); */
  const router = useRouter();
  const [variant, setVariant] = useState("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  /*   useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session?.status, router]); */

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

  const onSubmit = (data) => {
    setIsLoading(true);
    router.push("/dashboard");
    /*  if (variant === "REGISTER") {
      axios
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
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error(callback.error);
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Logged in successfully!");
            router.push("/dashboard");
          }
        })
        .catch((error) => toast.error(error))
        .finally(() => setIsLoading(false));
    } */
  };

  return (
    <>
      {/*    {session?.status === "authenticated" ? (
        <PageLoader />
      ) : ( */}
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
      {/*       )} */}
    </>
  );
};

export default AuthForm;
