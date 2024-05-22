import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navBar.css";
import { Axios } from "../../../Api/ِAxios";
import { CAT } from "../../../Api/Api";
import "./navBar.css";
import StringSlice from "../../../helpers/StringSlice";
import Skeleton from "react-loading-skeleton";
import img from "../../../Assets/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { CgProfile } from "react-icons/cg";


export default function NavBar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${CAT}`)
      .then((res) => setCategories(res.data.slice(-6)))
      .finally(() => setLoading(false));
  }, []);

  const categoriesShow = categories.map((category, key) => (
    <p key={key} className="btn btn-outline-secondary ">
      {StringSlice(category.title, 15)}
    </p>
  ));

  const skeletons = Array.from({ length: 8 }, (_, i) => (
    <Skeleton key={i} height="30px" width="80px" />
  ));

  return (
    <nav className="py-3 container">
      <Container>
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <Link className=" col-sm-6 col-md-3 col-7" to="/">
            <img width="35%" src={img} alt="logo" />
          </Link>
          <div className="col-12 col-md-6 order-md-2 order-3 mt-md-0 mt-3 position-relative">
            <Form.Control
              type="search"
              className="form-control custom-search py-3 rounded-4 "
              placeholder="Search Product ..."
            />
            <button
              className="btn btn-success position-absolute top-0 end-0 h-100 line-height m-0 px-4 rounded-start-0 rounded-end-4
            d-flex align-items-center justify-content-center"
            >
              Search
            </button>
          </div>
          <div className="col-3 d-flex align-items-center justify-content-end gap-4 order-md-3 order-1">
            <Link to="/cart">
              <FontAwesomeIcon icon={faCartShopping} className="fa-2x" style={{color:"008F65"}} />
              {/* <img width="30px" src="" alt="cart" /> */}
            </Link>
            <Link to="/profile">
              {/* <img width="35px" src="" alt="profile" /> */}
              <CgProfile size={35} style={{color:"008F65"}} />
            </Link>
          </div>
        </div>
      </Container>
      <div className="mt-4 ">
        <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap ">
          {loading ? skeletons : categoriesShow}
          <Link className="category-title btn btn-success mb-3 p-2" to="/categories">
            Show All
          </Link>
        </div>
      </div>
    </nav>
  );
}
