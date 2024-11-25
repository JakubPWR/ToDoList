import React, { useContext, useEffect } from "react";
import { TableHeader, ToDoBodyStyle } from "../styles/toDoBodyStyles";
import { ToDoItem } from "../components/toDoItem";
import { useHistory } from "react-router-dom";
import { StyledButton } from "../styles/buttonStyles";
import { ToDoContext } from "../views/App";
import axios from "axios";

export const FinishedTasks = ({ DeleteItem }) => {
  const { finishedToDoData, setFinishedToDoData, logged, currentToDoList } =
    useContext(ToDoContext);
  const history = useHistory();
  useEffect(() => {
    const jwt = sessionStorage.getItem("accessToken");
    axios
      .get("http://localhost:5000/auth/user", {
        headers: {
          jwt: jwt,
        },
      })
      .then((response) => {
        axios
          .get("http://localhost:5000/ToDos/finished", {
            headers: { id: currentToDoList },
          })
          .then((response) => {
            setFinishedToDoData(response.data);
          });
      });
  }, []);
  const NavigateToHomePage = () => {
    history.push("/");
  };
  if (!logged) {
    history.push("/login");
  } else if (finishedToDoData.length === 0) {
    return (
      <ToDoBodyStyle>
        <TableHeader>
          You have 0 finished tasks yet{" "}
          <StyledButton
            onClick={() => NavigateToHomePage()}
            style={{ backgroundColor: "#e0582b" }}
          >
            Home Page
          </StyledButton>
        </TableHeader>
      </ToDoBodyStyle>
    );
  } else {
    return (
      <ToDoBodyStyle>
        <TableHeader>
          Finished Tasks{" "}
          <StyledButton
            onClick={() => NavigateToHomePage()}
            style={{ backgroundColor: "#e0582b" }}
          >
            Home Page
          </StyledButton>
        </TableHeader>
        {finishedToDoData.map((item) => (
          <ToDoItem
            toDoData={item}
            key={item.id}
            DeleteFunction={() => DeleteItem(item.id)}
          />
        ))}
      </ToDoBodyStyle>
    );
  }
};
