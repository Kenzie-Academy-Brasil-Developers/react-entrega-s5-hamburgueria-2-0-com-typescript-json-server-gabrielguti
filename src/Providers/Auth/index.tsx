import { createContext, ReactNode, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

interface AuthProps {
  children: ReactNode;
}

interface UserData {
  email: string;
  password: string;
}

interface AuthData {
  userId: number;
  email: string;
  authToken: string;
  signIn: (userData: UserData) => void;
  toRegister: (userData: UserData) => void;
  Logout: () => void;
  goToHome: () => void;
  goToRegister: () => void;
  goLogin: () => void;
}

const AuthContext = createContext<AuthData>({} as AuthData);

export const AuthProvider = ({ children }: AuthProps) => {
  const history = useHistory();
  const [userId, setUserId] = useState(0);
  const [email, setEmail] = useState<string>("");
  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem("token") || ""
  );

  const signIn = (userData: UserData) => {
    api
      .post("/login", userData)
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        setAuthToken(response.data.accessToken);
        setUserId(response.data.user.id);
        setEmail(response.data.user.email);
        toast.success("Sucesso ao entrar");

        history.push("/");
      })
      .catch((err) => toast.error("Falha ao entrar"));
  };

  const toRegister = (userData: UserData) => {
    api
      .post("/register", userData)
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        setAuthToken(response.data.accessToken);
        setUserId(response.data.user.id);
        setEmail(response.data.user.email);
        toast.success("Conta criada");
        history.push("/");
      })
      .catch((err) => toast.error("Falha ao criar"));
  };

  const Logout = () => {
    localStorage.clear();
    setAuthToken("");
    history.push("/login");
  };

  const goToHome = () => {
    history.push("/");
  };
  const goToRegister = () => {
    history.push("/register");
  };
  const goLogin = () => {
    history.push("/login");
  };
  return (
    <AuthContext.Provider
      value={{
        userId,
        email,
        authToken,
        Logout,
        signIn,
        toRegister,
        goToHome,
        goToRegister,
        goLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
