import "../Products/product.css";
// import {EventEmitter} from "../utils/EventEmitter";

const Products = (props) => {
  const passtoParent = () => {
    props.parentFunc();
    props.takeData(props.card);
    // fireCall()
  };

  // const fireCall = () => {
  //   EventEmitter.emit("addProduct", {
  //     text: "HELLOW",
  //   });
  // };

  return (
    <div className="cardView">
      <img
        src={props.card.img}
        className="card-img-top"
        alt={props.card.name}
      />
      <div className="div1">
        <h4 style={{ textAlign: "center" }}>{props.card.name}</h4>
      </div>
      <div className="div3">
        <div className="div4">
          <b>Price: ${props.card.rate}</b>
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
