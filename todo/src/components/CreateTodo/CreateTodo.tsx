"use client";

import { TodoStatuses } from "@/enums/statuses";
import { Todo } from "@/types/todo";
import { Button, OutlinedInput } from "@mui/material";
import { useState } from "react";

interface CreateTodoProps {
  todo: Todo[];
  setTodo: (el: Todo[]) => void;
}

const CreateTodo = ({ todo, setTodo }: CreateTodoProps) => {
  const [newTodo, setNewTodo] = useState<string>("");

  const createTodo = () => {
    setTodo([
      ...todo,
      {
        id: crypto.randomUUID(),
        title: newTodo,
        status: TodoStatuses.TODO,
      },
    ]);
    setNewTodo("");
  };

  return (
    <section className="flex flex-row justify-center mt-6 w-full">
      <OutlinedInput
        className="h-10 w-1/2"
        value={newTodo}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewTodo(e.target.value)
        }
      />
      <Button variant="text" onClick={createTodo} disabled={!newTodo}>
        Create
      </Button>
    </section>
  );
};

export default CreateTodo;
