//passing down addTodo to todoForm
import uuid from "uuid/v4";
import {useState} from "react";

export default initialTodos => {
    const [todos, setTodos] = useState(initialTodos);
    return{
        todos,
        addTodo:  newTodoText =>{
            setTodos([...todos, {id: uuid(), task: newTodoText, completed: false}]);
        },
        removeTodo: todoId =>{
            //filter out removed todo
            const updatedTodos = todos.filter(todo => todo.id !== todoId);
            //call setTodos with new todos array
            setTodos(updatedTodos);
        },
        toggleTodo: todoId =>{
            // for each todo we check if todoId is equal to the todo
            const updatedTodos = todos.map(todo =>
                todo.id === todoId ? {...todo, completed: !todo.completed} : todo
            );
            setTodos(updatedTodos);
        },
        updateTodo: (todoId, newTask) =>{
            // when editTodoForm is submited
            // for each todo we check if todoId is equal to the todo, then update the task
            const updatedTodos = todos.map(todo =>
                todo.id === todoId ? {...todo, task: newTask} : todo
            );
            setTodos(updatedTodos);
        }
    }
}

