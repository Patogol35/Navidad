import { useRef, useEffect } from "react";

export default function SnowCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const shapes = ["❄️", "✦", "✧", "✺"];
    const flakes = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 3 + 1,
      d: Math.random() + 1,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));

    const update = () => {
      ctx.clearRect(0, 0, width, height);
      flakes.forEach(f => {
        ctx.font = `${f.r * 6}px serif`;
        ctx.fillText(f.shape, f.x, f.y);
        f.y += Math.pow(f.d, 2) + 1;
        if (f.y > height) { f.y = 0; f.x = Math.random() * width; }
      });
      requestAnimationFrame(update);
    };
    update();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: 0, left: 0, zIndex: 0 }}
    />
  );
}
