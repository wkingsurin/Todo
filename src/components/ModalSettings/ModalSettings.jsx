export default function ModalSettings(props) {
  const { task, Chevron } = props;

  return (
    <div
      className="modal settings extended-modal"
      style={{
        position: "absolute",
        left: `${task.dateModal.position.x}px`,
        top: `${task.dateModal.position.y}px`,
        zIndex: 2,
        border: "1px solid #e2e2e2",
      }}
    >
      <div className="content">
        <div className="block calendar">
          <div className="period">
            <button className="btn">
              <Chevron rotate={-90}></Chevron>
            </button>
            <p className="text">Март</p>
            <button className="btn">
              <Chevron rotate={90}></Chevron>
            </button>
          </div>
          <div className="period">
            <button className="btn">
              <Chevron rotate={-90}></Chevron>
            </button>
            <p className="text">2025</p>
            <button className="btn">
              <Chevron rotate={90}></Chevron>
            </button>
          </div>
          <table className="calendar-table">
            <tbody>
              <tr className="table-row">
                <th className="table-heading">Пн</th>
                <th className="table-heading">Вт</th>
                <th className="table-heading">Ср</th>
                <th className="table-heading">Чт</th>
                <th className="table-heading">Пт</th>
                <th className="table-heading">Сб</th>
                <th className="table-heading">Вс</th>
              </tr>
              <tr className="table-row">
                <td className="table-data">1</td>
                <td className="table-data">2</td>
                <td className="table-data">3</td>
                <td className="table-data">4</td>
                <td className="table-data">5</td>
                <td className="table-data">6</td>
                <td className="table-data">7</td>
              </tr>
              <tr className="table-row">
                <td className="table-data">8</td>
                <td className="table-data">9</td>
                <td className="table-data">10</td>
                <td className="table-data">11</td>
                <td className="table-data">12</td>
                <td className="table-data">13</td>
                <td className="table-data">14</td>
              </tr>
              <tr className="table-row">
                <td className="table-data">15</td>
                <td className="table-data">16</td>
                <td className="table-data">17</td>
                <td className="table-data">18</td>
                <td className="table-data">19</td>
                <td className="table-data">20</td>
                <td className="table-data">21</td>
              </tr>
              <tr className="table-row">
                <td className="table-data">22</td>
                <td className="table-data">23</td>
                <td className="table-data">24</td>
                <td className="table-data">25</td>
                <td className="table-data">26</td>
                <td className="table-data">27</td>
                <td className="table-data">28</td>
              </tr>
              <tr className="table-row">
                <td className="table-data">29</td>
                <td className="table-data">30</td>
                <td className="table-data">31</td>
                <td className="table-data">1</td>
                <td className="table-data">2</td>
                <td className="table-data">3</td>
                <td className="table-data">4</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="block data">
          <div className="data-row">
            <label htmlFor="date" className="data-name">
              Дата:
            </label>
            <input
              type="text"
              id="date"
              className="data-value"
              placeholder="__.__.__"
            />
          </div>
          <div className="data-row">
            <label htmlFor="time" className="data-name">
              Время:
            </label>
            <input
              type="text"
              id="time"
              className="data-value"
              placeholder="00:00"
            />
          </div>
        </div>
        <button className="btn save-btn">Save</button>
      </div>
    </div>
  );
}
