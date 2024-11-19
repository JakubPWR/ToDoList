import React, { useContext } from "react";
import { TableHeader, ToDoBodyStyle } from "../styles/toDoBodyStyles";
import { ToDoItem } from "../components/toDoItem";
import { useHistory } from "react-router-dom";
import { StyledButton } from "../styles/buttonStyles";
import { ToDoContext } from "../views/App";

export const ToDoBody = () => {
  const { toDoData, FinishTask, deleteItemFunction } = useContext(ToDoContext);
  const history = useHistory();
  const editItemFunction = (id) => {
    history.push(`/Edit/${id}`);
  };
  const NavigateToFinished = () => {
    history.push("/FinishedTasks");
  };
  const NavigateToAddTask = () => {
    history.push("/AddNewTask");
  };
  return (
    <ToDoBodyStyle>
      <TableHeader>
        Welcome to ToDoList{" "}
        <StyledButton
          onClick={() => NavigateToFinished()}
          style={{ backgroundColor: "#e0582b" }}
        >
          Show finished
        </StyledButton>
        <StyledButton
          onClick={() => NavigateToAddTask()}
          style={{ backgroundColor: "green" }}
        >
          Add new Task
        </StyledButton>
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
