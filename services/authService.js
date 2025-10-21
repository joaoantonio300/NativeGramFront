import { api, requestConfig } from "../utils/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Register an user
const register = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/register", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res) {
       await AsyncStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

const logout = () => {
  AsyncStorage.removeItem("user");
};

const login = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/login", config);
    
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Erro na resposta da API");
    }

    const json = await res.json();

    if (json.errors) {
      return json;
    }

    if (json.success && json.user) {
      await AsyncStorage.setItem("user", JSON.stringify(json));
    }

    return json;

  } catch (error) {
    console.log("Erro no authService:", error);

    throw error;
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
