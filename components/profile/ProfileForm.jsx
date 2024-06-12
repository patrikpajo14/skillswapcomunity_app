import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "/components/forms/Input";
import Button from "/components/Button";
import Image from "next/image";
import Select from "../forms/Select";
import { useAuthContext } from "@/src/auth/context/auth/authContext";

export default function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: user?.password || "",
      phone: user?.phone || "",
      salary: user?.salary || "",
      experience: user?.experience || "",
      description: user?.description || "",
      skill: user?.skill?.id || "",
      company: user?.company?.id || "",
    },
  });

  const skils = [
    {
      id: 1,
      name: "frontend developer",
    },
    {
      id: 2,
      name: "backend developer",
    },
  ];

  const company = [
    {
      id: 1,
      name: "TVZ company",
    },
    {
      id: 2,
      name: "IT company",
    },
  ];

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    const fullName = data.name;

    setIsLoading(true);
  };

  return (
    <div className="card">
      <div className="w-full p-5">
        <form
          className="space-y-2 flex gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="max-w-[350px]">
            <Image
              src="/assets/images/default-user-icon.jpg"
              alt="profile picture"
              width={300}
              height={300}
              className="w-full h-auto md:w-[300px]"
            />
          </div>
          <div className="w-full flex flex-wrap gap-4">
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="name"
              label="Name"
            />
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
              id="phone"
              label="Phone"
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
            <Select
              label={"Skill"}
              placeholder={"Select skill..."}
              /* disabled={loading} */
              name={"skillId"}
              errors={errors}
              register={register}
            >
              {skils.map((option, index) => (
                <option key={index} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Select>
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="salary"
              label="Salary"
              type="number"
            />
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="experience"
              label="Experience"
              type="number"
            />
            <Select
              label={"Company"}
              placeholder={"Select company..."}
              /* disabled={loading} */
              name={"companyId"}
              errors={errors}
              register={register}
            >
              {company.map((option, index) => (
                <option key={index} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Select>
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="description"
              label="Description"
            />
            <div className="w-[200px]">
              <Button disabled={isLoading} fullWidth type="submit">
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
