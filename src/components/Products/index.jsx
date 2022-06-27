import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import "../Products/product.css";
const Products = (props) => {
  const [num, setNum] = useState(0);
  const [rate, setRate] = useState(props.card.rate);
<<<<<<< HEAD
  console.log(setRate)
=======
>>>>>>> bfcee15b7362b85ef272f05f95a203b08a201085

  const incNum = () => {
    setNum(Number(num) + 1);
  };
  const decNum = () => {
    if (num > 0) {
      setNum(num - 1);
    }
  };
  const handleChange = (e) => {
    setNum(e.target.value);
  };

  return (
    <div class="cardView">
      <img src={props.card.img} class="card-img-top" alt="..." />
      <div class="card-body" >
        <h4 class="card-title">{props.card.name}</h4>
        {/* <p class="card-text">{props.card.description}</p> */}
      </div>

      
      <ul class="list-group list-group-flush"  style={{borderRadius:'10px'}} >
        <li class="list-group-item">
          <b>
            {" "}
            Price:{""} ${rate}
          </b>
        </li>
        {/* <li class="list-group-item">
          <b>
            <p onChange={handleChange}>
              {""} {num}{" "}
            </p>
          </b>
        </li> */}
        <li class="list-group-item">
          <button className="CounterButton" onClick={incNum}>
            +
          </button>
          <b  onChange={handleChange} >{num}</b>
          <button className="CounterButton" onClick={decNum}>
            -
          </button>
          <button className="BuyButton">Buy</button>
        </li>
      </ul>
    </div>
  );
};

export default Products;


// <div class="cardView">
//       <img src={props.card.img} class="card-img-top" alt="..." />
//       <div class="card-body" >
//         <h4 class="card-title">{props.card.name}</h4>
//         {/* <p class="card-text">{props.card.description}</p> */}
//       </div>
//       <ul class="list-group list-group-flush"  style={{borderRadius:'10px'}} >
//         <li class="list-group-item">
//           <b>
//             {" "}
//             Price:{""} ${rate}
//           </b>
//         </li>
//         <li class="list-group-item">
//           <b>
//             <p onChange={handleChange}>
//               Quantity: {""} {num}{" "}
//             </p>
//           </b>
//         </li>
//         <li class="list-group-item">
//           <button className="CounterButton" onClick={incNum}>
//             +
//           </button>

//           <button className="CounterButton" onClick={decNum}>
//             -
//           </button>
//           <button className="BuyButton">Buy</button>
//         </li>
//       </ul>
//     </div>