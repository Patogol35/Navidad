import "./lights.css";

export default function Lights() {
  const bulbs = Array.from({ length: 30 });

  return (
    <ul className="bulbs">
      {bulbs.map((_, i) => (
        <li className="bulb" key={i}></li>
      ))}
    </ul>
  );
}
