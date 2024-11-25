import React, { useContext } from "react";
import { AddNewToDoListForm } from "../components/forms/addNewToDoListForm";
import { ToDoContext } from "../views/App";
import { useHistory } from "react-router-dom";
export const AddNewToDoList = () => {
  const { logged } = useContext(ToDoContext);
  const history = useHistory();
  if (logged) {
    return <AddNewToDoListForm />;
  } else {
    history.push("/ToDoLists");
  }
};
