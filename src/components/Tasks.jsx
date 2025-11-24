import Task from "./Task";

function Tasks({
  tasks,
  handleRemoveTask,
  markAsCompleted,
  handleUpdateTaskText,
  handleAddTaskBelow,
  focusedTaskId,
  handleAddSubtask,
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
          handleAddSubtask={handleAddSubtask}
        />
      ))}
    </div>
  );
}

export default Tasks;
