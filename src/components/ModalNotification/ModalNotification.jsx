import "./ModalNotification.scss";

export default function ModalNotification(props) {
  const { newTask } = props;

  return (
    <div
      className="modal notification"
      style={{
        position: "absolute",
        left: `${newTask.notification.position.x}px`,
        top: `${newTask.notification.position.y}px`,
        zIndex: 2,
        border: '1px solid black'
      }}
    >
      <div className="content">
        <p className="text">{newTask.notification.text}</p>
      </div>
    </div>
  );
}
