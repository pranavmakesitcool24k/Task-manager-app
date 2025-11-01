import { useState, createContext, useCallback, useContext } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage:`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error writing to localStorage:`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
};

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useState("All");

  const addTask = useCallback(
    (text) => {
      if (!text.trim()) return;
      const newTask = {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createdAt: Date.now(),
      };
      setTasks((prev) => [...prev, newTask]);
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  const toggleTask = useCallback(
    (id) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    },
    [setTasks]
  );

  const reorderTasks = useCallback(
    (sourceIndex, destinationIndex) => {
      if (sourceIndex === destinationIndex) return;
      setTasks((prev) => {
        const newTasks = Array.from(prev);
        const [movedTask] = newTasks.splice(sourceIndex, 1);
        newTasks.splice(destinationIndex, 0, movedTask);
        return newTasks;
      });
    },
    [setTasks]
  );

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  }, [setTasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filter,
        setFilter,
        addTask,
        deleteTask,
        toggleTask,
        reorderTasks,
        clearCompleted,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
