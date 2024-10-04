import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    senha: "",
  });

  const [isRegister, setIsRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Manipuladores de mudança para os campos do formulário
  const handleRegisterChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Função para lidar com o registro
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://redev.somee.com/api/Usuarios",
        {
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
        }
      );

      if (response.status === 201) {
        alert("Registro realizado com sucesso. Faça o login!");
        setIsRegister(false); // Troca para a tela de login após o registro
      }
    } catch (error) {
      setErrorMessage("Erro ao registrar usuário.");
    }
  };

  // Função para lidar com o login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://redev.somee.com/api/Usuarios/login",
        {
          username: loginData.email,
          password: loginData.senha,
        }
      );

      if (response.status === 200) {
        // Armazenar o token JWT no localStorage ou em outro local seguro
        localStorage.setItem("token", response.data.token);
        alert("Login realizado com sucesso!");
        navigate("/dashboard"); // Redirecionar para outra página após login
      }
    } catch (error) {
      setErrorMessage("Falha no login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="auth-page">
      <h2>Minha conta</h2>
      <div className="auth-container">
        {/* Formulário de Sign In */}
        <div className="auth-box">
          <h3>Sign In</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Senha</label>
              <input
                type="password"
                name="senha"
                value={loginData.senha}
                onChange={handleLoginChange}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Entrar
            </button>
          </form>
        </div>

        {/* Formulário de Sign Up */}
        <div className="auth-box">
          <h3>Sign Up</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleRegisterChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Senha</label>
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleRegisterChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Nome Completo</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleRegisterChange}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Registrar
            </button>
          </form>
        </div>
      </div>
      {/* Mensagens de erro ou sucesso */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </div>
  );
};

export default Login;
