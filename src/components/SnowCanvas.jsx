import { useRef, useEffect } from "react";

export default function SnowCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width, height;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("orientationchange", resize);

    const isMobile = window.innerWidth < 768;

    const shapes = ["❄️", "✦"];  // ⬅️ menos variedad
    const flakeCount = isMobile ? 80 : 130; // ⬅️ clave

    const flakes = Array.from({ length: flakeCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      d: Math.random() + 0.5,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      flakes.forEach(f => {
        ctx.font = `${f.r * 6}px serif`;
        ctx.fillText(f.shape, f.x, f.y);

        f.y += f.d + 0.5;   // ⬅️ movimiento simple

        if (f.y > height) {
          f.y = -10;
          f.x = Math.random() * width;
        }
      });

      requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
