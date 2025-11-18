import { getStepDescription } from "../MatrixGrid/matrixUtils";
import "./StateInfo.css";

const StateInfo = ({ currentNumber, currentRow, currentCol, currentStep, totalSteps }) => {
	const progress = Math.min(100, (currentNumber / totalSteps) * 100);

	const getStepIcon = () => {
		const icons = {
			initial: "🎯",
			writing: "✍️",
			savingPosition: "💾",
			moving: "↗️",
			checkingBounds: "🔍",
			checkingOccupied: "👀",
			backupMove: "🔄",
			completed: "🎉",
		};
		return icons[currentStep] || "⚡";
	};

	return (
		<div className="state-info">
			<h3>📊 Текущее состояние</h3>

			<div className="state-grid">
				<div className="state-card progress-card">
					<div className="card-header">
						<span className="card-icon">📈</span>
						<span className="card-title">Прогресс</span>
					</div>
					<div className="progress-container">
						<div className="progress-bar">
							<div className="progress-fill" style={{ width: `${progress}%` }}></div>
						</div>
						<div className="progress-text">
							{currentNumber - 1} / {totalSteps} чисел заполнено
						</div>
					</div>
				</div>

				<div className="state-card variables-card">
					<div className="card-header">
						<span className="card-icon">🔢</span>
						<span className="card-title">Переменные</span>
					</div>
					<div className="variables-list">
						<div className="variable-item">
							<span className="variable-name">currentNumber:</span>
							<span className="variable-value highlight">{currentNumber}</span>
						</div>
						<div className="variable-item">
							<span className="variable-name">row:</span>
							<span className="variable-value">{currentRow}</span>
						</div>
						<div className="variable-item">
							<span className="variable-name">col:</span>
							<span className="variable-value">{currentCol}</span>
						</div>
						<div className="variable-item">
							<span className="variable-name">Позиция:</span>
							<span className="variable-value">
								[{currentRow}, {currentCol}]
							</span>
						</div>
					</div>
				</div>

				<div className="state-card step-card">
					<div className="card-header">
						<span className="card-icon">{getStepIcon()}</span>
						<span className="card-title">Текущий шаг</span>
					</div>
					<div className="step-info">
						<div className="step-name">{getStepDescription(currentStep)}</div>
						<div className="step-details">
							{currentStep === "writing" && `Записываем число ${currentNumber}`}
							{currentStep === "moving" && `Двигаемся в позицию [${currentRow}, ${currentCol}]`}
							{currentStep === "checkingOccupied" && `Проверяем ячейку [${currentRow}, ${currentCol}]`}
							{currentStep === "backupMove" && "Выполняем запасной ход"}
						</div>
					</div>
					<div className="card-header">
						<span className="card-icon">⏭️</span>
						<span className="card-title">Следующее действие</span>
					</div>
					<div className="next-action">
						{currentStep === "initial" && "Начать заполнение матрицы"}
						{currentStep === "writing" && "Сохранить позицию и двигаться"}
						{currentStep === "savingPosition" && "Переместиться вверх-вправо"}
						{currentStep === "moving" && "Проверить границы матрицы"}
						{currentStep === "checkingBounds" && "Проверить занятость ячейки"}
						{currentStep === "checkingOccupied" && (currentNumber < totalSteps ? "Записать следующее число" : "Завершить алгоритм")}
						{currentStep === "backupMove" && "Записать число в новую позицию"}
						{currentStep === "completed" && "Алгоритм завершен!"}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StateInfo;
