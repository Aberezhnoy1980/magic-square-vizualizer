export const performAlgorithmStep = (state) => {
	const { size, matrix, currentStep, currentNumber, currentRow, currentCol, tempRow, tempCol, savedRow, savedCol } = state;

	if (currentNumber > size * size) {
		return {
			...state,
			currentStep: "completed",
			explanation: "🎉 Алгоритм завершен! Магический квадрат построен.",
		};
	}

	switch (currentStep) {
		case "initial": {
			const initialMatrix = matrix.map((row) => [...row]);
			const initialCol = Math.floor(size / 2);
			initialMatrix[0][initialCol] = 1;

			return {
				...state,
				matrix: initialMatrix,
				currentRow: 0,
				currentCol: initialCol,
				currentNumber: 2,
				currentStep: "savingPosition",
				codeHighlight: "save",
				explanation: `🎯 Начало алгоритма. Записали число 1 в начальную позицию [0, ${initialCol}]. Сохраняем позицию.`,
			};
		}

		case "savingPosition":
			return {
				...state,
				savedRow: currentRow,
				savedCol: currentCol,
				currentStep: "moving",
				codeHighlight: "move",
				explanation: `💾 Сохранили позицию [${currentRow}, ${currentCol}]. Двигаемся вверх-вправо.`,
			};

		case "moving": {
			const newRow = currentRow - 1;
			const newCol = currentCol + 1;

			return {
				...state,
				tempRow: newRow,
				tempCol: newCol,
				currentStep: "checkingBounds",
				codeHighlight: "check_top",
				explanation: `↗️ Двигаемся: [${currentRow}, ${currentCol}] → [${newRow}, ${newCol}]. Проверяем границы.`,
			};
		}

		case "checkingBounds": {
			let adjustedRow = tempRow;
			let adjustedCol = tempCol;
			let boundsExplanation = "";

			if (tempRow < 0) {
				adjustedRow = size - 1;
				boundsExplanation += " Выход сверху → переходим вниз.";
			}

			if (tempCol >= size) {
				adjustedCol = 0;
				boundsExplanation += " Выход справа → переходим влево.";
			}

			return {
				...state,
				tempRow: adjustedRow,
				tempCol: adjustedCol,
				currentStep: "checkingOccupied",
				codeHighlight: "check_occupied",
				explanation: `🔍 Проверка границ: [${tempRow}, ${tempCol}] → [${adjustedRow}, ${adjustedCol}].${boundsExplanation} Проверяем занятость ячейки.`,
			};
		}

		case "checkingOccupied":
			if (matrix[tempRow][tempCol] === 0) {
				return {
					...state,
					currentRow: tempRow,
					currentCol: tempCol,
					currentStep: "writing",
					codeHighlight: "write",
					explanation: `✅ Ячейка [${tempRow}, ${tempCol}] свободна. Переходим к записи числа ${currentNumber}.`,
				};
			} else {
				return {
					...state,
					currentStep: "backupMove",
					codeHighlight: "backup",
					explanation: `❌ Ячейка [${tempRow}, ${tempCol}] занята числом ${matrix[tempRow][tempCol]}! Выполняем запасной ход вниз.`,
				};
			}

		case "backupMove": {
			const backupRow = (savedRow + 1) % size;

			return {
				...state,
				currentRow: backupRow,
				currentCol: savedCol,
				currentStep: "writing",
				codeHighlight: "write",
				explanation: `🔄 Запасной ход: двигаемся вниз от [${savedRow}, ${savedCol}] → [${backupRow}, ${savedCol}]. Записываем число ${currentNumber}.`,
			};
		}

		case "writing": {
			const updatedMatrix = matrix.map((row) => [...row]);
			updatedMatrix[currentRow][currentCol] = currentNumber;

			if (currentNumber >= size * size) {
				return {
					...state,
					matrix: updatedMatrix,
					currentStep: "completed",
					explanation: "🎉 Алгоритм завершен! Магический квадрат построен.",
				};
			}

			return {
				...state,
				matrix: updatedMatrix,
				currentNumber: currentNumber + 1,
				currentStep: "savingPosition",
				codeHighlight: "save",
				explanation: `✍️ Записали число ${currentNumber} в ячейку [${currentRow}, ${currentCol}]. Переходим к числу ${currentNumber + 1}.`,
			};
		}

		default:
			return state;
	}
};

export const initializeMatrix = (size) => {
	return Array(size)
		.fill()
		.map(() => Array(size).fill(0));
};

export const isAlgorithmCompleted = (state) => {
	return state.currentStep === "completed";
};
