import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import ModalForm from "../components/ModalForm"; // Update the path
import Header from "../components/Header";
import axios from "axios";

const Board = ({ onClose, onCardSubmit, onSubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const handleAddTaskClick = () => {
    setIsModalOpen(true);
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddTask = async (newTask) => {
    fetchTasks();
  };

  const handleDragOver = (ev) => {
    ev.preventDefault();
  };

  const handleDragStart = (ev, name) => {
    ev.dataTransfer.setData("id", name);
  };

  const handleDrop = (ev, cat) => {
    const taskId = ev.dataTransfer.getData("id");
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, category: cat } : task
    );
    setTasks(updatedTasks);
  };

  const TaskColumn = ({ title, tasks, onDragOver, onDrop, category }) => (
    <Column
      className="drop-area"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, category)}
    >
      <Title>{title}</Title>
      {tasks.map((task) => (
        <Card
          key={task._id}
          draggable
          onDragStart={(e) => handleDragStart(e, task._id)} // Pass the task's _id
        >
          <CardName>{task.title}</CardName>
          <CardDis>{task.description}</CardDis>
          <CardWorker>
            <Worker>Worker:</Worker>{" "}
            {task.category === "ToDo"
              ? "ToDo"
              : task.category === "Doing"
              ? "Doing"
              : "Done"}
          </CardWorker>
          <CardDate>
            <Date>Date:</Date> {task.date}
          </CardDate>
          <SubtaskTitil>

          {task.subtasks && task.subtasks.length > 0 && (
            <SubtaskList>subtasks:
              {task.subtasks.map((subtask, index) => (
                <SubtaskItem key={index}>
                  <span>{subtask.title}</span>
                </SubtaskItem>
              ))}
            </SubtaskList>
          )}
                    </SubtaskTitil>

        </Card>
        
      ))}
    </Column>
  );

  return (
    <GigaContainer>
      <Header onAddTaskClick={handleAddTaskClick} />
      <Container>
        <InputWrapper></InputWrapper>
        {isModalOpen && (
          <Modal open={isModalOpen} onClose={handleModalClose}>
            <ModalForm onClose={handleModalClose} onSubmit={handleAddTask} />
          </Modal>
        )}

        <TaskColumn
          title="ToDo"
          tasks={tasks.filter((task) => task.category === "ToDo")}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          category="ToDo"
        />
        <TaskColumn
          title="Doing"
          tasks={tasks.filter((task) => task.category === "Doing")}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          category="Doing"
        />
        <TaskColumn
          title="Done"
          tasks={tasks.filter((task) => task.category === "Done")}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          category="Done"
        />
      </Container>
    </GigaContainer>
  );
};

const GigaContainer = styled.div`
  margin-top: 2vw;
  padding-left: 5vw;
`;
const Container = styled.div`
  /* background-color: red; */
  display: flex;
  width: 80vw;
  justify-content: space-around;
`;
const Column = styled.div`
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  margin-right: 12px;
  min-height: 40px;
  width: 25%;
  background-color: #f4f5f7;
  color: black;
`;
const Input = styled.div`
  background-color: #fff;
  border: none;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 45, 66, 0.25);
  color: #172b4d;
  font-size: 14px;
  padding: 8px;
  width: 100%;
`;
const Add = styled.input`
  background-color: #ebecf0;
  border-radius: 3px;
  border: none;
  color: #6b808c;
  font-size: 14px;
  padding: 8px;
  text-align: left;
  width: 100%;
`;
const Remove = styled.div`
  height: 100%;
  min-height: 100px;
  padding: 8px;
  transition: background-color 0.2s ease, border 0.2s ease;
  background-color: #f4f5f7;
  color: black;
  border-radius: 3px;
`;

const Title = styled.h1`
  font-family: arial;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  text-align: center;
`;
const Card = styled.div`
  /* background-color: red; */
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 45, 66, 0.25);
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 20px;
  position: relative;
  z-index: 0;
  /* margin: 30px; */
`;
const CardName = styled.div`
  font-weight: bold;
  font-size: 2vw;
  /* padding: 8px; */
  color: black;
  margin-left: 12px;
  margin-bottom: 12px;
`;
const CardDis = styled(CardName)`
  color: gray;
  font-size: 1.2vw;
  margin-left: 12px;
  margin-bottom: 30px;
`;
const CardWorker = styled.div`
  display: flex;
  margin-left: 12px;
  color: gray;
  gap: 10px;
  margin-bottom: 12px;
`;
const CardDate = styled(CardWorker)`
  color: gray;
  margin-left: 12px;
  display: flex;
`;
const Urgency = styled.div`
  width: 30%;
  height: 8px;
  border-radius: 20px;
  margin-left: 12px;
  margin-top: 12px;
  margin-bottom: 10px;
`;

const Worker = styled.div`
  font-weight: bold;
`;

// input
const Date = styled.div`
  font-weight: bold;
`;

// input

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const InputLabel = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  color: black;
`;

const InputField = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin-bottom: 10px;
  color: black;
`;

const SelectField = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin-bottom: 10px;
`;
const SubtaskList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const SubtaskItem = styled.li`
  margin: 4px 0;
  display: flex;
  align-items: center;
`;
const SubtaskTitil = styled.li`
font-weight: bold;
color: gray;
margin-left: 12px;
display: flex;
`;

export default Board;
