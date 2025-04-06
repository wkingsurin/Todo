import "./ModalAlert.scss";

export default function ModalAlert(props) {
  const { newTask } = props;

  return (
    <div
      className="modal notification"
      style={{
        position: "absolute",
        left: `${newTask.alert.position.x}px`,
        top: `${newTask.alert.position.y}px`,
        zIndex: 2,
        border: '1px solid black'
      }}
    >
      <div className="content">
        <p className="text">{newTask.alert.text}</p>
      </div>
    </div>
  );
}
