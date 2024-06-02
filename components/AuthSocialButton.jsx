import Image from "next/image";

const AuthSocialButton = ({ icon, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        w-full 
        justify-center 
        items-center
        gap-2
        rounded-md 
        bg-white 
        px-4 
        py-2 
        text-gray-500 
        shadow-sm 
        ring-1 
        ring-inset 
        ring-gray-300 
        hover:bg-gray-50 
        focus:outline-offset-0
      "
    >
      Continue with
      <Image src={icon} width="20" height="20" alt="provider" />
    </button>
  );
};

export default AuthSocialButton;
