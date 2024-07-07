import { describe, expect, it } from "vitest"
import App from "./App";
import { fireEvent, render, screen, userEvent, waitFor } from "./utils/test-utils";
import { Provider } from "react-redux";
import store from "./store/store";
import todosSlice from "./store/todoSlice.slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';


function NewApp() {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	)
}
describe("test elements", () => {
	it("testing Title", () => {
		render(<NewApp />)
		const text = screen.getByText("Todos")
		expect(text).toBeInTheDocument()
	})
	it("testing existing Buttons", () => {
		render(<NewApp />)
		const allButton = screen.getByRole("button", { name: "all" })
		const activeButton = screen.getByRole("button", { name: "active" })
		const clearCompletedButton = screen.getByRole("button", { name: "clear completed" })
		const completedButton = screen.getByRole("button", { name: "completed" })
		expect(allButton).toBeInTheDocument()
		expect(activeButton).toBeInTheDocument()
		expect(clearCompletedButton).toBeInTheDocument()
		expect(completedButton).toBeInTheDocument()
	})
})
describe("Testing user events", () => {

	it("test click checkbox", () => {
		render(<NewApp />)
		const checkbox = screen.getByRole("checkbox")
		expect(checkbox).toBeInTheDocument()
		fireEvent.click(checkbox);
		expect(checkbox).toBeChecked();
	})
	it("test user click checkbox", () => {
		render(<NewApp />)
		const checkbox = screen.getByRole("checkbox")
		expect(checkbox).toBeInTheDocument()
		userEvent.click(checkbox);
		expect(checkbox).toBeChecked();
	})
	it("test user click input", async () => {
		render(<NewApp />)
		const input = screen.getByRole("textbox")
		expect(input).toBeInTheDocument()
		userEvent.click(input);
		await waitFor(() => {
			expect(input).toHaveFocus();
		});
	})
	it("test user change value of input", async () => {
		render(<NewApp />)
		const input = screen.getByRole("textbox") as HTMLInputElement
		expect(input).toBeInTheDocument()
		fireEvent.change(input, { target: { value: 'Test Input' } });
		expect(input.value).toBe('Test Input');
	})
})

const rootReducer = combineReducers({
	todos: todosSlice.reducer
});
const newStore = configureStore({
	reducer: {
		reducer: rootReducer,
	},
});
describe('Testing RTK reducers', () => {
	const idNewtask = uuidv4()
	it('testing add new todo ', () => {
		const newTask = {
			id: idNewtask,
			title: "Новая задача",
			completed: false
		};
		newStore.dispatch(todosSlice.actions.addTodoItem(newTask));
		const newState = newStore.getState();

		const isTaskTitleExist = newState.reducer.todos.todos.some(t => t.title === newTask.title)
		const lastTodoTitle = newState.reducer.todos.todos[newState.reducer.todos.todos.length - 1].title

		expect(newState.reducer.todos.todos.length).toEqual(2);
		expect(isTaskTitleExist).toEqual(true);
		expect(lastTodoTitle).toEqual(newTask.title);
		expect(newState.reducer.todos.todos).toContain(newTask);
	});
	it('testing delete todo', () => {
		const state = newStore.getState()
		let todos = state.reducer.todos.todos
		const foundTodo = todos.findIndex(t => t.id === idNewtask)
		todos = todos.filter(t => t.id !== idNewtask)
		expect(todos).not.toContain(foundTodo)
	});
	it('testing change status todo', () => {
		const newTaskId = uuidv4();
		const newTask = {
			id: newTaskId,
			title: "Новая задача",
			completed: false
		};

		newStore.dispatch(todosSlice.actions.addTodoItem(newTask));
		let state = newStore.getState();
		expect(state.reducer.todos.todos.length).toEqual(3); 

		newStore.dispatch(todosSlice.actions.changeStatus({
			id: newTaskId,
			status: true
		}));

		state = newStore.getState(); 
		const foundTodo = state.reducer.todos.todos.find(t => t.id === newTaskId);

		expect(foundTodo).toBeTruthy();
		expect(foundTodo?.completed).toEqual(true);
	});
});
