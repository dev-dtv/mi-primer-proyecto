"use client";

import { useState } from "react";
import { useTheme } from "./ThemeProvider";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const { theme, toggle } = useTheme();
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
  const allDone = total > 0 && pending === 0;

  return (
    <div className="flex flex-col min-h-[100dvh] bg-violet-600 dark:bg-violet-950">
      {/* Header */}
      <div className="px-5 pt-[calc(env(safe-area-inset-top,20px)+20px)] pb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-violet-200 dark:text-violet-400 text-sm font-medium tracking-wide uppercase mb-1">
              {new Date().toLocaleDateString("es-MX", { weekday: "long", month: "long", day: "numeric" })}
            </p>
            <h1 className="text-white text-3xl font-bold tracking-tight">Mis Tareas</h1>
          </div>

          {/* Botón dark/light mode */}
          <button
            onClick={toggle}
            aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            className="mt-1 w-10 h-10 rounded-full bg-white/10 dark:bg-white/10 flex items-center justify-center text-white active:scale-90 hover:bg-white/20"
          >
            {theme === "dark" ? (
              /* Sol */
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="5" />
                <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              /* Luna */
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
        </div>

        {/* Barra de progreso */}
        <div className="flex items-center gap-2 mt-4">
          <div className="flex-1 h-1.5 rounded-full bg-violet-500 dark:bg-violet-800 overflow-hidden">
            <div
              className="h-full bg-white rounded-full"
              style={{ width: total ? `${((total - pending) / total) * 100}%` : "0%" }}
            />
          </div>
          <span className="text-violet-200 dark:text-violet-400 text-xs font-medium">
            {total === 0 ? "Sin tareas" : allDone ? "¡Todo listo! 🎉" : `${total - pending}/${total}`}
          </span>
        </div>
      </div>

      {/* Main card */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 rounded-t-3xl flex flex-col overflow-hidden">
        {/* Task list */}
        <ul className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800 px-1 py-2">
          {todos.length === 0 && (
            <li className="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-600 gap-2">
              <svg className="w-12 h-12 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-sm">Agrega tu primera tarea</span>
            </li>
          )}
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 px-4 py-4 active:bg-gray-100 dark:active:bg-gray-800"
            >
              {/* Checkbox */}
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                  todo.completed
                    ? "bg-violet-600 border-violet-600 scale-95"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                {todo.completed && (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>

              {/* Text */}
              <span className={`flex-1 text-base leading-snug ${
                todo.completed
                  ? "line-through text-gray-400 dark:text-gray-600"
                  : "text-gray-800 dark:text-gray-100"
              }`}>
                {todo.text}
              </span>

              {/* Delete */}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full text-gray-400 dark:text-gray-600 active:bg-red-50 dark:active:bg-red-950 active:text-red-500"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        {/* Clear completed */}
        {todos.some((t) => t.completed) && (
          <div className="px-5 py-2 flex justify-end border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => setTodos(todos.filter((t) => !t.completed))}
              className="text-sm text-gray-400 dark:text-gray-600 active:text-red-500 py-2 px-1"
            >
              Limpiar completadas
            </button>
          </div>
        )}

        {/* Input bar */}
        <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-3 pb-[calc(env(safe-area-inset-bottom,0px)+12px)] flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nueva tarea..."
            className="flex-1 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-base text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:focus:ring-violet-900"
          />
          <button
            onClick={addTodo}
            disabled={!input.trim()}
            className="w-12 h-12 rounded-2xl bg-violet-600 dark:bg-violet-500 flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed active:bg-violet-700 dark:active:bg-violet-600 flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
