import { Button } from 'antd'
import { ReactElement, memo } from 'react'
import {TodoItem} from './TodoItem'
import { FilterType } from '../App'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { clearCompletedTodos } from '../store/todoSlice.slice'
import { useFilteredTasks } from '../store/useFilteredTasks'

type propsType = {
	filterTodos: (filter: FilterType) => void
	status:FilterType
}
export const TodoList = memo(({ filterTodos, status }: propsType): ReactElement=> {
	console.log("TODOLIST");
	const todos1 = useFilteredTasks(status)
	const dispatch = useAppDispatch()
	function clearCompleted(){
		dispatch(clearCompletedTodos())
	}
	const leftTodos = useAppSelector(state=>state.todos.todos).filter(t=>!t.completed).length
	return (
		<div className=''>
			{
				todos1.map(todo => {
					return <TodoItem key={todo.id} {...todo} />
				})
			}
			<div className='df jcsb aic'>
				<div className='fs24'>
					{leftTodos} left
				</div>
				<div className='df gap-4'>
					<Button onClick={() => filterTodos("all")} style={{backgroundColor:`${status==="all"?"#E6F7FF":"white"}`}}>
						all
					</Button>
					<Button onClick={() => filterTodos("completed")} style={{backgroundColor:`${status==="completed"?"#E6F7FF":"white"}`}}>
						completed
					</Button>
					<Button onClick={() => filterTodos("active")} style={{backgroundColor:`${status==="active"?"#E6F7FF":"white"}`}}>
						active
					</Button>
				</div>
				<div>
					<Button onClick={clearCompleted}>
						clear completed
					</Button>
				</div>

			</div>
		</div>
	)
})
