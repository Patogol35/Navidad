import { useRef, useEffect } from "react";

export default function SnowCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w, h;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("orientationchange", resize);

    const isMobile = window.innerWidth < 768;
    const flakeCount = isMobile ? 120 : 200;

    const flakes = Array.from({ length: flakeCount }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1,
      speed: Math.random() * 1.2 + 0.5,
      drift: Math.random() * 0.6 - 0.3,
      opacity: Math.random() * 0.5 + 0.5,
    }));

    const drawFlake = (f) => {
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${f.opacity})`;
      ctx.fill();
    };

    const update = () => {
      ctx.clearRect(0, 0, w, h);

      flakes.forEach(f => {
        drawFlake(f);

        f.y += f.speed;
        f.x += f.drift;

        if (f.y > h) {
          f.y = -5;
          f.x = Math.random() * w;
        }
        if (f.x > w) f.x = 0;
        if (f.x < 0) f.x = w;
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
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
