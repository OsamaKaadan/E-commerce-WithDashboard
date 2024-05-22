import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bars.css";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";
import WindowContext, { WindowSize } from "../../Context/WindowContext";
import { Axios } from "../../Api/ِAxios";
import { USER } from "../../Api/Api";
import { links } from "./NavLink";

export default function SideBar() {
  // Context Fort Open & Close Side Bar
  const menu = useContext(Menu);
  const isOpen = menu.isOpen;
  // Context For Small Screen
  const WindowContext = useContext(WindowSize);
  const windowSize = WindowContext.windowSize;
  // CLG For Test
  // console.log(windowSize);
  // User
  const [user, setUser] = useState("");

  // Navigate
  const Navigate = useNavigate();

  // Get User
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => Navigate("/login", { replace: true }));
  }, []);
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "70px",
          left: "0",
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.2)",
          backdropFilter: "blur(1px)",
          display: windowSize < "768" && isOpen ? "block" : "none",
        }}
      ></div>
      <div
        className="side-bar pt-3"
        style={{
          left: windowSize < "768" ? (isOpen ? 0 : "-100%") : 0,
          width: isOpen ? "240px" : "fit-content",
          position: windowSize < "768" ? "fixed" : "sticky",
        }}
      >
        {links.map(
          (link, key) =>
            link.role.includes(user.role) && (
              <NavLink
                key={key}
                to={link.path}
                className="d-flex align-items-center gap-2 side-bar-link"
              >
                <FontAwesomeIcon
                  style={{
                    padding: isOpen ? "10px 8px 10px 15px" : "10px 5px",
                  }}
                  icon={link.icon}
                />
                <p
                  className="m-0"
                  style={{
                    display: isOpen ? "block" : "none",
                  }}
                >
                  {link.name}
                </p>
              </NavLink>
            )
        )}
        {/* {user.role === "1995" ? (
          <>
            <NavLink
              to={"users"}
              className="d-flex align-items-center gap-2 side-bar-link"
            >
              <FontAwesomeIcon
                style={{ padding: isOpen ? "10px 8px 10px 15px" : "10px 5px" }}
                icon={faUsers}
              />
              <p
                className="m-0"
                style={{
                  display: isOpen ? "block" : "none",
                }}
              >
                Users
              </p>
            </NavLink>
            <NavLink
              to={"/dashboard/user/add"}
              className="d-flex align-items-center gap-2 side-bar-link"
            >
              <FontAwesomeIcon
                style={{ padding: isOpen ? "10px 8px 10px 15px" : "10px 5px" }}
                icon={faPlus}
              />
              <p
                className="m-0"
                style={{
                  display: isOpen ? "block" : "none",
                }}
              >
                Add user
              </p>
            </NavLink>
            <NavLink
              to={"/dashboard/writer"}
              className="d-flex align-items-center gap-2 side-bar-link"
            >
              <FontAwesomeIcon
                style={{
                  padding: isOpen ? "10px 8px 10px 15px" : "10px 5px",
                }}
                icon={faPlus}
              />
              <p
                className="m-0"
                style={{
                  display: isOpen ? "block" : "none",
                }}
              >
                Add Writer
              </p>
            </NavLink>
          </>
        ) : (
          user.role === "1996" && (
            <NavLink
              to={"/dashboard/writer"}
              className="d-flex align-items-center gap-2 side-bar-link"
            >
              <FontAwesomeIcon
                style={{
                  padding: isOpen ? "10px 8px 10px 15px" : "10px 5px",
                }}
                icon={faPlus}
              />
              <p
                className="m-0"
                style={{
                  display: isOpen ? "block" : "none",
                }}
              >
                Add Writer
              </p>
            </NavLink>
          )
        )} */}
      </div>
    </>
  );
}
