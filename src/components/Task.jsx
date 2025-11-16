import { FaCheck, FaTimes } from "react-icons/fa";

function Task({task}) {
  return (
    <>
      <div className="flex text-gray-400 text-2xl justify-between items-center w-[380px] mx-auto py-2">
        <span>{task.text}</span>
        <div className="flex gap-3">
          <FaCheck />
          <FaTimes />
        </div>
      </div>
    </>
  );
}

export default Task;