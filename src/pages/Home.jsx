import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="title">🎄 Navidad React 🎅</h1>
      <p className="subtitle">¡Bienvenido! Disfruta la magia navideña ✨</p>

      <nav className="nav-menu">
        <Link to="/juego" className="btn-nav">🎮 Mini Juego</Link>
        <Link to="/nuevo-ano" className="btn-nav">🎆 Año Nuevo</Link>
      </nav>

      <footer className="footer">
        Hecho con ❤️ y React
      </footer>
    </div>
  );
}
