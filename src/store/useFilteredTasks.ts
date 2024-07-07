import { FilterType } from "../App";
import { TodoType } from "../types";
import { useAppSelector } from "./hooks";

export function useFilteredTasks(status:FilterType):TodoType[]{
	const tasks = useAppSelector(state=>state.todos.todos)
	if(status === "active"){
		return tasks.filter(t=>!t.completed)
	}
	if(status === "completed"){
		return tasks.filter(t=>t.completed)
	}
	return tasks
}