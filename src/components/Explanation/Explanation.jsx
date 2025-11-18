import React from "react";
import "./Explanation.css";

const Explanation = ({ text }) => {
	return (
		<div className="explanation">
			<h3>💡 Объяснение</h3>
			<div className="explanation-content">
				<div className="explanation-text">{text}</div>
				<div className="explanation-icon">🎓</div>
			</div>
		</div>
	);
};

export default Explanation;
