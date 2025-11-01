import {
  useContext,
  useCallback,
  useMemo,
  memo,
  useState,
  useRef,
  useEffect,
} from "react";
import { TaskContext, useLocalStorage } from "./context.jsx";

export const ThemeToggle = () => {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }, [theme, setTheme]);

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

export const Header = () => (
  <header>
    <div className="header-content">
      <h1 className="header-title"> Task Manager</h1>
      <ThemeToggle />
    </div>
  </header>
);

export const TaskInput = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const { addTask } = useContext(TaskContext);
  const inputRef = useRef(null);

  const handleSubmit = useCallback(() => {
    if (!input.trim()) {
      setError("Task cannot be empty");
      return;
    }
    addTask(input);
    setInput("");
    setError("");
    inputRef.current?.focus();
  }, [input, addTask]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <div className="task-input-container">
      <div className="input-group">
        <input
          ref={inputRef}
          type="text"
          className="task-input"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (error) setError("");
          }}
          onKeyPress={handleKeyPress}
        />
        <button className="add-btn" onClick={handleSubmit}>
          Add
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export const FilterButtons = () => {
  const { filter, setFilter, tasks } = useContext(TaskContext);
  const filters = ["All", "Active", "Completed"];

  const stats = useMemo(
    () => ({
      All: tasks.length,
      Active: tasks.filter((t) => !t.completed).length,
      Completed: tasks.filter((t) => t.completed).length,
    }),
    [tasks]
  );

  return (
    <div className="filter-container">
      {filters.map((f) => (
        <button
          key={f}
          className={`filter-btn ${filter === f ? "active" : ""}`}
          onClick={() => setFilter(f)}
        >
          {f} ({stats[f]})
        </button>
      ))}
    </div>
  );
};

export const TaskItem = memo(
  ({ task, index, onToggle, onDelete, onDragStart, onDragOver, onDrop }) => {
    const [isRemoving, setIsRemoving] = useState(false);

    const handleDelete = useCallback(() => {
      setIsRemoving(true);
      setTimeout(() => onDelete(task.id), 300);
    }, [task.id, onDelete]);

    return (
      <li
        className={`task-item ${task.completed ? "completed" : ""} ${
          isRemoving ? "removing" : ""
        }`}
        draggable
        onDragStart={() => onDragStart(index)}
        onDragOver={onDragOver}
        onDrop={() => onDrop(index)}
      >
        <span className="drag-handle">⋮⋮</span>
        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className="task-text">{task.text}</span>
        <button className="delete-btn" onClick={handleDelete}>
          ✕
        </button>
      </li>
    );
  }
);

TaskItem.displayName = "TaskItem";

export const TaskList = () => {
  const { tasks, filter, toggleTask, deleteTask, reorderTasks } =
    useContext(TaskContext);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "Active":
        return tasks.filter((task) => !task.completed);
      case "Completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const handleDrop = useCallback(
    (dropIndex) => {
      if (draggedIndex !== null && draggedIndex !== dropIndex) {
        reorderTasks(draggedIndex, dropIndex);
      }
      setDraggedIndex(null);
    },
    [draggedIndex, reorderTasks]
  );

  if (filteredTasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📭</div>
        <div className="empty-state-text">
          {filter === "All"
            ? "No tasks yet!"
            : filter === "Active"
            ? "All completed! 🎉"
            : "No completed tasks."}
        </div>
      </div>
    );
  }

  return (
    <ul className="tasks-list">
      {filteredTasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onDragStart={setDraggedIndex}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        />
      ))}
    </ul>
  );
};

export const StatsBar = () => {
  const { tasks, clearCompleted } = useContext(TaskContext);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, percentage };
  }, [tasks]);

  return (
    <div className="stats-bar">
      <div className="stat">
        <span className="stat-label">Total</span>
        <span className="stat-value">{stats.total}</span>
      </div>
      <div className="stat">
        <span className="stat-label">Progress</span>
        <span className="stat-value">{stats.percentage}%</span>
      </div>
      <div className="stat">
        <span className="stat-label">Completed</span>
        <span className="stat-value">{stats.completed}</span>
      </div>
      <button
        className="clear-completed-btn"
        onClick={clearCompleted}
        disabled={stats.completed === 0}
      >
        Clear ({stats.completed})
      </button>
    </div>
  );
};
