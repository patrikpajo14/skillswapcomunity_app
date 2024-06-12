import clsx from "clsx";

const Input = ({
  label,
  id,
  register,
  required,
  errors,
  type = "text",
  disabled,
  sx,
  styles,
}) => {
  return (
    <div className={styles}>
      <label
        htmlFor={id}
        className="
            block
            sm:text-[16px]
            text-sm
            font-medium
            text-gray-900
          "
      >
        {label}
      </label>
      <div className="relative mt-[5px]">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
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
            `,
            sx,
            errors[id] && "border-red-500 bg-red-50 focus:border-red-500",
            disabled && "opacity-50 cursor-default"
          )}
        />
        {errors && (
          <label
            htmlFor={id}
            className={clsx(
              "absolute top-[100%] right-0 text-primary-red text-sm"
            )}
          >
            {errors[id]?.message}
          </label>
        )}
      </div>
    </div>
  );
};

export default Input;
