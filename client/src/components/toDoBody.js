import React from "react";
import { TableHeader, ToDoBodyStyle } from "../styles/toDoBodyStyles";
import { ToDoItem } from "../components/toDoItem";
import { useHistory } from "react-router-dom";
import { StyledButton } from "../styles/buttonStyles";

export const ToDoBody = ({ toDoData, DeleteItem, AddTask, FinishFunction }) => {
  const history = useHistory();
  const NavigateToEdit = (id) => {
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
          NavigateToEditFunction={() => NavigateToEdit(item.id)}
          DeleteFunction={() => DeleteItem(item.id)}
          FinishFunction={() => FinishFunction(item.id)}
        />
      ))}
    </ToDoBodyStyle>
  );
};
