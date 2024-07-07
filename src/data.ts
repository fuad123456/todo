import { TodoType } from "./types";
import { v4 as uuidv4 } from 'uuid';
export const todos:Array<TodoType>=[
	{
		id:uuidv4(),
		completed:false,
		title:"Выучить JS"
	}

]
