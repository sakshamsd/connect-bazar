import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from "../action-type";
import axios from "axios";
import showToastMessage from "../../helper/showToastMessage";
import { clientAPIkey, url } from "../../helper/strings";

export const loginRequest = () => {
	return {
		type: LOGIN_REQUEST,
	};
};
export const loginSuccess = (event) => {
	return {
		type: LOGIN_SUCCESS,
		payload: event,
	};
};

export const loginError = (error) => {
	return {
		type: LOGIN_ERROR,
		payload: error,
	};
};

export const login = (loginInfo) => {
	return (dispatch) => {
		dispatch(loginRequest());
		console.log(url);
		return axios
			.post(`${url}auth/login`, loginInfo, {
				headers: {
					"content-type": "application/json",
					"cb-client-api-key": clientAPIkey,
				},
			})
			.then(async (response) => {
				if (response.data.success) {
					console.log("success", response.data.data.authUserToken);
					await dispatch(loginSuccess(response.data.data.user));
					localStorage.setItem(
						"accessUserToken",
						response.data.data.authUserToken.accessUserToken
					);
				} else {
					await dispatch(loginError(response.data.message));
				}
			})
			.catch(async (error) => {
				showToastMessage(error.response.data.message, "E");
				await dispatch(loginError(error.response.data.message));
			});
	};
};
