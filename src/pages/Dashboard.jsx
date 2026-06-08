import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Login from "../components/Login";
import Register from "../components/Register";

function Dashboard() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: "Completada" } : task
      )
    );
  };

  const [editingTask, setEditingTask] = useState(null);

  const editTask = (task) => {
    setEditingTask(task);
  };

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    setEditingTask(null);
  };

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todas");
  const [priorityFilter, setPriorityFilter] = useState("Todas");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "Todas" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "Todas" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="container-fluid bg-light min-vh-100">
        {showRegister ? (
          <Register setShowRegister={setShowRegister} />
        ) : (
          <Login
            setIsLoggedIn={setIsLoggedIn}
            setShowRegister={setShowRegister}
          />
        )}
      </div>
    );
  }

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="min-vh-100 pb-5">
      {/* Header */}
      <header className="app-header">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="bg-primary text-white rounded p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
              <i className="bi bi-check2-all fs-4"></i>
            </div>
            <h1 className="h3 mb-0 fw-bold text-dark">Gestor de Tareas</h1>
          </div>
          <button className="btn btn-outline-danger btn-sm px-3 rounded-pill" onClick={logout}>
            <i className="bi bi-box-arrow-right me-2"></i>Cerrar sesión
          </button>
        </div>
      </header>

      <main className="container">
        <div className="row">
          {/* Sidebar / Form */}
          <div className="col-lg-4 mb-4 mb-lg-0">
            <TaskForm
              addTask={addTask}
              editingTask={editingTask}
              updateTask={updateTask}
            />
          </div>

          {/* Main Content / List */}
          <div className="col-lg-8">
            {/* Filters Section */}
            <div className="card glass-card shadow-sm mb-4 animate-fade-in">
              <div className="card-body py-3">
                <div className="row g-2 align-items-center">
                  <div className="col-md-5">
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0 text-muted">
                        <i className="bi bi-search"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0 ps-0"
                        placeholder="Buscar tarea..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-3 col-6">
                    <select
                      className="form-select"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="Todas">Todos los estados</option>
                      <option value="Pendiente">Pendiente</option>
                      <option value="Completada">Completada</option>
                    </select>
                  </div>
                  
                  <div className="col-md-4 col-6">
                    <select
                      className="form-select"
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                    >
                      <option value="Todas">Todas las prioridades</option>
                      <option value="Alta">Alta</option>
                      <option value="Media">Media</option>
                      <option value="Baja">Baja</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Task List */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0 fw-bold">Mis Tareas</h4>
              <span className="badge bg-primary rounded-pill">
                {filteredTasks.length} {filteredTasks.length === 1 ? 'tarea' : 'tareas'}
              </span>
            </div>
            
            <TaskList
              tasks={filteredTasks}
              deleteTask={deleteTask}
              completeTask={completeTask}
              editTask={editTask}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;