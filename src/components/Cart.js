import { React, useState } from "react";
import { useTasks, useTasksDispatch } from "./CartContext.js";
import { useSelector } from "react-redux";
import CartList from "./CartList.js"
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";

export default function AddTask() {
  const dispatch = useTasksDispatch();
  const [checked, setChecked] = useState(false);
  const tasks = useTasks();
  const state = useSelector((state) => state.handleCart);

  function toggleCheck() {
    dispatch({
      type: "check",
      value: tasks.value ? true : false,
    });
    setChecked(!checked);
  }
  return (
    <>
      <Button
        variant="gradient"
        onClick={toggleCheck}
        size="sm"
        className="hidden lg:inline-block text-black text-sm"
      >
        <i className="fa fa-cart-shopping mr-1"></i>
        <span className="mr-1">View Cart</span>
        <span className="mr-1">({state.length}) </span>
      </Button>
      <Task task={tasks} />
    </>
  );
}

function Task({ task }) {
  const dispatch = useTasksDispatch();

  function toggleDrawer() {
    dispatch({
      type: "check",
      value: task.value ? true : false,
    });
  }

  let taskContent;
  taskContent = (
    <>
      <Drawer
        placement="right"
        open={task.value}
        className="p-4 drawer right-0 fixed top-0 z-30 shadow-lg"
      >
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className=" font-semibold"> Cart </span>
            <IconButton
              variant="text"
              className=" !overflow-visible relative md:top-0 close  -top-1"
              color="blue-gray"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
                onClick={toggleDrawer}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
          <div>
            <CartList />
          </div>
        </div>
      </Drawer>
    </>
  );

  return <label>{taskContent}</label>;
}
