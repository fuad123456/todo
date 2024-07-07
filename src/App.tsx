
import { Input } from 'antd'
import './App.css'
import { useAppDispatch } from './store/hooks'
import { useCallback, useState } from 'react';
import { addTodoItem } from './store/todoSlice.slice';
import {TodoList} from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';
export type FilterType = "all" | "completed" | "active" | "clear"
export default function App() {
	const [value, setValue] = useState("")
	const dispatch = useAppDispatch();
	const [status, setStatus] = useState<FilterType>("all")
	function addTodo(): void {
		dispatch(addTodoItem({
			id:uuidv4(),
			title:value,
			completed:false
		}))
		setValue("")
	}

	const filterTodos = useCallback((status:FilterType)=>{
		setStatus(status)
	},[])
	return (
		<div className='container'>
			<h1>Todos</h1>
			<Input
				onChange={(e) => {setValue(e.target.value)}}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						addTodo()
					}
				}}
				value={value}
			/>
			<TodoList filterTodos={filterTodos} status={status}/>
		</div>
	)

}

