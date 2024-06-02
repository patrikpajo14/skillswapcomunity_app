"use client";

import React, { useState } from "react";
import Input from "./forms/Input";
import FormProvider from "./forms/FormProvider";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const AdministrationForm = ({ title, inputLabel, btnText, url }) => {
  const [isLoading, setIsLoading] = useState(false);

  const AdministrationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
  });

  const defaultValues = {
    name: "",
  };

  const methods = useForm({
    resolver: yupResolver(AdministrationSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      axios
        .post(url, data)
        .then((callback) => {
          if (callback?.status === 200) {
            toast.success("Successfuly created!");
          }
        })
        .catch((error) => toast.error(error.response.data))
        .finally(() => setIsLoading(false));
      reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="card p-[20px]">
      <h2 className="text-[18px] font-bold mb-3">{title}</h2>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <Input
            disabled={isLoading}
            errors={errors}
            required
            register={register}
            id="name"
            label={inputLabel}
          />
          <Button disabled={isLoading} fullWidth type="submit">
            {btnText}
          </Button>
        </div>
      </FormProvider>
    </div>
  );
};

export default AdministrationForm;
