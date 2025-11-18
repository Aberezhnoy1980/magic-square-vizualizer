import { useState, useRef, useCallback, useEffect } from "react";

export const useAutoPlay = (nextStep, isCompleted) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [speed, setSpeed] = useState(1000); // ms
	const intervalRef = useRef(null);

	const startAutoPlay = useCallback(() => {
		if (isCompleted || isPlaying) return;

		setIsPlaying(true);
		intervalRef.current = setInterval(() => {
			nextStep();
		}, speed);
	}, [nextStep, isCompleted, isPlaying, speed]);

	const stopAutoPlay = useCallback(() => {
		setIsPlaying(false);
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, []);

	const toggleAutoPlay = useCallback(() => {
		if (isPlaying) {
			stopAutoPlay();
		} else {
			startAutoPlay();
		}
	}, [isPlaying, startAutoPlay, stopAutoPlay]);

	const changeSpeed = useCallback(
		(newSpeed) => {
			setSpeed(newSpeed);
			if (isPlaying) {
				stopAutoPlay();
				startAutoPlay();
			}
		},
		[isPlaying, startAutoPlay, stopAutoPlay]
	);

	useEffect(() => {
		if (isCompleted && isPlaying) {
			stopAutoPlay();
		}
	}, [isCompleted, isPlaying, stopAutoPlay]);

	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	return {
		isPlaying,
		speed,
		startAutoPlay,
		stopAutoPlay,
		toggleAutoPlay,
		changeSpeed,
	};
};
