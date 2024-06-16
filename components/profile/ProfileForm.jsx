import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "/components/forms/Input";
import Button from "/components/Button";
import Image from "next/image";
import Select from "../forms/Select";
import { useAuthContext } from "@/src/auth/context/auth/authContext";
import { useGetSkills } from "@/app/actions/GetSkills";
import { useUpdateUser } from "@/app/actions/GetUsers";

export default function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, updateUserBasicInfo } = useAuthContext();
  const { data: skills, isLoading: skillsLoading } = useGetSkills();
  const { mutate: updateUser } = useUpdateUser();

  console.log("USER", user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      phone: user?.phone || "",
      salary: user?.salary || "",
      experience: user?.experience || "",
      description: user?.description || "",
      achievements: user?.achievements || "",
      skill: user?.skill?.id || "",
      company: user?.company?.id || "",
    },
  });
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
    console.log("SUBMIT", data);

    const updatedUser = {
      id: user?.id,
      name: data?.name,
      email: data?.email,
      password: data?.password,
      phone: data?.phone,
      description: data?.description,
      achievements: data?.achievements,
      skill: null,
      salary: data?.salary,
      rating: null,
      experience: data?.experience,
      company: null,
    };

    updateUser({ id: user?.id, body: updatedUser });

    updateUserBasicInfo(data);
  };

  return (
    <div className="card">
      <div className="w-full p-5">
        <form
          className="space-y-2 flex justify-center flex-wrap md:flex-nowrap gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="max-w-[350px]">
            <Image
              src="/assets/images/default-user-icon.jpg"
              alt="profile picture"
              width={300}
              height={300}
              className="w-full h-auto min-w-[200px] md:w-[300px]"
            />
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-2 md:gap-5">
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
              id="email"
              label="Email"
              type="email"
            />
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              id="phone"
              label="Phone"
            />
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              id="password"
              label="Password"
              type="password"
            />
            <Select
              label={"Skill"}
              placeholder={"Select skill..."}
              disabled={skillsLoading}
              isLoading={skillsLoading}
              name={"skillId"}
              errors={errors}
              register={register}
              optionList={skills?.data}
            />
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              id="salary"
              label="Salary"
              type="number"
            />
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              id="experience"
              label="Experience"
              type="number"
            />

            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              id="description"
              label="Description"
            />

            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              id="achievements"
              label="Achievements"
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
