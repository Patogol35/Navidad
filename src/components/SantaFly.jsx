import { motion } from "framer-motion";
import santa from "../assets/Santa.png";

export default function SantaFly() {
  return (
    <motion.img
      src={santa}
      alt="Santa volando"
      style={{
        position: "fixed",
        top: "45%",
        width: "140px",          // ⬅️ NO lo escales mucho
        height: "auto",
        zIndex: 2,
        imageRendering: "auto", // 🔥 suavizado
        filter: "drop-shadow(0 0 6px rgba(255,255,255,0.6))",
        pointerEvents: "none",
      }}
      animate={{ x: ["-200px", "110%"] }}
      transition={{ duration: 10, repeat: Infinity, delay: 3 }}
    />
  );
}
