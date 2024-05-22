import { useEffect, useState } from "react";
import { CAT, cat } from "../../../Api/Api";
import { Axios } from "../../../Api/ِAxios";
import { Form, Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/TableShow";

export default function Categories() {
  // States
  const [categories, setCategories] = useState([]);

  // State For Paginate
  const [page, setPage] = useState(4);
  const [limit, setLimit] = useState(4);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  // Header information for map
  const header = [
    {
      key: "title",
      name: "Title",
    },
    {
      key: "image",
      name: "Image",
    },
  ];

  //  Get All Categories
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${CAT}?limit=${limit}&page=${page}`)
      .then((data) => {
        setCategories(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

  // Handle Delete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${cat}/${id}`);
      setCategories((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between pb-3 pt-2">
        <h2>Categories Page</h2>
        <Link className="btn btn-success" to="/dashboard/category/add">
          Add Category
        </Link>
      </div>

      <TableShow
        limit={limit}
        setLimit={setLimit}
        page={page}
        header={header}
        data={categories}
        delete={handleDelete}
        setPage={setPage}
        loading={loading}
        total={total}
        search="title"
        searchLink={cat}
      />
    </div>
  );
}
