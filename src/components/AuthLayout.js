import {
  TextField,
  Stack,
  Button,
  Typography,
  // Link,
} from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../slices/AuthSlice";
import validator from "validator";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/config";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#cccccc",
    },
    "&:hover fieldset": {
      borderColor: "#cccccc",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#cccccc",
    },
    "& input": {
      color: "#333333",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#212121",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#212121",
  },
  "& .MuiInputLabel-asterisk": {
    color: "#e74c3c",
  },
});

const CustomButton = styled(Button)({
  backgroundColor: "#FF5722",
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#E64A19",
  },
  borderRadius: "4px",
  padding: "10px 20px",
  textTransform: "none",
});

export default function AuthForm({ title, isLogin, linkText, linkHref }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, message } = useSelector((state) => state.auth);
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { username, email, password } = formValues;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = {};

    if (isLogin) {
      if (!username || !password) {
        newErrors.username = "Username and Password are required";
      }
      navigate('/');
    } else {
      if (!username || !password || !email) {
        newErrors.username = "All fields are required";
      }
      if (email && !validator.isEmail(email)) {
        newErrors.email = "Invalid email format";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (isLogin) {
      dispatch(LoginUser({ username, email, password }));
    } else {
      try {
        await axios.post(`${API_URL}auth/register`, {
          username,
          email,
          password,
        });
      } catch (error) {
        if (error.response) {
          setErrors({ backend: error.response.data.message });
        } else {
          setErrors({ backend: "An unexpected error occurred" });
        }
      }
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <CustomTextField
          id="username"
          name="username"
          label="Username"
          variant="outlined"
          onChange={handleChange}
          value={formValues.username}
          required
          fullWidth
          error={!!errors.username}
          helperText={errors.username}
        />
        {!isLogin && (
          <CustomTextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            onChange={handleChange}
            value={formValues.email}
            required
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
          />
        )}
        <CustomTextField
          id="password"
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          onChange={handleChange}
          value={formValues.password}
          required
          fullWidth
          error={!!errors.password}
          helperText={errors.password}
        />
      </Stack>
      <Stack className="button-group" sx={{ mt: 3 }}>
  <CustomButton
    variant="contained"
    onClick={handleSubmit}
    disabled={isLoading}
  >
    {isLoading ? "Loading..." : title}
  </CustomButton>
  <Button
    variant="outlined"
    href={linkHref}
    sx={{ textTransform: "none" }}
  >
    {linkText}
  </Button>
</Stack>
      <Typography sx={{ mt: 2, textAlign: 'center' }}>
        Forgot Password?
      </Typography>
      {isError && (
        <Typography variant="body2" color="red">
          {message}
        </Typography>
      )}
    </>
  );
}