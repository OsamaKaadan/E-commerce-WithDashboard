import { Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { USER } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import { Axios } from "../../../Api/ِAxios";
import Err403 from "../Errors/Err403";

export default function RequireAuth({allowedRole}) {
  // User
  const [user, setUser] = useState("");
  // Navigate
  const Navigate = useNavigate();
  // Token & Cookie
  const cookie = Cookie();
  const token = cookie.get("ecommerce");

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => Navigate("/login", { replace: true }));
  }, []);
  return token ? (
    user === "" ? (
      <Loading />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Err403 role={user.role} />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
