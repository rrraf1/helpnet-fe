import {
  TextField,
  Stack,
  Button,
  Typography,
  Link,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../slices/AuthSlice"; // Import LoginUser action
import logo from "../assets/helpnet-removebg.png";
import validator from "validator";
import axios from "axios";
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
  const { isLoading, isError, message } = useSelector((state) => state.auth);
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
  });
  const [errors, setErrors] = useState({});
  const { username, email, password, full_name } = formValues;

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
    } else {
      if (!username || !password || !full_name || !email) {
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
      dispatch(LoginUser({ username, email, password, full_name }));
    } else {
      try {
        await axios.post(`${API_URL}/auth/register`, {
          username,
          email,
          password,
          full_name
        })
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
    <Stack direction={"column"} spacing={3}>
      <Stack direction="row" justifyContent={"center"}>
        <img
          src={logo}
          alt="logo"
          style={{
            width: "100%",
            maxWidth: { xs: "60vw", sm: "40vw", md: "20vw" },
            height: "auto",
          }}
        />
      </Stack>
      <Divider />
      <Stack sx={{ width: "100%" }} spacing={3} mt={5}>
        <h2>{title}</h2>
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
            <>
              <CustomTextField
                id="full_name"
                name="full_name"
                label="Full Name"
                variant="outlined"
                onChange={handleChange}
                value={formValues.full_name}
                required
                fullWidth
                error={!!errors.full_name}
                helperText={errors.full_name}
              />
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
            </>
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
        <Stack direction="row" justifyContent="flex-end">
          <CustomButton
            variant="contained"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : title}
          </CustomButton>
        </Stack>
        <Stack direction="row" justifyContent="flex-end">
          <Typography variant="body2">
            {isLogin ? "New user? " : "Have an account? "}
            <Link href={linkHref} underline="always" variant="body2">
              {linkText}
            </Link>
          </Typography>
        </Stack>
        {isError && (
          <Typography variant="body2" color="red">
            {message}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
