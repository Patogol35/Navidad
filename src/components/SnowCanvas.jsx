import { useRef, useEffect } from "react";

export default function SnowCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const flakeCount = 120;
    const flakes = Array.from({ length: flakeCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 3 + 2, // tamaño variable
      speed: Math.random() * 1 + 0.5,
      drift: Math.random() * 0.8 - 0.4,
      angle: Math.random() * Math.PI * 2
    }));

    let animationId;

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      flakes.forEach(f => {
        f.angle += 0.01;
        f.y += f.speed;
        f.x += Math.sin(f.angle) * f.drift;

        if (f.y > height) f.y = -f.r;
        if (f.x > width) f.x = 0;
        if (f.x < 0) f.x = width;

        // gradiente radial para brillo
        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r);
        grad.addColorStop(0, "rgba(255,255,255,0.9)");
        grad.addColorStop(0.8, "rgba(255,255,255,0.3)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
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
        pointerEvents: "none",
        zIndex: -1,
        willChange: "transform",
      }}
    />
  );
            }
