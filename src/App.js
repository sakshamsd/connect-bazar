import LoginPage from "./pages/login/login.page";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Dashboard from "./pages/dashboard/dashboard.page";

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}></PersistGate>
			<div className="App">
				<Router>
					<Routes>
						<Route path="/" exact element={<LoginPage />} />
						<Route
							path="/dashboard"
							exact
							element={
								<ProtectedRoute>
									<Dashboard />
								</ProtectedRoute>
							}
						/>{" "}
						*
					</Routes>
				</Router>
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable={false}
					pauseOnHover
				/>
			</div>
		</Provider>
	);
}

export default App;
