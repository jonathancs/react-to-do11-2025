
import { RxPlus } from "react-icons/rx";
import Task from "./Task";

function Tasks({
  tasks,
  handleRemoveTask,
  markAsCompleted,
  handleUpdateTaskText,
  handleAddTaskBelow,
  focusedTaskId,
  handleAddTask,
}) {
  const rootTasks = tasks.filter((t) => t.parentId == null); // se nao tem parentId é porque é parent
  return (
    <div className="pt-10">
      {rootTasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          tasks={tasks}
          handleRemoveTask={handleRemoveTask}
          markAsCompleted={markAsCompleted}
          handleUpdateTaskText={handleUpdateTaskText}
          handleAddTaskBelow={handleAddTaskBelow}
          focusedTaskId={focusedTaskId}
        />
      ))}
      <div className="flex items-center mx-auto w-[380px]">
        <RxPlus className="text-gray-400 w-6 h-6"/>
        <button 
          className="text-gray-400 px-4 text-2xl"
          onClick={() => {handleAddTask()}}
        >List item</button>
      </div>
    </div>
  );
}

export default Tasks;
