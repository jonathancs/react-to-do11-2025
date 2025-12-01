import { useState, useEffect, useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [focusedTaskId, setFocusedTaskId] = useState(null);
  const initialLoadDone = useRef(false);
  // sim, se não for esse estado, tu aperta enter, e só cria um novo elemento abaixo, e o cursor não vai pra ele.

  useEffect(() => {
    async function loadTasks() {
      try {
        const res = await fetch("http://localhost:4000/api/tasks");
        const data = await res.json();

        if (Array.isArray(data)) {
          setTasks(data);
        }
        initialLoadDone.current = true; // <-- ADD THIS
      } catch (err) {
        console.error("Failed to load tasks", err);
        initialLoadDone.current = true; // <-- ADD THIS TOO
      }
    }

    loadTasks();
  }, []);

  useEffect(() => {
    if (!initialLoadDone.current) return; // <-- BLOCK saving before load

    async function saveTasks() {
      try {
        await fetch("http://localhost:4000/api/tasks", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tasks }),
        });
      } catch (err) {
        console.error("Failed to save tasks", err);
      }
    }

    saveTasks();
  }, [tasks]);

  function handleAddTask() {
    const newId = Date.now();
    setTasks((prev) => [...prev, { id: newId, text: "", isComplete: false }]);
    setFocusedTaskId(newId);
  }
  // nao entendi como funcionou se o useEffect tá em Task

  function handleRemoveTask(idToBeRemoved) {
    setTasks((prev) => prev.filter((task) => task.id !== idToBeRemoved));
  }

  function markAsCompleted(idToBeCompleted) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === idToBeCompleted ? { ...task, isComplete: true } : task
      )
    );
  }

  function handleUpdateTaskText(id, newText, newParentId = null) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              text: newText,
              parentId: newParentId !== null ? newParentId : task.parentId,
            }
          : task
      )
    );
  }

  function handleAddTaskBelow(id) {
    setTasks((prev) => {
      const index = prev.findIndex((task) => task.id === id);
      if (index === -1) return prev;

      const newTaskId = Date.now();
      const newTask = {
        id: newTaskId,
        text: "",
        isComplete: false,
        parentId: null,
      };

      const newArray = [
        ...prev.slice(0, index + 1),
        newTask,
        ...prev.slice(index + 1),
      ];

      setFocusedTaskId(newTaskId);

      return newArray;
    });
  }

  function handleAddSubtask(parentId) {
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text: "", isComplete: false, parentId },
    ]);
  }

  return (
    <>
      <Header />
      <Tasks
        handleAddTask={handleAddTask}
        handleUpdateTaskText={handleUpdateTaskText}
        tasks={tasks}
        handleRemoveTask={handleRemoveTask}
        markAsCompleted={markAsCompleted}
        handleAddTaskBelow={handleAddTaskBelow}
        focusedTaskId={focusedTaskId}
        handleAddSubtask={handleAddSubtask}
      />
      {/* <BottomPanel/> */}
    </>
  );
}

export default App;
