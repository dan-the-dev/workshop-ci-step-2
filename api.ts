import { ITask } from "./types/tasks";

const port = process.env.PORT || 3001;
const baseUrl = `http://localhost:${port}`;

export const getAllTodos = async (): Promise<ITask[]> => {
  const res = await fetch(`${baseUrl}/tasks`, { cache: 'no-store' });
  const todos = await res.json();
  return todos;
}

export const addTodo = async (todo: ITask): Promise<ITask> => {
  todo.done = todo.done ?? false;

  const res = await fetch(`${baseUrl}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
  const newTodo = await res.json();
  return newTodo;
}

export const editTodo = async (todo: Pick<ITask, 'id' | 'text'>): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
  const updatedTodo = await res.json();
  return updatedTodo;
}

export const deleteTodo = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/tasks/${id}`, {
    method: 'DELETE',
  })
}

export const completeTodo = async (id: string): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      done: true
    })
  })
  const updatedTodo = await res.json();
  return updatedTodo;
}

export const uncompleteTodo = async (id: string): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      done: false
    })
  })
  const updatedTodo = await res.json();
  return updatedTodo;
}