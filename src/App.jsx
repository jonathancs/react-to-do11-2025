import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <>
      <Header setTasks={setTasks}/>
      <Tasks tasks={tasks}/>
      {/* <BottomPanel/> */}
    </>
  );
}

export default App;