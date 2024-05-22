import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/ِAxios";
import { TopRatedApi } from "../../../../Api/Api";
import TopRated from "./TopRated";
import Skeleton from "react-loading-skeleton";

export default function ShowTopRated() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${TopRatedApi}`)
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);
  const productsShow = products.map((product) => (
    <TopRated
      title={product.title}
      description={product.description}
      img={product.images[0].image}
      sale
      price={product.price}
      discount={product.discount}
      rating={product.rating}
    />
  ));

  return (
    <div className="col-md-6 col-12" style={{ border: "1px solid gray" }}>
      <h1 className="text-center m-0 p-3 bg-success p-2 text-white ">Top Rated</h1>
      <div className="p-5">
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
  );
}
