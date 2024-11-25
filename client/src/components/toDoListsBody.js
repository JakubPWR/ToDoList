import React, { useContext, useEffect, useState } from "react";
import {
  TableHeader,
  ToDoBodyStyle,
  TableHeaderTitle,
} from "../styles/toDoBodyStyles";
import { ToDoItem } from "./toDoItem";
import { useHistory } from "react-router-dom";
import { StyledButton, TabelHeaderButton } from "../styles/buttonStyles";
import { ToDoContext } from "../views/App";
import axios from "axios";
import { ToDoList } from "../components/toDoList";

export const ToDoListBody = () => {
  const { logged, currentToDoList } = useContext(ToDoContext);
  const [toDoLists, setToDoLists] = useState([]);
  const getOwnersToDoLists = () => {
    if (logged) {
      const jwt = sessionStorage.getItem("accessToken");
      axios
        .get("http://localhost:5000/auth/user", {
          headers: {
            jwt: jwt,
          },
        })
        .then(async (response) => {
          await axios
            .get("http://localhost:5000/list", {
              headers: { usersId: response.data },
            })
            .then((response) => {
              setToDoLists(response.data);
            });
        });
    }
  };
  useEffect(() => {
    getOwnersToDoLists();
  }, []);
  const history = useHistory();
  const NavigateToAddList = () => {
    if (!logged) {
      history.push("/login");
    } else history.push("/AddNewToDoList");
  };
  const NavigateToHomePage = () => {
    if (!logged) {
      history.push("/login");
    } else history.push("/");
  };
  return (
    <ToDoBodyStyle>
      <TableHeaderTitle>Your's to do lists</TableHeaderTitle>
      <TableHeader>
        <TabelHeaderButton
          onClick={() => NavigateToHomePage()}
          style={{ backgroundColor: "yellow" }}
        >
          Home
        </TabelHeaderButton>
        <TabelHeaderButton
          onClick={() => NavigateToAddList()}
          style={{ backgroundColor: "green" }}
        >
          Add new list
        </TabelHeaderButton>
      </TableHeader>
      {toDoLists.map((item) => (
        <ToDoList toDoListData={item} key={item.id} />
      ))}
    </ToDoBodyStyle>
  );
};
