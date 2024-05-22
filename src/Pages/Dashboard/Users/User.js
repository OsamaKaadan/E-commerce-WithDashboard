import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/ِAxios";
import { USER } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

export default function User() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // State For Role
  const [role, setRole] = useState("");

  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  // Get Id 
  const {id} = useParams();

  const nav = useNavigate();

  // Use Effect to get the user
  useEffect(() => {
    setLoading(true)
    Axios(`${USER}/${id}`)
      .then((data) => {
        setName(data.data.name);
        setEmail(data.data.email);
        setRole(data.data.role);
        setLoading(false)

      })
      .then(() => setDisable(false))
      .catch(()=> nav('/dashboard/page/users/404') , {replace:true})
      
  }, []);

  // Handle Submit
  async function HandleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/edit/${id}`, {
        name: name,
        email: email,
        role: role,
      });
      window.location.pathname = "/dashboard/users";
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <>
      {loading && <Loading />}

      <Form onSubmit={HandleSubmit} className="bg-white w-100 mx-2 p-3">
        <Form.Group className="mb-3" controlId="eInput1">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name.."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="eInput2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="eInput3">
          <Form.Label>Role</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)} >
            <option disabled value=''>Select Role</option>
            <option value='1995 '>Admin</option>
            <option value='2001'>User</option>
            <option value='1996'>Writer</option>
          </Form.Select>
        </Form.Group>
        <button disabled={disable} className="btn btn-success">
          Save
        </button>
      </Form>
    </>
  );
}
