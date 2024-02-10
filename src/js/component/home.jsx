
import React, { useState } from "react";

const TodoItem = ({ todo, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="list-group-item"
    >
      {todo.text}
      {isHovered && <button className="delete-icon btn btn-danger float-right" onClick={() => onDelete(todo.id)}>&times;</button>}
    </li>
  );
};

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue.trim(), isCompleted: false }]);
      setInputValue("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const pendingTodos = todos.filter((todo) => !todo.isCompleted).length;

  return (
    <div className="todo-app container">
      <h1 className="todo-app-title">Tareas Pendientes</h1>
      <div className="todo-app-input-wrapper">
        <input
          type="text"
          className="form-control todo-app-input"
          placeholder="Añade una tarea"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={addTodo}
        />
      </div>
      <ul className="list-group todo-app-list">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem todo={todo} onDelete={deleteTodo} key={todo.id} />
          ))
        ) : (
          <li className="list-group-item no-tasks">No tienes tareas pendientes.</li>
        )}
      </ul>
      {pendingTodos > 0 && <p className="pending-todos mt-3">Tienes {pendingTodos} tareas pendientes.</p>}
    </div>
  );
};

export default TodoApp;