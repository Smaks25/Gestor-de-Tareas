import { useState, useEffect } from "react";

function TaskForm({ addTask, editingTask, updateTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Media");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setDueDate(editingTask.dueDate);
      setPriority(editingTask.priority);
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Media");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Complete todos los campos");
      return;
    }

    if (editingTask) {
      const updatedTask = {
        ...editingTask,
        title,
        description,
        dueDate,
        priority,
      };
      updateTask(updatedTask);
    } else {
      const newTask = {
        id: Date.now(),
        title,
        description,
        dueDate,
        priority,
        status: "Pendiente",
      };
      addTask(newTask);
    }

    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Media");
  };

  return (
    <div className="card glass-card shadow-sm mb-4 animate-fade-in">
      <div className="card-header bg-white border-bottom-0 pt-4 pb-0">
        <h4 className="card-title fw-bold mb-0">
          {editingTask ? (
            <><i className="bi bi-pencil-square text-primary me-2"></i>Editar Tarea</>
          ) : (
            <><i className="bi bi-plus-circle-fill text-primary me-2"></i>Nueva Tarea</>
          )}
        </h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-12">
              <label className="form-label fw-semibold text-muted small">Título</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej. Comprar víveres"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="col-md-12">
              <label className="form-label fw-semibold text-muted small">Descripción</label>
              <textarea
                className="form-control"
                placeholder="Detalles de la tarea..."
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted small">Fecha límite</label>
              <input
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted small">Prioridad</label>
              <select
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Alta">Alta</option> 
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
            </div>
            
            <div className="col-12 mt-4 text-end">
              {editingTask && (
                <button 
                  type="button" 
                  className="btn btn-outline-secondary me-2 btn-action"
                  onClick={() => updateTask(editingTask)} /* Esto podría mejorarse para cancelar la edición, pero por ahora se mantiene la lógica original */
                >
                  Cancelar
                </button>
              )}
              <button type="submit" className="btn btn-primary-custom">
                {editingTask ? "Actualizar Tarea" : "Agregar Tarea"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;