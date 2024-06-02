import Image from "next/image";
import React from "react";

const PersonCard = ({ user, onClick }) => {
  return (
    <div className="card">
      <div className="flex gap-3 p-3">
        <Image
          src={"/assets/images/default-user-icon.png"}
          width="97"
          height="85"
          alt="profile"
          className="rounded-lg"
        />
        <div>
          <h3>{user.name}</h3>
          <div className="flex items-center gap-2">
            <p>Musician</p>
            <p>rating</p>
          </div>
          <p>
            Expirience ={" "}
            <span className="text-primary-red">{user.experience} years</span>
          </p>
          <p>Cost: {user.salary}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
