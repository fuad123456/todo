import { Button, Checkbox } from 'antd'
import { useAppDispatch } from '../store/hooks'
import { changeStatus, deleteTodoItem } from '../store/todoSlice.slice'
import { type ReactElement, memo } from 'react';

export const TodoItem = memo(({title, completed, id}:{title:string, completed:boolean, id:string}):ReactElement =>{
	console.log("TODOITEM");
	
	const dispatch = useAppDispatch()
	function changeStatusTodo(){
		dispatch(changeStatus({
			id,
			status:!completed
		}))
	}
	function deleteTodo(){
		dispatch(deleteTodoItem(id))
	}
  return (
	<div className='df mb-20 aic gap-4 bb1 todo-item'>
		<Checkbox
			onChange={changeStatusTodo}
			checked={completed}
			className='checkbox'
		/>
		<div className={`${completed ? "line-through" : ""}`}>
			{title}
		</div>
		<Button onClick={deleteTodo}>x</Button>
	</div>
  )
})
