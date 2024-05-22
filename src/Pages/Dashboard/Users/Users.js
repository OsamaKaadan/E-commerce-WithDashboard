import { useEffect, useState } from "react";
import { USER, USERS, pro } from "../../../Api/Api";
import { Axios } from "../../../Api/ِAxios";
import { Link } from "react-router-dom";
import TableShow from "../../../Components/Dashboard/TableShow";

export default function Users() {
  // States
  const [users, setUsers] = useState([]);
  // const [deleteUser, setDeleteUser] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(false);
  // State For Paginate
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [total, setTotal] = useState(0);

  // Get Current User
  useEffect(() => {
    Axios.get(`${USER}`).then((res) => setCurrentUser(res.data));
  }, []);
  //  Get All Users
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${USERS}?page=${page}&limit=${limit}`)
      .then((data) => {
        setUsers(data.data.data);
        setTotal(data.data.total);
      })
      // .then(() => setNoUsers(true))
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, [page, limit]);

  // Header information for map
  const header = [
    {
      key: "name",
      name: "Username",
    },
    { key: "email", name: "Email" },
    { key: "role", name: "Role" },
  ];
  // Handle Delete
  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${USER}/${id}`);
      setUsers((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between pb-3 pt-2">
        <h2>Users Page</h2>
        <Link className="btn btn-success" to="/dashboard/user/add">
          Add user
        </Link>
      </div>
      <TableShow
        header={header}
        data={users}
        currentUser={currentUser}
        delete={handleDelete}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        loading={loading}
        total={total}
        search="name"
        searchLink={USER}
        page={page}
      />
    
    </div>
  );
}
