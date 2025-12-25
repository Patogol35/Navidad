import { useEffect, useState } from "react";

export default function Game() {
  const [gifts, setGifts] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const spawn = setInterval(() => {
      setGifts(prev => [...prev, {
        x: Math.random() * window.innerWidth,
        y: -50,
        id: crypto.randomUUID()
      }]);
    }, 1000);

    return () => clearInterval(spawn);
  }, []);

  useEffect(() => {
    const drop = setInterval(() => {
      setGifts(prev =>
        prev.map(g => ({ ...g, y: g.y + 5 }))
          .filter(g => g.y < window.innerHeight)
      );
    }, 40);

    return () => clearInterval(drop);
  }, []);

  const catchGift = (id) => {
    setScore(s => s + 1);
    setGifts(prev => prev.filter(g => g.id !== id));
  };

  return (
    <div style={{ textAlign: "center", marginTop: 80, color: "#fff" }}>
      <h1>🎁 Puntaje: {score}</h1>
      {gifts.map(g => (
        <div
          key={g.id}
          onClick={() => catchGift(g.id)}
          style={{
            width: 40, height: 40,
            position: "absolute",
            background: "red",
            borderRadius: 8,
            top: g.y, left: g.x,
            cursor: "pointer"
          }}
        ></div>
      ))}
    </div>
  );
}
