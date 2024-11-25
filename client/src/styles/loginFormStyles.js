import { styled } from "styled-components";
export const FormContainer = styled.div`
  justify-content: space-evenly;
  font-size: medium;
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 500px;
  margin: auto;
  padding: 20px;
  border: 5px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const FormGroup = styled.div`
  padding-left: 250px;
  margin-bottom: 15px;
`;

export const Label = styled.label`
  font-size: 50px;
  margin-bottom: 7px;
  display: block;
`;

export const Input = styled.input`
  width: 50px;
  padding: 10px;
  font-size: 35px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
`;

export const Button = styled.button`
  padding: 10px;
  width: 250px;
  /* background-color: #007bff;
  color: white; */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;
