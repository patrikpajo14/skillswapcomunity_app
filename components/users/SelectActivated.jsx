import React from "react";

const status = [0, 1];

const SelectActivated = ({ onClick }) => {
  return (
    <div className="absolute right-full top-[-50%] mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
      <div className="py-1">
        {status.map((item, index) => (
          <p
            key={index}
            className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer capitalize"
            onClick={() => {
              onClick(item);
            }}
          >
            {item === 1 ? "Activated" : "Disabled"}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SelectActivated;
