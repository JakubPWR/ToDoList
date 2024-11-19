import React, { useContext } from "react";
import { StyledButton, EditButton } from "../styles/buttonStyles";
import { TableRow } from "../styles/toDoBodyStyles";
import { StyledButtonContainer } from "../styles/buttonContainerStyles";

export const ToDoItem = ({
  toDoData: { id, name, AddDate, FinishDate, finished },
  DeleteFunction,
  FinishFunction,
  EditItemFunction,
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
        <EditButton onClick={() => EditItemFunction(id)}>Edit</EditButton>
        <EditButton onClick={() => DeleteFunction(id)}>Delete</EditButton>
      </StyledButtonContainer>
    </TableRow>
  );
};
