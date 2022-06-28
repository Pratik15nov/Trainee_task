import { useState } from "react";
import "../Products/product.css";
import { Modal, Button } from "react-bootstrap";


const Products = (props) => {
  const [num, setNum] = useState(1);
  const [price, setPrice] = useState(props.card.rate);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const incNum = () => {
    setNum(Number(num) + 1);
    console.log(setPrice);
  };
  const decNum = () => {
    if (num > 1) {
      setNum(num - 1);
    }
  };
  const handleChange = (e) => {
    setNum(e.target.value);
  };

  return (
    <div>
      <div className="cardView">
        <img src={props.card.img} className="card-img-top" alt="..." />

        <div className="div1">
          <h4 style={{ textAlign: "center" }}>{props.card.name}</h4>
        </div>
        <div className="d-flex justify-content-center">
          <button className="CounterButton" onClick={incNum}>
            +
          </button>
          <b style={{ margin: "2%" }} onChange={handleChange}>
            {num}
          </b>
          <button className="CounterButton" onClick={decNum}>
            -
          </button>
        </div>

        <div className="div3">
          <div className="div4">
            <b>
              {" "}
              Price:{""} ${price}
            </b>
          </div>
          <div className="div5">
            <button className="BuyButton" onClick={handleShow}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {show && (
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={handleClose}
        >
          <Modal.Header className="headerModal  " closeButton>
            <Modal.Title >Product Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modalConatiner">
               <div className="modalImage">
                <img src={props.card.img} className="card-img-top" alt="..." />
                 </div>
                 <div className="modalDetails">
                    <div   className="nameModal">
                  <b>{props.card.name}{" "}</b>
                    </div>
                    <div   className="priceModal">
                  <b>Price : </b>${props.card.rate}
                    </div>
                    <div   className="descriptionModal">
                 <b>Description : </b>{props.card.description}{" "}
                    </div>
                    <div className="counterModal d-flex justify-content-center" >
                       <button className="counterbuttonModal" >+</button>
                       <b  className="counterNum" >{num}</b>
                       <button className="counterbuttonModal"  >-</button>
                    </div>
                    <div className="addcartToModal d-flex justify-content-center "  >
                       <button  className="cartbuttonModal" onClick={handleClose} >Add to Cart</button>
                    </div>
                
              </div>
            </div>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer> */}
        </Modal>
      )}
    </div>
  );
};

export default Products;
