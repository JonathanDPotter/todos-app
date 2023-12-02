import { server_url } from ".";

interface UserInput {
  username: string;
  password: string;
}

const getUser = async (id: string) => {
  try {
    const response = await fetch(server_url + "/api/users/" + id, {
      method: "GET",
      mode: "cors",
    });
    const json = await response.json();
    return json;
  } catch (error: any) {
    throw new Error(error);
  }
};

const validateUser = async (token: string) => {
  try {
    const response = await fetch(server_url + "/api/users/validate", {
      method: "get",
      mode: "cors",
      headers: { Authorization: "Bearer " + token },
    });
    return response.status;
  } catch (error: any) {
    throw new Error(error);
  }
};

const registerUser = async (newUser: UserInput) => {
  try {
    const response = await fetch(server_url + "/api/users", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const json = await response.json();
    return json;
  } catch (error: any) {
    throw new Error(error);
  }
};

const login = async (user: UserInput) => {
  try {
    const response = await fetch(server_url + "/api/users/login", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const json = await response.json();
    return json;
  } catch (error: any) {
    throw new Error(error);
  }
};

const updateUsername = async (id: string, userUpdate: UserInput) => {
  try {
    const response = await fetch(server_url + "/api/users/" + id, {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userUpdate),
    });
    const json = response.json();
    return json;
  } catch (error: any) {
    throw new Error(error);
  }
};

const deleteUser = async (id: string, token: string) => {
  try {
    const response = await fetch(server_url + "/api/users/" + id, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const json = response.json();
    return json;
  } catch (error: any) {
    throw new Error(error);
  }
};

const user_api = {
  getUser,
  validateUser,
  registerUser,
  login,
  updateUsername,
  deleteUser,
};

export default user_api;
