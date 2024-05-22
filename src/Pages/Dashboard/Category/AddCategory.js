import { useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/ِAxios";
import { cat } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";

export default function AddCategory() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

  // Handle Submit
  async function HandleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    // Form To Send Image
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${cat}/add`, form);
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

        <button
          disabled={title.length > 1 ? false : true}
          className="btn btn-success"
        >
          Save
        </button>
      </Form>
    </>
  );
}
