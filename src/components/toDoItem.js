import React from "react";
import { StyledButton, EditButton } from "../styles/buttonStyles";
import { ReactComponent as CircleIcon } from "../icons/circle.svg";
import { TableRow } from "../styles/toDoBodyStyles";
import { StyledButtonContainer } from "../styles/buttonContainerStyles";

export const ToDoItem = ({
  toDoData: { id, name, AddDate, FinishDate, finished },
  NavigateToEditFunction,
  DeleteFunction,
  FinishFunction,
}) => {
  return (
    <TableRow>
      <StyledButton
        onClick={() => FinishFunction({ id })}
        style={{ backgroundColor: finished ? "green" : "red" }}
      />
      <div>
        <h4>Task name:</h4> {name}
      </div>
      <div>
        <h4>Added at:</h4> {AddDate}
      </div>
      <div>
        <h4>{finished ? `Finished at: ${FinishDate}` : "Not finished"}</h4>
      </div>
      <div>
        <h4>Completed: </h4>
        {finished ? "Yes" : "No"}
      </div>
      <StyledButtonContainer>
        <EditButton onClick={() => NavigateToEditFunction({ id })}>
          Edit
        </EditButton>
        <EditButton onClick={() => DeleteFunction({ id })}>Delete</EditButton>
      </StyledButtonContainer>
    </TableRow>
  );
};
