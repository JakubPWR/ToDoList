import { React, useState, useEffect } from "react";
import { AddStyledForm } from "../styles/addFormStyles";
import { useHistory } from "react-router-dom";
import { toDo } from "../classes/toDoClass";
import axios from "axios";

export const AddNewTask = (e) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/ToDos").then((response) => {
      setData(response.data);
    });
  }, []);
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    let Id = data.length !== 0 ? data[data.length - 1].id + 1 : 0;
    const formData = new FormData(e.currentTarget);
    const name = formData.get("taskName");
    const Today = new Date();
    const fullDate = `${Today.getFullYear()}-${
      Today.getMonth() + 1
    }-${Today.getDate()}`;
    const newTask = new toDo(Id, name, fullDate, null, 0);
    axios
      .post("http://localhost:3001/ToDos", newTask)
      .then(() => {
        setData([...data, newTask]); // Add the new task to the local state
        history.push("/");
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  return <AddStyledForm submitFunction={handleSubmit} />;
};
