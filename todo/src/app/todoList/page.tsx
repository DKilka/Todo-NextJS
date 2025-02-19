"use client";

import { TodoStatuses } from "@/enums/statuses";
import { Todo } from "@/types/todo";
import { Button, Input } from "@mui/material";
import { useEffect, useState } from "react";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Done from "@mui/icons-material/Done";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "@/localStorage/localStorage";
import { Reorder } from "framer-motion";
import CreateTodo from "@/components/CreateTodo/CreateTodo";
import SelectStatus from "@/components/SelectStatus/SelectStatus";

const TodoList = () => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [filteredTodo, setFilteredTodo] = useState<Todo[]>(todo);
  const [editableID, setEditableID] = useState<string>();
  const [newStatus, setNewStatus] = useState<TodoStatuses>(TodoStatuses.TODO);
  const [filteredStatus, setFilteredStatus] = useState<TodoStatuses>(
    TodoStatuses.TODO
  );
  const [newTitle, setNewTitle] = useState<string>("");
  const [isButtonActive, setIsButtonActive] = useState(true);

  useEffect(() => {
    const todos = getFromLocalStorage("todo");
    setTodo(todos);
    setFilteredTodo(todos);
  }, []);

  useEffect(() => {
    saveToLocalStorage(todo, "todo");
    setFilteredTodo(todo);
  }, [todo]);

  const editTodo = (todo: Todo) => {
    setEditableID(todo.id);
    setNewTitle(todo.title);
    setNewStatus(todo.status);
  };

  const saveTodo = (id: string) => {
    setTodo(
      todo.map((el: Todo) => {
        return el.id === id
          ? { ...el, title: newTitle, status: newStatus }
          : el;
      })
    );
    setEditableID("");
  };

  const deleteTodo = (id: string) => {
    const filteredTodo = todo.filter((el: Todo) => el.id !== id);
    setTodo(filteredTodo);
  };

  const filterByStatus = (status: TodoStatuses) => {
    const filteredTodos = todo.filter((todo) => todo.status === status);
    setFilteredTodo(filteredTodos);
    setFilteredStatus(status);
  };

  return (
    <main className="w-full h-full flex flex-col items-center">
      <h1 className="mt-32 text-4xl">Todo List</h1>
      <CreateTodo todo={todo} setTodo={setTodo} />

      <SelectStatus
        status={filteredStatus}
        style="my-6"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          filterByStatus(e.target.value as TodoStatuses)
        }
      />

      <Reorder.Group as="ul" axis="y" values={todo} onReorder={setTodo}>
        {filteredTodo.map((el: Todo) => {
          return (
            <Reorder.Item
              as="li"
              key={el.id}
              value={el}
              dragListener={isButtonActive}
            >
              <div className="p-4 bg-gray-200 w-[95vw] justify-self-center mx-4 rounded-lg mt-4 cursor-grab active:cursor-grabbing">
                {editableID === el.id ? (
                  <Input
                    value={newTitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewTitle(e.target.value)
                    }
                    className="h-6"
                  />
                ) : (
                  <div
                    className={`${
                      el.status === TodoStatuses.DONE ? "line-through" : ""
                    } w-1/3 inline-block text-wrap overflow-hidden`}
                  >
                    {el.title}
                  </div>
                )}
                <Button
                  onClick={() => deleteTodo(el.id)}
                  startIcon={<Delete />}
                  className="text-black p-0 m-0 self-center float-right pointer-events-auto"
                  onMouseOver={() => setIsButtonActive(false)}
                  onMouseLeave={() => setIsButtonActive(true)}
                ></Button>
                {editableID === el.id ? (
                  <Button
                    onClick={() => saveTodo(el.id)}
                    startIcon={<Done />}
                    className="text-black float-right p-0 m-0 pointer-events-auto"
                    onMouseOver={() => setIsButtonActive(false)}
                    onMouseLeave={() => setIsButtonActive(true)}
                  ></Button>
                ) : (
                  <Button
                    onClick={() => editTodo(el)}
                    startIcon={<Edit />}
                    className="text-black float-right p-0 m-0"
                    onMouseOver={() => setIsButtonActive(false)}
                    onMouseLeave={() => setIsButtonActive(true)}
                  ></Button>
                )}
                <div className="inline-block float-right mr-[20%]">
                  <span>Status:</span>
                  {editableID === el.id ? (
                    <SelectStatus
                      status={newStatus}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setNewStatus(e.target.value as TodoStatuses)
                      }
                    />
                  ) : (
                    <span>{el.status}</span>
                  )}
                </div>
              </div>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </main>
  );
};

export default TodoList;
