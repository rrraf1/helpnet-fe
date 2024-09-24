import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import FirstPage from "./pages/FirstPage";
import { checkLogin } from "./slices/AuthSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);

  const { user } = useSelector((state) => state.auth);
  return (
    <Router>
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<FirstPage />} />
            <Route path="*" element={<FirstPage />} />
          </>
        ) : (
          <>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<FirstPage />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
