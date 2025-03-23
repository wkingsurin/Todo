export default function ModalSettings(props) {
  const { data } = props;
  const date = data.date ? data.date : null;
  const time = data.time ? data.time : null;

  return (
    <div
      className="modal settings"
      style={{
        position: "absolute",
        left: `${data.position.x}px`,
        top: `${data.position.y}px`,
        zIndex: 2,
        border: "1px solid black",
      }}
    >
      <div className="content">
        <div className="line">
          <p className="property">Date:</p>
          {date ? (
            <p className="value">{date}</p>
          ) : (
            <p className="value">empty</p>
          )}
        </div>
        <div className="line">
          <p className="property">Time:</p>
          {time ? (
            <p className="value">{time}</p>
          ) : (
            <p className="value">empty</p>
          )}
        </div>
      </div>
    </div>
  );
}
