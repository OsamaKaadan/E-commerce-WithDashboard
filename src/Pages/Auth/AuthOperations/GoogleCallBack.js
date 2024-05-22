import axios from "axios";
import { useEffect } from "react";
import { GOOGLE_CALL_BACK, baseURL } from "../../../Api/Api";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";

export default function GoogleCallBack() {
  const cookie = Cookie();
  const location = useLocation();
  useEffect(() => {
    async function GoogleCall() {
      try {
        const res = await axios.get(
          `${baseURL}/${GOOGLE_CALL_BACK}${location.search}`
        );
        console.log(res);
        const token = res.data.access_token;
        cookie.set("ecommerce", token);
      } catch (err) {
        console.log(err);
      }
    }
    GoogleCall();
  }, []);
  return <div>TEST</div>;
}
