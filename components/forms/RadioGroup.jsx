"use client";

import React, { useState } from "react";

export default function RadioGroup({
  title,
  inputs,
  defaultValue,
  register,
  registerInput,
  handleOnChange,
}) {
  const [isChecked, setChecked] = useState(defaultValue);

  const onOptionChange = (e) => {
    setChecked(e.target.value);
    try {
      handleOnChange !== undefined && handleOnChange();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="flex items-center justify-between gap-2">
        {inputs.map((input, index) => (
          <div key={index} className="flex items-center gap-x-2">
            <div className="bg-white dark:bg-gray-100 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
              <input
                id={input.id}
                name={input.name}
                value={input.value}
                type="radio"
                {...register(input.name)}
                checked={isChecked === input.value}
                onChange={onOptionChange}
                className="checkbox appearance-none focus:opacity-100 focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
              />
              <div className="check-icon hidden border-4 border-primary-red rounded-full w-full h-full z-1" />
            </div>

            <label
              htmlFor={input.id}
              className="block text-sm font-medium leading-6 text-gray-900 capitalize cursor-pointer"
            >
              {input.value}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
