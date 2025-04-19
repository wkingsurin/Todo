import { months, initDays, updateDays, counter } from "../../utils/utils";
import { Chevron } from "../SVG";
import { useDateModal } from "../../features/dateModal/useDateModal";
import { useEffect } from "react";

export default function ModalSettings({ className, ref }) {
	const { dateModal: modal, handlers, dateModalDispatch } = useDateModal();
	const dateData = modal.data;

	const handleKeyDown = (e) => {
		const allowedKeys = [
			"Backspace",
			"Delete",
			"ArrowLeft",
			"ArrowRight",
			"Tab",
		];

		if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
			e.preventDefault();
		}
	};

	console.log(`modal`, modal);

	useEffect(() => {
		dateModalDispatch({ type: "UPDATE_DAYS" });
	}, []);

	return (
		<div
			className={className}
			style={{
				position: "absolute",
				left: `${modal.position.x}px`,
				top: `${modal.position.y}px`,
				zIndex: 2,
			}}
			ref={ref}
		>
			<div className="content">
				<div className="block calendar">
					<div className="period">
						<button
							className="btn"
							disabled={
								modal.data.month === new Date().getMonth() &&
								modal.data.year === new Date().getFullYear()
							}
							onClick={(e) => {
								handlers.prevMonth(e.target);
							}}
						>
							<Chevron rotate={-90}></Chevron>
						</button>
						<p className="text">{months[dateData.month]}</p>
						<button
							className="btn"
							onClick={(e) => handlers.nextMonth(e.target)}
						>
							<Chevron rotate={90}></Chevron>
						</button>
					</div>
					<div className="period">
						<button
							className="btn"
							disabled={modal.data.year === new Date().getFullYear()}
							onClick={(e) => handlers.prevYear(e.target)}
						>
							<Chevron rotate={-90}></Chevron>
						</button>
						<p className="text">{dateData.year}</p>
						<button
							className="btn"
							onClick={(e) => handlers.nextYear(e.target)}
						>
							<Chevron rotate={90}></Chevron>
						</button>
					</div>
					<table
						className="calendar-table"
						onClick={(e) => handlers.selectDay(e.target)}
					>
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
							{modal.days.map((week, index) => {
								return (
									<tr className="table-row" key={index}>
										{week.map((elem) => {
											return (
												<td
													className="table-data"
													key={elem.id}
													aria-disabled={!elem.open}
													id={elem.id}
												>
													{elem.date.getDate()}
												</td>
											);
										})}
									</tr>
								);
							})}
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
							maxLength={10}
							onKeyDown={(e) => handleKeyDown(e)}
							onChange={(e) => {
								handlers.typeDate(e.target);
							}}
							value={modal.dateInput}
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
							onChange={(e) => handlers.typeTime(e.target)}
							value={modal.timeInput}
						/>
					</div>
				</div>
				<button
					className="btn save-btn"
					onClick={(e) => handlers.saveDate(e.target, modal.timeInput)}
				>
					Save
				</button>
			</div>
		</div>
	);
}
