import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="card">
        <h1 className="title">🎄 Feliz Navidad 🎅</h1>

        <p className="subtitle">
          Que la magia de la Navidad llene tu hogar de paz, amor y esperanza ✨
        </p>

        <p className="message">
          Disfruta las luces, la nieve y la música 🎶  
          Hecho con React y mucho espíritu navideño ❤️
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
