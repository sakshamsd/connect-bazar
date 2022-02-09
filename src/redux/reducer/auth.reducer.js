import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from "../action-type";
const initial_state = {
	isLoading: false,
	user: {},
	error: "",
};

export default function authReducer(state = initial_state, action) {
	switch (action.type) {
		case LOGIN_REQUEST:
			return {
				...state,
				isLoading: true,
			};

		case LOGIN_SUCCESS:
			return {
				isLoading: false,
				user: action.payload,
				error: "",
			};
		case LOGIN_ERROR:
			return {
				isLoading: false,
				user: {},
				error: action.payload,
			};
		default:
			return state;
	}
}
