import {
	type Action,
	combineReducers,
	configureStore,
	type ThunkAction,
} from "@reduxjs/toolkit";
import { todosSlice } from "./todoSlice.slice";



const rootReducer = combineReducers({
	todos: todosSlice.reducer
});

const store = configureStore({
	reducer: rootReducer,
	devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
