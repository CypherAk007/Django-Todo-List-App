import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

const UpdateScreen = () => {
  const [enteredTask, setEnteredTask] = useState("");
  const [currentTodo,setCurrentTodo] = useState([])
  const navigate = useNavigate()
  const {id} = useParams()
  const list = useSelector((state) => state.listReducer.list);
  useEffect(()=>{
    setCurrentTodo(list.filter(todo=>todo.id==id)[0])

  },[list])
 
  const formSubmitHandler = (event) => {
    event.preventDefault();

    const updatedTodo = {...currentTodo,task:enteredTask}
    axios.patch("/api/todo/update/" + id,updatedTodo)
    .catch((err) => console.log(err.message));

    console.log("submitted",id,currentTodo,enteredTask);

    navigate(`/`)
  }

    const taskInputChangeHandler = (event) => {
      setEnteredTask(event.target.value);

    };
  
  return (
    <div className={`border border-green-600 w-1/2 my-16 mx-auto text-3xl`}>
      Update Current Task
      <form onSubmit={formSubmitHandler}>
              <div>
                <span className={`flex justify-between py-4 m-4 text-6xl rounded-xl border-green-700`}>
                  <input
                    type="text"
                    name="task"
                    value={enteredTask}
                    placeholder="Update task"
                    onChange={taskInputChangeHandler}
                    className={`border-green-600 border px-4`}
                  />
                  <button type="submit" className={`border rounded-lg p-4 border-green-700`}>
                    <i className={"fa fa-plus"}></i> Update
                  </button>
                </span>
              </div>
            </form>
    </div>
  )
}

export default UpdateScreen
