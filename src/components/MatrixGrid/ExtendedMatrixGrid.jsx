import { getCellColor } from "./matrixUtils";
import "./ExtendedMatrixGrid.css";

const ExtendedMatrixGrid = ({ matrix, currentRow, currentCol, currentStep, tempRow, tempCol }) => {
	const size = matrix.length;
	const extendedSize = size + 2;

	const isBoundaryCell = (row, col) => {
		return row === 0 || row === extendedSize - 1 || col === 0 || col === extendedSize - 1;
	};

	const getActualPosition = (row, col) => {
		return {
			actualRow: row - 1,
			actualCol: col - 1,
		};
	};

	const getCellState = (row, col) => {
		if (isBoundaryCell(row, col)) return "boundary";

		const { actualRow, actualCol } = getActualPosition(row, col);
		const isCurrent = actualRow === currentRow && actualCol === currentCol;
		const isTemp = actualRow === tempRow && actualCol === tempCol;

		return {
			isCurrent,
			isTemp,
			actualRow,
			actualCol,
			value: matrix[actualRow][actualCol],
		};
	};

	return (
		<div className="extended-matrix-grid">
			<h3>
				🧮 Матрица {size}x{size} с границами
			</h3>
			<div className="matrix-warning">⚠️ Красные ячейки показывают область за границами массива!</div>

			<div className="extended-matrix-container">
				<div className="extended-matrix">
					{Array.from({ length: extendedSize }).map((_, rowIndex) => (
						<div key={rowIndex} className="extended-row">
							{Array.from({ length: extendedSize }).map((_, colIndex) => {
								const cellState = getCellState(rowIndex, colIndex);
								const isBoundary = isBoundaryCell(rowIndex, colIndex);

								if (isBoundary) {
									return (
										<div key={`${rowIndex}-${colIndex}`} className="extended-cell boundary-cell" title="Выход за границы массива!">
											<div className="boundary-content">🚫</div>
										</div>
									);
								}

								const color = getCellColor(cellState.actualRow, cellState.actualCol, currentRow, currentCol, currentStep, cellState.value, tempRow, tempCol);

								return (
									<div
										key={`${rowIndex}-${colIndex}`}
										className={`extended-cell ${cellState.isCurrent ? "current" : ""}`}
										style={{ backgroundColor: color }}
										title={`Позиция: [${cellState.actualRow}, ${cellState.actualCol}]\nЗначение: ${cellState.value || "пусто"}`}>
										<div className="cell-coordinates">
											[{cellState.actualRow},{cellState.actualCol}]
										</div>
										<div className="cell-value">{cellState.value || ""}</div>
									</div>
								);
							})}
						</div>
					))}
				</div>
			</div>

			<div className="extended-legend">
				<div className="legend-item">
					<div className="legend-color boundary"></div>
					<span>Область за границами массива</span>
				</div>
				<div className="legend-item">
					<div className="legend-color out-of-bounds"></div>
					<span>Выход за границы при движении</span>
				</div>
			</div>
		</div>
	);
};

export default ExtendedMatrixGrid;
