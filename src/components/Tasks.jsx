import Task from "./Task"

function Tasks({tasks, handleRemoveTask, markAsCompleted, handleUpdateTaskText, handleAddTaskBelow, focusedTaskId}) {
  return (
    <div className="pt-10">
      {tasks.map((task) => (
        <Task key={task.id} task={task} handleRemoveTask={handleRemoveTask} markAsCompleted={markAsCompleted} handleUpdateTaskText={handleUpdateTaskText} handleAddTaskBelow={handleAddTaskBelow} focusedTaskId={focusedTaskId}/>
      ))}
    </div>
  )
}

export default Tasks