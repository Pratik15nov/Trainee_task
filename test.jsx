<nav className="flex align-center">
  <div>
    <Link className="logo" to="/">
      <span>e</span>Commerce
    </Link>
  </div>
  <div>
    <div className="big-screens">
      <Link to="/">Home</Link>

      <div className="list_categories">
        <Link to="/">Categories</Link>
        <div className="dropdown_list">
          {categoriesData.map((card) => {
            return (
              <Link
                to={`/products?cid=${card._id}`}
                id={card._id}
                state={{ data: `${card._id}` }}
                onClick={() => handleClick(card._id)}
              >
                <p className="navlist">{card.categoryName}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <Link to="/products" state={{ data: "seeall" }}>
        Products
      </Link>

      <Link to="/cart">
        Cart{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-cart-check"
          viewBox="0 0 16 16"
        >
          <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
          <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        </svg>
        <span className="count badge badge-light">{count.length}</span>
      </Link>
      <Link to="/account" style={{ display: token ? "block" : "none" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-person-circle"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path
            fill-rule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
          />
        </svg>
      </Link>
      <Link
        onClick={logout}
        style={{ display: token ? "block" : "none" }}
        to="/login"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="24"
          fill="currentColor"
          class="bi bi-box-arrow-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
          />
          <path
            fill-rule="evenodd"
            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
          />
        </svg>
      </Link>

      <Link to="/register">
        <button
          className="button"
          style={{ display: token ? "none" : "block" }}
        >
          Register
        </button>
      </Link>

      <Link to="/login">
        <button
          className="button"
          style={{ display: token ? "none" : "block" }}
        >
          Log In
        </button>
      </Link>
    </div>
  </div>

  <div>
    <div className="ham_cart" onClick={() => pushPath()}>
      <span className="count">{count.length}</span>
      <svg
        className="svg"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" />
      </svg>
    </div>
    <input type="checkbox" id="hamburger-input" />
    <label id="hamburger-menu" htmlFor="hamburger-input">
      <div id="sidebar-menu">
        <ul>
          <li>
            <svg width="32" height="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z" />
            </svg>
          </li>
          <li>
            <Link to="/register">
              <button
                className="ham_btn btn_register"
                style={{ display: token ? "none" : "block" }}
              >
                Register
              </button>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <button
                className="ham_btn btn_login"
                style={{ display: token ? "none" : "block" }}
              >
                Log In
              </button>
            </Link>
          </li>
          <li>
            <Link to="/"> Home</Link>
          </li>
          <li>
            <Link to="/products"> Products</Link>
          </li>
          <li>
            <div className="cellview_list">
              <Link to="/">Categories</Link>
              <div className="cellview_dropdown">
                {categoriesData.map((card) => {
                  return (
                    <Link to={"./"} key={card.id}>
                      <p className="navlist">{card.categoryName}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </label>
  </div>
</nav>;
