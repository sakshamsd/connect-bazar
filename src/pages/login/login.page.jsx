import React, { useEffect } from "react";
import "./login.style.scss";
import FormTextInput from "../../components/form-input/form-input.component";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/action/auth.action";
import { isEmptyObject } from "../../helper/functions";

const loginSchema = yup.object().shape({
	phoneNumber: yup
		.string()
		.matches("^[0-9]+$", "Must be Number")
		.required("Phone Number Required")
		.min(10, "Must be 10 digits"),

	password: yup
		.string()
		.required("Password Required")
		.min(8, "Password Must be atleast 8 Character"),
});

function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {},
		mode: "onChange",
		resolver: yupResolver(loginSchema),
	});

	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const processLogin = (loginInfo) => {
		dispatch(login(loginInfo));
	};

	useEffect(() => {
		if (!isEmptyObject(user)) {
			navigate("/dashboard");
		}
	}, [user, navigate]);

	useEffect(() => {
		let isAuth = localStorage.getItem("accessUserToken");
		if (isAuth) {
			navigate("/dashboard");
		}
	}, [navigate]);

	return (
		<div className="login-wrapper">
			<div className="login-details-container">
				<div className="login-content">
					<h1 className="login-header">Login</h1>
					<FormTextInput
						label="Phone Number"
						variant="form-lg"
						type="text"
						placeholder="Enter Phone Number"
						name="phoneNumber"
						ref={register}
						error={errors?.phoneNumber?.message}
					/>
					<FormTextInput
						label="Password"
						variant="form-lg"
						type="password"
						name="password"
						ref={register}
						error={errors?.password?.message}
					/>
					<div className="login-extra-container">
						<div className="remember-checkbox-content">
							<input
								type="checkbox"
								className="remember-number-checkbox"
								id="remember"
							/>
							<label
								htmlFor="remember"
								className="checkbox-label"
							>
								Remember my phone number
							</label>
						</div>
						<span className="forgot-password">
							Forgot Password?
						</span>
					</div>
					<button
						className="login-button"
						onClick={handleSubmit(processLogin)}
						disabled={!isValid}
					>
						Submit
					</button>
					<label htmlFor="" className="register-label">
						Don't have an account?
					</label>
					<button className="create-account-button">
						Create Account
					</button>
				</div>
			</div>
			<div className="login-image-container" />
		</div>
	);
}

export default LoginPage;
