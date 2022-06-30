import "../cartModalview/cartModalview.css";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
const CartModal = (props) => {
  const [data, setData] = useState(props.childata);
  const [num, setNum] = useState(1);
  console.log(setData);
  const goBack = () => {
    props.closeHandle();
  };
  const addFunc = () => {
    props.closeHandle();
    const details = {
      id: data[0].id,
      name: data[0].name,
      img: data[0].img,
      rate: data[0].rate * num,
      description: data[0].description,
      quantity: num,
    };
    props.cartFunc(details);
  };
  const incNum = (e) => {
    e.preventDefault();
    setNum(Number(num) + 1);
  };
  const decNum = (e) => {
    e.preventDefault();
    if (num > 1) {
      setNum(num - 1);
    }
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      show={true}
      centered
    >
      <Modal.Header className="headerModal">
        <Modal.Title>Product Details</Modal.Title>
        <button className="gobackButton" onClick={goBack}>
          Go back
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="modalConatiner">
          <div className="modalImage">
            <img src={data[0].img} className="card-img-top" alt="..." />
          </div>
          <div className="modalDetails">
            <div className="nameModal">
              <b>{data[0].name}</b>
            </div>
            <div className="priceModal">
              <b>Price : </b>${data[0].rate * num}
            </div>
            <div className="descriptionModal">
              <b>Description : </b>
              {data[0].description}
            </div>
            <div className="counterModal d-flex justify-content-center">
              <button className="counterbuttonModal" onClick={(e) => incNum(e)}>
                +
              </button>
              <b className="counterNum">{num}</b>
              <button className="counterbuttonModal" onClick={(e) => decNum(e)}>
                -
              </button>
            </div>
            <div className="addcartToModal d-flex justify-content-center">
              <button className="cartbuttonModal" onClick={addFunc}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CartModal;
