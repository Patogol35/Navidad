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

    // Offscreen canvas para dibujar los copos solo una vez
    const flakeCanvas = document.createElement("canvas");
    const flakeCtx = flakeCanvas.getContext("2d");
    const flakeSize = 4;
    flakeCanvas.width = flakeSize * 2;
    flakeCanvas.height = flakeSize * 2;

    flakeCtx.fillStyle = "rgba(255,255,255,0.85)";
    flakeCtx.beginPath();
    flakeCtx.arc(flakeSize, flakeSize, flakeSize, 0, Math.PI * 2);
    flakeCtx.fill();

    const flakes = Array.from({ length: flakeCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: Math.random() * 1 + 0.5,
      drift: Math.random() * 1 + 0.5,
      angle: Math.random() * Math.PI * 2
    }));

    let animationId;

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      flakes.forEach(f => {
        f.angle += 0.01;
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
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none"
      }}
    />
  );
}
