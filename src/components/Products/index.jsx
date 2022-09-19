import "../Products/product.css";
import { URL } from "../../utils/helper";
const Products = (props) => {
  const passtoParent = () => {
    props.parentFunc();
    props.takeData(props.card);
  };
  return (
    <div className="cardView">
      {props.card.quantity < 11}
      <span class=" text instock">In Stock</span>
      <span class=" text outofstock">Out of Stock</span>
      <span class=" text lowstock">Low Stock</span>
      <img
        src={URL + props.card.img}
        className="card-img-top"
        alt={props.card.name}
      />
      <div className="div1">
        <h4 style={{ textAlign: "center" }} className="text">
          {props.card.name}
        </h4>
      </div>
      <div className="div1">
        <h6 style={{ textAlign: "center" }} className="text">
          Specification: {props.card.specification}
        </h6>
      </div>

      <div className="div3">
        <div className="div4">
          <b className="text">&#x20b9;{props.card.discountPrice}</b>
          <p className="text">
            M.R.P.:
            <span>
              &#x20b9;<del>{props.card.price}</del>
            </span>
          </p>
        </div>
        <div className="div5">
          <button className="BuyButton text" onClick={(e) => passtoParent(e)}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
