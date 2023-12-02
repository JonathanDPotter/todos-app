import { server_url } from ".";

export interface TodoInput {
  title: string;
  description: string;
  user_id: number;
}

export interface NewTodo extends TodoInput {
  complete: boolean;
  date: string;
}

export interface Clone extends NewTodo {
  id?: number;
}

export interface Todo extends NewTodo {
  id: number;
}

const getUserTodos = async (id: string) => {
  try {
    const response = await fetch(server_url + "/api/todos/" + id);
    const json = (await response.json()) as Todo[];
    return json;
  } catch (error: any) {
    throw new Error(error);
  }
};

const createTodo = async ({ title, description, user_id }: TodoInput) => {
  const newTodo: NewTodo = {
    complete: false,
    date: new Date().toLocaleDateString("en-US"),
    description,
    title,
    user_id,
  };

  try {
    const response = await fetch(server_url + "/api/todos", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    const json = await response.json();
    return json;
  } catch (error: any) {
    throw new Error(error);
  }
};

const updateTodo = async (id: string, update: Todo) => {
  const clone: Clone = { ...update };
  delete clone.id;
  try {
    const response = await fetch(server_url + "/api/todos/" + id, {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clone),
    });

    const json = await response.json();
    return json;
  } catch (error: any) {
    throw new Error(error);
  }
};

const deleteTodo = async (id: string) => {
  try {
    const response = await fetch(server_url + "/api/todos/" + id, {
      method: "DELETE",
    });

    const json = await response.json();
    return json;
  } catch (error: any) {
    throw new Error(error);
  }
};

const todos_api = { getUserTodos, updateTodo, deleteTodo, createTodo };

export default todos_api;
