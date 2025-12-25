import { useRef, useState } from "react";
import "./Home.css";

export default function Home() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <>
      {/* NIEVE */}
      <div className="snow-mobile"></div>

      {/* MÚSICA */}
      <audio
        ref={audioRef}
        loop
        src="/christmas.mp3"
      />

      <div className="home-container">
        <div className="home-card">

          {/* LUCES NAVIDEÑAS */}
          <div className="christmas-lights">
            <div className="light red"></div>
            <div className="light green"></div>
            <div className="light yellow"></div>
            <div className="light blue"></div>
            <div className="light red"></div>
            <div className="light green"></div>
          </div>

          {/* TÍTULO */}
          <h1 className="title">
            Feliz Navidad <span>🎄</span><span>🎅</span>
          </h1>

          {/* ÁRBOL ANIMADO */}
          <div className="christmas-tree">
            <span className="tree-star">⭐</span>
            🎄
          </div>

          {/* SUBTÍTULO */}
          <h2 className="subtitle">
            y un próspero 2026
          </h2>

          {/* TEXTO */}
          <p className="message">Les desea</p>

          <p className="name">
            Jorge Patricio Santamaría Cherrez
          </p>

          <p className="blessing">
            Que estas fiestas estén llenas de paz, amor y esperanza ✨
          </p>

          {/* FOOTER */}
          <footer className="footer">
            ❄️ Felices Fiestas ❄️
          </footer>

          {/* BOTÓN MÚSICA */}
          <button className="music-btn" onClick={toggleMusic}>
            {playing ? "🔇 Pausar música" : "🎶 Música navideña"}
          </button>

        </div>
      </div>
    </>
  );
      }
