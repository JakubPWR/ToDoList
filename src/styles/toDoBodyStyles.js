import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /* Reset margins and padding for body and html */
  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100%;
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
  margin: auto;
  max-width: 800px;
  padding-top: 60px; /* Adjust based on header's height */
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  gap: 10px;
  font-weight: bold;
  padding: 10px;
  background-color: #807b77;
  border-bottom: 2px solid #ddd;
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 800px; /* Match ToDoBodyStyle’s max-width */
  z-index: 10;
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
