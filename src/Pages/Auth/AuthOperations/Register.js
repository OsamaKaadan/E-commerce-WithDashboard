import { useState } from "react";
import axios from "axios";
import { REGISTER, baseURL } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function Register() {
  //state
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  // error message
  const [err, setErr] = useState("");
  // Loading
  const [loading, setLoading] = useState(false);
  // Cookies
  const cookie = Cookie();
    // Use Navigate
    const navigate = useNavigate();
  //Handle Form Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  //Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${REGISTER}`, form);
      setLoading(false);
      // window.location.pathname = "/users";
      navigate("/dashboard/users" , {replace: true});

      // save the value of token
      const token = res.data.token;
      // set token in cookie
      cookie.set("ecommerce", token);
    } catch (err) {
      setLoading(false);
      if (err.response.status === 422) {
        setErr("Email is already been taken");
      } else {
        setErr("Internal Server ERR");
      }
    }
  }

  return (
        <>
        {loading && <Loading />}
        <div className="container">
          <div className="row" style={{ height: "100vh"}}>
            <Container>
              <Form className="form " onSubmit={handleSubmit}>
                <div className="custom-form">
                  <h1>Register Now</h1>
                  <Form.Group className="form-custom" controlId="name">
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter Your Name.."
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                    <Form.Label>Name</Form.Label>
                  </Form.Group>
                  <Form.Group className="form-custom" controlId="email">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter Your email.."
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                    <Form.Label>Email</Form.Label>
                  </Form.Group>
                  <Form.Group className="form-custom" controlId="password">
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter Your Password.."
                      value={form.password}
                      minLength="6"
                      onChange={handleChange}
                      required
                    />
                    <Form.Label>Password</Form.Label>
                  </Form.Group>
                  <button className="btn btn-success">Login</button>
                  <div className="google-btn">
                    <a href={`http://127.0.0.1:8000/login-google`}>
                      <div className="google-icon-wrapper">
                        <img
                          className="google-icon"
                          src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                          alt="sign in with google"
                        />
                      </div>
                      <p className="btn-text">
                        <b>Sign in with google</b>
                      </p>
                    </a>
                  </div>
                  {err !== "" && <span className="error">{err}</span>}
                </div>
              </Form>
            </Container>
          </div>
        </div>
      </>
    
  );
}
