import { FaCheck, FaTimes } from "react-icons/fa";

function Task({
  task,
  handleRemoveTask,
  markAsCompleted,
  handleUpdateTaskText,
}) {
  return (
    <>
      <div className="flex text-gray-400 text-2xl justify-between items-center w-[380px] mx-auto py-2">
        <input
          type="text"
          value={task.text}
          onChange={(e) => handleUpdateTaskText(task.id, e.target.value)}
          className={`bg-transparent outline-none flex-1 ${
            task.isComplete ? "line-through text-gray-500" : ""
          }`}
        />
        <div className="flex gap-3">
          <button
            onClick={() => {
              markAsCompleted(task.id);
            }}
          >
            <FaCheck />
          </button>
          <button
            onClick={() => {
              handleRemoveTask(task.id);
            }}
          >
            <FaTimes />
          </button>
        </div>
      </div>
    </>
  );
}

export default Task;