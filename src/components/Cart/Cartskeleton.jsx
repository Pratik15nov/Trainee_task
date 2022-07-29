import Skeleton from "@mui/material/Skeleton";
import "./Cartskeleton.css"
const Cartskeleton = (props) => {
  return (
    <>
      <div className="container">
        <div className="mb-5 row">
          <div className="pe-xl-3 col-lg-8 card">
            <div className="cart mb-3">
              <div className="cart-body" />
              <div className="main-content">
                {/* <h4 className="main-heading main">Shopping Cart</h4> */}
                <Skeleton
                  variant="rectangular"
                  width={190}
                  height={33}
                  className="s1"
                  animation="wave"
                />
                <div className="text">
                  {/* <p>You have {cart.length} items in your cart.</p>{" "} */}
                  <Skeleton
                    variant="rectangular"
                    width={240}
                    height={25}
                    className="s2"
                    animation="wave"
                  />
                </div>
                <div>
                  {/* <button className="dbutton" type="button">
                    Remove All Products
                  </button> */}
                  <Skeleton
                    variant="rectangular"
                    width={85}
                    height={35}
                    className="s3"
                    animation="wave"
                  />
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-center row"></div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 main">
            <div className="mb-5 card">
              <div className="card-header">
                {/* <h6 className="mb-0">Order Summary</h6> */}
                <Skeleton
                  variant="rectangular"
                  width={128}
                  height={28}
                  className="s4"
                  animation="wave"
                />
              </div>
              <div className="py-4 card-body">
                {/* <p className="text-muted text-sm">
                  Shipping and additional costs are calculated based on values
                  you have entered.
                </p> */}
                <Skeleton
                  variant="rectangular"
                  width={128}
                  height={28}
                  className="s6"
                  animation="wave"
                />
                <table className="table card-text">
                  <tbody>
                    <tr>
                      {/* <th className="py-4">Order Subtotal</th> */}
                      <Skeleton
                        variant="rectangular"
                        width={128}
                        height={28}
                        className="s7"
                        animation="wave"
                      />
                      <td className="py-4 text-end text-muted">{/*  */}</td>
                    </tr>
                    <tr>
                      {/* <th className="py-4"></th> */}
                      <Skeleton
                        variant="rectangular"
                        width={128}
                        height={28}
                        className="s8"
                        animation="wave"
                      />
                      {/* <td className="py-4 text-end text-muted">
                       
                      </td> */}
                      <Skeleton
                        variant="rectangular"
                        width={128}
                        height={28}
                        className="s9"
                        animation="wave"
                      />
                    </tr>
                    <tr>
                      {/* <th className="py-4">Tax (SGST+ CGST)</th> */}
                      <Skeleton
                        variant="rectangular"
                        width={128}
                        height={28}
                        className="s10"
                        animation="wave"
                      />
                      {/* <td className="py-4 text-end text-muted">
                       
                      </td> */}
                      <Skeleton
                        variant="rectangular"
                        width={128}
                        height={28}
                        className="s11"
                        animation="wave"
                      />
                    </tr>
                    <tr>
                      {/* <th className="pt-4 border-0">Total</th> */}
                      <Skeleton
                        variant="rectangular"
                        width={128}
                        height={28}
                        className="s12"
                        animation="wave"
                      />
                      {/* <td className="pt-4 border-0 text-end h5 fw-normal">
                        &#x20b9;
                        {Total.toFixed(2)}
                        
                      </td> */}
                      <Skeleton
                        variant="rectangular"
                        width={128}
                        height={28}
                        className="s13"
                        animation="wave"
                      />
                    </tr>
                  </tbody>
                </table>
                {/* <p className="text-muted text-sm">
                  Final price and discounts will be determined at the time of
                  payment process
                  ing.
                </p> */}
                <Skeleton
                  variant="rectangular"
                  width={128}
                  height={28}
                  className="s14"
                  animation="wave"
                />
                <div className="overflow-hidden p-0 card-footer">
                  <div className="d-grid">
                    {/*  */}
                    <Skeleton
                      variant="rectangular"
                      width={128}
                      height={28}
                      className="s15"
                      animation="wave"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cartskeleton;
