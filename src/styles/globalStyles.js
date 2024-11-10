import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /* Reset margins, padding, and set box-sizing for the whole document */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow-x: hidden; /* Prevents horizontal scroll if any */
    font-family: Arial, sans-serif;
  }
`;
