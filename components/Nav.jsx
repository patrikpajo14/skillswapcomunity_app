"use client";
import { useState } from "react";
import Avatar from "./Avatar";
import Button from "./Button";
import Image from "next/image";
import clsx from "clsx";
import { Trans } from "react-i18next/TransWithoutContext";
import { languages } from "@/app/i18n/settings";
import { useAuthContext } from "@/src/auth/context/auth/authContext";

const Nav = () => {
  const { user, logoutUser } = useAuthContext();
  const [toggleDropdown, setToggleDropdown] = useState(false);

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
            <Trans i18nKey="languageSwitcher" t={t}>
              <Image
                src={`/assets/icons/ico_${lng}.svg`}
                width="20"
                height="20"
                alt="lang"
              />
            </Trans>
            {languages
              .filter((l) => lng !== l)
              .map((l, index) => {
                return (
                  <span key={l}>
                    {index > 0 && " or "}
                    <Link href={`/${l}`}>{l}</Link>
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
