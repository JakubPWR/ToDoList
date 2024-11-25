import React from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup"; // Import yup for validation
import {
  FormContainer,
  FormGroup,
  Button,
  Label,
  Input,
} from "../../styles/loginFormStyles";
import axios from "axios";

export const RegisterForm = () => {
  const history = useHistory();

  // Validation schema
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

  // Formik setup with validation schema
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema, // Apply validation schema
    onSubmit: (values) => {
      axios
        .post(`http://localhost:5000/auth/register`, values)
        .then((res) => console.log(res))
        .then(() => history.push("/"));
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
            onBlur={formik.handleBlur} // Blur event for validation feedback
            value={formik.values.username}
            placeholder="Username123"
          />
          {/* Display validation error for username */}
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
            onBlur={formik.handleBlur} // Blur event for validation feedback
            value={formik.values.password}
            placeholder="Password123"
          />
          {/* Display validation error for password */}
          {formik.touched.password && formik.errors.password && (
            <div style={{ color: "red", marginTop: "0.5rem" }}>
              {formik.errors.password}
            </div>
          )}
        </FormGroup>
        <FormGroup>
          <Button type="Submit" onClick={() => history.push("/registration")}>
            Register
          </Button>
        </FormGroup>
      </form>
    </FormContainer>
  );
};
