import MatrixCell from "./MatrixCell";
import { getCellColor } from "./matrixUtils";
import "./MatrixGrid.css";

const MatrixGrid = ({ matrix, currentRow, currentCol, currentStep }) => {
	const size = matrix.length;

	return (
		<div className="matrix-grid">
			<h3>
				🧮 Магический квадрат {size}x{size}
			</h3>

			<div className="matrix-header">
				<div className="corner-cell"></div>
				{matrix[0].map((_, index) => (
					<div key={index} className="header-cell">
						Столбец {index}
					</div>
				))}
			</div>

			<div className="matrix-body">
				{matrix.map((row, rowIndex) => (
					<div key={rowIndex} className="matrix-row">
						<div className="header-cell">Строка {rowIndex}</div>

						{row.map((cell, colIndex) => (
							<MatrixCell
								key={`${rowIndex}-${colIndex}`}
								value={cell}
								row={rowIndex}
								col={colIndex}
								isCurrent={rowIndex === currentRow && colIndex === currentCol}
								currentStep={currentStep}
								color={getCellColor(rowIndex, colIndex, currentRow, currentCol, currentStep, cell)}
							/>
						))}
					</div>
				))}
			</div>

			<div className="color-legend">
				<div className="legend-item">
					<div className="legend-color current"></div>
					<span>Текущая позиция</span>
				</div>
				<div className="legend-item">
					<div className="legend-color success"></div>
					<span>Успешная запись</span>
				</div>
				<div className="legend-item">
					<div className="legend-color checking"></div>
					<span>Проверка</span>
				</div>
				<div className="legend-item">
					<div className="legend-color conflict"></div>
					<span>Конфликт</span>
				</div>
				<div className="legend-item">
					<div className="legend-color backup"></div>
					<span>Запасной ход</span>
				</div>
			</div>
		</div>
	);
};

export default MatrixGrid;
