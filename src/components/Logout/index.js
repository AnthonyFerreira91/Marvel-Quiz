import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Logout = () => {
	const [checked, setChecked] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (checked) {
			signOut(auth)
				.then(() => {
					setTimeout(() => {
						navigate("/");
					}, 1000);
				})
				.catch((error) => {
					console.log("Oups, nous avons une erreur !");
				});
		}
	}, [checked]);

	const handleChange = (e) => {
		setChecked(e.target.checked);
	};

	return (
		<div className="logoutContainer">
			<label className="switch">
				<input onChange={handleChange} type="checkbox" checked={checked} />
				<span
					className="slider round"
					id="tooltip-logout"
					data-tooltip-content="Déconnexion"
				></span>
			</label>
			<ReactTooltip anchorId="tooltip-logout" place="left" effect="solid" />
		</div>
	);
};

export default Logout;
