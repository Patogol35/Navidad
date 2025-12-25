import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="card">
        <h1 className="title">🎄 ¡Feliz Navidad! 🎅</h1>

        <p className="subtitle">
          Y un próspero 2026
        </p>

        <p className="message">
          Les desea <strong>Jorge Patricio Santamaría Cherrez</strong> ✨  
          <br />
          Que esta Navidad esté llena de paz, amor y esperanza ❤️
        </p>

        <nav className="nav-menu">
          <Link to="/nuevo-ano" className="btn-nav">
            🎆 Recibir el Año Nuevo
          </Link>
        </nav>
      </div>

      <footer className="footer">
        ❄️ Felices Fiestas ❄️
      </footer>
    </div>
  );
}
