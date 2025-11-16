import Task from "./Task"

function Tasks({tasks, handleRemoveTask}) {
  return (
    <div className="pt-10">
      {tasks.map((task) => (
        <Task key={task.id} task={task} handleRemoveTask={handleRemoveTask}/>
      ))}
    </div>
  )
}

export default Tasks