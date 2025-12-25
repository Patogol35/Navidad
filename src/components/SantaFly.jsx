import { motion } from "framer-motion";
import { Howl } from "howler";
import santa from "../assets/Santa.png";

const hoho = new Howl({
  src: ["https://www.myinstants.com/media/sounds/ho-ho-ho.mp3"]
});

export default function SantaFly() {
  return (
    <motion.img
      src={santa}
      alt="Santa volando"
      style={{
        position: "fixed",
        top: "45%",          // ⬇️ más abajo
        width: "150px",      // ⬅️ más pequeño
        zIndex: 2,           // ⬅️ debajo del texto
        pointerEvents: "auto"
      }}
      animate={{ x: ["-200px", "110%"] }}
      transition={{ duration: 10, repeat: Infinity, delay: 3 }}
      onClick={() => hoho.play()}
    />
  );
}
