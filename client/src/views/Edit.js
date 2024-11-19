import { React, useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { StyledForm } from "../styles/editFormStyles";
import { ToDoContext } from "../views/App";
import axios from "axios";

export const Edit = () => {
  const { toDoData, setData } = useContext(ToDoContext);
  const { itemId } = useParams();
  const [toDoItem, setToDoItem] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/ToDos/byId/${itemId}`)
      .then((res) => {
        setToDoItem(res.data);
      })
      .catch((err) => {
        console.error("Error fetching the todo item:", err);
      });
  }, [itemId]);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("taskName");
    const addDate = formData.get("addDate");
    const finishDate = formData.get("finishDate");
    const update = {
      id: itemId,
      name: name,
      AddDate: addDate,
      FinishDate: finishDate,
    };
    axios
      .patch(`http://localhost:5000/ToDos/edit/${itemId}`, update)
      .then(async () => {
        axios.get("http://localhost:5000/ToDos").then((response) => {
          setData(response.data);
        });
      });
    history.push("/");
  };
  if (!toDoItem) {
    return <div>Loading...</div>;
  }

  return <StyledForm object={toDoItem} submitFunction={handleSubmit} />;
};
