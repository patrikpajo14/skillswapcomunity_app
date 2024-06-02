import Image from "next/image";
import React from "react";

const Avatar = ({ user, onClick }) => {
  return (
    <div onClick={onClick}>
      {user?.image ? (
        <Image
          src={user?.image}
          width="37"
          height="37"
          alt="profile"
          className="rounded-full cursor-pointer"
        />
      ) : (
        <div className="avatar">{user?.name?.charAt(0)}</div>
      )}
    </div>
  );
};

export default Avatar;
