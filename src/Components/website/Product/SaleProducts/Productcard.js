import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

export default function Productcard(props) {
    const roundStars = Math.round(props.rating)
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={solid} />
  ));

  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} />
  ));
  return (
    <div className={`col-lg-${props.col} col-md-6 col-12`}>
      <div className="m-1 border rounded p-3 h-100 d-flex flex-column justify-content-between">
        <div>
          <p className="text-truncate" style={{ color: "gray" }}>
            {props.title}
          </p>
          <p className="text-truncate">{props.description}</p>
        </div>
        <div className="px-5 py-4 position-relative">
          {props.sale && (
            <p
              className="m-0 position-absolute top-0 start-0 rounded-circle text-white text-uppercase d-inline-block text-center"
              style={{ width: "50px", height: "50px", lineHeight: "50px", backgroundColor:"#0A9066" }}
            >
              Sale
            </p>
          )}
          <div
            alt=""
            className="w-100"
            style={{
              backgroundImage: `url('${props.img}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "170px",
              width: "100%",
            }}
          ></div>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-2">
          <div>
            {showGoldStars}
            {showEmptyStars}

            <div className="d-flex align-items-center gap-3">
              <h5 className="m-0" style={{color:"#0A9066"}}>{props.price} $</h5>
              <h6
                className="m-0"
                style={{ color: "red", textDecoration: "line-through" }}
              >
                {props.discount}$
              </h6>
            </div>
          </div>
          <div className="border p-2 rounded cursor-pointer" style={{cursor:"pointer"}}>
          <FontAwesomeIcon icon={faCartShopping} className="fa-1x" style={{color:"gray"}} />
          </div>
        </div>
      </div>
    </div>
  );
}
