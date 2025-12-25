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
    window.addEventListener("orientationchange", resize); // 🔥 clave móvil

    const shapes = ["❄️", "✦", "✧", "✺"];
    const flakes = Array.from({ length: 150 }).map(() => ({
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
        width: "100vw",     // 🔥 fuerza ancho
        height: "100vh",    // 🔥 fuerza alto
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
