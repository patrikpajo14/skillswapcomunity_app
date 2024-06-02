import React from "react";
import PersonCard from "./PersonCard";

const PersonList = () => {
  const user = {
    id: 1,
    name: "patrik stojsavljevic",
    email: "patrik.stojsavljevic@gmail.com",
    phone: "095555555",
    description: "patrik description",
    achievements: "achievements",
    skill: 1,
    salary: 2000,
    rating: 4.5,
    experience: 2,
    company: 1,
  };

  return (
    <section className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 md:gap-5">
      <PersonCard user={user} />
      <PersonCard user={user} />
    </section>
  );
};

export default PersonList;
