import { C_CODE_SNIPPETS } from "../../utils/codeSnippets";
import "./CodeViewer.css";

const CodeViewer = ({ currentStep }) => {
	const getHighlightedLine = () => {
		const highlightMap = {
			writing: "write",
			savingPosition: "save",
			moving: "move",
			checkingBounds: "check_top",
			checkingOccupied: "check_occupied",
			backupMove: "backup",
		};

		return highlightMap[currentStep] || null;
	};

	const highlightedLineId = getHighlightedLine();

	return (
		<div className="code-viewer">
			<h3>📝 Код алгоритма Сиамский метод (C)</h3>
			<div className="code-header">
				<span className="code-language">
					Вызываем на каждой итерации в цикле с числами от 2 до n<sup>2</sup> (n - размер матрицы, т.к. она квадратная = размеру любой строки или столбца)
				</span>
			</div>

			<div className="code-content">
				<pre className="code-block">
					<code className="c-code">
						<div className="code-line">
							<span className="code-keyword">void</span> <span className="code-function">fillMagicSquare</span>(<span className="code-type">int</span> number,
							<span className="code-type"> int</span> size,
							<span className="code-type"> int</span> matrix[size][size]) {"{"}
						</div>

						{C_CODE_SNIPPETS.map((snippet) => (
							<div key={snippet.id} className={`code-line ${highlightedLineId === snippet.id ? "highlighted" : ""}`} title={snippet.description}>
								<span className="code-indent"> </span>
								{snippet.code}
								{!snippet.code.includes("}") && !snippet.code.includes("{") && ";"}
							</div>
						))}

						<div className="code-line">{"}"}</div>
					</code>
				</pre>
			</div>

			<div className="code-explanation">
				{highlightedLineId && (
					<div className="explanation-bubble">
						<span className="explanation-icon">💡</span>
						{C_CODE_SNIPPETS.find((s) => s.id === highlightedLineId)?.description}
					</div>
				)}
			</div>
		</div>
	);
};

export default CodeViewer;
