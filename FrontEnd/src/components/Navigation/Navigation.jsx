import logoBanner from "../../assets/images/argentBankLogo.webp";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../Redux/authSlice";

const Navigation = () => {
  const dispatch = useDispatch();
  const loginStore = useSelector((state) => state.login);
  const token = useSelector((state) => state.auth.token);
  if (token) {
  } else {
  }
  const handleRedirectHome = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };
  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logoBanner}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>

      <div className="login">
        {loginStore &&
          loginStore.userProfile &&
          loginStore.userProfile.userName && (
            <Link to="/user" className="userName">
              <i className="fa fa-user-circle"></i>
              <p>{loginStore.userProfile.userName}</p>
            </Link>
          )}
        {token ? (
          <NavLink
            className="main-nav-item"
            to="/"
            onClick={handleRedirectHome}
          >
            <i className="fa fa-sign-out"></i>
            Sign Out
          </NavLink>
        ) : (
          <NavLink className="main-nav-item" to="/signin">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
};
export default Navigation;
