"use client";

import clsx from "clsx";
import { useState } from "react";

const Select = ({
  label,
  value,
  children,
  disabled,
  name,
  errors,
  placeholder,
  register,
  required,
  onChange,
  reset,
    optionList = [],
    isLoading = false,
}) => {
  const [selectedValue, setSelectedValue] = useState(
    value !== undefined ? value : ""
  );

  console.log("options list", optionList)

  return (
    <div className="z-[100] flex-1">
      <label
        className="
        block
        sm:text-[16px]
        text-xs
        font-medium
        text-gray-900
      "
      >
        {label}
      </label>
        {!isLoading && optionList ? (
            <div className="mt-[5px] relative">
              <select
                  disabled={disabled}
                  name={name}
                  id={name}
                  value={selectedValue}
                  {...register(name, { required })}
                  onChange={(e) => {
                    if (!reset) {
                      setSelectedValue(e.target.value);
                    } else {
                      onChange(e);
                    }
                  }}
                  className={clsx(
                      `
              block 
              w-full 
              rounded-[5px] 
              py-[7px]
              px-[12px]
              sm:py-[10px]
              sm:px-[15px]
              text-black
              border-1
              border
              bg-primary-lightred 
              border-primary-gray 
              placeholder:text-gray-400 
              focus:bg-white
              focus:outline-none
              focus:ring-transparent
              text-sm
              sm:text-md 
              capitalize
            `,
                      errors[name] && "border-red-500 bg-red-50 focus:border-red-500",
                      disabled && "opacity-50 cursor-default"
                  )}
              >
                {placeholder && (
                    <option value="" disabled>
                      {placeholder}
                    </option>
                )}
                {optionList.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.name}
                    </option>
                ))}
              </select>
              {errors && (
                  <label
                      htmlFor={name}
                      className={clsx(
                          "absolute top-[100%] right-0 text-primary-red text-sm"
                      )}
                  >
                    {errors[name]?.message}
                  </label>
              )}
            </div>
        ) : (
            <div className="mt-[5px] relative">
              <div className={clsx(
                  `
                      block 
                      w-full 
                      rounded-[5px] 
                      py-[7px]
                      px-[12px]
                      sm:py-[10px]
                      sm:px-[15px]
                      text-black
                      border-1
                      border
                      h-[46px]
                      bg-primary-lightred 
                      border-primary-gray 
                      placeholder:text-gray-400 
                      focus:bg-white
                      focus:outline-none
                      focus:ring-transparent
                      text-sm
                      sm:text-md 
                      capitalize
                    `,
                  errors[name] && "border-red-500 bg-red-50 focus:border-red-500",
                  disabled && "opacity-50 cursor-default"
              )}
              >
              </div>
            </div>
        )}

    </div>
  );
};

export default Select;
