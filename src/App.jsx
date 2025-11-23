import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [focusedTaskId, setFocusedTaskId] = useState(null);
  // sim, se não for esse estado, tu aperta enter, e só cria um novo elemento abaixo, e o cursor não vai pra ele.

  function handleAddTask(text) {
    setTasks((prev) => [...prev, { id: Date.now(), text, isComplete: false }]);
  }

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

  function handleUpdateTaskText(id, newText) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  }

  function handleAddTaskBelow(id) {
    setTasks((prev) => {
      const index = prev.findIndex((task) => task.id === id);
      if (index === -1) return prev;

      const newTaskId = Date.now();
      const newTask = { id: newTaskId, text: "", isComplete: false };

      const newArray = [
        ...prev.slice(0, index + 1),
        newTask,
        ...prev.slice(index + 1),
      ];

      setFocusedTaskId(newTaskId);

      return newArray;
    });
  }

  return (
    <>
      <Header setTasks={setTasks} handleAddTask={handleAddTask} />
      <Tasks
        handleUpdateTaskText={handleUpdateTaskText}
        tasks={tasks}
        handleRemoveTask={handleRemoveTask}
        markAsCompleted={markAsCompleted}
        handleAddTaskBelow={handleAddTaskBelow}
        focusedTaskId={focusedTaskId}
      />
      {/* <BottomPanel/> */}
    </>
  );
}

export default App;
