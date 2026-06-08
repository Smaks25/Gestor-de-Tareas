function TaskItem({ task, deleteTask, completeTask, editTask }) {
  const getPriorityClass = (priority) => {
    switch (priority) {
      case "Alta": return "priority-high";
      case "Media": return "priority-medium";
      case "Baja": return "priority-low";
      default: return "priority-medium";
    }
  };

  const isCompleted = task.status === "Completada";

  return (
    <div className={`card task-card h-100 animate-fade-in ${isCompleted ? 'bg-light border-success' : 'border-0 shadow-sm glass-card'}`}>
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className={`card-title fw-bold mb-0 ${isCompleted ? 'text-decoration-line-through text-muted' : ''}`}>
            {task.title}
          </h5>
          <span className={`badge ${isCompleted ? 'bg-success' : 'bg-secondary bg-opacity-25 text-dark'} rounded-pill`}>
            {task.status}
          </span>
        </div>
        
        <p className={`card-text flex-grow-1 small ${isCompleted ? 'text-muted' : 'text-secondary'}`}>
          {task.description}
        </p>
        
        <div className="d-flex justify-content-between align-items-center mb-3 text-muted small">
          <div>
            <i className="bi bi-calendar-event me-1"></i>
            {task.dueDate || "Sin fecha"}
          </div>
          <div className="d-flex align-items-center">
            <span className={`priority-indicator ${getPriorityClass(task.priority)}`}></span>
            {task.priority}
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 border-top pt-3 mt-auto">
          {!isCompleted && (
            <>
              <button
                className="btn btn-sm btn-outline-primary btn-action"
                onClick={() => editTask(task)}
                title="Editar"
              >
                <i className="bi bi-pencil"></i>
              </button>
              
              <button
                className="btn btn-sm btn-success btn-action"
                onClick={() => completeTask(task.id)}
                title="Marcar como completada"
              >
                <i className="bi bi-check-lg"></i>
              </button>
            </>
          )}

          <button
            className="btn btn-sm btn-outline-danger btn-action"
            onClick={() => deleteTask(task.id)}
            title="Eliminar"
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;