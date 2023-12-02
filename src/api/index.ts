import todos_api from "./todos.api";
import user_api from "./user.api";

export const server_url = "https://jp-todos-api-22f1a0f56308.herokuapp.com";

const api = { user: user_api, todos: todos_api };

export default api;
