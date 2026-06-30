import { useState } from "react";
import { authAPI } from "../services/api";

function Login({ setIsLoggedIn, setShowRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await authAPI.login(username, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setIsLoggedIn(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card glass-card p-4 shadow-lg animate-fade-in" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card-body">
          <div className="text-center mb-4">
            <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "60px", height: "60px", fontSize: "24px" }}>
              <i className="bi bi-person-circle"></i>
            </div>
            <h2 className="card-title fw-bold">Iniciar Sesión</h2>
            <p className="text-muted">Bienvenido de nuevo a tu Gestor de Tareas</p>
          </div>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingUsername"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="floatingUsername">Usuario</label>
            </div>

            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="floatingPassword">Contraseña</label>
            </div>

            <button type="submit" className="btn btn-primary-custom w-100 mb-3 py-2" disabled={loading}>
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              ) : (
                <i className="bi bi-box-arrow-in-right me-2"></i>
              )}
              {loading ? "Ingresando..." : "Ingresar"}
            </button>

            <div className="text-center mt-3 border-top pt-3">
              <span className="text-muted">¿No tienes cuenta? </span>
              <button
                type="button"
                className="btn btn-link text-decoration-none fw-bold p-0"
                onClick={() => setShowRegister(true)}
              >
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;