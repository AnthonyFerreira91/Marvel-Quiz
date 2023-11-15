import { Fragment } from "react";

const Loader = ({ loadingMsg, styling, loadOff }) => {
	return loadOff ? (
		<Fragment>
			<p style={styling}>{loadingMsg}</p>
		</Fragment>
	) : (
		<Fragment>
			<div className="loader"></div>
		</Fragment>
	);
};

export default Loader;
