import { useState } from "react";

function Register({ setShowRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find((user) => user.username === username);

    if (existingUser) {
      alert("El usuario ya existe");
      return;
    }

    users.push({
      username,
      password,
    });

    localStorage.setItem("users", JSON.stringify(users));
    alert("Usuario registrado");
    setShowRegister(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card glass-card p-4 shadow-lg animate-fade-in" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card-body">
          <div className="text-center mb-4">
            <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "60px", height: "60px", fontSize: "24px" }}>
              <i className="bi bi-person-plus-fill"></i>
            </div>
            <h2 className="card-title fw-bold">Registro</h2>
            <p className="text-muted">Crea una cuenta para empezar</p>
          </div>

          <form onSubmit={handleRegister}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingRegUsername"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="floatingRegUsername">Usuario</label>
            </div>

            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                id="floatingRegPassword"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="floatingRegPassword">Contraseña</label>
            </div>

            <button type="submit" className="btn btn-success w-100 mb-3 py-2" style={{ borderRadius: "0.5rem" }}>
              <i className="bi bi-check-circle me-2"></i> Registrarse
            </button>

            <div className="text-center mt-3 border-top pt-3">
              <span className="text-muted">¿Ya tienes cuenta? </span>
              <button
                type="button"
                className="btn btn-link text-decoration-none fw-bold p-0"
                onClick={() => setShowRegister(false)}
              >
                Volver al Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;