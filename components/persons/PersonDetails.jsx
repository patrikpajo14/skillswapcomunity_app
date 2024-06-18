import Image from "next/image";
import React from "react";
import Rating from "../general/Rating";
import Button from "../Button";

export default function PersonDetails({ user, onClick }) {
  return (
    <div className="block">
      <div className="flex gap-3 mb-5">
        <div className="min-w-[95px]">
          <Image
            src={"/assets/images/default-user-icon.jpg"}
            width="97"
            height="85"
            alt="profile"
            className="rounded-lg"
          />
        </div>
        <div className="flex-1">
          <div className="flex-between ">
            <h3 className="font-bold text-lg">{user?.name}</h3>
          </div>
          <div className="">
            <p className="text-sm">{user?.skill?.name}</p>
          </div>
          <div className="py-1">
            <Rating value={user?.rating} readOnly={true} size={60} />
          </div>
          <p className="text-sm font-medium">
            Expirience ={" "}
            <span className="text-primary-red">{user?.experience} years</span>
          </p>
          <p className="text-sm">Cost: {user?.salary}</p>
          <Button sx={"w-full mt-3"} onClick={onClick}>
            Connect
          </Button>
        </div>
      </div>
      <div className="about mb-6">
        <h3 className="font-bold text-lg mb-3">About</h3>
        {user?.phone && (
          <div className="flex gap-4 items-center mb-3">
            <Image
              src="/assets/icons/ico_phone.svg"
              alt="phone"
              width={20}
              height={20}
            />
            <a href={`tel:${user?.phone}`}>{user?.phone}</a>
          </div>
        )}
        <div className="flex gap-4 items-center">
          <Image
            src="/assets/icons/ico_email.svg"
            alt="email"
            width={20}
            height={20}
          />
          <a href={`mailto:${user?.email}`}>{user?.email}</a>
        </div>
      </div>

      {user?.description && (
        <div className="about mb-6">
          <h3 className="font-bold text-lg mb-2">Description</h3>
          <p>{user?.description}</p>
        </div>
      )}
      {user?.achievements && (
        <div className="about mb-6">
          <h3 className="font-bold text-lg mb-2">Achievements</h3>
          <p>{user?.achievements}</p>
        </div>
      )}
    </div>
  );
}
