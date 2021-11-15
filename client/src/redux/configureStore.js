import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import iconsReducer from './features/icons.redux';

const logger = createLogger({
	diff: true,
	collapsed: true,
});

export const store = createStore(
	combineReducers({
		icons: iconsReducer,
	}),
	applyMiddleware(thunk, logger)
);
