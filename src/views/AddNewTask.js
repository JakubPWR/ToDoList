import { React, useState } from "react";
import { AddStyledForm } from "../styles/addFormStyles";
import { useHistory } from "react-router-dom";
import { toDoList } from "../data/toDoList";
import { toDo } from "../classes/toDoClass";

export const AddNewTask = (e) => {
  const [data, setData] = useState(toDoList);
  const history = useHistory();
  const handleSubmit = (e) => {
    const Id = data[data.length - 1].id + 1;
    const formData = new FormData(e.currentTarget);
    const name = formData.get("taskName");
    const Today = new Date();
    const month = Today.getMonth() + 1;
    const year = Today.getFullYear();
    const date = Today.getDate();
    const fullDate = `${year}-${month}-${date}`;
    const newTask = new toDo(Id, name, fullDate);
    data.push(newTask);
    console.log(newTask);
    setData([...data]);
    history.push("/");
  };

  return <AddStyledForm submitFunction={handleSubmit} />;
};
