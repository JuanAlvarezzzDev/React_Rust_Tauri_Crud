import React, { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import type { Todo } from "../models/Todo";
import { TodoForCreate } from "../models/TodoForCreate";
import { TodoStatus } from "../models/TodoStatus";
import { TodoValidator } from "../validator/TodoValidator";
import { ValidationErrors } from "./ui/ValidationErrors";
import { ValidationError } from "class-validator";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<ValidationError[]>([])
  const todoValidator = new TodoValidator()

  const todoObject = {
    description: "hola como e",
    status: TodoStatus.Incomplete
  }

  const validateTodo = async () => {
    const errors = await todoValidator.validate(todoObject);
    setError(errors)
  };
  validateTodo();



  const fetchTodos = async () => {
    try {
      const result = await invoke<Todo[]>("get_todos");
      setTodos(result);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const updateTodo = async (todo: TodoForCreate) => {
    try {
      await invoke("create_todo", { todo });
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  useEffect(() => {
  fetchTodos()
  }, []);

  return <div style={{ padding: "1rem" }}>{JSON.stringify(todos)}
  <ValidationErrors errors={error} />
  </div>;
};

export default TodoList;
