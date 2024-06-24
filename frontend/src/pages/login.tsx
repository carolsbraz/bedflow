import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { CreateUser, DoLoginUser } from "../services/users.service.ts";
import { User } from "../services/users.service.ts";

import { InputText } from "../components/input-text";
import { InputRadio } from "../components/input-radio";

import LaunchIcon from "@mui/icons-material/LaunchRounded";
import PersonRounded from "@mui/icons-material/PersonRounded";
import Grid3x3RoundedIcon from "@mui/icons-material/Grid3x3Rounded";
import EmailRounded from "@mui/icons-material/EmailRounded";
import PasswordRounded from "@mui/icons-material/PasswordRounded";
import SchoolRounded from "@mui/icons-material/SchoolRounded";
import ClassRounded from "@mui/icons-material/ClassRounded";
import WorkRounded from "@mui/icons-material/WorkRounded";

export function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [institucional_id, setInstitucionalId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("undergraduated");
  const [is_admin, setIsAdmin] = useState(false);
  const [start_admin, setStartAdmin] = useState("");
  const [end_admin, setEndAdmin] = useState("");

  const navigate = useNavigate();

  async function DoLogin() {
    try {
      const res: User = await DoLoginUser(email, password);
      localStorage.setItem("user", JSON.stringify(res));
      setEmail("");
      setPassword("");
      navigate("/admin");
      toast.success("Usuário logado com sucesso");
    } catch (error) {
      console.error(error);
      toast.error(
        "Erro ao fazer login. Verifique suas credenciais e tente novamente."
      );
    }
  }

  async function DoCreateUser() {
    try {
      await CreateUser(
        name,
        institucional_id,
        email,
        password,
        role,
        is_admin,
        start_admin,
        end_admin
      );
      setIsLogin(true);
      setName("");
      setInstitucionalId("");
      setEmail("");
      setPassword("");
      setRole("");
      setIsAdmin(false);
      toast.success("Usuário criado com sucesso");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(
        "Erro ao criar usuário. Verifique suas credenciais e tente novamente."
      );
    }
  }

  return (
    <div className="fixed overflow-hidden overflow-y-auto inset-0 p-2 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[70%] w-full md:h-[85vh] bg-white md:rounded-md md:flex outline-none">
      <div className="max-h-full min-w-[40%] rounded-md text-white p-6 flex flex-col justify-between bg-gradient-to-tr from-blue-900 via-blue-800 to-blue-700">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">
            {!isLogin ? "Cadastro" : "Login"}
          </h1>
          <p>Bem-vindo(a) ao site dos Laboratórios de Eletrônica da UFAM!</p>
          <p>
            Ao realizar seu {!isLogin ? "cadastro" : "login"}, você poderá
            solicitar agendamento nos laboratórios e realizar empréstimo de
            materiais.
          </p>
          <br />
        </div>
        <div className="space-y-2">
          <div>
            <a href="#" className="underline">
              Ver quadro de horários <LaunchIcon />
            </a>
          </div>
          <div>
            <a href="#" className="underline">
              Ver manuais e roteiros <LaunchIcon />
            </a>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-md">
            <p>{!isLogin ? "Já" : "Não"} possui cadastro?</p>
            {!isLogin ? (
              <>
                <button
                  className="underline font-semibold"
                  onClick={() => setIsLogin(true)}
                >
                  Faça login
                </button>
              </>
            ) : (
              <button
                className="underline font-semibold"
                onClick={() => setIsLogin(false)}
              >
                Cadastre-se
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="max-h-full min-w-[60%] p-6 flex flex-col justify-center">
        <form className="space-y-3">
          {!isLogin ? (
            <>
              <div className="grid grid-cols-3 gap-4 w-full mb-2">
                <InputRadio
                  text="Discente"
                  icon={<SchoolRounded />}
                  name="role"
                  value="undergraduated"
                  checked={role === "undergraduated"}
                  onChange={() => setRole("undergraduated")}
                />
                <InputRadio
                  text="Docente"
                  icon={<ClassRounded />}
                  name="role"
                  value="teacher"
                  checked={role === "teacher"}
                  onChange={() => setRole("teacher")}
                />
                <InputRadio
                  text="Técnico"
                  icon={<WorkRounded />}
                  name="role"
                  value="technic"
                  checked={role === "technic"}
                  onChange={() => setRole("technic")}
                />
              </div>
              <InputText
                text="Nome"
                icon={<PersonRounded />}
                placeholder="Nome"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <InputText
                text={role == "undergraduated" ? "Matrícula" : "SIAPE"}
                icon={<Grid3x3RoundedIcon />}
                placeholder={role == "undergraduated" ? "Matrícula" : "SIAPE"}
                type="string"
                onChange={(e) => setInstitucionalId(e.target.value)}
                value={institucional_id}
              />
              <InputText
                text="Email"
                icon={<EmailRounded />}
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <InputText
                text="Senha"
                icon={<PasswordRounded />}
                placeholder="Senha"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => DoCreateUser()}
                  className="bg-blue-900 text-white mt-5 px-6 py-2 w-[70%] rounded-sm hover:bg-blue-950 transition-colors"
                >
                  Cadastrar
                </button>
              </div>
            </>
          ) : (
            <>
              <InputText
                text="Email"
                icon={<EmailRounded />}
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <InputText
                text="Senha"
                icon={<PasswordRounded />}
                placeholder="Senha"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => DoLogin()}
                  className="bg-blue-900 text-white mt-5 px-6 py-2 w-[70%] rounded-sm hover:bg-blue-950 transition-colors"
                >
                  Login
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
