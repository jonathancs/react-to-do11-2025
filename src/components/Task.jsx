import { FaCheck, FaTimes } from "react-icons/fa";

function Task() {
  return (
    <>
      <div className="flex text-gray-400 text-xl justify-between items-center w-[380px] mx-auto py-2">
        <span>complete task complete</span>
        <div className="flex gap-3">
          <FaCheck />
          <FaTimes />
        </div>
      </div>
    </>
  );
}

export default Task;
