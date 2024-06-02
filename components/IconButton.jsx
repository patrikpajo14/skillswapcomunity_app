import React from "react";
import Link from "next/link";

const IconButton = ({ children, onClick, variant, href }) => {
  return (
      <>
        {variant ==="link" ? (
            <Link href={href} className="iconButton">
              {children}
            </Link>
        ):(
            <button onClick={onClick} className="iconButton">
              {children}
            </button>
        )}
      </>
  );
};

export default IconButton;
