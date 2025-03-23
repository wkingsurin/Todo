export default function ModalSettings(props) {
  const { data } = props;

  return (
    <div
      className="modal settings"
      style={{
        position: "absolute",
        left: `${data.position.x}px`,
        top: `${data.position.y}px`,
        zIndex: 2,
        border: '1px solid black'
      }}
    >
      <div className="content">
        <div className="line">
          <p className="property">Date:</p>
          <p className="value">{data.date}</p>
        </div>
        <div className="line">
          <p className="property">Time:</p>
          <p className="value">{data.time}</p>
        </div>
      </div>
    </div>
  );
}
