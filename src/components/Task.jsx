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

  function handleRemoveIndent(id, newParent) {
    handleUpdateTaskText(id, task.text, newParent);
  }

  function handleIndentTask(id) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index <= 0) return;
    const previousId = tasks[index - 1].id;

    handleUpdateTaskParent(id, previousId);
  }

  function handleUpdateTaskParent(id, newParentId) {
    handleUpdateTaskText(id, task.text, newParentId);
  }

  return (
    <>
      <div className="flex text-gray-400 text-2xl justify-between items-center w-[380px] mx-auto py-2">
        <input
          ref={inputRef}
          type="text"
          value={task.text}
          onChange={(e) => handleUpdateTaskText(task.id, e.target.value)}
          className={`bg-transparent outline-none flex-1 ${
            task.isComplete ? "line-through text-gray-500" : ""
          }`}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();

              // SHIFT + TAB → remove indentação
              if (e.shiftKey) {
                handleRemoveIndent(task.id, null);
                return;
              }

              // TAB normal → vira subtask do item acima
              handleIndentTask(task.id);
              return;
            }
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddTaskBelow(task.id);
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
