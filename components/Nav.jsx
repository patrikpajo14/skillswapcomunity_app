"use client";
import { useState } from "react";
import Avatar from "./Avatar";
import Button from "./Button";
import Image from "next/image";
import clsx from "clsx";
import { Trans } from "react-i18next/TransWithoutContext";
import { languages } from "@/app/i18n/settings";
import { useAuthContext } from "@/src/auth/context/auth/authContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = ({ lng, setLang }) => {
  const pathname = usePathname();
  const { user, logoutUser } = useAuthContext();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const path = pathname.substring(3, pathname.length);

  return (
    <nav className="flex-col-reverse flex md:flex-row gap-3 flex-end md:items-center w-full mb-7 md:mb-16 pt-3">
      <div className={clsx(`flex justify-between w-[100%] md:w-max`)}>
        <div className="menu-wrap">
          <button
            className="block md:hidden"
            onClick={() => {
              document.body.classList.toggle("no-scroll");
              document.body.classList.toggle("sidebar-open");
            }}
          >
            <Image
              src={"/assets/icons/ico_menu.svg"}
              width="25"
              height="25"
              alt="menu"
            />
          </button>
        </div>
        <div className="flex gap-3 items-center">
          <div className="languages flex gap-2 items-center">
            {languages.map((l) => {
              return (
                <span key={l}>
                  <Link
                    href={`/${l}${path}`}
                    onClick={() => {
                      setLang(l);
                    }}
                    className={clsx(
                      `uppercase flex gap-2 items-center`,
                      lng === l && "font-bold"
                    )}
                  >
                    <Image
                      src={`/assets/icons/ico_${l}.svg`}
                      width="20"
                      height="20"
                      alt="lang"
                    />{" "}
                    {l}
                  </Link>
                </span>
              );
            })}
          </div>

          {user && (
            <div className="flex relative gap-3 items-center">
              <p>{user?.name}</p>
              <Avatar
                user={user}
                onClick={() => {
                  setToggleDropdown(!toggleDropdown);
                }}
              />

              {toggleDropdown && (
                <div className="dropdown">
                  <Button
                    onClick={() => {
                      setToggleDropdown(false);
                      logoutUser();
                    }}
                    fullWidth
                  >
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
