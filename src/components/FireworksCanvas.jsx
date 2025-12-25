import { useEffect, useRef } from "react";

export default function FireworksCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const explosions = [];
    const spawn = setInterval(() => {
      explosions.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        radius: 0,
        color: `hsl(${Math.random() * 360},100%,70%)`
      });
    }, 700);

    let anim;
    const animate = () => {
      anim = requestAnimationFrame(animate);
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      explosions.forEach(e => {
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fillStyle = e.color;
        ctx.fill();
        e.radius += 2;
      });
    };
    animate();

    return () => {
      clearInterval(spawn);
      cancelAnimationFrame(anim);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
    />
  );
}
