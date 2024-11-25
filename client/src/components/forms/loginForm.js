import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { ToDoContext } from "../../views/App";
import * as yup from "yup"; // Use * as yup for validation schema
import {
  FormContainer,
  FormGroup,
  Button,
  Label,
  Input,
} from "../../styles/loginFormStyles";
import axios from "axios";

export const LoginForm = () => {
  const { setLogged } = useContext(ToDoContext);
  const history = useHistory();

  // Define the validation schema
  const validationSchema = yup.object({
    username: yup
      .string()
      .required("Username is required")
      .min(4, "Username must be at least 4 characters long"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
  });

  // Initialize formik with validation schema
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema, // Add the schema here
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          `http://localhost:5000/auth/login`,
          values
        );
        if (res.data.error) {
          alert(res.data.error);
        } else {
          sessionStorage.setItem("accessToken", res.data);
          setLogged(true);
          history.push("/ToDoLists");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred while logging in. Please try again.");
      }
    },
  });

  return (
    <FormContainer>
      <form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // Track focus loss for validation feedback
            value={formik.values.username} // Populate with formik value
            placeholder="Username123"
          />
          {formik.touched.username && formik.errors.username && (
            <div style={{ color: "red", marginTop: "0.5rem" }}>
              {formik.errors.username}
            </div>
          )}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // Track focus loss for validation feedback
            value={formik.values.password} // Populate with formik value
            placeholder="Password123"
          />
          {formik.touched.password && formik.errors.password && (
            <div style={{ color: "red", marginTop: "0.5rem" }}>
              {formik.errors.password}
            </div>
          )}
        </FormGroup>
        <FormGroup>
          <Button type="submit">Login</Button>
        </FormGroup>
        <FormGroup>If you don't have an account, register</FormGroup>
        <FormGroup>
          <Button type="button" onClick={() => history.push("/registration")}>
            Register
          </Button>
        </FormGroup>
      </form>
    </FormContainer>
  );
};
