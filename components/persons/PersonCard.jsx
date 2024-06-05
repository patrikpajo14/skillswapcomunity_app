import Image from "next/image";
import React from "react";
import IconButton from "../IconButton";
import Button from "../Button";
import Rating from "../general/Rating";

const PersonCard = ({ user, onClick, handleOpenDrawer }) => {
  return (
    <div className="card">
      <div className="flex gap-3 p-3">
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
            <h3 className="font-bold text-lg">{user.name}</h3>
            <IconButton onClick={handleOpenDrawer}>
              <Image
                src="/assets/icons/ico_info.svg"
                alt="info"
                width={20}
                height={20}
              />
            </IconButton>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm">Musician</p>
            <Rating value={user.rating} readOnly={true} size={60} />
          </div>
          <p className="text-sm font-medium">
            Expirience ={" "}
            <span className="text-primary-red">{user.experience} years</span>
          </p>
          <p className="text-sm">Cost: {user.salary}</p>
          <Button sx={"w-full mt-3"} onClick={onClick}>
            Swap
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
