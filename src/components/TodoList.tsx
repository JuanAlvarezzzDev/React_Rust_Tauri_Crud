import React, { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import type { Todo } from "../models/Todo";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const result = await invoke<Todo[]>("get_todos");
      setTodos(result);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const updateTodo = async (todo: Todo) => {
    try {
      await invoke("update_todo", { todo });
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await updateTodo({
        id: 1,
        description: "Haciendo Pruebas",
        status: "Complete",
      });
      await fetchTodos();
    };

    initialize();
  }, []);

  return <div style={{ padding: "1rem" }}>{JSON.stringify(todos)}</div>;
};

export default TodoList;
