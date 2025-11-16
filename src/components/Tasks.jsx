import Task from "./Task"

function Tasks({tasks}) {
  return (
    <div className="pt-10">
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  )
}

export default Tasks