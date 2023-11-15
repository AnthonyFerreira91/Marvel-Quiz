import { useEffect, useState, memo } from "react";
import Stepper from "react-stepper-horizontal";

const Levels = ({ quizLevel, levelNames }) => {
	const [levels, setLevels] = useState([]);

	useEffect(() => {
		const quizSteps = levelNames.map((level) => ({ title: level }));
		setLevels(quizSteps);
	}, [levelNames]);

	return (
		<div className="levelsContainer" style={{ background: "transparent" }}>
			<Stepper
				steps={levels}
				activeStep={quizLevel}
				circleTop={0}
				activeTitleColor={"var(--dark-red-color)"}
				activeColor={"var(--dark-red-color)"}
				completeTitleColor={"#E0E0E0"}
				completeColor={"#E0E0E0"}
				defaultTitleColor={"#E0E0E0"}
				completeBarColor={"#E0E0E0"}
				barStyle={"dashed"}
				size={45}
				circleFontSize={20}
			/>
		</div>
	);
};

export default memo(Levels);
