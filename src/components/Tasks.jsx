import Task from "./Task"

function Tasks({tasks, handleRemoveTask, markAsCompleted, handleUpdateTaskText}) {
  return (
    <div className="pt-10">
      {tasks.map((task) => (
        <Task key={task.id} task={task} handleRemoveTask={handleRemoveTask} markAsCompleted={markAsCompleted} handleUpdateTaskText={handleUpdateTaskText}/>
      ))}
    </div>
  )
}

export default Tasks