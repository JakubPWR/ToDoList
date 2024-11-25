import { React, useEffect, useContext } from "react";
import { AddStyledForm } from "../styles/addFormStyles";
import { useHistory } from "react-router-dom";
import { ToDoContext } from "../views/App";
import axios from "axios";

export const AddNewTask = () => {
  const { toDoData, setData, logged, currentToDoList } =
    useContext(ToDoContext);
  useEffect(() => {
    axios.get("http://localhost:5000/ToDos").then((response) => {
      setData(response.data);
    });
  }, []);
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("taskName");
    const Today = new Date();
    const fullDate = `${Today.getFullYear()}-${
      Today.getMonth() + 1
    }-${Today.getDate()}`;
    const newTask = {
      name: name,
      AddDate: fullDate,
      FinishDate: null,
      finished: 0,
      listId: currentToDoList,
    };
    axios
      .post("http://localhost:5000/ToDos", newTask, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        axios.get("http://localhost:5000/ToDos").then((response) => {
          setData(response.data);
        });
        history.push("/");
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };
  if (logged) {
    return <AddStyledForm submitFunction={handleSubmit} />;
  } else {
    history.push("/login");
  }
};
