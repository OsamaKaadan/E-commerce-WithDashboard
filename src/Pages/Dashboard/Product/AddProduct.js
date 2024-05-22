import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Loading from "../../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../../Api/ِAxios";
import { CAT, pro } from "../../../Api/Api";

export default function AddProduct() {
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });

  const dummyForm = {
    category: null,
    title: "dummy",
    description: "dummy",
    price: 222,
    discount: 0,
    About: "About",
  };

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState();

  const nav = useNavigate();

  //   State to get Id for progress process
  const [id, setId] = useState();

  //   Ref
  const focus = useRef("");
  const openImage = useRef(null);
  const progress = useRef([]);
  const ids = useRef([]);

  // Handle Focus
  useEffect(() => {
    focus.current.focus();
  }, []);

  //   HandleOpenImage
  function handleOpenImage() {
    openImage.current.click();
  }

  //  Get All Categories
  useEffect(() => {
    Axios.get(`/${CAT}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);

  // Handle Edit
  async function HandleEdit(e) {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await Axios.post(`${pro}/edit/${id}`, form);
      // window.location.pathname = "/dashboard/categories";
      nav("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  //   Handle Submit Form
  async function HandleSubmitForm() {
    try {
      const res = await Axios.post(`${pro}/add`, dummyForm);
      setId(res.data.id);
    } catch (err) {
      console.log(err);
    }
  }

  //  HandleChange
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(1);
    if (sent !== 1) {
      HandleSubmitForm();
    }
  }

  //   Handle Image change
  const j = useRef(-1);

  async function handleImagesChange(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const imagesAsFiles = e.target.files;
    const data = new FormData();
    for (let i = 0; i < imagesAsFiles.length; i++) {
      j.current++;
      data.append("image", imagesAsFiles[i]);
      data.append("product_id", id);
      try {
        const res = await Axios.post("/product-img/add", data, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percent = Math.floor((loaded * 100) / total);
            if (percent % 10 === 0) {
              progress.current[j.current].style.width = `${percent}%`;
              progress.current[j.current].setAttribute(
                "percent",
                `${percent}%`
              );
            }
          },
        });
        ids.current[j.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  }

  //   Handle Image Delete
  async function handleImageDelete(id,img){
    const findId = ids.current[id];
    try{
        const res = await Axios.delete(`product-img/${findId}`);
        setImages(prev => prev.filter((image) => image !== img));
        ids.current = ids.current.filter((i)=> i !== findId);
        --j.current;
    }catch(err){
        console.log(err);
    }
  }
  //   Mapping
  const categoriesShow = categories.map((item, key) => (
    <option key={key} value={item.id}>
      {item.title}
    </option>
  ));

  const imagesShow = images.map((img, key) => (
    <div className="border p-2 w-100" key={key}>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-start gap-3 ">
          <img src={URL.createObjectURL(img)} alt="" width={"90px"} />
          <div>
            <p className="mb-1">{img.name}</p>
            {/* Show Size in KB */}
            <p>
              {img.size / 1024 < 900
                ? (img.size / 1024).toFixed(2) + "KB"
                : (img.size / (1024 * 1024)).toFixed(2) + "MB"}
            </p>
          </div>
        </div>
        <Button onClick={() => handleImageDelete(key, img)} variant="danger">
          Delete
        </Button>
      </div>
      <div className="custom-progress mt-3">
        <span
          ref={(e) => (progress.current[key] = e)}
          className="inner-progress"
        ></span>
      </div>
    </div>
  ));

  return (
    <>
      {loading && <Loading />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={HandleEdit}>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Select
            ref={focus}
            value={form.category}
            name="category"
            onChange={handleChange}
          >
            <option disabled>Select Category</option>
            {categoriesShow}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title.."
            value={form.title}
            name="title"
            onChange={handleChange}
            required
            disabled={!sent}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description.."
            value={form.description}
            name="description"
            onChange={handleChange}
            required
            disabled={!sent}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="price.."
            value={form.price}
            name="price"
            onChange={handleChange}
            required
            disabled={!sent}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="discount">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            type="text"
            placeholder="Discount.."
            value={form.discount}
            name="discount"
            onChange={handleChange}
            required
            disabled={!sent}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="about">
          <Form.Label>About</Form.Label>
          <Form.Control
            type="text"
            placeholder="About.."
            value={form.About}
            name="About"
            onChange={handleChange}
            required
            disabled={!sent}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            ref={openImage}
            hidden
            multiple
            onChange={handleImagesChange}
            type="file"
            disabled={!sent}
          />
        </Form.Group>
        <div
          onClick={handleOpenImage}
          className="d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-2 w-100 flex-column"
          style={{
            border: !sent ? "2px dashed gray" : "2px dashed #198754",
            cursor: !sent ? "not-allowed" : "pointer",
          }}
        >
          <img
            src={require("../../../Assets/upload.png")}
            alt="Upload here"
            width="100px"
            style={{ filter: !sent && "grayscale(1)" }}
          />
          <p
            className="fw-bold mb-0"
            style={{ color: !sent ? "gray" : "#198754" }}
          >
            Upload Images
          </p>
        </div>
        <div className="d-flex align-items-start flex-column gap-2">
          {imagesShow}
        </div>

        <button
          className="btn btn-success mt-3"
          style={{
            backgroundColor: !sent && "gray",
            border: !sent && "gray",
            cursor: !sent && "not-allowed",
          }}
        >
          Save
        </button>
      </Form>
    </>
  );
}
