import { useRef, useEffect } from "react";

export default function SnowCanvas() {
  const canvasRef = useRef(null);
  const isTouching = useRef(false);

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

    const isMobile = width < 768;
    const flakeCount = isMobile ? 80 : 130;

    const flakes = Array.from({ length: flakeCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.8,
      speed: Math.random() * 0.6 + 0.4,
      drift: Math.random() * 0.4 - 0.2
    }));

    let animationId;

    const update = () => {
      if (!isTouching.current) {
        ctx.clearRect(0, 0, width, height);

        flakes.forEach(f => {
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.85)";
          ctx.fill();

          f.y += f.speed;
          f.x += f.drift;

          if (f.y > height) {
            f.y = -5;
            f.x = Math.random() * width;
          }

          if (f.x > width) f.x = 0;
          if (f.x < 0) f.x = width;
        });
      }

      animationId = requestAnimationFrame(update);
    };

    update();

    const onTouchStart = () => {
      isTouching.current = true;
    };

    const onTouchEnd = () => {
      isTouching.current = false;
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
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
