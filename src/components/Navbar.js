import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkLogin, logOut } from "../slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoText, setLogoText] = useState("AnonyMood.");
  const [blurOpacity, setBlurOpacity] = useState(0);
  const fullLogoText = "AnonyMood.";
  const shortLogoText = "AM.";

  useEffect(() => {
    dispatch(checkLogin());

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 200;

      if (scrollPosition <= maxScroll) {
        const charsToShow = Math.max(
          2,
          Math.floor(
            (maxScroll - scrollPosition) / (maxScroll / fullLogoText.length)
          )
        );
        setLogoText(
          fullLogoText.slice(0, charsToShow) +
            shortLogoText.slice(charsToShow - 2)
        );
        setBlurOpacity(scrollPosition / maxScroll);
      } else {
        setLogoText(shortLogoText);
        setBlurOpacity(1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);

  const LogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  const { user } = useSelector((state) => state.auth);
  const Login = () => navigate("/login");
  const LogoClick = () => navigate("/");
  const Register = () => navigate("/register");

  return (
    <nav className="auth-nav">
      <div className="nav-blur" style={{ opacity: blurOpacity }}></div>
      <div className="nav-content">
        <div className="logo" onClick={LogoClick}>
          <h2>{logoText}</h2>
        </div>
        {!user ? (
          <div className="auth-text">
            <p onClick={Login}>Login</p> <p>/</p>
            <p onClick={Register}> Register</p>
          </div>
        ) : (
          <div className="auth-text">
            <p onClick={LogOut}>Logout</p>
          </div>
        )}
      </div>
    </nav>
  );
}
