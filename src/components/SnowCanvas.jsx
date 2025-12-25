import { useRef, useEffect } from "react";

export default function SnowCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });

    let width, height;
    let scrollY = window.scrollY;
    let lastTime = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();

    window.addEventListener("resize", resize);
    window.addEventListener(
      "scroll",
      () => (scrollY = window.scrollY),
      { passive: true }
    );

    const flakeCount = 90;
    const flakeSize = 3;

    // ❄️ Copo pre-renderizado (GPU friendly)
    const flakeCanvas = document.createElement("canvas");
    const fctx = flakeCanvas.getContext("2d");
    flakeCanvas.width = flakeCanvas.height = flakeSize * 2;

    fctx.fillStyle = "rgba(255,255,255,0.9)";
    fctx.beginPath();
    fctx.arc(flakeSize, flakeSize, flakeSize, 0, Math.PI * 2);
    fctx.fill();

    const flakes = Array.from({ length: flakeCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: Math.random() * 0.7 + 0.4,
      drift: Math.random() * 0.6 + 0.2,
      angle: Math.random() * Math.PI * 2,
      depth: Math.random() * 0.4 + 0.6, // parallax
    }));

    const animate = (time) => {
      // FPS adaptativo (~60fps)
      if (time - lastTime < 16) {
        requestAnimationFrame(animate);
        return;
      }
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (const f of flakes) {
        f.angle += 0.004;
        f.y += f.speed;
        f.x += Math.sin(f.angle) * f.drift;

        const yParallax = f.y - scrollY * f.depth * 0.08;

        if (f.y > height + 20) f.y = -20;
        if (f.x > width) f.x = 0;
        if (f.x < 0) f.x = width;

        ctx.drawImage(flakeCanvas, f.x, yParallax);
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        transform: "translateZ(0)",
      }}
    />
  );
}
