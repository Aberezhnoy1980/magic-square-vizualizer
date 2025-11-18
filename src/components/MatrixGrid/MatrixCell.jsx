import "./MatrixGrid.css";

const MatrixCell = ({ value, row, col, isCurrent, currentStep, color }) => {
	const getCellContent = () => {
		if (value === 0) return "";
		return value;
	};

	const getCellTitle = () => {
		if (isCurrent) return `Текущая позиция: [${row}, ${col}]\nЗначение: ${value || "пусто"}`;
		return `Позиция: [${row}, ${col}]\nЗначение: ${value || "пусто"}`;
	};

	return (
		<div className={`matrix-cell ${isCurrent ? "current" : ""} ${currentStep}`} style={{ backgroundColor: color }} title={getCellTitle()}>
			<div className="cell-coordinates">
				[{row},{col}]
			</div>
			<div className="cell-value">{getCellContent()}</div>
		</div>
	);
};

export default MatrixCell;
