import { React, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { toDoList } from "../data/toDoList";
import { StyledForm } from "../styles/editFormStyles";

export const Edit = () => {
  const { itemId } = useParams();
  const [data, setData] = useState(toDoList);
  const toDoArr = data.filter((e) => {
    return e.id == itemId;
  });
  const Item = toDoArr[0];
  const history = useHistory();
  const [toDoItem, setToDoItem] = useState(Item);
  const handleSubmit = (e) => {
    const formData = new FormData(e.currentTarget);
    const name = formData.get("taskName");
    const addDate = formData.get("addDate");
    const finishDate = formData.get("finishDate");
    const index = data.findIndex((e) => {
      return e.id == itemId;
    });
    data[index].name = name;
    data[index].AddDate = addDate;
    data[index].FinishDate = finishDate;

    setData([...data]);
    history.push("/");
  };
  return <StyledForm object={toDoItem} submitFunction={handleSubmit} />;
};
