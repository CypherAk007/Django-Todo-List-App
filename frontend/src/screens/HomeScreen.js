import React, { useEffect, useState } from "react";
import classes from "./HomeScreen.module.scss";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { listActions } from "../store/todo";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const [currentDay, setCurrentDay] = useState("");
  const dispatch = useDispatch();
  const list = useSelector((state) => state.listReducer.list);
  const getDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  };
  const [enteredTask, setEnteredTask] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const fetchList = async () => {
      const { data } = await axios.get("/api/todo");
      console.log(data);
      dispatch(listActions.populateList(data));
    };
    fetchList();
    setCurrentDay(getDate());
  }, []);

  const notCompletedTasks = list.filter((list) => !list.status);
  const completedTasks = list.filter((list) => list.status);

  // const getCookie = (name)=>{
  //   let cookieValue = null
  //   if
  // }

  const taskInputChangeHandler = (event) => {
    setEnteredTask(event.target.value);
  };

  const deleteTodo = (id) => {
    // React ui updated
    const newList = list.filter((todo) => todo.id !== id);
    dispatch(listActions.populateList(newList));

    // Delete in backend
    axios
      .delete("/api/todo/update/" + id)
      .catch((err) => console.log(err.message));
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    console.log("submitted");
    // console.log(event.target.task.value);
    console.log(enteredTask);

    // const { data } = await axios.post(
    //   "/api/users/login/",
    //   { 'username': email, 'password': password },
    //   config
    // );
    const createTask = async () => {
      const config = {
        headers: { "Content-type": "application/json" },
      };
      // const headers = {"Content-type": "application/json",}
      const createData = {
        task: enteredTask,
        status:false,
      };
      const originalList = [...list]
      const { data } = await axios.post("/api/todo/create", createData, config).catch(err=>{
        console.log(err);
        dispatch(listActions.populateList(originalList));
      })
      console.log(data);
      dispatch(listActions.populateList([...list,data]));
    };
    createTask();
    setEnteredTask("");
  };

  const deleteHandler = (id)=>{
    console.log('deleted',id);
    deleteTodo(id)
  }

  const updateHandler = (id)=>{
    navigate(`/todo/edit_task/${id}`)
  }

  return (
    <div
    className={`${classes["heading"]} flex items-center flex-col w-1000 bg-orange-500`}
    >
      <div className={`my-16`}>Todo List Django</div>
      <div
        className={`${classes["splitContainer"]} flex justify-between bg-green-600 w-500 h-500 `}
      >
        <div className={`${classes["container1"]} mx-4 `}>
          <div className={`my-4 text-4xl`}>Today {currentDay}</div>
          <div className={`${classes["todo"]}`}>
            {notCompletedTasks.map((todo) => (
              <div className={`flex justify-between`}>
                <div>{todo.task}</div>
                <div>{todo.status}</div>
                <button onClick={()=>updateHandler(todo.id)}><i className={"fa fa-pencil"}></i></button>
                <button onClick={()=>deleteHandler(todo.id)}><i className={"fa fa-trash"}></i></button>
              </div>
            ))}
          </div>
          <div className={`${classes["addTask"]}`}>
            <form onSubmit={formSubmitHandler}>
              <div>
                <span className={`flex justify-between py-4 m-4 text-6xl`}>
                  <input
                    type="text"
                    name="task"
                    value={enteredTask}
                    placeholder="Add a task"
                    onChange={taskInputChangeHandler}
                  />
                  <button type="submit">
                    <i className={"fa fa-plus"}></i> Add
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
        <div className={`${classes["container2"]} bg-green-500 mx-4 `}>
          Todo Completed
          {completedTasks.map((todo) => (
            <div className={`flex justify-between`}>
              <div>{todo.task}</div>
              <div>{todo.status}</div>
              <button onClick={()=>updateHandler(todo.id)}><i className={"fa fa-pencil"}></i></button>
              <button onClick={()=>deleteHandler(todo.id)}><i className={"fa fa-trash"}></i></button>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
