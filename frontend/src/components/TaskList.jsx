import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask, completeTask, editTask }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-5 text-muted animate-fade-in">
        <i className="bi bi-clipboard-x display-1 mb-3 text-light"></i>
        <h4>No hay tareas</h4>
        <p>Aún no has agregado ninguna tarea o no coinciden con tu búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="row g-4 mt-2">
      {tasks.map((task) => (
        <div className="col-12 col-md-6 col-lg-4" key={task.id}>
          <TaskItem 
            task={task} 
            deleteTask={deleteTask}
            completeTask={completeTask}
            editTask={editTask}
          />
        </div>
      ))}
    </div>
  );
}

export default TaskList;