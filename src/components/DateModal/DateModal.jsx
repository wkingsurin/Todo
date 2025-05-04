import { useEffect, useRef } from "react";

import { useDateModal } from "../../features/dateModal/useDateModal";

import Button from "../Button";
import { Chevron } from "../SVG";

import { highlightInvalidField, isValidTime } from "../../utils/utils";
import { months } from "../../constants/constants";

export default function DateModal({ className, ref }) {
	const { dateModal, handlers, dateModalDispatch } = useDateModal();
	const dateData = dateModal.data;

	const dateInputRef = useRef(null);
	const timeInputRef = useRef(null);

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

	useEffect(() => {
		dateModalDispatch({ type: "UPDATE_DAYS" });
	}, []);

	return (
		<div
			className={className}
			style={{
				position: "absolute",
				left: `${dateModal.position.x}px`,
				top: `${dateModal.position.y}px`,
				zIndex: 2,
			}}
			ref={ref}
		>
			<div className="content">
				<div className="block calendar">
					<div className="period">
						<Button
							disabled={
								dateModal.data.month === new Date().getMonth() &&
								dateModal.data.year === new Date().getFullYear()
							}
							onClick={(e) => {
								handlers.prevMonth(e.target);
							}}
						>
							<Chevron rotate={-90}></Chevron>
						</Button>
						<p className="text">
							{months[dateData.month] !== undefined
								? months[dateData.month]
								: months[new Date().getMonth()]}
						</p>
						<Button
							className="btn"
							onClick={(e) => handlers.nextMonth(e.target)}
						>
							<Chevron rotate={90}></Chevron>
						</Button>
					</div>
					<div className="period">
						<Button
							disabled={dateModal.data.year === new Date().getFullYear()}
							onClick={(e) => handlers.prevYear(e.target)}
						>
							<Chevron rotate={-90}></Chevron>
						</Button>
						<p className="text">
							{dateData.year !== null
								? dateData.year
								: new Date().getFullYear()}
						</p>
						<Button onClick={(e) => handlers.nextYear(e.target)}>
							<Chevron rotate={90}></Chevron>
						</Button>
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
							{dateModal.days.map((week, index) => {
								return (
									<tr className="table-row" key={index}>
										{week.map((elem) => {
											return (
												<td
													className="table-data"
													id={elem.id}
													key={elem.id}
													aria-disabled={!elem.open}
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
							className={`data-value`}
							placeholder="__.__.__"
							minLength={10}
							maxLength={10}
							onKeyDown={(e) => handleKeyDown(e)}
							onChange={(e) => {
								handlers.typeDate(e.target);
							}}
							value={dateModal.dateInput}
							ref={dateInputRef}
						/>
					</div>
					<div className="data-row">
						<label htmlFor="time" className="data-name">
							Время:
						</label>
						<input
							type="text"
							id="time"
							className={`data-value`}
							placeholder="--:--"
							minLength={5}
							maxLength={5}
							onChange={(e) => {
								handlers.typeTime(e.target);
							}}
							value={dateModal.timeInput}
							ref={timeInputRef}
						/>
					</div>
				</div>
				<Button
					className="save-btn"
					disabled={!dateModal.dateInput || !dateModal.timeInput}
					onClick={(e) => {
						highlightInvalidField(dateInputRef);
						highlightInvalidField(timeInputRef);

						if (isValidTime(timeInputRef.current.value)) {
							handlers.saveDate(e.target, dateModal.timeInput);
						}
					}}
				>
					Save
				</Button>
			</div>
		</div>
	);
}
