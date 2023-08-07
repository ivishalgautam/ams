import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  MdPerson,
  MdPersonAddAlt,
  MdPersonAddAlt1,
  MdPersonOutline,
} from "react-icons/md";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { pathname } = useLocation();
  const [activeIndex, setActiveIndex] = useState(1);
  const { navList } = useSelector((store) => store.navMenu);
  // console.log(pathname);
  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="ml-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="h-6 w-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto rounded-br-3xl rounded-tr-3xl bg-primary px-3 py-4 text-white shadow-lg">
          <span className="text-3xl font-bold">Logo</span>
          <ul className="mt-5 space-y-2 font-medium aside-list">
            {navList?.map((nav) => {
              return (
                <li
                  key={nav.id}
                  className={`${
                    activeIndex === nav.id ? "bg-primary-dark" : ""
                  } rounded-md`}
                >
                  <button
                    className={`w-full flex items-center rounded-lg p-2 hover:bg-primary-dark  transition-colors`}
                    onClick={() => setActiveIndex(nav.id)}
                  >
                    <MdPersonOutline size={20} />
                    <span className="ml-3 text-sm capitalize">{nav.name}</span>
                  </button>
                  {nav.type === "dropdown" && (
                    <ul
                      className={`${
                        activeIndex === nav.id ? "active" : ""
                      } pl-6 py-2 space-y-2`}
                    >
                      {nav.submenu.map((sub) => {
                        return (
                          <li key={sub.id}>
                            <Link
                              to={sub.path}
                              className={`flex items-center rounded-lg p-1  transition-colors`}
                            >
                              <span className="ml-3 text-sm capitalize">
                                {sub.name}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
            {/* <li>
              <Link
                to={"/"}
                className={`flex items-center rounded-lg p-2 hover:bg-primary-dark ${
                  pathname === "" ? "bg-primary-dark" : ""
                } transition-colors`}
              >
                <AiOutlineHome size={20} />
                <span className="ml-3 text-sm capitalize">Dashboard</span>
              </Link>
            </li> */}

            {/* doctors */}

            {/* hospitals */}
            {/* <li>
              <button
                className={`w-full flex items-center rounded-lg p-2 hover:bg-primary-dark ${
                  pathname.includes("hospitals") ? "bg-primary-dark" : ""
                } transition-colors`}
                onClick={() => setActiveTab(!activeTab)}
              >
                <MdPersonOutline size={20} />
                <span className="ml-3 text-sm capitalize">
                  Manage hospitals
                </span>
              </button>
              <ul
                className={`${activeTab ? "active" : ""} pl-6 mt-2 space-y-2`}
              >
                <li>
                  <Link
                    to={"/hospitals/add"}
                    className={`flex items-center rounded-lg p-1  transition-colors`}
                  >
                    <span className="ml-3 text-sm">Add New hospital</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/hospitals"}
                    className={`flex items-center rounded-lg p-1  transition-colors`}
                  >
                    <span className="ml-3 text-sm">All hospitals</span>
                  </Link>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
