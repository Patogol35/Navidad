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

    const shapes = ["❄️"]; // 🔥 SOLO UNO
    const flakeCount = isMobile ? 45 : 70;

    const flakes = Array.from({ length: flakeCount }).map(() => {
      const size = Math.random() * 3 + 1;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        speed: Math.random() * 1.1 + 0.6,
        shape: shapes[0],
        font: `${size * 6}px serif`,
      };
    });

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      flakes.forEach(f => {
        ctx.font = f.font;
        ctx.fillText(f.shape, f.x, f.y);
        f.y += f.speed;

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
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
