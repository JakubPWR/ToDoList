import React from "react";
import { StyledLeftPanel } from "../styles/leftPanelStyles";
import { StyledButton } from "../styles/buttonStyles";

export const LeftPanel = () => {
  return (
    <StyledLeftPanel>
      <h1>Your's To Do Lists</h1>
      <StyledButton style={{ backgroundColor: "green" }}>
        Add new To Do List
      </StyledButton>
    </StyledLeftPanel>
  );
};
