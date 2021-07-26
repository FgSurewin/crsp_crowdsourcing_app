import { LOGIN } from "../actionTypes";

const initialState = {
	id: "",
	nickname: "",
	token: "",
};

function userReducer(state = initialState, action) {
	switch (action.type) {
		case LOGIN:
			const { id, token, nickname } = action.payload;
			return {
				...state,
				id,
				token,
				nickname,
			};

		default:
			return state;
	}
}
export default userReducer;
