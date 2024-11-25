import React, { useContext, useEffect, useState } from "react";
import {
  TableHeader,
  ToDoBodyStyle,
  TableHeaderTitle,
} from "../styles/toDoBodyStyles";
import { ToDoItem } from "../components/toDoItem";
import { useHistory } from "react-router-dom";
import { StyledButton, TabelHeaderButton } from "../styles/buttonStyles";
import { ToDoContext } from "../views/App";
import axios from "axios";

export const ToDoBody = () => {
  const {
    toDoData,
    FinishTask,
    deleteItemFunction,
    logged,
    currentToDoList,
    setData,
    setLogged,
    toDoListName,
  } = useContext(ToDoContext);
  const history = useHistory();
  const GetUser = () => {
    const authenticated = sessionStorage.getItem("accessToken");
    if (authenticated) {
      setLogged(true);
    }
  };
  const fetchToDoData = () => {
    if (currentToDoList === "") {
      return;
    }
    axios
      .get("http://localhost:5000/ToDos/byListId", {
        headers: {
          id: currentToDoList,
        },
      })
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching To-Do data:", error);
      });
  };

  useEffect(() => {
    fetchToDoData();
    GetUser();
  }, []);
  // useEffect(() => {
  //   fetchToDoData();
  //   GetUser();
  // }, [toDoData]);

  const editItemFunction = (id) => {
    history.push(`/Edit/${id}`);
  };
  const NavigateToFinished = () => {
    history.push("/FinishedTasks");
  };
  const NavigateToAddTask = () => {
    history.push("/AddNewTask");
  };
  if (!logged) {
    history.push("/ToDoLists");
  }
  return (
    <ToDoBodyStyle>
      <TableHeaderTitle>Welcome to {toDoListName}</TableHeaderTitle>
      <TableHeader>
        <TabelHeaderButton
          onClick={() => NavigateToFinished()}
          style={{ backgroundColor: "#e0582b" }}
        >
          Show finished
        </TabelHeaderButton>
        <TabelHeaderButton
          onClick={() => NavigateToAddTask()}
          style={{ backgroundColor: "green" }}
        >
          Add new Task
        </TabelHeaderButton>
      </TableHeader>
      {toDoData.map((item) => (
        <ToDoItem
          toDoData={item}
          key={item.id}
          EditItemFunction={() => editItemFunction(item.id)}
          DeleteFunction={() => deleteItemFunction(item.id)}
          FinishFunction={() => FinishTask(item.id)}
        />
      ))}
    </ToDoBodyStyle>
  );
};
