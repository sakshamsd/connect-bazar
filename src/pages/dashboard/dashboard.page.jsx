import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Dashboard() {
	const navigate = useNavigate();

	useEffect(() => {
		let isAuth = localStorage.getItem("accessUserToken");
		if (!isAuth) {
			navigate("/");
		}
	}, [navigate]);

	const { user } = useSelector((state) => state.auth);

	return (
		<div>
			{user && (
				<div style={{ display: "flex", flexDirection: "column" }}>
					{Object.keys(user).map((u) => {
						if (typeof user[u] === "string") {
							return (
								<span key={u}>
									{u} :- {user[u]}
								</span>
							);
						}
						return null;
					})}
				</div>
			)}
		</div>
	);
}

export default Dashboard;
