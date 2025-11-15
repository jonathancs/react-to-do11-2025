import Task from "./Task";

let tasks = [
  {
    id: 1,
    text: "teste do objeto",
    isCompleted: false,
  },
];

function Tasks() {
  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}

export default Tasks;
