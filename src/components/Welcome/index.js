import { Fragment, useState, useEffect } from "react";
import Logout from "../Logout";
import Quiz from "../Quiz";
import { onAuthStateChanged } from "firebase/auth";
import { auth, userFirestore } from "../Firebase/firebaseConfig";
import { getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

const Welcome = () => {
	const [userSession, setUserSession] = useState(null);
	const [userData, setUserData] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		const listener = onAuthStateChanged(auth, (user) => {
			user ? setUserSession(user) : navigate("/");
		});
		if (!!userSession) {
			const colRef = userFirestore(userSession.uid);
			getDoc(colRef)
				.then((snapshot) => {
					if (snapshot.exists()) {
						const myData = snapshot.data();
						setUserData(myData);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
		return listener();
	}, [userSession]);

	return userSession === null ? (
		<Loader
			loadingMsg={"Authentification..."}
			styling={{ textAlign: "center", color: "#FFFFFF" }}
		/>
	) : (
		<div className="quiz-bg">
			<div className="container">
				<Logout />
				<Quiz userData={userData} />
			</div>
		</div>
	);
};

export default Welcome;
