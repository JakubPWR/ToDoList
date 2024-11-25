import styled from "styled-components";

export const StyledButton = styled.button`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  border: none;
  padding: 0;
  transition: 200ms;
  &:hover {
    cursor: pointer;
    box-shadow: 5px 5px 5px black;
  }
  &:active {
    box-shadow: none;
  }
`;

export const EditButton = styled.button`
  background-color: #484a49;
  height: 30px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px;
  border-radius: 20px;
  padding: 0;
  transition: 300ms;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: 5px 5px 5px black;
  }
  &:active {
    box-shadow: none; /* Remove shadow when clicked */
  }
`;
export const LeftPanelButton = styled.button`
  font-size: large;
  font-weight: bold;
  height: 50px;
  width: 250px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  border: none;
  padding: 0;
  transition: 200ms;
  margin-bottom: 20px;
  &:hover {
    cursor: pointer;
    box-shadow: 5px 5px 5px black;
  }
  &:active {
    box-shadow: none;
  }
`;
export const TabelHeaderButton = styled.button`
  font-size: large;
  font-weight: bold;
  height: 50px;
  width: 200px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  border: none;
  padding: 0;
  transition: 200ms;
  &:hover {
    cursor: pointer;
    box-shadow: 5px 5px 5px black;
  }
  &:active {
    box-shadow: none;
  }
`;
