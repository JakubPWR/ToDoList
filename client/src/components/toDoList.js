import React, { useContext } from "react";
import { StyledButton, EditButton } from "../styles/buttonStyles";
import { TableRow } from "../styles/toDoListBodyStyles";
import { ToDoContext } from "../views/App";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const ToDoList = ({ toDoListData: { id, name } }) => {
  const { setCurrentToDoList, setToDoListName } = useContext(ToDoContext);
  const history = useHistory();
  const selectCurrentToDoList = async (id) => {
    await axios
      .get("http://localhost:5000/list/byId", {
        headers: {
          listId: id,
        },
      })
      .then((response) => {
        setCurrentToDoList(response.data.id);
        setToDoListName(response.data.name);
        history.push("/");
      });
  };
  return (
    <TableRow>
      <StyledButton onClick={() => selectCurrentToDoList(id)} />
      <h4>List name:</h4> {name}
      <h3>List id:</h3> {id}
    </TableRow>
  );
};
