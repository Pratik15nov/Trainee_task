import "../Products/product.css";
import { URL } from "../../utils/helper";
const Products = (props) => {
  const passtoParent = () => {
    props.parentFunc();
    props.takeData(props.card);
  };
  return (
    <div className="cardView">
      <img
        src={URL + props.card.img}
        className="card-img-top"
        alt={props.card.name}
      />
      <div className="div1">
        <h4 style={{ textAlign: "center" }}>{props.card.name}</h4>
      </div>
      <div className="div1">
        <h6 style={{ textAlign: "center" }}>
          Specification: {props.card.specification}
        </h6>
      </div>

      <div className="div3">
        <div className="div4">
          <b>Price: Rs.{props.card.price}</b>
          <p>Discount Price: Rs.{props.card.discountPrice}</p>
        </div>
        <div className="div5">
          <button className="BuyButton" onClick={(e) => passtoParent(e)}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
