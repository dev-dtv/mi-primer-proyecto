"use client";

import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Aprender Next.js", completed: false },
    { id: 2, text: "Construir algo increíble", completed: false },
  ]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos([...todos, { id: Date.now(), text: trimmed, completed: false }]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addTodo();
  };

  const pending = todos.filter((t) => !t.completed).length;
  const total = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Mis Tareas</h1>
          <p className="mt-2 text-gray-500 text-sm">
            {total === 0
              ? "No hay tareas aún"
              : `${pending} de ${total} pendiente${pending !== 1 ? "s" : ""}`}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100 overflow-hidden">
          {/* Input */}
          <div className="p-4 border-b border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Agregar nueva tarea..."
              className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
            />
            <button
              onClick={addTodo}
              disabled={!input.trim()}
              className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Agregar
            </button>
          </div>

          {/* List */}
          <ul className="divide-y divide-gray-50">
            {todos.length === 0 && (
              <li className="py-12 text-center text-gray-400 text-sm">
                Agrega tu primera tarea arriba
              </li>
            )}
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition group"
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                    todo.completed
                      ? "bg-violet-600 border-violet-600"
                      : "border-gray-300 hover:border-violet-400"
                  }`}
                >
                  {todo.completed && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>

                {/* Text */}
                <span
                  className={`flex-1 text-sm transition ${
                    todo.completed ? "line-through text-gray-400" : "text-gray-800"
                  }`}
                >
                  {todo.text}
                </span>

                {/* Delete */}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition p-1 rounded-lg hover:bg-red-50"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          {/* Footer */}
          {todos.some((t) => t.completed) && (
            <div className="px-4 py-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setTodos(todos.filter((t) => !t.completed))}
                className="text-xs text-gray-400 hover:text-red-500 transition"
              >
                Limpiar completadas
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
