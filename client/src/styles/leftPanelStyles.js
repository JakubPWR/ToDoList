import { styled } from "styled-components";

export const StyledLeftPanel = styled.div`
  width: 250px; /* Fixed width for the left panel */
  height: 100vh; /* Full viewport height */
  background-color: #626665;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Optional shadow for styling */
  position: fixed; /* Fixes the panel to the viewport */
  top: 0;
  left: 0; /* Ensures it's anchored to the left side */
  z-index: 10; /* Keeps it above other content if needed */
`;
