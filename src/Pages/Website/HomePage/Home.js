import { Container } from "react-bootstrap";
import Landing from "../../../Components/website/Landing/Landing";
import LatestSaleProducts from "../../../Components/website/Product/SaleProducts/LatestSaleProducts"
import ShowTopRated from "../../../Components/website/Product/TopRated/ShowTopRated";
import ShowLatestProducts from "../../../Components/website/Product/LatestProducts/ShowLatestProducts"
import "./home.css"
import Footer from "../../../Components/website/Footer/Footer";

export default function Home() {
  return (
    <>
      <Landing />
      <LatestSaleProducts/>
      <div className="divider "></div>
      <Container>
        <div className="d-flex align-items-start flex-wrap mt-3">
          <ShowTopRated/>
          <ShowLatestProducts/>
        </div>
      </Container>
      <Footer/>
    </>
  );
}
