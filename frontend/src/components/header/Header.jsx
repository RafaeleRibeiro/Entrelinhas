import "./Header.css";

const Header = () => {
  return (
    <header className="row w-100 flex-nowrap">
      <div className="col-10 col-md d-flex justify-content-center align-items-center">
        <h1 className="fonteLogo ms-5 ps-5">Entrelinhas</h1>
      </div>

      <div className=" col-md-1 d-flex">
        <a className="btn p-1 bg-transparent btn-lg color-redev" href="#">
          <i className="bi bi-cart-plus fs-3"></i>
        </a>
        <a className="btn p-1 bg-transparent btn-lg color-redev" href="/login">
          <i className="bi bi-person fs-3"></i>
        </a>
      </div>
    </header>
  );
};

export default Header;
