import { motion } from "framer-motion";
import santa from "../assets/Santa.png";

export default function SantaFly() {
  return (
    <motion.img
      src={santa}
      alt="Santa volando"
      style={{
        position: "fixed",
        top: "80px",          // ⬆️ arriba, debajo de las luces
        width: "120px",
        height: "auto",
        zIndex: 1,            // ⬅️ debajo del texto
        pointerEvents: "none",
        imageRendering: "auto",
        opacity: 0.95,
        filter: "drop-shadow(0 0 4px rgba(255,255,255,0.5))",
      }}
      animate={{ x: ["-150px", "110%"] }}
      transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
    />
  );
}
