import { correctDate, months } from "../../assets/utils";

export default function ModalSettings(props) {
  const { task, setContent, closeDateModal, Chevron } = props;
  const dateData = task.dateModal.data;

  function typeDate(e) {
    const text = e.target.value;

    setContent((prev) => {
      return {
        ...prev,
        newTask: {
          ...prev.newTask,
          dateModal: {
            ...prev.newTask.dateModal,
            dateInput: text,
          },
        },
      };
    });
  }

  function typeTime(e) {
    const text = e.target.value;
    let hours;
    let minutes;

    if (text.length == 5) {
      [hours, minutes] = text.split(":");
    }

    setContent((prev) => {
      const date = task.dateModal.date;

      if (hours && minutes) {
        date.setHours(Number(hours));
        date.setMinutes(Number(minutes));
        date.setSeconds(0)
        date.setMilliseconds(0)
      }

      return {
        ...prev,
        newTask: {
          ...prev.newTask,
          dateModal: {
            ...prev.newTask.dateModal,
            timeInput: text,
            data: {
              ...prev.newTask.dateModal.data,
              hours: Number(hours),
              minutes: Number(minutes),
            },
            date,
          },
        },
      };
    });
  }

  function selectDay(e) {
    if (!e.target.closest("td")) {
      return;
    }

    const dayElement = e.target.closest("td");

    setContent((prev) => {
      const date = task.dateModal.date;
      date.setDate(Number(dayElement.textContent));

      return {
        ...prev,
        newTask: {
          ...prev.newTask,
          dateModal: {
            ...prev.newTask.dateModal,
            date,
            dateInput: correctDate(date),
            data: {
              ...prev.newTask.dateModal.data,
              day: Number(dayElement.textContent),
            },
          },
        },
      };
    });
  }

  function prevMonth(e) {
    const date = task.dateModal.date;
    const now = Date.now();

    if (date < now) {
      console.log(`Невозможно установить прошедшую дату`);
      return;
    }

    date.setMonth(date.getMonth() - 1);

    setContent((prev) => {
      return {
        ...prev,
        newTask: {
          ...prev.newTask,
          dateModal: {
            ...prev.newTask.dateModal,
            date,
            data: {
              ...prev.newTask.dateModal.data,
              month: date.getMonth(),
              year: date.getFullYear(),
            },
            dateInput: correctDate(date),
          },
        },
      };
    });
  }

  function nextMonth(e) {
    const date = task.dateModal.date;

    date.setMonth(date.getMonth() + 1);

    setContent((prev) => {
      return {
        ...prev,
        newTask: {
          ...prev.newTask,
          dateModal: {
            ...prev.newTask.dateModal,
            date,
            data: {
              ...prev.newTask.dateModal.data,
              month: date.getMonth(),
              year: date.getFullYear(),
            },
            dateInput: correctDate(date),
          },
        },
      };
    });
  }

  function prevYear(e) {
    const date = task.dateModal.date;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    if (date.getFullYear() <= currentYear) {
      console.log(`Невозможно установить прошедшую дату`);
      return;
    }

    date.setFullYear(date.getFullYear() - 1);

    if (date.getMonth() < currentMonth) {
      date.setMonth(currentMonth);
    }

    setContent((prev) => {
      return {
        ...prev,
        newTask: {
          ...prev.newTask,
          dateModal: {
            ...prev.newTask.dateModal,
            date,
            data: {
              ...prev.newTask.dateModal.data,
              year: date.getFullYear(),
              month: date.getMonth(),
            },
            dateInput: correctDate(date),
          },
        },
      };
    });
  }

  function nextYear(e) {
    const date = task.dateModal.date;

    date.setFullYear(date.getFullYear() + 1);

    setContent((prev) => {
      return {
        ...prev,
        newTask: {
          ...prev.newTask,
          dateModal: {
            ...prev.newTask.dateModal,
            date,
            data: { ...prev.newTask.dateModal.data, year: date.getFullYear() },
            dateInput: correctDate(date),
          },
        },
      };
    });
  }

  function saveDate(e) {
    if (
      !Number.isFinite(dateData.minutes) ||
      !Number.isFinite(dateData.hours) ||
      !Number.isFinite(dateData.day) ||
      !Number.isFinite(dateData.month) ||
      !Number.isFinite(dateData.year)
    ) {
      // console.log(
      //   `minutes: ${Number.isFinite(
      //     dateData.minutes
      //   )}\nhours: ${Number.isFinite(dateData.hours)}\nday: ${Number.isFinite(
      //     dateData.day
      //   )}\nmonth: ${Number.isFinite(dateData.month)}\nyear: ${Number.isFinite(
      //     dateData.year
      //   )}`
      // );
      console.log(`Невозможно сохранить, вы указали не все данные!`);
      return;
    }

    closeDateModal();
  }

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
            <button className="btn" onClick={(e) => prevMonth(e)}>
              <Chevron rotate={-90}></Chevron>
            </button>
            <p className="text">{months[dateData.month]}</p>
            <button className="btn" onClick={(e) => nextMonth(e)}>
              <Chevron rotate={90}></Chevron>
            </button>
          </div>
          <div className="period">
            <button className="btn" onClick={(e) => prevYear(e)}>
              <Chevron rotate={-90}></Chevron>
            </button>
            <p className="text">{dateData.year}</p>
            <button className="btn" onClick={(e) => nextYear(e)}>
              <Chevron rotate={90}></Chevron>
            </button>
          </div>
          <table className="calendar-table" onClick={(e) => selectDay(e)}>
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
              onChange={(e) => typeDate(e)}
              value={task.dateModal.dateInput}
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
              placeholder="--:--"
              onChange={(e) => typeTime(e)}
              // value={task.dateModal.timeInput}
            />
          </div>
        </div>
        <button className="btn save-btn" onClick={(e) => saveDate(e)}>
          Save
        </button>
      </div>
    </div>
  );
}
