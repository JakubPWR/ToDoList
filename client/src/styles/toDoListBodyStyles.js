import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /* Reset margins and padding for body and html */
  html, body {
    display: flex; /* Flexbox layout */
    justify-content: center; /* Center content horizontally */
    align-items: flex-start; /* Align content at the top */
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%; /* Full height of the viewport */
  }

  /* Make sure all elements inherit box-sizing */
  *, *::before, *::after {
    box-sizing: inherit;
  }
`;

export const ToDoBodyStyle = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  margin: 20px 0; /* Add top margin for spacing */
  max-width: 800px;
  padding: 20px; /* Padding inside the content */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for aesthetics */
  border-radius: 8px; /* Optional rounded corners */
`;
export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* Center the title */
  align-items: center; /* Vertically align items in the middle of the header */
  justify-items: center; /* Horizontally center items */
  padding: 10px;
  background-color: #807b77;
  border-bottom: 2px solid #ddd;
  width: 100%;
  z-index: 10;

  /* Optional height and shadow for aesthetic */
  min-height: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const TableHeaderTitle = styled.div`
  grid-column: 2; /* Place the title in the middle column */
  text-align: center; /* Ensure text is centered */
  font-size: 1.5rem; /* Adjust font size */
  font-weight: bold;
  color: black; /* Color for better contrast */
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 2fr 1fr;
  gap: 10px;
  padding: 10px;
  align-items: center;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;
