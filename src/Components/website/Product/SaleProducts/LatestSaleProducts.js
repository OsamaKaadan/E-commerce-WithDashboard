import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/ِAxios"
import { LatestSale } from "../../../../Api/Api";
import ProductCard from "../SaleProducts/Productcard";
import { Container } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

export default function LatestSaleProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${LatestSale}`)
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);
  const productsShow = products.map((product) => (
    <ProductCard
      title={product.title}
      description={product.description}
      img={product.images[0].image}
      sale
      price={product.price}
      discount={product.discount}
      rating={product.rating}
      col="3"
    />
  ));

  return (
    <Container className="mt-4 ">
      <h2 className="fw-medium text-center text-md-start text-bg-success rounded-2 p-2 ">Latest Sale Products</h2>
      <div className="d-flex align-items-stretch justify-content-center flex-wrap mt-1 pb-3 row-gap-2 bg-light p-2 rounded-3">
        {loading ? (
          <>
            <div className="col-lg-3 col-md-6 col-12 mx-2">
              <Skeleton height="300px" />
            </div>
            <div className="col-lg-3 col-md-6 col-12 mx-2">
              <Skeleton height="300px" />
            </div>
            <div className="col-lg-3 col-md-6 col-12 mx-2">
              <Skeleton height="300px" />
            </div>
          </>
        ) : (
          productsShow
        )}
      </div>
    </Container>
  );
}
