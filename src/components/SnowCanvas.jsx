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
    const flakeCount = isMobile ? 70 : 120;

    const flakes = Array.from({ length: flakeCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.5 + 1,        // tamaños variados
      speed: Math.random() * 0.8 + 0.4,  // caída suave
      drift: Math.random() * 0.6 - 0.3,  // movimiento lateral
      opacity: Math.random() * 0.4 + 0.4,
    }));

    const drawFlake = (f) => {
      const gradient = ctx.createRadialGradient(
        f.x, f.y, 0,
        f.x, f.y, f.r * 2
      );
      gradient.addColorStop(0, `rgba(255,255,255,${f.opacity})`);
      gradient.addColorStop(1, "rgba(255,255,255,0)");

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(f.x, f.y, f.r * 2, 0, Math.PI * 2);
      ctx.fill();
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      flakes.forEach(f => {
        drawFlake(f);

        f.y += f.speed;
        f.x += Math.sin(f.y * 0.01) * f.drift;

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
