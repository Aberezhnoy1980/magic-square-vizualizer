import { MATRIX_SIZES } from "../../utils/constatnts";
import "./ControlPanel.css";

const ControlPanel = ({ onNextStep, onReset, onChangeSize, onToggleAutoPlay, onChangeSpeed, currentSize, isCompleted, isPlaying, speed, showExtended, onToggleExtended }) => {
	return (
		<div className="control-panel">
			<h3>🎮 Управление</h3>

			<div className="control-group">
				<label htmlFor="matrix-size">Размер матрицы:</label>
				<select id="matrix-size" value={currentSize} onChange={(e) => onChangeSize(parseInt(e.target.value))} disabled={!isCompleted && isPlaying}>
					{MATRIX_SIZES.map((size) => (
						<option key={size} value={size}>
							{size}x{size}
						</option>
					))}
				</select>
			</div>

			{/* Основные кнопки в одну строку */}
			<div className="control-actions">
				<button className="btn btn-primary" onClick={onNextStep} disabled={isCompleted || isPlaying}>
					⏭️ Шаг
				</button>

				<button className="btn btn-secondary" onClick={() => onReset()} disabled={isPlaying}>
					🔄 Сброс
				</button>
			</div>

			{/* Автопрогон в одну строку */}
			<div className="auto-play-row">
				<button className={`btn ${isPlaying ? "btn-warning" : "btn-success"}`} onClick={onToggleAutoPlay} disabled={isCompleted}>
					{isPlaying ? "⏸️ Пауза" : "▶️ Автопрогон"}
				</button>

				{isPlaying && (
					<select value={speed} onChange={(e) => onChangeSpeed(Number(e.target.value))} className="speed-select">
						<option value={1500}>Медленно</option>
						<option value={1000}>Средне</option>
						<option value={500}>Быстро</option>
						<option value={200}>Очень быстро</option>
					</select>
				)}
			</div>

			{/* Переключение вида */}
			<div className="view-controls">
				<button className={`btn ${showExtended ? "btn-info" : "btn-outline"}`} onClick={onToggleExtended}>
					{showExtended ? "📏 Обычный вид" : "🗺️ С границами"}
				</button>
			</div>

			{/* Статус */}
			<div className="status-info">
				{isCompleted && <div className="completion-message">✅ Алгоритм завершен!</div>}
				{isPlaying && <div className="playing-message">⚡ Автопрогон активен</div>}
			</div>
		</div>
	);
};

export default ControlPanel;
