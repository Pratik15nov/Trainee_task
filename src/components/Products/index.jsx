import "../Products/product.css";

const Products = (props) => {
  const passtoParent = () => {
    props.parentFunc();
    props.takeData(props.card);
  };

  return (
    <div className="cardView">
      <img src={props.card.img} className="card-img-top" alt="..." />
      <div className="div1">
        <h4 style={{ textAlign: "center" }}>{props.card.name}</h4>
      </div>
      <div className="div3">
        <div className="div4">
          <b>
            {" "}
            Price:{""} ${props.card.rate}
          </b>
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
