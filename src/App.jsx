import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  function handleAddTask(text) {
    setTasks(prev => [...prev, {id: Date.now(), text, isComplete: false}])
  }

  function handleRemoveTask(idToBeRemoved) {
    setTasks(prev => prev.filter(task => task.id !== idToBeRemoved))
  }

  function markAsCompleted(idToBeCompleted) {
    setTasks(prev => prev.map(task => 
      task.id === idToBeCompleted
        ? {...task, isComplete: true}
        : task

    ))
  }

  function handleUpdateTaskText(id, newText) {
    setTasks(prev => 
      prev.map(task =>
        task.id === id ? {...task, text: newText } : task
      )
    )
  }

  return (
    <>
      <Header setTasks={setTasks} handleAddTask={handleAddTask}/>
      <Tasks handleUpdateTaskText={handleUpdateTaskText} tasks={tasks} handleRemoveTask={handleRemoveTask} markAsCompleted={markAsCompleted}/>
      {/* <BottomPanel/> */}
    </>
  );
}

export default App;