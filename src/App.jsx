import { useState } from "react";
import { useMagicSquare } from "./hooks/useMagicSquare";
import { useAutoPlay } from "./hooks/useAutoPlay";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import CodeViewer from "./components/CodeViewer/CodeViewer";
import MatrixGrid from "./components/MatrixGrid/MatrixGrid";
import ExtendedMatrixGrid from "./components/MatrixGrid/ExtendedMatrixGrid";
import StateInfo from "./components/StateInfo/StateInfo";
import Explanation from "./components/Explanation/Explanation";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
	const { state, nextStep, reset, changeSize } = useMagicSquare();
	const { isPlaying, speed, toggleAutoPlay, changeSpeed } = useAutoPlay(nextStep, state.isCompleted);
	const [showExtended, setShowExtended] = useState(false);

	return (
		<div className="app">
			<header className="app-header">
				<h1>🧙‍♂️ Визуализатор Магического Квадрата</h1>
				<p>Изучаем алгоритм Сиамского метода шаг за шагом</p>
			</header>

			<main className="app-main">
				<div className="app-layout">
					<div className="left-panel">
						<ControlPanel
							onNextStep={nextStep}
							onReset={reset}
							onChangeSize={changeSize}
							onToggleAutoPlay={toggleAutoPlay}
							onChangeSpeed={changeSpeed}
							currentSize={state.size}
							isCompleted={state.isCompleted}
							isPlaying={isPlaying}
							speed={speed}
							showExtended={showExtended}
							onToggleExtended={() => setShowExtended(!showExtended)}
						/>

						<div className="collapsible-section">
							<div className="section-content">
								<CodeViewer currentStep={state.currentStep} />
							</div>
						</div>

						<Explanation text={state.explanation} />
					</div>

					<div className="right-panel">
						{showExtended ? (
							<ExtendedMatrixGrid
								matrix={state.matrix}
								currentRow={state.currentRow}
								currentCol={state.currentCol}
								currentStep={state.currentStep}
								tempRow={state.tempRow}
								tempCol={state.tempCol}
							/>
						) : (
							<MatrixGrid
								matrix={state.matrix}
								currentRow={state.currentRow}
								currentCol={state.currentCol}
								currentStep={state.currentStep}
								tempRow={state.tempRow}
								tempCol={state.tempCol}
							/>
						)}

						<div className="info-sections">
							<StateInfo
								currentNumber={state.currentNumber}
								currentRow={state.currentRow}
								currentCol={state.currentCol}
								currentStep={state.currentStep}
								totalSteps={state.size * state.size}
								tempRow={state.tempRow}
								tempCol={state.tempCol}
							/>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}

export default App;
