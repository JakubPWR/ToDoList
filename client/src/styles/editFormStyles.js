import { styled } from "styled-components";
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px;
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

export const StyledForm = ({
  object: { id, name, AddDate, FinishDate, finished },
  submitFunction,
}) => {
  return (
    <FormContainer onSubmit={submitFunction}>
      <FormGroup>
        <Label htmlFor="taskName">Task Name</Label>
        <Input
          type="text"
          id="taskName"
          name="taskName"
          placeholder="Enter task name"
          defaultValue={name}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="addDate">Added Date</Label>
        <Input
          type="date"
          id="addDate"
          name="addDate"
          defaultValue={AddDate}
          required
        />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </FormContainer>
  );
};
