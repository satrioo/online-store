import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Product from "../components/Product";


const TodoList = () => {
  const [task, setTask] = useState([{ todo: "cleaning", status: false }]);
  const [input, setInput] = useState("");

  function checkTask(index) {
    const temp = Array.from(task);
    temp.splice(index, 1, {
      todo: task[index].todo,
      status: !task[index].status,
    });
    setTask(temp);
  }

  function removeTask(index) {
    const temp = Array.from(task);
    temp.splice(index, 1);
    setTask(temp);
  }

  function add(event) {
    if (event.keyCode === 13) {
      addTask();
    }
  }

  function addTask() {
    setTask((task) => [...task, { todo: input, status: false }]);
    setInput('')
  }

  function listTask() {
    return (
      <div className=" w-screen h-screen flex justify-center items-center flex-wrap">
        <div className=" w-[300px] border-2 rounded p-3">
          <div className=" mb-2 flex justify-between">
            <input
              type="text"
              value={input}
              onKeyDown={add}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={addTask}> add todo </button>
          </div>
          <div className=" block w-full">
            task list
            <br />
            <ul>
              {task.map((item, index) => {
                return (
                  <li key={index} className=" flex justify-between">
                    {" "}
                    {item.todo} {item.status ? "done" : "not"}{" "}
                    <div className=" flex gap-2">
                      <button onClick={() => checkTask(index)}> check </button>
                      <button onClick={() => removeTask(index)}> delete </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <Product />
      {/* { listTask() } */}
    </div>
  )
 
};

export default TodoList;
