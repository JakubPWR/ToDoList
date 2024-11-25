import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { ToDoContext } from "../../views/App";
import * as yup from "yup";
import {
  FormContainer,
  FormGroup,
  Button,
  Label,
  Input,
} from "../../styles/loginFormStyles";
import axios from "axios";

export const AddNewToDoListForm = () => {
  const history = useHistory();
  const { currentToDoList, setCurrentToDoList } = useContext(ToDoContext);

  // Define the validation schema
  const validationSchema = yup.object({
    toDoListName: yup
      .string()
      .required("To-Do List Name is required")
      .min(4, "To-Do List Name must be at least 4 characters long"),
  });

  // Initialize formik with validation schema
  const formik = useFormik({
    initialValues: {
      toDoListName: "",
    },
    validationSchema, // Add the schema here
    onSubmit: async (values) => {
      try {
        const jwt = sessionStorage.getItem("accessToken");
        const res = await axios.post(`http://localhost:5000/list/create`, {
          toDoListName: values.toDoListName, // Directly send the name
          jwt: jwt,
        });
        if (res.data.error) {
          alert(res.data.error);
        } else {
          history.push("/ToDoLists"); // Redirect on success
        }
      } catch (error) {
        console.error("Creation error:", error);
        alert("An occurred while creating the list. Please try again.");
      }
    },
  });

  return (
    <FormContainer>
      <form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <Label htmlFor="toDoListName">Name of the list</Label>
          <Input
            id="toDoListName"
            name="toDoListName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.toDoListName}
            placeholder="Today's to dos"
          />
          {formik.touched.toDoListName && formik.errors.toDoListName && (
            <div style={{ color: "red", marginTop: "0.5rem" }}>
              {formik.errors.toDoListName}
            </div>
          )}
        </FormGroup>
        <FormGroup>
          <Button type="submit">Create new list</Button>
        </FormGroup>
      </form>
    </FormContainer>
  );
};
