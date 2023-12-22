import todos_api from "./todos.api";
import user_api from "./user.api";

export const server_url = import.meta.env.VITE_SERVER_URL;

const api = { user: user_api, todos: todos_api };

export default api;
