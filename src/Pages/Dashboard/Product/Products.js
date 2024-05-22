import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/TableShow";
import { Axios } from "../../../Api/ِAxios";
import { PRO, pro } from "../../../Api/Api";

export default function Products() {
  // States
  const [products, setProducts] = useState([]);

  // State For Paginate
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  // Header information for map
  const header = [
    { key: "images", name: "Images" },
    {
      key: "title",
      name: "Title",
    },
    {
      key: "description",
      name: "Description",
    },
    {
      key: "price",
      name: "Price",
    },
    {
      key: "rating",
      name: "Rating",
    },
  ];

  //  Get All Categories
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${PRO}?page=${page}&limit=${limit}`)
      .then((data) => {
        setProducts(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, [page, limit]);

  // Handle Delete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${pro}/${id}`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between pb-3 pt-2">
        <h2>Products Page</h2>
        <Link className="btn btn-success" to="/dashboard/category/add">
          Add Product
        </Link>
      </div>
      <TableShow
        header={header}
        data={products}
        delete={handleDelete}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        loading={loading}
        total={total}
        search="title"
        searchLink={pro}
      />
    </div>
  );
}
