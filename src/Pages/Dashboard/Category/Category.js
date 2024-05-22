import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Loading from "../../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../Api/ِAxios";
import { cat } from "../../../Api/Api";

export default function Category() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  

  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  // Get Id From Path, We have to replace the current path and let Id index empty
  // this const return number like 1 or 2 or .... but we can do it by using Hook
//   const id = Number(window.location.pathname.replace("/dashboard/categories/", ""));

// Get Id By using Params Hook;
const {id} = useParams();

  const nav = useNavigate();

  // Use Effect to get the user
  useEffect(() => {
    setLoading(true)
    Axios(`${cat}/${id}`)
      .then((data) => {
        setTitle(data.data.title);

        setLoading(false)

      })
      .then(() => setDisable(false))
      .catch(()=> nav('/dashboard/categories/page/users/404') , {replace:true})
      
  }, []);

  // Handle Submit
  async function HandleSubmit(e) {
    setLoading(true);
    e.preventDefault();
     // Form To Send Image
     const form = new FormData();
     form.append("title", title);
     form.append("image", image);
    try {
      const res = await Axios.post(`${cat}/edit/${id}`, form);
      window.location.pathname = "/dashboard/categories";
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <>
      {loading && <Loading />}

      <Form onSubmit={HandleSubmit} className="bg-white w-100 mx-2 p-3">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title.."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        {/* From Group "type-file" for sending Image */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Image</Form.Label>
          <Form.Control
            onChange={(e) => setImage(e.target.files.item(0))}
            type="file"
            required
          ></Form.Control>
        </Form.Group>
        
        <button disabled={disable} className="btn btn-success">
          Save
        </button>
      </Form>
    </>
  );
}
