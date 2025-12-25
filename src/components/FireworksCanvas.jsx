import { useEffect, useRef } from "react";

export default function FireworksCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    const explosions = [];

    setInterval(() => {
      explosions.push({
        x: Math.random()*innerWidth,
        y: Math.random()*innerHeight*0.5,
        radius: 0,
        color: `hsl(${Math.random()*360},100%,70%)`,
      });
    }, 700);

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0,0,canvas.width,canvas.height);

      explosions.forEach(e=>{
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI*2);
        ctx.fillStyle = e.color;
        ctx.fill();
        e.radius += 2;
      });

      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <canvas ref={canvasRef}
      style={{position:"fixed",top:0,left:0,zIndex:0}}
    />
  );
            }
