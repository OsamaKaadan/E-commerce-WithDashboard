import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Menu } from "../../Context/MenuContext";
import { Axios } from "../../Api/ِAxios";
import { LOGOUT, USER } from "../../Api/Api";
import { Navigate } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Cookie from "cookie-universal";

export default function TopBar() {
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;

  const [name, setName] = useState("");

  const cookie = Cookie();

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setName(data.data.name))
      .catch(() => Navigate("/login", { replace: true }));
  }, []);

  // HandleLogOut
  async function handleLogout() {
    try {
      const res = await Axios.get(`/${LOGOUT}`);
      cookie.remove("ecommerce");
      window.location.pathname = "/login";
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="top-bar">
      <div className="d-flex align-items-center justify-content-between h-100">
        <div className="d-flex align-items-center gap-5">
          <h4>E-commerce</h4>
          <FontAwesomeIcon
            onClick={() => setIsOpen((prev) => !prev)}
            cursor={"pointer"}
            icon={faBars}
          />
        </div>
        <div>
          <DropdownButton  variant="success"id="dropdown-basic-button" title={name} >
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
}
