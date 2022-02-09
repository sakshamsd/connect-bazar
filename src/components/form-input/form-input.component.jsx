import React, { forwardRef, useState } from "react";
import "./form-input.style.scss";
import EyeClose from "../../assets/icons/eye-off-line.svg";
import EyeOpen from "../../assets/icons/eye-line.svg";

function FormTextInput(props, ref) {
	const [view, setView] = useState(false);
	return (
		<div className={`form-input-wrapper ${props.variant}`}>
			<label htmlFor={`${props.label}`} className="form-input-label">
				{props.label}
			</label>

			<div className="input-container">
				{props.type === "password" ? (
					<input
						{...props}
						ref={ref}
						className={`${props.variant} form-input`}
						type={view ? "text" : "password"}
					/>
				) : (
					<input
						{...props}
						ref={ref}
						className={`${props.variant} form-input`}
					/>
				)}

				{props.type === "password" && (
					<div
						className="password-visibility"
						onClick={() => setView(!view)}
					>
						<img src={view ? EyeOpen : EyeClose} alt="" />
					</div>
				)}
			</div>

			<span className="form-validation-error">{props.error}</span>
		</div>
	);
}
export default forwardRef(FormTextInput);
