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

    const isMobile = width < 768;
    const flakeCount = isMobile ? 50 : 100;

    // Canvas auxiliar para mejorar rendimiento (GPU)
    const flakeCanvas = document.createElement("canvas");
    const flakeCtx = flakeCanvas.getContext("2d");
    const flakeSize = 3;
    flakeCanvas.width = flakeSize * 2;
    flakeCanvas.height = flakeSize * 2;

    flakeCtx.fillStyle = "rgba(255,255,255,0.9)";
    flakeCtx.beginPath();
    flakeCtx.arc(flakeSize, flakeSize, flakeSize, 0, Math.PI * 2);
    flakeCtx.fill();

    const flakes = Array.from({ length: flakeCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: Math.random() * 1.1 + 0.3,
      drift: Math.random() * 0.8 + 0.2,
      angle: Math.random() * Math.PI * 2,
    }));

    let animationId;

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      flakes.forEach((f) => {
        f.angle += 0.006;
        f.y += f.speed;
        f.x += Math.sin(f.angle) * f.drift;

        if (f.y > height) f.y = -flakeSize;
        if (f.x > width) f.x = 0;
        if (f.x < 0) f.x = width;

        ctx.drawImage(flakeCanvas, f.x, f.y);
      });

      animationId = requestAnimationFrame(update);
    };

    update();

    // 🧠 Pausar animación mientras hay scroll (fluidez total)
    let scrollTimeout;
    const onScroll = () => {
      cancelAnimationFrame(animationId);
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        update();
      }, 80);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        pointerEvents: "none",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
    />
  );
}
