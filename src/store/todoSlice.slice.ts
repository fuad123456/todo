import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { todos } from "../data";


type TodoType = {
	id:string
	completed:boolean
	title:string

}
type inititalStateType = {
	todos: TodoType[]
}

const initialState: inititalStateType = {
	todos:todos
};



export const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodoItem:(state, action:PayloadAction<TodoType>)=>{
			state.todos.push(action.payload)
		},
		changeStatus:(state, action:PayloadAction<{id:string, status:boolean}>)=>{
			const todo = state.todos.find(t=>t.id === action.payload.id)
			if(todo){
				todo.completed = action.payload.status
			}
		},
		deleteTodoItem:(state, action:PayloadAction<string>)=>{
			state.todos = state.todos.filter(t=>t.id!==action.payload)
		},
		clearCompletedTodos:(state)=>{
			state.todos = state.todos.filter(t=>!t.completed)
		}
	},

});
export const { addTodoItem, changeStatus, deleteTodoItem, clearCompletedTodos } = todosSlice.actions
export default todosSlice;
