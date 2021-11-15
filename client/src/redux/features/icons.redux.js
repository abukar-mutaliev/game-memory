const initialState = {
	items: [],
	loading: false,
};

export default function iconsReducer(state = initialState, action) {
	switch (action.type) {
		case 'icons/load/pending':
			return {
				...state,
				loading: true,
			};
		case 'icons/load/fulfilled':
			return {
				...state,
				items: action.payload,
				loading: false,
			};
		default:
			return state;
	}
}
export const loadIcons = (data) => ({
	type: 'icons/load/fulfilled',
	payload: data,
});
