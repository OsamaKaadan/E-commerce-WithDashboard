import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Axios } from "../../Api/ِAxios";
import { PaginatedItems } from "./Pagination/Pagination";
import TransformDate from "../../helpers/TransformDate";

export default function TableShow(props) {
  const currentUser = props.currentUser || {
    name: "",
  };

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const showWhichData = search.length > 0 ? filteredData : props.data;


  // Get Searched Data
  async function getSearchedData(e) {
    try {
      const res = await Axios.post(
        `${props.searchLink}/search?title=${search}`
      );
      setFilteredData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLoading(false);
    }
  }
  useEffect(() => {
    const debounce = setTimeout(() => {
      search.length > 0 ? getSearchedData() : setSearchLoading(false);
    }, 500);
    return () => clearTimeout(debounce);
  }, [search]);

  // Header Show
  const headerShow = props.header.map((item, key) => (
    <th key={key}>{item.name}</th>
  ));

  // Body Show
  const dataShow = showWhichData.map((item, key) => (
    <tr key={key}>
      <td>{item.id}</td>
      {props.header.map((item2, key2) => (
        <td key={key2}>
          {item2.key === "image" ? (
            <img width="90px" src={item[item2.key]} alt="categoryImage" />
          ) : item2.key === "images" ? (
            <div className="d-flex align-items-center justify-content-start gap-2 flex-wrap">
              {item[item2.key].map((img) => (
                <img width="50px" src={img.image} alt="img" />
              ))}
            </div>
          ) :  item[item2.key] === "1995" ? (
            "admin"
          ) : item[item2.key] === "2001" ? (
            "user"
          ) : item[item2.key] === "1996" ? (
            "writer"
          ) : item[item2.key] === "1999" ? (
            "Product Manger"
          ) : (
            item[item2.key]
          )}
          {currentUser && item[item2.key] === currentUser.name && " (You)"}
        </td>
      ))}
      <td>
        <div className="d-flex align-items-center gap-2">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon
              fontSize={"19px"}
              color="gray"
              icon={faPenToSquare}
            />
          </Link>
          {currentUser.name !== item.name && (
            <FontAwesomeIcon
              onClick={() => props.delete(item.id)}
              fontSize={"19px"}
              color="red"
              icon={faTrash}
              cursor={"pointer"}
            />
          )}
        </div>
      </td>
    </tr>
  ));
  return (
    <div>
      <div className="col-5 ">
        <Form.Control
          className="my-3 form-control"
          type="search"
          aria-label="Disabled "
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchLoading(true);
          }}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            {headerShow}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.loading ? (
            <tr className="text-center">
              <td colSpan={12}>Loading...</td>
            </tr>
          ) : searchLoading ? (
            <tr className="text-center">
              <td colSpan={12}>Searching...</td>
            </tr>
          ) : (
            dataShow
          )}
        </tbody>
      </Table>
      <div className="d-flex align-items-center justify-content-end flex-wrap">
        <div className="col-1">
          <Form.Select
            onChange={(e) => props.setLimit(e.target.value)}
            aria-label="Default select example"
            style={{ cursor: "pointer" }}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </Form.Select>
        </div>
        <PaginatedItems
          setPage={props.setPage}
          itemsPerPage={props.limit}
          data={props.data}
          total={props.total}
        />
      </div>
    </div>
  );
}
