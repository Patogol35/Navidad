import { useRef, useState } from "react";
import "./Home.css";

export default function Home() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    playing ? audioRef.current.pause() : audioRef.current.play();
    setPlaying(!playing);
  };

  return (
    <>
      {/* NIEVE */}
      <div className="snow-mobile"></div>

      {/* ESTRELLAS */}
      <div className="floating-stars">
        <div className="star">✨</div>
        <div className="star">✨</div>
        <div className="star">✨</div>
        <div className="star">✨</div>
      </div>

      {/* MÚSICA */}
      <audio ref={audioRef} loop src="/christmas.mp3" />

      <div className="home-container">
        <div className="home-card">

          {/* LUCES */}
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

          {/* ÁRBOL */}
          <div className="christmas-tree">
            <span className="tree-star"></span>
            ⭐
          </div>

          

          {/* SUBTÍTULO */}
          <h2 className="subtitle">
            y un próspero 2026
          </h2>

          <p className="message">Les desea</p>

          <p className="name">
            Jorge Patricio Santamaría Cherrez
          </p>

          <p className="blessing">
            Que estas fiestas estén llenas de paz, amor y esperanza ✨
          </p>

          <footer className="footer">
            ❄️ Felices Fiestas ❄️
          </footer>

          <button className="music-btn" onClick={toggleMusic}>
  {playing ? (
    "🔇 Pausar música"
  ) : (
    <>
      <span className="music-icon">🎶</span>
      Música navideña
    </>
  )}
</button>

        </div>
      </div>
    </>
  );
              }
