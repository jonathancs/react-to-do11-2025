import { RxDragHandleDots2 } from "react-icons/rx";
import { BiCheckbox } from "react-icons/bi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useEffect, useRef } from "react";

function Task({
  task,
  tasks,
  handleRemoveTask,
  markAsCompleted,
  handleUpdateTaskText,
  handleAddTaskBelow,
  focusedTaskId,
}) {
  const inputRef = useRef(null);
  useEffect(() => {
    if (focusedTaskId === task.id && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focusedTaskId]);

  const children = tasks.filter((t) => t.parentId === task.id);

  function handleRemoveIndent(id, newParent, currentLevel) {
    handleUpdateTaskText(id, task.text, newParent, currentLevel-1);
  }

  function handleIndentTask(id) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index <= 0) return;

    const currentTask = tasks[index]
    let closestParent = null
    for (let i = index-1; i >= 0; i--) {
      if (tasks[i].level == currentTask.level) {
        closestParent = tasks[i]
        break
      }
    }

    if (!closestParent) return

    handleUpdateTaskText(
      id, 
      currentTask.text, 
      closestParent.id, 
      currentTask.level+1
    )
  
  }

  return (
    <>
      <div className="flex text-gray-400 text-2xl justify-between items-center w-[380px] mx-auto py-2">
        <BiCheckbox className="text-gray-400 w-9 h-9" />
        <RxDragHandleDots2 className="text-gray-400 cursor-grab text-3xl" />
        <input
          ref={inputRef}
          type="text"
          value={task.text}
          onChange={(e) =>
            handleUpdateTaskText(task.id, e.target.value, task.parentId)
          }
          className={`bg-transparent outline-none flex-1 ${
            task.isComplete ? "line-through text-gray-500" : ""
          }`}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();

              if (e.shiftKey) {
                const parentTask = tasks.find((t) => t.id === task.parentId);
                const newParentId = parentTask ? parentTask.parentId : null;
                handleRemoveIndent(task.id, newParentId, task.level);
                return;
              }

              handleIndentTask(task.id);
              return;
            }
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddTaskBelow(task.id, task.parentId, task.level);
            }
          }}
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

      {children.length > 0 && (
        <div className="pl-20">
          {children.map((child) => (
            <Task
              key={child.id}
              task={child}
              tasks={tasks}
              handleRemoveTask={handleRemoveTask}
              markAsCompleted={markAsCompleted}
              handleUpdateTaskText={handleUpdateTaskText}
              handleAddTaskBelow={handleAddTaskBelow}
              focusedTaskId={focusedTaskId}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Task;
