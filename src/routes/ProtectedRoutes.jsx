import React from "react";

function ProtectedRoute(props) {
	return (
		<div>
			<div style={{ marginBottom: "20px" }}>Dashboard</div>

			<div>{props.children}</div>
		</div>
	);
}

export default ProtectedRoute;
