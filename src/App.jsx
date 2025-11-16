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

  return (
    <>
      <Header setTasks={setTasks} handleAddTask={handleAddTask}/>
      <Tasks tasks={tasks} handleRemoveTask={handleRemoveTask}/>
      {/* <BottomPanel/> */}
    </>
  );
}

export default App;