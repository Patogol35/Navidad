import { motion } from "framer-motion";
import { Howl } from "howler";

const hoho = new Howl({
  src: ["https://www.myinstants.com/media/sounds/ho-ho-ho.mp3"],
});

export default function SantaFly() {
  return (
    <motion.img
      src="https://i.ibb.co/1K5C0yN/santa-fly.png"
      alt="Santa volando"
      style={{ position: "fixed", top: "20%", width: "250px", zIndex: 50 }}
      animate={{ x: ["-300px", "110%"] }}
      transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      onClick={() => hoho.play()}
    />
  );
}
