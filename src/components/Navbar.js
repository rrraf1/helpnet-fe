import { useNavigate } from "react-router-dom";
import { checkLogin } from "../slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);

  const { user } = useSelector((state) => state.auth);
  const Login = () => {
    navigate("/login");
  };
  const LogoClick = () => {
    navigate("/");
  };

  const Register = () => {
    navigate("/register");
  };
  return (
    <nav className="auth-nav">
      <div className="logo" onClick={LogoClick}>
        <h2>AnonyMood.</h2>
      </div>
      {!user && (
        <div className="auth-text">
          <p onClick={Login}>Login</p> <p>/</p>
          <p onClick={Register}> Register</p>
        </div>
      )}
    </nav>
  );
}
