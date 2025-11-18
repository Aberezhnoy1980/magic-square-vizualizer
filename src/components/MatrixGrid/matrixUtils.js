import { CELL_COLORS } from "../../utils/colors";

export const getCellColor = (row, col, currentRow, currentCol, currentStep, value, tempRow, tempCol) => {
	if (row === currentRow && col === currentCol) {
		switch (currentStep) {
			case "writing":
				return CELL_COLORS.SUCCESS;
			case "backupMove":
				return CELL_COLORS.BACKUP;
			default:
				return CELL_COLORS.CURRENT;
		}
	}

	if (tempRow !== undefined && tempCol !== undefined && row === tempRow && col === tempCol) {
		if (currentStep === "checkingBounds") {
			return CELL_COLORS.OUT_OF_BOUNDS;
		}
		if (currentStep === "checkingOccupied") {
			return value !== 0 ? CELL_COLORS.CONFLICT : CELL_COLORS.CHECKING;
		}
	}

	if (value !== 0) {
		return CELL_COLORS.FILLED;
	}

	return CELL_COLORS.EMPTY;
};

export const getStepDescription = (currentStep) => {
	const descriptions = {
		initial: "Начало алгоритма",
		writing: "Запись числа в ячейку",
		savingPosition: "Сохранение позиции",
		moving: "Движение вверх-вправо",
		checkingBounds: "Проверка границ",
		checkingOccupied: "Проверка занятости",
		backupMove: "Запасной ход вниз",
		completed: "Алгоритм завершен",
	};

	return descriptions[currentStep] || "Выполнение алгоритма";
};
