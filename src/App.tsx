
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
		if(value.trim().length !==0){
			dispatch(addTodoItem({
				id:uuidv4(),
				title:value,
				completed:false
			}))
			setValue("")
		}
	}

	const filterTodos = useCallback((status:FilterType)=>{
		setStatus(status)
	},[])
	return (
		<div className='container'>
			<h1>Todos</h1>
			<div className='bb2 p2 mb-20'>
				<Input
					onChange={(e) => {setValue(e.target.value)}}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							addTodo()
						}
					}}
					size='large'
					value={value}
					placeholder='What need to be done'
				/>
			</div>
			<TodoList filterTodos={filterTodos} status={status}/>
		</div>
	)

}

