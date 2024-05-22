import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/ِAxios"
import { Latest} from "../../../../Api/Api"
import ProductCard from "../../Product/SaleProducts/Productcard";
import Skeleton from "react-loading-skeleton";

export default function ShowLatestProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${Latest}`)
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
      col="6"
    />
  ));

  return (
    <div className="col-md-6 col-12">
      <div className="ms-md-2">
        <h1 className="text-center m-0 p-3 bg-success text-white">Recently added</h1>
        <div className="d-flex align-items-stretch justify-content-center flex-wrap mt-3 row-gap-2 mb-5">
          {loading ? (
            <>
              <div className=" col-md-6 col-12 mx-2">
                <Skeleton height="300px" />
              </div>
              <div className=" col-md-6 col-12 mx-2">
                <Skeleton height="300px" />
              </div>
              <div className=" col-md-6 col-12 mx-2">
                <Skeleton height="300px" />
              </div>
            </>
          ) : (
            productsShow
          )}
        </div>
      </div>
    </div>
  );
}
