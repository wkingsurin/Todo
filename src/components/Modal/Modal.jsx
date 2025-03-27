export default function Modal({ position }) {
  return (
    <div
      className="modal notification"
      style={{ position: "absolute", left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div className="content">
        <p className="text">Task saved!</p>
      </div>
    </div>
  );
}
