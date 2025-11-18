import { useState, useCallback } from "react";
import { initializeMatrix, performAlgorithmStep, isAlgorithmCompleted } from "../utils/magicSquareLogic";
import { INITIAL_SIZE } from "../utils/constatnts";

export const useMagicSquare = () => {
	const [state, setState] = useState({
		size: INITIAL_SIZE,
		matrix: initializeMatrix(INITIAL_SIZE),
		currentStep: "initial",
		currentNumber: 1,
		currentRow: 0,
		currentCol: Math.floor(INITIAL_SIZE / 2),
		tempRow: null,
		tempCol: null,
		savedRow: null,
		savedCol: null,
		codeHighlight: null,
		explanation: 'Нажмите "Следующий шаг" чтобы начать',
		isCompleted: false,
	});

	const nextStep = useCallback(() => {
		if (state.isCompleted) return;

		setState((prevState) => {
			const newState = performAlgorithmStep(prevState);
			const completed = isAlgorithmCompleted(newState);

			return {
				...newState,
				isCompleted: completed,
			};
		});
	}, [state.isCompleted]);

	const reset = useCallback(
		(newSize = state.size) => {
			setState({
				size: newSize,
				matrix: initializeMatrix(newSize),
				currentStep: "initial",
				currentNumber: 1,
				currentRow: 0,
				currentCol: Math.floor(newSize / 2),
				tempRow: null,
				tempCol: null,
				savedRow: null,
				savedCol: null,
				codeHighlight: null,
				explanation: 'Матрица сброшена. Нажмите "Следующий шаг" чтобы начать',
				isCompleted: false,
			});
		},
		[state.size]
	);

	const changeSize = useCallback(
		(newSize) => {
			reset(newSize);
		},
		[reset]
	);

	return {
		state,
		nextStep,
		reset,
		changeSize,
	};
};
