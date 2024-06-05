"use client";
import useAuthStore from "@/app/store/AuthStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Sidebar = ({ currentUser }) => {
  const pathname = usePathname();

  const { setUser } = useAuthStore();
  useEffect(() => {
    if (currentUser) setUser(currentUser);
  }, [currentUser]);

  const sidebarLinks = ["/", "find-swaps", "current-swaps", "profile"];
  const sidebarTranslate = [
    "Dashboard",
    "Find swaps",
    "Current swaps",
    "Profile",
  ];
  const sidebarIcons = [
    "/assets/icons/ico_dashboard.svg",
    "/assets/icons/ico_add-user.svg",
    "/assets/icons/ico_users.svg",
    "/assets/icons/ico_profile.svg",
  ];

  return (
    <div className="sidebar">
      <div className="inner">
        <div className="flex-between px-[17px] py-[5px] md:p-0">
          <Link href="/" className="logo">
            LOGO
          </Link>
          <button
            className="block md:hidden"
            onClick={() => {
              document.body.classList.remove("no-scroll");
              document.body.classList.remove("sidebar-open");
            }}
          >
            <Image
              src={"/assets/icons/ico_close.svg"}
              width="25"
              height="25"
              alt="menu"
            />
          </button>
        </div>
        <ul>
          {sidebarLinks.map((link, index) => {
            const isActive = pathname.endsWith(link);
            if (link !== false) {
              return (
                <li className="relative" key={index}>
                  <Link
                    href={`/dashboard/${link}`}
                    onClick={() => {
                      document.body.classList.remove("sidebar-open");
                    }}
                    className={
                      isActive ? "sidebar-link active" : "sidebar-link"
                    }
                  >
                    <Image
                      src={sidebarIcons[index]}
                      alt={sidebarTranslate[index]}
                      width="25"
                      height="25"
                      className={"sidebar-icon"}
                    />
                    {sidebarTranslate[index]}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
