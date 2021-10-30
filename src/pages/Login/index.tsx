import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../Providers/Auth";
import "./style.css";
import { BsBagCheck } from "react-icons/bs";

interface UserData {
  email: string;
  password: string;
}

const Login = () => {
  const { signIn, goToRegister } = useAuth();
  const formSchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  const Login = (userData: UserData) => {
    signIn(userData);
  };

  const { register, handleSubmit } = useForm<UserData>({
    resolver: yupResolver(formSchema),
  });

  return (
    <div className="ContentForm">
      <div className="title">
        <h1>
          Kenzie <span id="burger">burger</span>
          <span>&#127828;</span>
        </h1>
      </div>
      <div className="formInfo">
        <div className="boxIcon">
          <BsBagCheck className="iconBag" />
        </div>
        <p>
          A vida é como um sanduíche, é preciso recheá-la com os{" "}
          <span>melhores</span> ingredientes.
        </p>
      </div>
      <div className="InputsCamp">
        <form className="InputsForm" onSubmit={handleSubmit(Login)}>
          <h2>Login</h2>
          <input type="text" {...register("email")} placeholder="Email" />
          <input
            type="password"
            {...register("password")}
            placeholder="Senha"
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
      <div className="infoRegister">
        Não possui conta? <span onClick={goToRegister}>Registre-se</span>
      </div>
    </div>
  );
};

export default Login;
