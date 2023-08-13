import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import axios from "axios";

const InputCheckbox = ({ isChecked, setChecked, label }) => {
  return (
    <label className="mb-0 flex items-center cursor-pointer">
      <div className="mr-2 bg-slate-300/[.5] dark:bg-slate-800 w-5 h-5 rounded-full grid place-items-center border border-slate-300 dark:border-slate-700">
        {isChecked && (
          <span className="bg-rose-500 w-2 h-2 block rounded-full"></span>
        )}
      </div>
      <br />
      <span className="order-1 flex-1">{label}</span>
      <InputField
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        onChange={() => setChecked((prev) => !prev)}
      />
    </label>
  );
};

const ModalForm = ({ onClose, onSubmit }) => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setcategory] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [showSubtaskSection, setShowSubtaskSection] = useState(false);
  const [subtaskTitle, setSubtaskTitle] = useState({
  });

  const [subtaskList, setSubtaskList] = useState([]);
const [subtaskInput, setSubtaskInput] = useState(""); 

  const newTask = {
    title: title,
    description: description,
    date: date,
    isImportant: isImportant, 
    isCompleted: isCompleted, 
    category: category, 
    subtasks: [],
  };

  const addSubtaskHandler = () => {
    if (subtaskInput.trim() !== "") {
      setSubtaskList([...subtaskList, { title: subtaskInput }]);
      setSubtaskInput(""); // Clear the subtask input field
    }
  };
  
  const addNewTaskHandler = async (event) => {
    console.log("Submitting new task:", newTask);
    event.preventDefault();
    newTask.subtasks = subtaskList;

    newTask.subtasks = newTask.subtasks.map((subtask) => ({
      title: subtask.title,
    }));

    try {
      await axios.post("http://localhost:5000/tasks/add", newTask);
      onSubmit(newTask);
      onClose();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <>
      <Modal open={true} onClose={onClose}>
        <ModalContent>
          <h2>Add New Task</h2>
          <form onSubmit={addNewTaskHandler}>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
              <InputWrapper>
                <InputLabel className="block text-sm font-medium leading-6 text-gray-900">
                  Title
                </InputLabel>
                </InputWrapper>

                <div className="mt-2">
            <InputWrapper>

                    <InputField
                      type="text"
                      placeholder="What to do"
                      required
                      value={title}
                      onChange={({ target }) => setTitle(target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
            </InputWrapper>
                </div>
              </div>

              <div className="col-span-full">
              <InputWrapper>

                <InputLabel
                  htmlFor="Description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </InputLabel>
                <div className="mt-2">
                  <textarea
                    id="Description"
                    name="Description"
                    placeholder=" Add Description"

                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                </InputWrapper>
              
              </div>

              <div className="sm:col-span-3">
              <InputWrapper>

                <InputLabel
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  States
                </InputLabel>
                <div className="mt-2">
                  <SelectField
                    id="States"
                    name="States"
                    onChange={({ target }) => setcategory(target.value)}
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>ToDo </option>
                    <option>Doing</option>
                    <option>Done</option>
                  </SelectField>
                </div>
                </InputWrapper>
              </div>
              <InputWrapper>

              <InputLabel>
                Date
                <InputField



                  type="date"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  value={date}
                  required
                  onChange={({ target }) => setDate(target.value)}
                />
              </InputLabel>
              </InputWrapper>
              <div>
                
                <button
                  type="button"
                  onClick={() => setShowSubtaskSection(!showSubtaskSection)}
                >
                  {showSubtaskSection ? "Hide Subtask Section" : "Add Subtask"}
                </button>
                {showSubtaskSection && (
  <div>
    
                  <InputWrapper>

        <InputField
      type="text"
      placeholder="Subtask title"
      value={subtaskInput}
      onChange={(event) => setSubtaskInput(event.target.value)}
    />
    <button type="button" onClick={addSubtaskHandler} className="btn mt-2">
      Add Subtask
    </button>
    {subtaskList.length > 0 && (
      <div>
        <h3>Subtasks:</h3>
        <ul>
          {subtaskList.map((subtask, index) => (
            <li key={index}>{subtask.title}</li>
          ))}
        </ul>
      </div>
    )}
    </InputWrapper>
  </div>
)}

                <br />
                <button type="submit" className="btn mt-2">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  position: absolute;
  color: black;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

export default ModalForm;
