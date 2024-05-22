import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/ِAxios";
import { USER } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import "./users.css";

export default function ADDUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // State For Role
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  // to set password for user
  const [password, setPassword] = useState("");

  // Handle Submit
  async function HandleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/add`, {
        name: name,
        email: email,
        role: role,
        password: password,
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
        <Form.Group className="mb-3" controlId="example1">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name.."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="example2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="example3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="example3">
          <Form.Label>Role</Form.Label>
          <Form.Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ cursor: "pointer" }}
          >
            <option disabled value="">
              Select Role
            </option>
            <option value="1995">Admin</option>
            <option value="2001">User</option>
            <option value="1996">Writer</option>
            <option value="1999">Product Manager</option>
          </Form.Select>
        </Form.Group>
        <button
          disabled={
            name.length > 1 &&
            email.length > 1 &&
            password.length > 6 &&
            role !== ""
              ? false
              : true
          }
          className="btn btn-success"
        >
          Save
        </button>
      </Form>
    </>
  );
}
