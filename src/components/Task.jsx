import { FaCheck, FaTimes } from "react-icons/fa";

function Task({task, handleRemoveTask, markAsCompleted}) {
  return (
    <>
      <div key={task.id} className="flex text-gray-400 text-2xl justify-between items-center w-[380px] mx-auto py-2">
        <span className={task.isComplete ? "line-through text-gray-500" : ""}>{task.text}</span>
        <div className="flex gap-3">
          <button onClick={() => {markAsCompleted(task.id)}}><FaCheck /></button>
          <button onClick={() => {handleRemoveTask(task.id)}}><FaTimes /></button>
        </div>
      </div>
    </>
  );
}

export default Task;