import Image from "next/image";
import React from "react";
import IconButton from "../IconButton";
import Button from "../Button";
import Rating from "../general/Rating";

const PersonCard = ({
  user,
  onClick,
  onDelete,
  onAccept,
  handleOpenDrawer,
  received = false,
  sent = false,
    forDelete= false
}) => {
  let buttonContent;

  if (sent || forDelete) {
    buttonContent = (
        <Button sx={"w-full mt-3"} onClick={onDelete}>
          Unconnect
        </Button>
    );
  } else if (received) {
    buttonContent = (
        <Button sx={"w-full mt-3"} onClick={onAccept}>
          Accept
        </Button>
    );
  } else {
    buttonContent = (
        <Button sx={"w-full mt-3"} onClick={onClick}>
          Connect
        </Button>
    );
  }

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
            <h3 className="font-bold text-lg">{user?.name}</h3>
            <IconButton onClick={handleOpenDrawer}>
              <Image
                src="/assets/icons/ico_info.svg"
                alt="info"
                width={20}
                height={20}
              />
            </IconButton>
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
          {buttonContent}
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
